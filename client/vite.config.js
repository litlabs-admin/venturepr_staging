import { createRequire } from "node:module";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import prerender from "@prerenderer/rollup-plugin";
import puppeteerRenderer from "@prerenderer/renderer-puppeteer";
import fs from "fs";
import path from "path";
const require = createRequire(import.meta.url);
const {
  buildBlogsIndexResponse,
  buildBlogDetailResponse,
} = require("../lib/airtableBlogs.cjs");

async function getRoutesToPrerender(env) {
  const routes = [
    "/",
    "/our-work",
    "/blog",
    "/contact-us",
    "/cookie-policy",
    "/privacy-policy",
    "/not-found"
  ];

  try {
    const response = await buildBlogsIndexResponse(env);
    if (response && response.body && response.body.posts) {
      response.body.posts.forEach((post) => {
        if (post.slug) routes.push(`/blog/${post.slug}`);
      });
    }
  } catch (error) {
    console.warn("Failed to fetch blog routes for prerendering:", error.message);
  }

  try {
    const caseStudiesPath = path.resolve(__dirname, "src/data/caseStudies.js");
    const content = fs.readFileSync(caseStudiesPath, "utf-8");
    const matches = [...content.matchAll(/slug:\s*"([^"]+)"/g)];
    matches.forEach(m => {
      routes.push(`/case-studies/${m[1]}`);
    });
  } catch (error) {
    console.warn("Failed to parse case study routes for prerendering:", error.message);
  }

  return routes;
}

function airtableBlogApiPlugin(mode) {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    name: "airtable-blog-api",
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = req.url ? new URL(req.url, "http://localhost") : null;

        if (!url || req.method !== "GET" || !url.pathname.startsWith("/api/blogs")) {
          next();
          return;
        }

        try {
          let response;

          if (url.pathname === "/api/blogs") {
            response = await buildBlogsIndexResponse(env);
          } else {
            const slug = decodeURIComponent(url.pathname.replace(/^\/api\/blogs\//, ""));
            response = await buildBlogDetailResponse(slug, env);
          }

          res.statusCode = response.status;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify(response.body));
        } catch (error) {
          res.statusCode = error.statusCode || 500;
          res.setHeader("Content-Type", "application/json");
          res.end(
            JSON.stringify({
              message: "Unable to load blog content from Airtable.",
            })
          );
        }
      });
    },
  };
}

export default defineConfig(async ({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const isBuild = process.argv.includes("build");

  const plugins = [
    react(),
    airtableBlogApiPlugin(mode),
  ];

  if (isBuild) {
    const routes = await getRoutesToPrerender(env);
    console.log("Preparing to prerender routes:", routes);
    const isVercel = process.env.VERCEL === "1";
    let executablePath = undefined;
    let args = undefined;
    
    if (isVercel) {
      const chromium = (await import("@sparticuz/chromium")).default;
      executablePath = await chromium.executablePath();
      args = chromium.args;
      console.log("Using Sparticuz Chromium for Vercel via", executablePath);
    } else {
      console.log("Using standard local Puppeteer");
    }

    const prerenderPlugin = prerender({
      routes,
      renderer: new puppeteerRenderer({
        executablePath,
        args,
        renderAfterTime: 2000,
      }),
      server: {
        proxy: {
          "/api": {
            target: "http://localhost:9999",
            changeOrigin: true
          }
        }
      }
    });

    // Some plugins define hooks as objects { handler: fn }, others as plain functions
    const originalGenerateBundle = typeof prerenderPlugin.generateBundle === 'object' 
      ? prerenderPlugin.generateBundle.handler 
      : prerenderPlugin.generateBundle;

    if (!originalGenerateBundle) {
      console.warn("Prerender plugin does not have a generateBundle hook!");
    }

    const wrapperHandler = async function(...args) {
      const http = await import('http');
      
      const apiServer = http.createServer(async (req, res) => {
        const url = new URL(req.url, "http://localhost");
        if (req.method === "GET" && url.pathname.startsWith("/api/blogs")) {
          res.setHeader("Access-Control-Allow-Origin", "*");
          try {
            let response;
            if (url.pathname === "/api/blogs") {
              response = await buildBlogsIndexResponse(env);
            } else {
              const slug = decodeURIComponent(url.pathname.replace("/api/blogs/", ""));
              response = await buildBlogDetailResponse(slug, env);
            }
            res.writeHead(response.status, { "Content-Type": "application/json" });
            res.end(JSON.stringify(response.body));
          } catch (error) {
            res.writeHead(500);
            res.end(JSON.stringify({ message: "Error" }));
          }
        } else {
          res.writeHead(404);
          res.end();
        }
      });

      await new Promise(resolve => apiServer.listen(9999, resolve));
      console.log("Started internal API server on port 9999 for prerendering...");

      try {
        if (originalGenerateBundle) {
          await originalGenerateBundle.apply(this, args);
        }
      } finally {
        apiServer.close();
        console.log("Closed internal API server.");
      }
    };

    if (typeof prerenderPlugin.generateBundle === 'object') {
      prerenderPlugin.generateBundle.handler = wrapperHandler;
    } else {
      prerenderPlugin.generateBundle = wrapperHandler;
    }

    plugins.push(prerenderPlugin);
  }

  return {
    plugins,
    assetsInclude: ["**/*.PNG"],
    server: {
      port: 5173,
    },
  };
});

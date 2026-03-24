import { createRequire } from "node:module";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

const require = createRequire(import.meta.url);
const {
  buildBlogsIndexResponse,
  buildBlogDetailResponse,
} = require("../lib/airtableBlogs.cjs");

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

export default defineConfig(({ mode }) => ({
  plugins: [react(), airtableBlogApiPlugin(mode)],
  assetsInclude: ["**/*.PNG"],
  server: {
    port: 5173,
  },
}));

"use strict";

const AIRTABLE_API_ROOT = "https://api.airtable.com/v0";
const SERVER_CACHE_TTL_MS = 60 * 1000;

const normalizedPostsCache = {
  cacheKey: "",
  data: null,
  expiresAt: 0,
  promise: null,
};

function getEnvValue(env, keys, fallback = "") {
  for (const key of keys) {
    const value = env?.[key];
    if (typeof value === "string" && value.trim()) {
      return value.trim();
    }
  }

  return fallback;
}

function getConfig(env = process.env) {
  return {
    apiToken: getEnvValue(env, [
      "AIRTABLE_API_TOKEN",
      "AIRTABLE_ACCESS_TOKEN",
      "VENTURE_PR_BLOGS_AIRTABLE_ACCESS_TOKEN",
      "VENTUR_PR_BLOGS_AIRTABLE_ACCESS_TOKEN",
    ]),
    baseId: getEnvValue(env, [
      "AIRTABLE_BASE_ID",
      "VENTURE_PR_BLOGS_AIRTABLE_BASE_ID",
      "VENTUR_PR_BLOGS_AIRTABLE_BASE_ID",
    ]),
    tableName: getEnvValue(env, [
      "AIRTABLE_TABLE_NAME",
      "VENTURE_PR_BLOGS_AIRTABLE_TABLE_NAME",
      "VENTUR_PR_BLOGS_AIRTABLE_TABLE_NAME",
    ], "Blogs"),
  };
}

function slugify(value) {
  return String(value ?? "")
    .normalize("NFKD")
    .toLowerCase()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
}

function formatPublishDate(value) {
  if (!value) {
    return "";
  }

  const date = new Date(`${value}T00:00:00`);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

function formatReadTime(value) {
  if (value === null || value === undefined || value === "") {
    return "";
  }

  const minutes = Number(value);

  if (!Number.isFinite(minutes) || minutes <= 0) {
    return "";
  }

  return `${Math.round(minutes)} min read`;
}

function normalizePost(record) {
  const fields = record?.fields ?? {};
  const heading = String(fields["Heading"] ?? "").trim();
  const slug = String(fields["slug"] ?? "").trim() || slugify(heading);
  const attachments = Array.isArray(fields["Photos"]) ? fields["Photos"] : [];
  const primaryAttachment = attachments[0] ?? null;
  const tags = Array.isArray(fields["Tags"]) ? fields["Tags"].filter(Boolean) : [];

  return {
    id: record.id,
    slug,
    title: heading,
    excerpt: String(fields["Subheading"] ?? "").trim(),
    category: tags[0] ?? "",
    tags,
    publishDate: formatPublishDate(fields["Date"]),
    publishDateRaw: fields["Date"] ?? "",
    readTime: formatReadTime(fields["Reading Time (minutes)"]),
    readingTimeMinutes: Number(fields["Reading Time (minutes)"] ?? 0) || null,
    heroImage: primaryAttachment?.url ?? "",
    heroImageAlt: heading
      ? `Hero image for ${heading}`
      : "Blog post hero image",
    bodyMarkdown: String(fields["Main Content"] ?? "").trim(),
  };
}

async function fetchAllRecords(config) {
  if (!config.apiToken || !config.baseId) {
    const error = new Error(
      "Missing Airtable configuration. Set AIRTABLE_API_TOKEN and AIRTABLE_BASE_ID."
    );
    error.statusCode = 500;
    throw error;
  }

  const url = new URL(
    `${AIRTABLE_API_ROOT}/${encodeURIComponent(config.baseId)}/${encodeURIComponent(
      config.tableName
    )}`
  );
  url.searchParams.set("sort[0][field]", "Date");
  url.searchParams.set("sort[0][direction]", "desc");

  const records = [];
  let offset = "";

  do {
    if (offset) {
      url.searchParams.set("offset", offset);
    } else {
      url.searchParams.delete("offset");
    }

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${config.apiToken}`,
      },
    });

    if (!response.ok) {
      const text = await response.text();
      const error = new Error(`Airtable request failed with ${response.status}: ${text}`);
      error.statusCode = response.status;
      throw error;
    }

    const payload = await response.json();
    records.push(...(payload.records ?? []));
    offset = payload.offset ?? "";
  } while (offset);

  return records;
}

async function getNormalizedPosts(env = process.env) {
  const config = getConfig(env);
  const cacheKey = [config.baseId, config.tableName, config.apiToken].join("|");

  if (
    normalizedPostsCache.data &&
    normalizedPostsCache.cacheKey === cacheKey &&
    normalizedPostsCache.expiresAt > Date.now()
  ) {
    return normalizedPostsCache.data;
  }

  if (normalizedPostsCache.promise && normalizedPostsCache.cacheKey === cacheKey) {
    return normalizedPostsCache.promise;
  }

  normalizedPostsCache.cacheKey = cacheKey;
  normalizedPostsCache.promise = fetchAllRecords(config)
    .then((records) => {
      const posts = records
        .map(normalizePost)
        .filter((post) => post.slug && post.title);

      normalizedPostsCache.data = posts;
      normalizedPostsCache.expiresAt = Date.now() + SERVER_CACHE_TTL_MS;
      normalizedPostsCache.promise = null;

      return posts;
    })
    .catch((error) => {
      normalizedPostsCache.promise = null;
      throw error;
    });

  return normalizedPostsCache.promise;
}

async function buildBlogsIndexResponse(env = process.env) {
  const posts = await getNormalizedPosts(env);

  return {
    status: 200,
    body: {
      posts: posts.map((post) => ({
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt,
        category: post.category,
        publishDate: post.publishDate,
        readTime: post.readTime,
        heroImage: post.heroImage,
        heroImageAlt: post.heroImageAlt,
      })),
    },
  };
}

async function buildBlogDetailResponse(slug, env = process.env) {
  const posts = await getNormalizedPosts(env);
  const post = posts.find((entry) => entry.slug === slug);

  if (!post) {
    return {
      status: 404,
      body: {
        message: "Blog post not found.",
      },
    };
  }

  const relatedPosts = posts
    .filter((entry) => entry.slug !== post.slug)
    .slice(0, 3)
    .map((entry) => ({
      slug: entry.slug,
      title: entry.title,
      excerpt: entry.excerpt,
      category: entry.category,
      publishDate: entry.publishDate,
      readTime: entry.readTime,
      heroImage: entry.heroImage,
      heroImageAlt: entry.heroImageAlt,
    }));

  return {
    status: 200,
    body: {
      post,
      relatedPosts,
    },
  };
}

module.exports = {
  buildBlogsIndexResponse,
  buildBlogDetailResponse,
  getConfig,
  slugify,
};

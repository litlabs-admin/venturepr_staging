const CLIENT_CACHE_TTL_MS = 5 * 60 * 1000;

const listCache = {
  data: null,
  expiresAt: 0,
  promise: null,
};

const detailCache = new Map();

function isFresh(entry) {
  return Boolean(entry?.data) && entry.expiresAt > Date.now();
}

function hasRenderableBody(post) {
  return Boolean(post) && Object.prototype.hasOwnProperty.call(post, "bodyMarkdown");
}

function createDetailEntry() {
  return {
    data: null,
    relatedPosts: [],
    expiresAt: 0,
    promise: null,
  };
}

function getDetailEntry(slug) {
  if (!detailCache.has(slug)) {
    detailCache.set(slug, createDetailEntry());
  }

  return detailCache.get(slug);
}

function setListCache(posts) {
  listCache.data = posts;
  listCache.expiresAt = Date.now() + CLIENT_CACHE_TTL_MS;
}

function setDetailCache(post) {
  const entry = getDetailEntry(post.slug);
  entry.data = post;
  entry.expiresAt = Date.now() + CLIENT_CACHE_TTL_MS;
  entry.promise = null;
}

async function fetchJson(url) {
  let finalUrl = url;
  // During SSG, Puppeteer accesses the site through a static file server.
  // To reach the mock API running in the background, we use absolute URLs.
  if (typeof window !== "undefined" && window.__PRERENDER_INJECTED) {
    if (finalUrl.startsWith("/")) {
      finalUrl = "http://localhost:9999" + finalUrl;
    }
  }

  const response = await fetch(finalUrl);
  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    const error = new Error(payload.message || "Request failed.");
    error.status = response.status;
    throw error;
  }

  return payload;
}

function mergeSummariesIntoList(posts) {
  const existing = Array.isArray(listCache.data) ? listCache.data : [];
  const mergedBySlug = new Map(existing.map((post) => [post.slug, post]));

  for (const post of posts) {
    mergedBySlug.set(post.slug, post);
  }

  const mergedPosts = existing.map((post) => mergedBySlug.get(post.slug) ?? post);

  for (const post of posts) {
    if (!existing.some((existingPost) => existingPost.slug === post.slug)) {
      mergedPosts.push(post);
    }
  }

  setListCache(mergedPosts);
}

export function readBlogPostsCache() {
  return isFresh(listCache) ? listCache.data : null;
}

export function readBlogPostCache(slug) {
  if (!slug) {
    return null;
  }

  const entry = detailCache.get(slug);

  if (!isFresh(entry) || !hasRenderableBody(entry.data)) {
    return null;
  }

  return entry.data;
}

export function readRelatedPostsFromCache(slug, limit = 3) {
  const posts = readBlogPostsCache();

  if (posts?.length) {
    return posts.filter((post) => post.slug !== slug).slice(0, limit);
  }

  const detailEntry = slug ? detailCache.get(slug) : null;

  if (isFresh(detailEntry) && detailEntry.relatedPosts?.length) {
    return detailEntry.relatedPosts.slice(0, limit);
  }

  return [];
}

export async function getBlogPosts() {
  if (isFresh(listCache)) {
    return listCache.data;
  }

  if (listCache.promise) {
    return listCache.promise;
  }

  listCache.promise = fetchJson("/api/blogs")
    .then((payload) => {
      const posts = payload.posts ?? [];
      setListCache(posts);
      listCache.promise = null;
      return posts;
    })
    .catch((error) => {
      listCache.promise = null;
      throw error;
    });

  return listCache.promise;
}

export async function getBlogPost(slug) {
  if (!slug) {
    return {
      post: null,
      relatedPosts: [],
    };
  }

  const cachedPost = readBlogPostCache(slug);

  if (cachedPost) {
    return {
      post: cachedPost,
      relatedPosts: readRelatedPostsFromCache(slug),
    };
  }

  const entry = getDetailEntry(slug);

  if (entry.promise) {
    return entry.promise;
  }

  entry.promise = fetchJson(`/api/blogs/${encodeURIComponent(slug)}`)
    .then((payload) => {
      const post = payload.post ?? null;
      const relatedPosts = payload.relatedPosts ?? [];

      if (post) {
        setDetailCache(post);
        entry.relatedPosts = relatedPosts;

        if (isFresh(listCache)) {
          mergeSummariesIntoList(relatedPosts);
        }
      } else {
        entry.promise = null;
      }

      return {
        post,
        relatedPosts: readRelatedPostsFromCache(slug).length
          ? readRelatedPostsFromCache(slug)
          : relatedPosts,
      };
    })
    .catch((error) => {
      entry.promise = null;
      throw error;
    });

  return entry.promise;
}

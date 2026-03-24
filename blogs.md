# Blog Codebase Reference

This document describes the current blog implementation in `fresh-react-node-hero`.

Current state:

- Airtable is the only runtime source of blog content
- article URLs use the Airtable `slug` field
- `Main Content` remains a long-text Airtable field, but its value is markdown
- article markdown is rendered on the client with `react-markdown` and `remark-gfm`
- list/detail loading is reduced by client and server caching

## 1. Architecture Overview

The blog is a routed React feature backed by Airtable through internal API routes.

Main flow:

- `/blog` renders the blog index
- `/blog/:slug` renders an individual article
- the client fetches `/api/blogs` and `/api/blogs/:slug`
- the API layer reads from Airtable
- the shared Airtable layer normalizes records into the blog post shape used by the client
- article body content is passed through as raw markdown and rendered in the browser

There are two cache layers:

- client in-memory cache for list/detail fetches and in-flight promise deduping
- server-side normalized Airtable cache with a short TTL

## 2. Route Surface

Routes are declared in `client/src/App.jsx`.

- `/blog` -> `BlogPage`
- `/blog/:slug` -> `BlogPostPage`

There is no route loader abstraction. Data fetching is component-driven.

## 3. File Inventory

### Blog pages

- `client/src/pages/Blog.jsx`
  - wraps the blog landing page
  - sets page title
  - renders label, hero, posts section, CTA, footer

- `client/src/pages/BlogPost.jsx`
  - renders a single article page
  - reads the route slug
  - resolves article data from cache first
  - fetches detail only when needed
  - renders markdown content using `MarkdownContent`
  - renders related posts

### Blog components

- `client/src/components/blog/BlogLabelSection.jsx`
  - static label section

- `client/src/components/blog/BlogHeroSection.jsx`
  - static hero section for the blog index

- `client/src/components/blog/BlogPostsSection.jsx`
  - renders the article summary grid
  - uses cache-aware list loading
  - handles loading, empty, and error states

- `client/src/components/blog/BlogCtaSection.jsx`
  - static call-to-action section

- `client/src/components/blog/MarkdownContent.jsx`
  - markdown renderer for article bodies
  - uses `react-markdown` plus `remark-gfm`
  - remaps markdown `h1` to `h2` inside article content
  - renders external links with `target="_blank"` and `rel="noreferrer"`

### Client data layer

- `client/src/utils/blogApi.js`
  - central client-side blog fetch/cache module
  - owns list cache, detail cache, and request deduping
  - rejects stale cached article shapes that do not include `bodyMarkdown`

### API layer

- `api/blogs/index.js`
  - `GET /api/blogs`
  - returns blog summaries

- `api/blogs/[slug].js`
  - `GET /api/blogs/:slug`
  - returns one full article plus related posts

### Shared Airtable layer

- `lib/airtableBlogs.cjs`
  - Airtable config lookup
  - Airtable fetch logic
  - normalized server-side cache
  - Airtable record normalization into blog post objects
  - stable slug handling from Airtable field `slug`

### Dev/deploy wiring

- `client/vite.config.js`
  - serves local `/api/blogs` and `/api/blogs/:slug` in development

- `vercel.json`
  - keeps `/api/*` routes active in production
  - rewrites all non-API routes to `index.html`

### Shared but relevant files

- `client/package.json`
  - includes `react-markdown` and `remark-gfm`

- `client/src/hooks/usePageTitle.js`
  - sets `document.title`

- `client/src/main.jsx`
  - wraps the app in `React.StrictMode`

- `client/src/components/FooterSection.jsx`
  - includes a link to `/blog`

- `client/src/styles.css`
  - contains all blog-specific styling rules

## 4. Current Data Shape

The normalized blog post shape currently looks like this:

```js
{
  id,
  slug,
  title,
  excerpt,
  category,
  tags,
  publishDate,
  publishDateRaw,
  readTime,
  readingTimeMinutes,
  heroImage,
  heroImageAlt,
  bodyMarkdown
}
```

Important notes:

- `slug` comes from Airtable field `slug`
- `bodySections` no longer exists
- `bodyMarkdown` carries the raw markdown article body

## 5. Airtable Schema Mapping

Expected Airtable fields:

- `Heading`
- `slug`
- `Photos`
- `Date`
- `Reading Time (minutes)`
- `Subheading`
- `Main Content`
- `Tags`

Current mapping:

- `Heading` -> `title`
- `slug` -> `slug`
- `Photos[0].url` -> `heroImage`
- `Date` -> `publishDateRaw` and formatted `publishDate`
- `Reading Time (minutes)` -> `readingTimeMinutes` and formatted `readTime`
- `Subheading` -> `excerpt`
- `Tags[0]` -> `category`
- `Tags` -> `tags`
- `Main Content` -> `bodyMarkdown`

Slug handling:

- primary source is Airtable field `slug`
- `slugify(Heading)` is retained only as a fallback if `slug` is missing

## 6. End-to-End Runtime Flow

### Blog index

1. React Router renders `BlogPage`.
2. `BlogPage` renders `BlogPostsSection`.
3. `BlogPostsSection` checks `readBlogPostsCache()`.
4. If cached summaries exist and are fresh, the grid renders immediately.
5. Otherwise `getBlogPosts()` fetches `/api/blogs`.
6. The API calls `buildBlogsIndexResponse()`.
7. Airtable records are read and normalized.
8. Only summary fields are returned.
9. The client stores them in the list cache.

### Blog detail

1. React Router renders `BlogPostPage`.
2. The route slug is read with `useParams()`.
3. `readBlogPostCache(slug)` is checked first.
4. `readRelatedPostsFromCache(slug)` is checked for related summaries.
5. If the full post is already cached, the page renders immediately.
6. Otherwise `getBlogPost(slug)` requests `/api/blogs/:slug`.
7. The API calls `buildBlogDetailResponse(slug)`.
8. The response returns:
   - `post`
   - `relatedPosts`
9. The client stores the full article in the detail cache.
10. The article page renders `bodyMarkdown` through `MarkdownContent`.

## 7. Client Cache Design

The client cache is implemented in `client/src/utils/blogApi.js`.

### List cache

`listCache` stores:

- `data`
- `expiresAt`
- `promise`

It caches the summary response from `/api/blogs`.

### Detail cache

`detailCache` is a `Map` keyed by slug.

Each entry stores:

- `data`
- `relatedPosts`
- `expiresAt`
- `promise`

### TTL

- client cache TTL: 5 minutes

### Deduping

The cache layer dedupes requests by reusing in-flight promises.

Effects:

- repeated mounts under `React.StrictMode` do not automatically generate duplicate list/detail requests
- revisiting a recently loaded article does not re-fetch it immediately

### Shape validation

The detail cache is intentionally shape-aware.

If a cached article object does not contain `bodyMarkdown`, it is treated as stale and ignored. This prevents old article shapes from surviving hot reloads or partial transitions and causing blank bodies.

## 8. API Surface

### `GET /api/blogs`

Defined in `api/blogs/index.js`.

Behavior:

- accepts only `GET`
- returns summary cards
- errors with `405` for other methods

Current response shape:

```js
{
  posts: [
    {
      slug,
      title,
      excerpt,
      category,
      publishDate,
      readTime,
      heroImage,
      heroImageAlt
    }
  ]
}
```

### `GET /api/blogs/:slug`

Defined in `api/blogs/[slug].js`.

Behavior:

- accepts only `GET`
- returns a full article plus related posts
- returns `404` when no article matches the slug

Current response shape:

```js
{
  post: {
    slug,
    title,
    excerpt,
    category,
    publishDate,
    readTime,
    heroImage,
    heroImageAlt,
    bodyMarkdown,
    ...
  },
  relatedPosts: [
    {
      slug,
      title,
      excerpt,
      category,
      publishDate,
      readTime,
      heroImage,
      heroImageAlt
    }
  ]
}
```

## 9. Server-Side Airtable Layer

`lib/airtableBlogs.cjs` is the single source of truth for Airtable normalization.

### Config lookup

`getConfig()` reads:

- `AIRTABLE_API_TOKEN`
- `AIRTABLE_ACCESS_TOKEN`
- `VENTURE_PR_BLOGS_AIRTABLE_ACCESS_TOKEN`
- `VENTUR_PR_BLOGS_AIRTABLE_ACCESS_TOKEN`

for token lookup, plus base ID and table name variants.

Default table name:

- `Blogs`

### Fetch behavior

`fetchAllRecords(config)`:

- calls Airtable REST API
- sorts by `Date desc`
- paginates via Airtable `offset`
- throws on missing config
- throws on Airtable error responses

### Server cache

`normalizedPostsCache` stores:

- `cacheKey`
- `data`
- `expiresAt`
- `promise`

TTL:

- 60 seconds

This avoids reloading Airtable on every adjacent list/detail request.

## 10. Markdown Rendering

The old heuristic parser has been removed from the Airtable normalization layer.

The server now passes markdown through as raw text via `bodyMarkdown`.

The client renders markdown in `client/src/components/blog/MarkdownContent.jsx` using:

- `react-markdown`
- `remark-gfm`

### Rendering behavior

- markdown is parsed by a library rather than a hand-rolled parser
- GitHub-flavored markdown support is enabled through `remark-gfm`
- article body rendering no longer depends on custom punctuation or line heuristics
- external links open in a new tab
- markdown `h1` is remapped to `h2` inside article content to avoid a second page-level `h1`

### Practical consequence

Content structure is controlled by explicit markdown syntax in Airtable and rendered by a real markdown library rather than custom parsing logic.

This is the main fix for the earlier article-body parsing/rendering failures.

## 11. BlogPost Page Behavior

`client/src/pages/BlogPost.jsx`:

- reads cached post data if available
- fetches detail only when needed
- renders `bodyMarkdown` using `MarkdownContent`
- handles:
  - loading state
  - error state
  - not-found redirect
  - related posts

The page no longer expects:

- `bodySections`
- `section.title`
- `section.paragraphs`
- `section.bullets`

## 12. Styling

Blog styling remains centralized in `client/src/styles.css`.

Important blog selectors:

- `.blog-page`
- `.blog-page__content`
- `.blog-posts-section`
- `.blog-post-page`
- `.blog-post-detail`
- `.blog-post-detail__body`
- `.blog-post-markdown`
- `.blog-related`

Markdown-specific styling includes:

- heading styles for markdown headings
- paragraph/list typography
- link styling
- blockquote styling
- code block styling
- inline code styling
- horizontal rule styling

Existing summary-card and article-shell styles remain in place.

## 13. Development and Production Wiring

### Development

`client/vite.config.js` installs local middleware so `/api/blogs` and `/api/blogs/:slug` work directly in Vite dev mode.

This means:

- no separate local server is required for blog content
- local dev uses the same shared Airtable code as production

### Production

`vercel.json` keeps `/api/*` active and rewrites other routes to `index.html`.

This allows:

- SPA routing for `/blog` and `/blog/:slug`
- serverless handling for the Airtable API endpoints

## 14. StrictMode Impact

`client/src/main.jsx` wraps the app in `React.StrictMode`.

This matters because:

- effects can run twice in development
- naive fetch logic would duplicate requests

The client cache layer is deliberately structured to absorb that:

- warm cache returns data immediately
- in-flight promise reuse prevents duplicate fetches
- stale article shapes without `bodyMarkdown` are ignored

## 15. Removed Legacy Static Dataset

The old file:

- `client/src/data/blogPosts.js`

has been removed.

That means:

- there is no second blog content source in the repo
- Airtable is now the only runtime source for blog articles
- maintenance risk from editing the wrong data source is reduced

## 16. Current Known Good Behavior

Current expected behavior:

- `/blog` renders Airtable-backed summaries
- `/blog/:slug` resolves using the stable Airtable `slug`
- article bodies render from markdown
- related posts still render
- missing images degrade to a visual fallback
- missing tags simply omit category output
- missing date/read-time values omit those spans
- 404 article slugs redirect to `/not-found`
- duplicate requests are reduced by client and server caches

## 17. Current Technical Risks

### 1. Markdown rendering depends on library defaults plus current component mapping

The renderer is now library-based, but behavior still follows `react-markdown` plus `remark-gfm`, not arbitrary HTML authoring.

Practical constraints:

- raw HTML handling is not enabled by default
- custom embeds or shortcode-like content still need explicit component support
- tables, task lists, and other GFM output may still need additional CSS even when parsing works

### 2. Slug fallback still exists

The system correctly prefers Airtable `slug`, but still falls back to `slugify(Heading)` if the field is missing. That is intentional for resilience, but it means missing slug data can still silently create title-derived URLs.

### 3. No publish-state model

All Airtable rows returned from the table are treated as public blog posts.

### 4. No dedicated automated test coverage

There are still no visible tests for:

- markdown rendering behavior
- Airtable normalization
- cache semantics
- route behavior

### 5. Some source encoding issues still exist outside the markdown work

There are existing mojibake artifacts elsewhere in the repo, including some CSS/content strings. They are not specific to markdown, but they remain a maintenance issue.

## 18. Maintenance Guidance

If a blog issue appears:

1. Check the Airtable row first.
2. Verify the `slug` field is populated and correct.
3. Inspect the API response at `/api/blogs/:slug`.
4. If the issue is body formatting or missing content, inspect `bodyMarkdown` and `MarkdownContent.jsx`.
5. If the issue is repeated loading or stale data, inspect `client/src/utils/blogApi.js`.
6. If the issue is visual only, inspect `client/src/styles.css`.

For content problems specifically:

- if the markdown source is wrong, fix Airtable
- if the markdown source is correct but output is wrong, inspect the `react-markdown` component mapping and CSS

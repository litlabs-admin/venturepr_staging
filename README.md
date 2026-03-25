# Fresh React + Node Hero

`venture_pr_website` is a Vite-powered React workspace that recreates a polished PR and agency-style marketing site with reusable sections, routed pages, and local asset-driven visuals.

The blog now loads from Airtable through a root-level API layer, while the client continues to render the public pages.

It is structured as an npm workspace with a single front-end app in `client/`. The root package provides the top-level workspace scripts, the `api/` directory hosts serverless endpoints for Airtable-backed blog content, and the React app handles the UI and routing.

## AI Discoverability & SEO Optimizations

- **Build-Time SSG (Static Site Generation):** Replaced the empty SPA root div with fully pre-rendered HTML files for every static and dynamic route (including dynamic Airtable blogs and case studies) during the Vercel build. This allows standard search engines (Google, Bing) to instantly parse the site's layout and text content.
- **AI-Native Endpoint (`/llm.txt`):** Added a custom build script (`generate-llm.js`) that safely parses the agency's React data files to extract all deep services, case study overviews, and blog posts into a single, massive Markdown file (`dist/llm.txt`). This acts as a dedicated, fully-populated knowledge base for AI chatbots (Claude, ChatGPT, Perplexity).
- **Vercel-Native Compatibility:** Integrated the lightweight JSDOM rendering engine so the prerendering operation executes natively within Vercel's standard deployment environments without requiring custom OS packages.

## Recent Changes

- Added a root-level serverless blog API backed by Airtable
- Added blog index and slug pages with cached client fetching
- Added "Continue reading" related-post cards on slug pages, showing up to 3 posts other than the current slug
- Added homepage SEO metadata with `react-helmet`, including title, description, and Open Graph tags
- Added fallback title, description, and Open Graph tags in `client/index.html`
- Refined mobile spacing and typography on blog listing, blog detail, and blog CTA sections
- Updated Vercel deployment to run from the repository root so both `client/` and `api/` deploy together

## What This Project Includes

This app is built as a multi-section marketing site rather than a traditional CRUD application. The main experience includes:

- A highly visual home page with stacked sections for hero, statistics, benefits, brands, services, projects, process, differentiators, testimonials, about, FAQ, CTA, and footer
- A hero carousel that cycles through press coverage imagery and links out to featured publications
- Client-facing pages for `Our Work`, `Contact Us`, `Case Studies`, `Privacy Policy`, and `Cookie Policy`
- A contact form experience that connects through Web3Forms
- Blog index and article detail pages backed by Airtable content
- Related-post recommendations on article pages
- Homepage SEO metadata managed in React with static HTML fallbacks
- Client-side routing powered by React Router
- Asset-heavy layouts that rely on local images and locally bundled fonts

## Repository Structure

The repository is organized like this:

- `venture_pr_website/`
  - Root workspace package with shared scripts
  - `README.md`
  - `package.json`
  - `fonts.md`
  - `client/`
    - Vite React app
    - `index.html`
    - `package.json`
    - `vite.config.js`
    - `vercel.json`
    - `.env`
    - `src/`
      - `components/` reusable page sections and UI pieces
      - `pages/` routed pages
      - `data/` content and copy collections
      - `utils/` helper functions
      - `assets/` images and local fonts
  - `api/`
    - Serverless blog endpoints backed by Airtable
  - `lib/`
    - Shared Airtable normalization utilities used by local dev and serverless routes

## Tech Stack

- React 18
- React Router 6
- Vite 5
- npm workspaces
- Web3Forms for contact submissions

## Getting Started

### Prerequisites

- Node.js installed locally
- npm available in your terminal

### Install Dependencies

Run this from the repository root:

```bash
npm install
```

This installs the workspace dependencies and the client app dependencies.

## Available Scripts

### Root Workspace Scripts

From `venture_pr_website/`:

```bash
npm run dev
```

Starts the Vite development server for the client workspace.

```bash
npm run dev:client
```

Alias for the same client development server.

```bash
npm run build
```

Builds the client app for production.

### Client Scripts

From `venture_pr_website/client/`:

```bash
npm run dev
```

Starts the local Vite dev server.

```bash
npm run build
```

Creates the production build output in `client/dist/`.

```bash
npm run preview
```

Serves the production build locally for verification.

## Environment Variables

The project uses these environment variables:

```bash
VITE_WEB3FORMS_ACCESS_KEY=your_access_key_here
AIRTABLE_API_TOKEN=your_airtable_token_here
AIRTABLE_BASE_ID=your_airtable_base_id_here
AIRTABLE_TABLE_NAME=Blogs
```

Notes:

- Keep the actual key out of version control.
- The repository currently includes a local `client/.env` file for development convenience, but you should treat those values as secrets and replace them with your own when needed.
- Vite exposes only variables prefixed with `VITE_` to the browser build. The Airtable values are consumed only by the local dev middleware and the serverless API layer.

## App Behavior

### Routing

The app uses React Router for client-side navigation. Main routes include:

- `/` for the home page
- `/our-work`
- `/contact-us`
- `/cookie-policy`
- `/privacy-policy`
- `/case-studies/:slug`

The `/case-studies` path redirects to the default case study slug defined in the app data layer.

### Scrolling and Section Routes

The app uses clean section routes like `/services`, `/projects`, `/process`, `/about`, and `/faq`. A route-aware scroll helper keeps those URLs landing on the matching home-page section while preserving the existing section IDs for in-page navigation.

### Hero Carousel

The hero section rotates through a set of local press-coverage images and opens external publication links in a new tab. The carousel is responsive and adjusts card sizing based on the current breakpoint.

### Blog

The blog uses Airtable-backed serverless endpoints at the repository root:

- `GET /api/blogs` returns the blog listing data
- `GET /api/blogs/[slug]` returns a single article plus related posts

On article detail pages, the "Continue reading" section shows up to 3 other articles and excludes the currently opened slug.

The client keeps a short-lived in-memory cache for blog listings and blog detail responses to avoid unnecessary repeat fetches during navigation.

### SEO

The homepage uses `react-helmet` to set runtime metadata for:

- document title
- meta description
- `og:title`
- `og:description`
- `og:type`

Static fallback metadata is also defined in `client/index.html` so the page still has baseline SEO tags before the React app hydrates.

### Responsive Blog Layout

The blog pages include mobile-specific refinements for:

- hero headline wrapping and spacing
- page-level mobile padding
- CTA alignment and panel spacing
- blog card and detail metadata rows on small screens

## Content and Customization

If you want to change the site content, these are the main areas to update:

- `client/src/components/` for the home page sections and shared UI pieces
- `client/src/pages/` for routed page content
- `client/src/data/` for copy, testimonials, case studies, and policy text
- `client/src/assets/` for images, logos, and font files
- `client/src/styles.css` for layout, typography, spacing, and responsive behavior
- `api/` and `lib/` for Airtable blog fetching, normalization, and serverless responses

Common content edits include:

- Updating hero copy and CTA labels
- Replacing case study entries and their slugs
- Swapping testimonial data
- Changing press coverage links and imagery
- Adjusting footer links and policy navigation
- Managing blog entries in Airtable instead of local hardcoded article files

## Deployment

For Vercel, deploy the app from `venture_pr_website/` as the project root, not from `client/`. The root `vercel.json` serves `client/dist` as the output and keeps the `api/` routes available alongside the SPA.

### Vercel Setup

Use these settings in the Vercel dashboard:

- Root Directory: repository root (`venture_pr_website/`)
- Build Command: `npm run build`
- Output Directory: `client/dist`

The root-level `api/` directory contains the serverless blog endpoints. If Vercel is pointed at `client/`, the front end may still build, but the blog API routes will not be deployed correctly.

Add these environment variables in Vercel Project Settings:

```bash
VITE_WEB3FORMS_ACCESS_KEY=your_access_key_here
AIRTABLE_API_TOKEN=your_airtable_token_here
AIRTABLE_BASE_ID=your_airtable_base_id_here
AIRTABLE_TABLE_NAME=Blogs
```

Deployment flow stays the same after that:

1. Push changes to GitHub.
2. Let Vercel build from the repository root.
3. Vercel serves the React app from `client/dist` and the Airtable-backed blog endpoints from `api/`.

If you deploy elsewhere, make sure your host is configured to rewrite all non-asset requests back to `index.html` so React Router can handle navigation on the client side.

The app also includes a client-side catch-all route so unknown URLs render a proper Not Found page instead of falling into a blank unmatched route state after a rewrite.

## Development Notes

- The app does not use a standalone Express server. Blog data is served through Vercel-style serverless functions in `api/`.
- The home page is composed from many small sections, so most visual changes should be made in the relevant component instead of in a monolithic page file.
- Assets are bundled locally, which keeps the site self-contained and avoids external runtime dependencies for imagery and fonts.

## File Reference Highlights

- `venture_pr_website/package.json` contains the root workspace scripts.
- `venture_pr_website/client/package.json` contains the Vite client scripts and dependencies.
- `venture_pr_website/client/src/App.jsx` defines the route structure.
- `venture_pr_website/client/src/pages/Blog.jsx` and `venture_pr_website/client/src/pages/BlogPost.jsx` define the blog routes.
- `venture_pr_website/client/src/utils/blogApi.js` contains the client blog-fetching and cache helpers.
- `venture_pr_website/client/src/components/HeroSection.jsx` implements the animated hero carousel.
- `venture_pr_website/lib/airtableBlogs.cjs` builds normalized Airtable blog responses for both index and slug routes.
- `venture_pr_website/client/vercel.json` contains the SPA rewrite configuration.

## Suggested Workflow

1. Install dependencies with `npm install` at the repository root.
2. Start development with `npm run dev`.
3. Edit copy, assets, and sections in `client/src/`.
4. Preview production behavior with `npm run build` and `npm run preview` from `client/`.
5. Update deployment settings as needed for your hosting provider.

## License

No explicit license is defined in this repository. Add one if you plan to share or redistribute the project.

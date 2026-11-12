# imagine-landing-pages

ImagineArt product landing pages, maintained together in one Next.js 16 App Router project. The project has two outputs: a local Next.js development site and a static bundle organized for CDN hosting.

## Getting started

```bash
npm install
npm run dev
```

The local site runs at `http://localhost:3000`. Example routes include `/ai-ad-studio`, `/imagine-computer/ai-chat`, and `/mcp/tools/gpt-geo-tool`.

Useful commands:

```bash
npm run lint          # ESLint
npm run build         # Next.js production build
npm run build:static  # Standard static export for CDN hosting
```

## Routes and source layout

Next.js route definitions live in `app/`. Landing-page implementations live separately in `views/`; each `app/.../page.tsx` connects a URL to its view. The current public routes are:

| URL | View |
| --- | --- |
| `/` | `views/home/` |
| `/affiliate-program` | `views/affiliate-program/` |
| `/agency-program`, `/agency-program/apply`, `/agency-program/privacy` | `views/agency-program/` |
| `/ai-auto-clipper` | `views/ai-auto-clipper/` |
| `/ai-caption` | `views/ai-caption/` |
| `/ai-fashion-studio` | `views/ai-fashion-studio/` |
| `/ai-film-studio` | `views/ai-film-studio/` |
| `/gpt-astra`, `/gpt-astra/skills/[id]` | `views/gpt-astra/` |
| `/plugins` | `views/plugins/` |
| `/imagine-computer` | `views/imagine-computer/` |
| `/mcp`, `/mcp/cli`, `/mcp/gpt-for-*` | `views/imagine-mcp/` |
| `/workflow` | `views/workflow/` |
| `/workflow/os` | `views/workflow-os/` |
| `/ai-avatar-studio`, `/ai-avatar-studio/[slug]` | `views/ai-avatar-studio/` |
| `/ai-ad-studio` | `views/ai-ad-studio/` |
| `/ai-motion-design` | `views/ai-motion-design/` |
| `/ai-video-editor` | `views/ai-video-editor/` |
| `/ai-video-generator` | `views/ai-video-generator/` |
| `/ambassadors` | `views/ambassadors/` |
| `/ambassadors/our-ambassadors` | `views/ambassadors/our-ambassadors/` |
| `/apmdrive` | `views/apmdrive/` |
| `/audio-studio` | `views/audio-studio/` |
| `/audio-studio/ai-music-generator` | `views/audio-studio/ai-music-generator/` |
| `/audio-studio/ai-text-to-speech` | `views/audio-studio/ai-text-to-speech/` |
| `/audio-studio/ai-voice-cloning` | `views/audio-studio/ai-voice-cloning/` |
| `/creators-program` | `views/creators-program/` |
| `/imagine-computer/ai-chat` | `views/ai-chat/` |
| `/imagine-computer/ai-image-generator` | `views/ai-image-generator/` |
| `/imagine-computer/ai-motion-design` | `views/imagine-computer-ai-motion-design/` |
| `/imagine-computer/ai-presentation-maker` | `views/ai-presentation-maker/` |
| `/imagine-computer/ai-slides-generator` | `views/ai-slides-generator/` |
| `/imagine-computer/ai-slides-maker` | `views/ai-slides-maker/` |
| `/imagine-computer/ai-spreadsheet` | `views/ai-spreadsheet/` |
| `/imagine-computer/ai-spreadsheet-generator` | `views/ai-spreadsheet-generator/` |
| `/imagine-computer/ai-website-builder` | `views/ai-website-builder/` |
| `/mcp/tools/gpt-content-creation-tool` | `views/mcp/gpt-content-creation-tool/` |
| `/mcp/tools/gpt-geo-tool` | `views/mcp/gpt-geo-tool/` |
| `/mcp/tools/gpt-paid-media-tool` | `views/mcp/gpt-paid-media-tool/` |
| `/models` | `views/models/` |
| `/tools` | `views/tools/` |
| `/business` | `views/business/` |
| `/business/solutions` | `views/business/solutions/` |
| `/business/workflows` | `views/business/workflows/` |
| `/business/case-studies` | `views/business/case-studies/` |
| `/business/case-studies/[slug]` | `views/business/case-study/{slug}/` |
| `/careers` | `views/careers/` (home view and its sections) |
| `/careers/talent-pool` | `views/careers/talent-pool/` |
| `/careers/blogs`, `/careers/blogs/[slug]` | `views/careers/blogs/` (index view, `post/` view, `posts.ts` loader, `posts/*.md`) |
| `/careers/jobs/[slug]` | `views/careers/jobs/` (job view, `jobs.ts` build-time Ashby loader, `roles.ts`) |
| `/careers/llms.txt`, `/careers/llms-full.txt`, `/careers/<IndexNow key>.txt` | static route handlers in `app/careers/**/route.ts`, built from `views/careers/lib/feeds.ts` |

The source is organized around these responsibilities:

```text
app/                          Next.js route entries and page-specific layouts
views/{page}/index.tsx        Landing-page composition/orchestration
views/{page}/{component}/     Page components and colocated component files
layouts/default-layout/       Shared Navbar and Footer
layouts/business-layout/      Business microsite Navbar, Footer, and shared styles
packages/icons/               Shared SVG icon components
lib/fonts.ts                  Globally configured Google Sans Flex font
lib/assets/                   CDN base URL and centralized asset-path map
landing-pages-assets/         Local staging copy of CDN assets (Git-ignored)
eslint-rules/                 Project-specific ESLint structure rules
```

### Project conventions

- Use the shared Google Sans Flex font configured in `lib/fonts.ts` and applied by the root layout; pages should not load another font.
- `views/{page}/index.tsx` composes that page. Keep components in `views/{page}/{component}/index.tsx`.
- Shared layout components live in `layouts/default-layout/`. Pages use the centralized Navbar and Footer; use the layout's `mode` configuration only where a page needs a dark navbar treatment. The `/business` microsite is the one exception: it owns `layouts/business-layout/`, whose Navbar, Footer, and shared stylesheet carry the business-specific Enterprise nav/footer and design tokens (pass `navbarVariant="onDark"` for the dark nav treatment).
- Keep component rendering in its `.tsx` file and component behavior in a colocated `use-{component}.ts` hook when needed.
- Put component constants and types in colocated `.constants.ts` and `.types.ts` files, not in `.tsx` files.
- Avoid comments unless they explain behavior that is not clear from the code.
- Run `npm run lint` after changes; ESLint enforces the project conventions described below.

### Why the source folder is named `views/`, not `pages/` or `features/`

`views/` describes what these modules provide: the rendered view/composition for each landing page. `features/` usually groups functionality by product domain or capability; these folders are organized by landing page, not by reusable feature domain. `pages/` has a special meaning in Next.js: a root `pages/` directory activates the Pages Router, where files such as `pages/index.tsx` and `pages/ai-chat/index.tsx` define routes. Next.js can host both routers, but a URL cannot be owned by both. Renaming this `views/` tree would expose its `index.tsx` files as additional routes—including collisions with `/`, `/models`, and `/tools`, plus unintended routes for other views. Keep `views/` for page implementation code; `app/` remains the source of truth for URLs.

### ESLint rules

`eslint.config.mjs` combines Next.js Core Web Vitals and TypeScript rules with project-specific checks in `eslint-rules/`:

- `component-entry-file`: components inside `views/` must live at `views/{page}/{component}/index.tsx` (page composition entry files are allowed).
- `one-component-per-file`: a TSX file can define at most one React component.
- `no-declarations-in-tsx`: move top-level constants and type/interface/enum declarations out of TSX files into colocated `.constants.ts` and `.types.ts` files.

Additional configured rules forbid re-exports, require type imports to be separate `import type` declarations, require a final newline, and disallow multiple consecutive blank lines or blank lines at the start/end of a file. Run `npm run lint` to check these rules.

## Shared layout and styling

The root layout in `app/layout.tsx` loads the global font, global stylesheet, and site metadata. Each landing-page composition uses `layouts/default-layout/`, which owns the shared navigation and footer. The `DefaultLayout` accepts a `mode` prop for the Navbar's light/dark foreground treatment; the Footer is shared. Page-specific styles remain with their page where necessary, while shared navigation/footer styling is centralized with those components. The project uses Tailwind CSS 4, with colocated CSS retained for styles that are not practical to express as utility classes or are needed by existing page runtimes.

The ImagineArt main landing page (`views/home/`), ported from `Vyro-ai/imagineart-main-lp`, is served at `/overview` from `app/overview` so its stylesheet does not wrap other routes. The root URL `/` is a plain placeholder page.

## Asset management and CDN

Images, video, logos, and other page media are referenced through the centralized map in `lib/assets/assets.constants.ts`. `lib/assets/index.ts` resolves a mapped relative path to a CDN URL. Components and page data should reference the central map rather than hard-code full CDN URLs or point at the local staging directory.

The default asset base is:

```text
https://cdn-imagine.vyro.ai/imagine-static-pages/landing-pages-assets
```

To use another base in an environment, set `NEXT_PUBLIC_ASSETS_CDN_BASE_URL`. The helper strips trailing slashes, validates/encodes path segments, and joins the base with the mapped path.

### Adding or replacing an asset

1. Put the source file under the matching directory in the local, Git-ignored `landing-pages-assets/` staging folder. Use descriptive, stable filenames.
2. Add its relative CDN path to the appropriate group in `ASSET_PATHS` in `lib/assets/assets.constants.ts`. Shared brand/UI assets belong under `shared/`; page-specific assets belong under that page's group.
3. Reference the asset through the centralized map and resolver, following existing usage in the page.
4. Upload the corresponding file manually to the CDN at `imagine-static-pages/landing-pages-assets/<mapped-path>`. There is currently no asset-upload script in this repo.
5. Verify the resulting CDN URL and the page locally. If replacing an existing file at the same path, update the CDN object at that path; the code map does not need to change.

The `shared` group currently covers the favicon, the ImagineArt icon and text logos (with a dark text logo), plus the shared navigation image. For example, `ASSET_PATHS.shared.logoText` maps to the text logo; `ASSET_PATHS.shared.logoTextDark` maps to its dark counterpart.

Do not commit the staged media directory: `/landing-pages-assets` is ignored in `.gitignore`. The map contains CDN paths, not local file paths, so local page builds load the same CDN assets as deployed pages.

## Static export and per-page CDN layout

`next.config.mjs` enables static export and sets `trailingSlash: true`, so Next emits routes as `{route}/index.html` and a static host can serve clean URLs such as `/ai-ad-studio/`. `npm run build:static` runs the standard `next build --webpack` export directly; no custom output organizer runs afterward. Next emits the shared JavaScript, CSS, and fonts once under `out/_next/static`. In production, the workflow sets `NEXT_STATIC_ASSET_PREFIX` to the `landing-pages` CDN base, so those shared assets load from the correct CDN path. Leave this variable unset for local builds, where assets resolve from the local server root.

The relevant output paths are:

```text
out/index.html
out/affiliate-program/index.html
out/agency-program/index.html
out/agency-program/apply/index.html
out/agency-program/privacy/index.html
out/ai-auto-clipper/index.html
out/ai-caption/index.html
out/ai-fashion-studio/index.html
out/ai-film-studio/index.html
out/gpt-astra/index.html
out/gpt-astra/skills/<id>/index.html
out/plugins/index.html
out/imagine-computer/index.html
out/mcp/index.html
out/mcp/cli/index.html
out/mcp/gpt-for-<slug>/index.html
out/workflow/os/index.html
out/ai-avatar-studio/index.html
out/ai-avatar-studio/<slug>/index.html
out/ai-ad-studio/index.html
out/ai-motion-design/index.html
out/ai-video-editor/index.html
out/ai-video-generator/index.html
out/ambassadors/index.html
out/ambassadors/our-ambassadors/index.html
out/apmdrive/index.html
out/audio-studio/index.html
out/audio-studio/ai-music-generator/index.html
out/audio-studio/ai-text-to-speech/index.html
out/audio-studio/ai-voice-cloning/index.html
out/creators-program/index.html
out/imagine-computer/ai-chat/index.html
out/imagine-computer/ai-image-generator/index.html
out/imagine-computer/ai-motion-design/index.html
out/imagine-computer/ai-presentation-maker/index.html
out/imagine-computer/ai-slides-generator/index.html
out/imagine-computer/ai-slides-maker/index.html
out/imagine-computer/ai-spreadsheet-generator/index.html
out/imagine-computer/ai-website-builder/index.html
out/mcp/tools/gpt-content-creation-tool/index.html
out/mcp/tools/gpt-geo-tool/index.html
out/mcp/tools/gpt-paid-media-tool/index.html
out/models/index.html
out/tools/index.html
out/careers/index.html
out/careers/talent-pool/index.html
out/careers/blogs/index.html
out/careers/blogs/<slug>/index.html
out/careers/jobs/<slug>/index.html
out/careers/llms.txt
out/careers/llms-full.txt
out/careers/b6158198d20765339d296956fe83b837.txt
```

Serve the output with a static server that serves directory `index.html` files. For a local preview, build first and run a static server rooted at `out/`; direct page URLs should resolve without redirecting to `index.html` in the browser address bar.

## Deployment

The production workflow is `.github/workflows/deploy-production.yml`. A push to `main` or manual dispatch runs install, lint, and `npm run build:static`, then uploads the contents of `out/` to the Cloudflare R2 bucket `imagine-web` under:

```text
imagine-static-pages/landing-pages/
```

It uploads up to eight files concurrently (with retries), sets content types and cache-control headers, purges the matching BunnyCDN URL prefix, and checks that every generated `index.html` is being served with a current Next.js asset reference. Because uploads target the `imagine-static-pages/landing-pages/` prefix, other sibling directories under `imagine-static-pages/` are not upload targets. The workflow does not delete objects outside that prefix. The R2 bucket remains named `imagine-web`; `landing-pages` is the object-key prefix inside the bucket.

Production GitHub Actions secrets used by that workflow:

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`
- `BUNNYCDN_ACCESS_KEY`

The separate `.github/workflows/deploy-dev.yml` currently deploys to Vercel on pushes to `develop` (or manual dispatch), rather than publishing the static CDN bundle. It expects Vercel project credentials: `VERCEL_TOKEN`, `VERCEL_ORG_ID`, and `VERCEL_PROJECT_ID`. Before relying on that workflow, check its `env` expressions: the current file's `VERCEL_ORG_ID` and `VERCEL_PROJECT_ID` values appear as `{{ secrets... }}` rather than GitHub's `${{ secrets... }}` expression syntax.

## Environment variables

| Variable | Purpose | Default/behavior |
| --- | --- | --- |
| `NEXT_STATIC_ASSET_PREFIX` | CDN prefix for Next.js JavaScript, CSS, and fonts | Set to `https://cdn-imagine.vyro.ai/imagine-static-pages/landing-pages` in the deploy workflow; leave unset for local builds |
| `NEXT_PUBLIC_ASSETS_CDN_BASE_URL` | Base URL for mapped landing-page assets | ImagineArt landing-pages-assets CDN prefix |
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL for metadata | `https://www.imagine.art` |
| `NEXT_PUBLIC_GTM_ID` | Google Tag Manager ID | Production ID configured in `lib/analytics/analytics.constants.ts` |
| `NEXT_PUBLIC_GA4_ID` | GA4 ID | Production ID configured in `lib/analytics/analytics.constants.ts` |
| `NEXT_PUBLIC_CLARITY_ID` | Microsoft Clarity ID | Production ID configured in `lib/analytics/analytics.constants.ts` |
| `NEXT_PUBLIC_META_PIXEL_ID` | Meta Pixel ID | Production ID configured in `lib/analytics/analytics.constants.ts` |
| `NEXT_PUBLIC_ANALYTICS_DISABLED` | Disable analytics when set to `1` | Enabled unless disabled; tag scripts load after interaction or page exit |
| `NEXT_PUBLIC_PLANS_ENDPOINT` | Optional live plans endpoint for the AI Video Generator | Empty; page uses its static data when unset |
| `NEXT_PUBLIC_PLANS_INTERVAL` | Plans interval passed to the optional plans endpoint | `monthly` |

The static CDN deployment uses GitHub Actions secrets listed under Deployment; these are not application `.env` variables.

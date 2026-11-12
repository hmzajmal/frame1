---
paths:
  - "app/**"
  - "views/**"
  - "layouts/**"
  - "lib/**"
  - "packages/**"
---

# Directory structure

```text
app/{route}/page.tsx          URL entry: builds `metadata` from the view's config and default-exports the view
app/{route}/layout.tsx        Optional: imports the page stylesheet, preconnects, wraps children
views/{page}/index.tsx        Page composition only (default export `{Page}View`)
views/{page}/config.ts        Page config (seo: title, description, canonical)
views/{page}/styles.css       Optional page CSS that Tailwind can't express (imported from app/{route}/layout.tsx)
views/{page}/{Component}/     One directory per component
layouts/default-layout/       The only layout: shared Navbar, Footer and Contact Sales modal for every page
packages/icons/{icon-name}/   Shared SVG icon components
lib/fonts.ts                  The single global font (Google Sans Flex)
lib/assets/                   `resolveAssetUrl` + `ASSET_PATHS` map
landing-pages-assets/         Gitignored local staging of CDN media
docs/lps/{page}/              Gitignored reference copy of the static source pages being ported
```

## Routes vs. views

- `app/` owns URLs; `views/` owns implementation. Never create a root `pages/` directory. It would turn on the Pages Router.
- `app/{route}/page.tsx` follows the existing pattern: `import {Page}View from "@/views/{page}"`, read `seo` from `@/views/{page}/config`, export `metadata: Metadata`, and `export default {Page}View`.
- Nested routes map to nested views (e.g. `/business/solutions` → `views/business/solutions/`).

## Page composition (`views/{page}/index.tsx`)

- Contains only orchestration: imports section components and renders them inside `<DefaultLayout>` → `<main>`. No logic, constants, or markup beyond section wiring.
- Always wrap in `DefaultLayout` from `@/layouts/default-layout`. Pass `mode="dark"` only when the page needs the dark navbar.
- Never port or create a page-owned navbar/footer, and never add variants to the shared ones. `/business` pages use `DefaultLayout` too; add another layout only when the user explicitly asks for one.
- The navbar "Book a demo" and the footer "Contact Us" open the Contact Sales modal through `ContactSalesButton` (`layouts/default-layout/ContactSales/`). Page CTAs keep their own links.

## Component directories

Component directories are PascalCase, matching the component name:

```text
views/{page}/{Component}/
  index.tsx                   Rendering only; named export `export function {Component}()`
  use-{component}.ts          Logic hook (kebab-case file, `use{Component}` export), only if needed
  {Component}.constants.ts    Constants / static data
  {Component}.types.ts        Types, interfaces, enums
  {Component}.css             Optional component CSS
  {SubComponent}/index.tsx    Child components nest as sub-directories
```

- Import sections from the page entry with `import { Hero } from "./Hero";`.
- Keep everything a page needs inside that page's directory. Don't import across `views/{other-page}/`. If a sibling page already has the component you need, copy it into this page's directory.
- Shared cross-page code lives only in `layouts/`, `packages/icons/`, `lib/`, `config/`, `constants/`, `utils/`.

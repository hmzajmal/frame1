---
paths:
  - "**/*.ts"
  - "**/*.tsx"
  - "**/*.css"
---

# Code conventions

## Next.js

This is Next.js 16 (App Router, static export with `trailingSlash: true`). APIs differ from older versions: read the relevant guide in `node_modules/next/dist/docs/` before using a Next API you're unsure of, and heed deprecations. Type route layouts with the global `LayoutProps<"/route">` helper, as existing routes do.

## Components

- `.tsx` files only render. Move state, effects, event handlers and derived logic into a colocated `use-{component}.ts` hook, and call the hook only when the component needs logic.
- No top-level constants, types, interfaces or enums in `.tsx`. They go in `{Component}.constants.ts` / `{Component}.types.ts`.
- One component per file. Sub-components get their own `{SubComponent}/index.tsx`.
- Named function exports for components (`export function Hero()`). The page view is the only default export.
- Add `"use client"` only to components and hooks that need browser APIs or React state.

## Imports

- Use the `@/` alias for cross-directory imports (`@/layouts/default-layout`, `@/lib/assets`), and relative paths within a component/page directory.
- Use a separate `import type { ... }` for types.
- No re-exports or barrel files.

## Styling and fonts

- Use Tailwind CSS 4 utilities. Use colocated CSS (`styles.css` / `{Component}.css`) only for things utilities can't express (keyframes, complex selectors, legacy runtime hooks).
- Use only the shared Google Sans Flex font from `lib/fonts.ts`, applied in the root layout. Never load or declare another font (no `next/font`, `<link>` or `@font-face` in a page).

## Assets

- Never hardcode CDN URLs or local staging paths. Add each file to `ASSET_PATHS` in `lib/assets/assets.constants.ts` (camelCase page group, alphabetical; brand/UI assets go in `shared`) and render it with `resolveAssetUrl(ASSET_PATHS.{group}.{key})` from `@/lib/assets`.
- Stage the media locally under `landing-pages-assets/{page}/` with semantic file names. The user uploads files to the CDN; don't commit the binaries.

## Comments and cleanliness

- Avoid comments. Add one only when the reason or behavior can't be made clear through the code itself.
- Delete dead code, unused routes and unused CSS outright. Don't leave them "for later".

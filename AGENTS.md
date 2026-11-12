<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Imagine LP conventions

- Use the shared Google Sans Flex font configured in `lib/fonts.ts` from the root layout. Do not load or declare another font in a landing page.
- Keep each landing page in `views/{landing-page-name}/`; `index.tsx` is its composition entry point and contains only page orchestration and required page configuration.
- Keep shared layouts in the repository-root `layouts/` directory, colocated with `views/`. `layouts/default-layout` is the only layout: wrap every landing page in it, including `/business` pages, and use its single shared `Navbar` and `Footer`, without variants or page-owned navigation/footer components. Set `mode="dark"` only where the page requires the dark navbar treatment.
- Put each page component in `views/{landing-page-name}/{component-name}/index.tsx`.
- Keep component files focused on rendering. Put component logic in a colocated `use-{component-name}.ts` hook, and call that hook only when the component needs logic.
- Do not define constants, types, interfaces, or enums in `.tsx` files. Put component-specific declarations in colocated `{component-name}.constants.ts` and `{component-name}.types.ts` files.
- Avoid comments. Add one only when the reason or behavior cannot be made clear through the code itself.

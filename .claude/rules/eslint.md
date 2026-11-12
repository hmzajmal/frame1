---
paths:
  - "**/*.ts"
  - "**/*.tsx"
  - "**/*.mjs"
---

# ESLint rules

`eslint.config.mjs` = `eslint-config-next` core-web-vitals + typescript, plus the project rules below. Write code that passes them first time; run `npm run lint` after every change and fix all errors before finishing.

## Project structure rules (`eslint-rules/`)

"Component" = a PascalCase function/class/const whose body contains JSX.

- `imagine-structure/one-component-per-file` (all `.tsx`): at most one component per file. No inline helper components (e.g. `const Row = () => <div/>` next to the main one) — give each its own directory with `index.tsx`.
- `imagine-structure/component-entry-file` (`views/**`): a component may only be defined in `views/{page}/index.tsx` (page entry) or `views/{page}/**/{Component}/index.tsx`. Never in `views/{page}/Foo.tsx`.
- `imagine-structure/no-declarations-in-tsx` (all `.tsx` except under `app/`): no top-level `SCREAMING_CASE` constants, `type`, `interface`, or `enum` in `.tsx`. Put them in the colocated `{Component}.constants.ts` / `{Component}.types.ts`. Lower-camel helpers (e.g. `const linkTarget = ...`) are not flagged, but prefer a hook or constants file for anything non-trivial.

## Configured core/TS rules

- No re-exports: `export { x } from "./y"` and `export * from "./y"` are errors. No barrel files; import from the defining module.
- Type imports must be separate declarations: `import type { Foo } from "./Foo.types";`. Never `import { type Foo }` or mix values and types in one import (`@typescript-eslint/consistent-type-imports`, `fixStyle: separate-type-imports`).
- `eol-last`: every file ends with exactly one newline.
- `no-multiple-empty-lines`: max 1 consecutive blank line, no blank line at the start of a file, none at the end.

## Ignored paths

`.next/`, `out/`, `build/`, `next-env.d.ts`, `docs/**` (the gitignored static-source mirror). If lint suddenly reports thousands of errors from `docs/lps/**`, the `docs/**` ignore was lost. Restore it in `globalIgnores` and in the `tsconfig.json` `exclude` list.

Do not disable rules (`eslint-disable`) to make code pass. Restructure the code instead.

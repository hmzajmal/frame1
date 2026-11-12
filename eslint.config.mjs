import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import noDeclarationsInTsx from "./eslint-rules/no-declarations-in-tsx.mjs";
import oneComponentPerFile from "./eslint-rules/one-component-per-file.mjs";
import componentEntryFile from "./eslint-rules/component-entry-file.mjs";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    plugins: {
      "imagine-structure": {
        rules: {
          "no-declarations-in-tsx": noDeclarationsInTsx,
          "one-component-per-file": oneComponentPerFile,
          "component-entry-file": componentEntryFile,
        },
      },
    },
    rules: {
      "eol-last": ["error", "always"],
      "no-restricted-syntax": [
        "error",
        {
          selector: "ExportNamedDeclaration[source]",
          message: "Re-exports are not allowed. Import the item directly from its defining module.",
        },
        {
          selector: "ExportAllDeclaration[source]",
          message: "Re-exports are not allowed. Import the item directly from its defining module.",
        },
        {
          selector: 'ImportDeclaration:not([importKind="type"]) > ImportSpecifier[importKind="type"]',
          message: "Import types in a separate `import type` declaration.",
        },
      ],
      "@typescript-eslint/consistent-type-imports": [
        "error",
        { prefer: "type-imports", fixStyle: "separate-type-imports" },
      ],
      "no-multiple-empty-lines": [
        "error",
        { max: 1, maxBOF: 0, maxEOF: 0 },
      ],
      "imagine-structure/no-declarations-in-tsx": "error",
      "imagine-structure/one-component-per-file": "error",
      "imagine-structure/component-entry-file": "error",
    },
  },
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "docs/**",
  ]),
]);

export default eslintConfig;

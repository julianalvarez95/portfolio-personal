import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Playwright specs, not React — fixtures.ts's `use` fixture parameter
    // otherwise trips react-hooks/rules-of-hooks, which pattern-matches on
    // the name "use" alone.
    "e2e/**",
    "playwright.config.ts",
  ]),
]);

export default eslintConfig;

import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    // Only src/components/motion/runtime.ts and MotionProvider.tsx may
    // import from motion's packages directly — everywhere else goes
    // through that shim, so there is exactly one place to swap the
    // runtime or add the next element re-export.
    files: ["src/**/*.{ts,tsx}"],
    ignores: ["src/components/motion/**"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          paths: [
            {
              name: "motion",
              message: "Import from @/components/motion/runtime instead.",
            },
            {
              name: "motion/react",
              message: "Import from @/components/motion/runtime instead.",
            },
            {
              name: "motion/react-client",
              message: "Import from @/components/motion/runtime instead.",
            },
            {
              name: "framer-motion",
              message: "Import from @/components/motion/runtime instead.",
            },
          ],
        },
      ],
    },
  },
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

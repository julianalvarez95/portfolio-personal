import { defineConfig, devices } from "@playwright/test";

const PORT = 3100;
const baseURL = `http://127.0.0.1:${PORT}`;

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: [["html", { open: "never" }]],
  use: {
    baseURL,
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "desktop-chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      // Catches what overflow-x:hidden currently hides — WebKit's box model
      // surfaces horizontal overflow that Chromium sometimes doesn't.
      name: "desktop-webkit",
      testMatch: /layout\.spec\.ts/,
      use: { ...devices["Desktop Safari"] },
    },
    {
      name: "mobile-chromium",
      use: { ...devices["Pixel 7"] },
    },
    {
      // Same suite, with prefers-reduced-motion: reduce emulated — guards
      // the reduced-motion branches already in the codebase (carousel
      // auto-advance, magnetic hover) and, from Fase E on, the
      // getAnimations()-is-empty assertion in reduced-motion.spec.ts.
      name: "reduced-motion",
      use: {
        ...devices["Desktop Chrome"],
        contextOptions: { reducedMotion: "reduce" },
      },
    },
    {
      // Plain PNG artifacts (`npm run shots`), not assertions — no
      // baselines exist yet (see Fase B notes). Isolated from the four
      // projects above so a normal `npm run test:e2e` never captures them.
      name: "shots-desktop",
      testMatch: /shots\.spec\.ts/,
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "shots-mobile",
      testMatch: /shots\.spec\.ts/,
      use: { ...devices["Pixel 7"] },
    },
  ],
  webServer: {
    // Production build, not `next dev`: CSS Module import order can differ
    // between the two in Next 16, and the dev overlay would leak into
    // screenshots. Runs on :3100 so it never collides with a `next dev` on
    // the default :3000.
    command: `npm run build && npx next start -p ${PORT}`,
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
    env: {
      // Empty on purpose: getDigests() only hits the network when this is
      // set, so the suite always exercises the deterministic MOCK_DIGESTS
      // fallback. See e2e/fixtures.ts and e2e/digest.spec.ts.
      DIGEST_READ_SECRET: "",
    },
  },
});

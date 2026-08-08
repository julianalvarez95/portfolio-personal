import { test as base, expect } from "@playwright/test";

// A fixed instant, not "now" — LiveClock (15s tick) and the digest
// carousel's auto-advance (7s) would otherwise make every run
// non-deterministic. Installing a fully stopped fake clock means neither
// fires on its own; tests that need to observe them advance the clock
// explicitly with page.clock.fastForward()/runFor().
const FROZEN_TIME = new Date("2026-08-08T09:15:00-03:00");

export const test = base.extend({
  page: async ({ page }, use) => {
    // Same-origin beacon the Vercel Analytics script posts to in
    // production; there's no collector listening in the test run.
    await page.route("**/_vercel/insights/**", (route) => route.abort());
    await page.clock.install({ time: FROZEN_TIME });
    await use(page);
  },
});

export { expect };
export type { Page } from "@playwright/test";

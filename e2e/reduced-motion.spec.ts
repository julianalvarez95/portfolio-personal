import { test, expect } from "./fixtures";

// Only meaningful under the reduced-motion project (contextOptions.reducedMotion
// = "reduce" in playwright.config.ts). Runs before Fase F introduces any
// motion.dev animation, so today it's a smoke check on the hand-authored
// CSS animations' own guards (Lab's dotPulse, LabDiagram's travel); once
// motion.dev primitives land, it's the check that MotionProvider's
// reducedMotion="user" actually disarms them too — a CSS duration override
// can't reach motion.dev's gestures/springs/exit animations, so this is the
// only gate that would catch one shipping unguarded.

test("no animations run under prefers-reduced-motion: reduce", async ({ page }, testInfo) => {
  testInfo.skip(
    testInfo.project.name !== "reduced-motion",
    "only meaningful under the reduced-motion project"
  );
  await page.goto("/");
  const animationCount = await page.evaluate(() => document.getAnimations().length);
  expect(animationCount).toBe(0);
});

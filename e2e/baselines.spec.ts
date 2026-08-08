import { test, expect } from "./fixtures";

// Fase G's promoted visual regression baselines — 4 trusted snapshots, not
// forty rubber-stamped ones. Platform-specific (rendered on Darwin/Chromium
// locally): regenerate in the Playwright Docker image before relying on
// these in Linux CI, per the plan's own note — a baseline captured on one
// renderer will false-positive-fail on another's subpixel/font differences.

test.describe("baselines — hero", () => {
  test("hero", async ({ page }) => {
    await page.goto("/");

    // ScrollIndicator's `.line::after` runs a real CSS @keyframes animation
    // (drop, 1.8s infinite) driven by wall-clock time, not the JS clock
    // fixtures.ts freezes — it's always mid-cycle at an unpredictable phase,
    // so it's masked rather than raced against.
    const scrollIndicator = page.getByText("Scroll", { exact: true }).locator("..");

    await expect(page).toHaveScreenshot("hero.png", {
      mask: [scrollIndicator],
    });
  });
});

test.describe("baselines — archive (dense section)", () => {
  test("archive — dense section", async ({ page }, testInfo) => {
    // Desktop-only: this is the "una sección densa" baseline, not a
    // mobile/reduced-motion variant of it — those two slots are already
    // covered by the hero baseline above running across projects.
    test.skip(
      testInfo.project.name !== "desktop-chromium",
      "desktop-only dense-section baseline — see baselines — hero for the mobile/reduced-motion slots",
    );

    // AssemblyRail (Fase F.3's overdrive rail) only renders at
    // min-width:1400px — force a viewport wide enough to include it in the
    // "dense section" baseline, since that's the section's own overdrive
    // signature, not a decoration to crop out.
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");

    const archive = page.locator("#archive");
    await archive.scrollIntoViewIfNeeded();
    // Same settle wait as shots.spec.ts: Reveal's --dur-focal (640ms) CSS
    // transition is real wall-clock time, unaffected by the frozen JS
    // clock — without this, rows land mid-transition instead of settled.
    await page.waitForTimeout(750);

    await expect(archive).toHaveScreenshot("archive-dense.png");
  });
});

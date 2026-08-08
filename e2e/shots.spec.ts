import { test } from "./fixtures";

// Plain screenshot capture, not a regression test — see playwright.config.ts
// (shots-desktop / shots-mobile). No toHaveScreenshot baselines exist yet:
// during Fases B–F the page changes on every commit, and committed
// baselines here would just get rubber-stamp-updated on every run instead
// of catching anything. Fase G promotes a handful of real baselines once
// the direction has landed.

const SECTIONS = [
  "index",
  "now",
  "work",
  "archive",
  "capabilities",
  "lab",
  "contact",
] as const;

test("captures one PNG per section, plus a full-page shot", async ({
  page,
}, testInfo) => {
  await page.goto("/");
  const outDir = testInfo.outputPath();

  await page.screenshot({ path: `${outDir}/full-page.png`, fullPage: true });

  for (const id of SECTIONS) {
    const section = page.locator(`#${id}`);
    await section.scrollIntoViewIfNeeded();
    // Fase F.2: SectionHeading, CaseStudy, and ArchiveRow all wrap in
    // `Reveal`, fading/translating in over `--dur-focal` (640ms) once their
    // IntersectionObserver fires. That's real wall-clock CSS transition
    // time — untouched by fixtures.ts's fake JS clock — so scrolling alone
    // isn't enough; without this wait, shots land mid-transition (near
    // invisible) instead of settled.
    await page.waitForTimeout(750);
    await section.screenshot({ path: `${outDir}/section-${id}.png` });
  }
});

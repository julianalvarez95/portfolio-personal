import { test, expect } from "./fixtures";

// Runs only on the desktop-webkit project (see playwright.config.ts).
// `overflow-x: hidden` on html/body is currently masking whatever
// horizontal overflow exists — scrollWidth still reports the true,
// un-clipped content size, so this spec is the inventory of what that
// property is hiding. It is expected to fail on the current site; Fase D
// removes the clip and this spec is the gate that must go green after.

test.describe("layout — horizontal overflow", () => {
  test("document does not overflow the viewport horizontally", async ({ page }) => {
    await page.goto("/");
    const { viewportWidth, scrollWidth } = await page.evaluate(() => ({
      viewportWidth: window.innerWidth,
      scrollWidth: document.documentElement.scrollWidth,
    }));
    expect(
      scrollWidth,
      `document.documentElement.scrollWidth (${scrollWidth}) exceeds the viewport (${viewportWidth})`
    ).toBeLessThanOrEqual(viewportWidth);
  });

  test("names the elements causing horizontal overflow, if any", async ({ page }) => {
    await page.goto("/");
    const offenders = await page.evaluate(() => {
      const viewportWidth = window.innerWidth;

      // Elements inside their own clipping ancestor (e.g. the digest
      // carousel's `.viewport { overflow: hidden }` track) sit far outside
      // the viewport by design and never inflate document.scrollWidth —
      // that's not what overflow-x:hidden on html/body is masking, so they
      // don't belong in this inventory.
      function clippedByOwnAncestor(el: Element): boolean {
        let node = el.parentElement;
        while (node && node !== document.documentElement) {
          const overflowX = getComputedStyle(node).overflowX;
          if (overflowX === "hidden" || overflowX === "auto" || overflowX === "scroll" || overflowX === "clip") {
            return true;
          }
          node = node.parentElement;
        }
        return false;
      }

      return Array.from(document.querySelectorAll("body *"))
        .filter(
          (el) =>
            el.getBoundingClientRect().right > viewportWidth + 1 &&
            !clippedByOwnAncestor(el)
        )
        .map((el) => {
          const rect = el.getBoundingClientRect();
          const classes =
            typeof el.className === "string" && el.className.trim()
              ? "." + el.className.trim().split(/\s+/).join(".")
              : "";
          const id = el.id ? `#${el.id}` : "";
          return `${el.tagName.toLowerCase()}${id}${classes} — right edge at ${Math.round(rect.right)}px`;
        });
    });
    expect(offenders, offenders.join("\n")).toEqual([]);
  });
});

import { test, expect } from "./fixtures";

const ENTRY_COUNT = 10;
// Has a `detail` array in src/data/experience.ts, so its row expands.
const EXPANDABLE_COMPANY = "Magoya";
const EXPANDABLE_ID = "magoya";
const EXPANDABLE_DETAIL_LINE =
  "Bayer US / Climate FieldView: built internal applications on the world's largest field data platform, focused on wheat and corn.";
// A case-study-tier entry with no `detail` — its row never expands.
const NON_EXPANDABLE_COMPANY = "Willdom";

test.describe("archive", () => {
  test("renders every experience entry exactly once", async ({ page }) => {
    await page.goto("/");
    // Every ArchiveRow renders exactly one <button> (its trigger), expandable
    // or not — the only buttons under #archive. Counting them, rather than a
    // CSS class, keeps this assertion structural instead of appearance-based.
    const rowTriggers = page.locator("#archive").getByRole("button");
    await expect(rowTriggers).toHaveCount(ENTRY_COUNT);
  });

  test("a row with detail expands on click and its panel matches the data", async ({
    page,
  }) => {
    await page.goto("/");
    const trigger = page
      .locator("#archive")
      .getByRole("button", { name: new RegExp(EXPANDABLE_COMPANY) });
    // Content check, not a visibility check: the panel stays in the DOM
    // collapsed or open (a CSS grid-template-rows: 0fr/1fr transition), so
    // Playwright's toBeVisible() can't tell the two states apart — only
    // aria-expanded, the accessible source of truth, can.
    const panel = page.locator(`#archive-detail-${EXPANDABLE_ID}`);

    await expect(trigger).toHaveAttribute("aria-expanded", "false");
    await expect(panel).toContainText(EXPANDABLE_DETAIL_LINE);

    await trigger.click();
    await expect(trigger).toHaveAttribute("aria-expanded", "true");

    await trigger.click();
    await expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  test("a row without detail has no expand affordance", async ({ page }) => {
    await page.goto("/");
    const trigger = page
      .locator("#archive")
      .getByRole("button", { name: new RegExp(NON_EXPANDABLE_COMPANY) });

    await expect(trigger).not.toHaveAttribute("aria-expanded");
  });
});

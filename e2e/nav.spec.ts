import { test, expect, type Page } from "./fixtures";

const NAV_ITEMS = [
  { id: "index", label: "Index" },
  { id: "now", label: "Now" },
  { id: "work", label: "Work" },
  { id: "archive", label: "Archive" },
  { id: "capabilities", label: "Capabilities" },
  { id: "lab", label: "Lab" },
  { id: "contact", label: "Contact" },
] as const;

// Below 640px (Nav.module.css) the label text collapses to display:none —
// an icon/index-only nav — so its accessible name is viewport-dependent.
// Targeting by href keeps this spec valid across every project.
function linkFor(page: Page, id: string) {
  // Scoped to the <ul>: the brand mark ("JA", top of Nav.tsx) also links to
  // #index, and matching against the whole <nav> would catch both.
  return page
    .getByRole("navigation", { name: "Section navigation" })
    .getByRole("list")
    .locator(`a[href="#${id}"]`);
}

test.describe("nav", () => {
  test("lists every section once, in order, as an in-page anchor", async ({ page }) => {
    await page.goto("/");
    const nav = page.getByRole("navigation", { name: "Section navigation" });
    const items = nav.getByRole("list").getByRole("listitem");
    await expect(items).toHaveCount(NAV_ITEMS.length);

    for (const [i, item] of NAV_ITEMS.entries()) {
      const link = items.nth(i).getByRole("link");
      await expect(link).toHaveAttribute("href", `#${item.id}`);
      const text = await link.textContent();
      expect(text ?? "").toContain(item.label);
    }
  });

  test("Index is active on load", async ({ page }) => {
    await page.goto("/");
    await expect(linkFor(page, "index")).toHaveAttribute("aria-current", "true");
  });

  test("scroll-spy marks the section in view as active", async ({ page }) => {
    await page.goto("/");
    await page.locator("#archive").scrollIntoViewIfNeeded();
    await expect(linkFor(page, "archive")).toHaveAttribute("aria-current", "true");
    await expect(linkFor(page, "index")).not.toHaveAttribute("aria-current", "true");
  });

  test("clicking a nav link jumps to its section", async ({ page }) => {
    await page.goto("/");
    await linkFor(page, "contact").click();
    await expect(page).toHaveURL(/#contact$/);
    await expect(page.locator("#contact")).toBeInViewport();
  });
});

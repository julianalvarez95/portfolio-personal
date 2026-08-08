import { test, expect } from "./fixtures";

test.describe("keyboard", () => {
  test("archive row toggles via Enter and Space", async ({ page }) => {
    await page.goto("/");
    const trigger = page.locator("#archive").getByRole("button", { name: /Magoya/ });
    await trigger.focus();
    await expect(trigger).toBeFocused();

    await page.keyboard.press("Enter");
    await expect(trigger).toHaveAttribute("aria-expanded", "true");

    await page.keyboard.press("Enter");
    await expect(trigger).toHaveAttribute("aria-expanded", "false");

    await page.keyboard.press("Space");
    await expect(trigger).toHaveAttribute("aria-expanded", "true");
  });

  test("digest carousel controls are reachable and operable by keyboard", async ({
    page,
  }) => {
    await page.goto("/");
    const carousel = page.getByRole("region", { name: /Morning digest/ });
    await carousel.scrollIntoViewIfNeeded();

    const next = carousel.getByRole("button", { name: "Next digest item" });
    await next.focus();
    await page.keyboard.press("Enter");
    await expect(carousel.getByText("02 / 08")).toBeVisible();
  });

  test("only the active slide's source link is in the tab order", async ({ page }) => {
    await page.goto("/");
    const carousel = page.getByRole("region", { name: /Morning digest/ });
    await carousel.scrollIntoViewIfNeeded();

    // Plain DOM locator, not getByRole: inactive slides are aria-hidden and
    // so are absent from the accessibility tree entirely — tabindex is what
    // actually governs reachability and is what this test needs to see.
    const sourceLinks = carousel.locator("a", { hasText: "Read source" });
    await expect(sourceLinks).toHaveCount(8);
    await expect(sourceLinks.nth(0)).toHaveAttribute("tabindex", "0");
    for (let i = 1; i < 8; i++) {
      await expect(sourceLinks.nth(i)).toHaveAttribute("tabindex", "-1");
    }
  });

  test("a focused nav link activates its section on Enter", async ({ page }) => {
    await page.goto("/");
    // Targeted by href, not accessible name: below 640px the nav's label
    // text collapses to display:none (Nav.module.css), so a name-based
    // query would only work on wide viewports. See e2e/nav.spec.ts.
    const link = page
      .getByRole("navigation", { name: "Section navigation" })
      .locator('a[href="#work"]');
    await link.focus();
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(/#work$/);
  });
});

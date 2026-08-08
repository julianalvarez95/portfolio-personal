import { test, expect } from "./fixtures";

const SECTION_IDS = [
  "index",
  "now",
  "work",
  "archive",
  "capabilities",
  "lab",
  "contact",
];

test.describe("smoke", () => {
  test("loads with a 200 and no page errors", async ({ page }) => {
    const errors: Error[] = [];
    page.on("pageerror", (error) => errors.push(error));

    const response = await page.goto("/");
    expect(response?.status()).toBe(200);
    await expect(page.locator("body")).toBeVisible();

    expect(errors, errors.map((e) => e.message).join("\n")).toEqual([]);
  });

  test("title identifies Julian Alvarez and his role", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Julian Alvarez/);
    await expect(page).toHaveTitle(/AI Product Manager/);
  });

  test("every section from the nav is present exactly once", async ({ page }) => {
    await page.goto("/");
    for (const id of SECTION_IDS) {
      await expect(page.locator(`#${id}`)).toHaveCount(1);
    }
  });

  test("hero states name, role, and tagline", async ({ page }) => {
    await page.goto("/");
    const hero = page.locator("#index");
    await expect(hero).toContainText("Julian Alvarez");
    await expect(hero).toContainText("AI Product Manager");
    await expect(hero).toContainText("I turn engineering friction into shipped product.");
  });

  test("CV and contact are both first-class, visible, unhidden actions", async ({
    page,
  }) => {
    await page.goto("/");
    // Fase F.2: EXPLODED VIEW repeats both actions as a permanent legend in
    // Hero, on top of Contact's own copy — "peers, never hidden" means never
    // buried below the fold either. .first() keeps the intent (visible,
    // correct href) without assuming there's exactly one anymore.
    const cv = page.getByRole("link", { name: "Download CV" }).first();
    await expect(cv).toBeVisible();
    await expect(cv).toHaveAttribute("href", "/julian-alvarez-profile.pdf");

    const email = page.locator('a[href^="mailto:"]').first();
    await expect(email).toBeVisible();
    await expect(email).toHaveAttribute(
      "href",
      "mailto:julianignacioalvarez95@gmail.com"
    );
  });
});

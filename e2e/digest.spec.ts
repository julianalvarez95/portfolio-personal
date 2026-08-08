import { test, expect } from "./fixtures";

// digest-agent's DIGEST_READ_SECRET is unset for this suite (see
// playwright.config.ts), so getDigests() always returns MOCK_DIGESTS and
// never touches the network. Asserting a known mock headline first is the
// canary for the opposite mistake: a leaked .env.local secret would make
// this fetch the real feed and every other assertion below flaky instead
// of failing loudly here.
const KNOWN_MOCK_HEADLINE =
  "k3s 1.31 ships in-place node upgrades for single-node clusters";
const SLIDE_COUNT = "08"; // MOCK_DIGESTS: 3 + 2 + 3 items, flattened, zero-padded like the UI.
const AUTO_ADVANCE_MS = 7000;

const carousel = (page: import("@playwright/test").Page) =>
  page.getByRole("region", { name: /Morning digest/ });

test.describe("digest carousel", () => {
  test("shows real MOCK_DIGESTS content, not a stub", async ({ page }) => {
    await page.goto("/");
    await carousel(page).scrollIntoViewIfNeeded();
    await expect(page.getByText(KNOWN_MOCK_HEADLINE)).toBeVisible();
  });

  test("flattens every digest item into its own slide", async ({ page }) => {
    await page.goto("/");
    await carousel(page).scrollIntoViewIfNeeded();
    await expect(carousel(page).getByText(`01 / ${SLIDE_COUNT}`)).toBeVisible();
  });

  test("next/previous controls step through slides and wrap around", async ({
    page,
  }) => {
    await page.goto("/");
    await carousel(page).scrollIntoViewIfNeeded();

    await carousel(page).getByRole("button", { name: "Next digest item" }).click();
    await expect(carousel(page).getByText(`02 / ${SLIDE_COUNT}`)).toBeVisible();

    await carousel(page).getByRole("button", { name: "Previous digest item" }).click();
    await expect(carousel(page).getByText(`01 / ${SLIDE_COUNT}`)).toBeVisible();

    // Wraps backward from the first slide to the last.
    await carousel(page).getByRole("button", { name: "Previous digest item" }).click();
    await expect(carousel(page).getByText(`${SLIDE_COUNT} / ${SLIDE_COUNT}`)).toBeVisible();
  });

  test("auto-advances on a fixed interval while in view", async ({ page }) => {
    await page.goto("/");
    await carousel(page).scrollIntoViewIfNeeded();
    await expect(carousel(page)).toBeInViewport();

    await page.clock.fastForward(AUTO_ADVANCE_MS);
    await expect(carousel(page).getByText(`02 / ${SLIDE_COUNT}`)).toBeVisible();
  });

  test("pauses auto-advance on hover", async ({ page }) => {
    await page.goto("/");
    await carousel(page).scrollIntoViewIfNeeded();
    await expect(carousel(page)).toBeInViewport();

    await carousel(page).hover();
    await page.clock.fastForward(AUTO_ADVANCE_MS * 2);
    await expect(carousel(page).getByText(`01 / ${SLIDE_COUNT}`)).toBeVisible();
  });
});

import { test, expect } from "./fixtures";
import { easing, duration, stagger } from "../src/lib/motion-tokens";

// tokens.css and motion-tokens.ts are two hand-kept copies of the same
// vocabulary (see the comment at the top of each) — this spec is the gate
// that catches the day someone edits one and forgets the other.

const EASE_VARS: Record<keyof typeof easing, string> = {
  outStrong: "--ease-out-strong",
  inOutStrong: "--ease-in-out-strong",
  drawer: "--ease-drawer",
  arrival: "--ease-arrival",
};

const DURATION_VARS: Record<keyof typeof duration, string> = {
  feedback: "--dur-feedback",
  popover: "--dur-popover",
  dropdown: "--dur-dropdown",
  overlay: "--dur-overlay",
  focal: "--dur-focal",
};

const STAGGER_VARS: Record<keyof typeof stagger, string> = {
  tight: "--stagger-tight",
  normal: "--stagger-normal",
  loose: "--stagger-loose",
};

function parseCubicBezier(value: string): number[] {
  const match = value.match(/cubic-bezier\(([^)]+)\)/);
  if (!match) throw new Error(`not a cubic-bezier(): "${value}"`);
  return match[1].split(",").map((n) => Number.parseFloat(n.trim()));
}

// Chromium serializes a custom property's <time> token using whichever of
// ms/s is shorter (120ms -> ".12s", but 40ms stays "40ms") — accept both.
function parseMs(value: string): number {
  const match = value.trim().match(/^(-?(?:\d+\.?\d*|\.\d+))(ms|s)$/);
  if (!match) throw new Error(`not a time value: "${value}"`);
  const amount = Number.parseFloat(match[1]);
  return match[2] === "s" ? amount * 1000 : amount;
}

async function readVar(page: import("@playwright/test").Page, name: string): Promise<string> {
  return page.evaluate(
    (n) => getComputedStyle(document.documentElement).getPropertyValue(n),
    name
  );
}

test.describe("motion tokens — CSS and motion-tokens.ts must agree", () => {
  test("eases match, control point for control point", async ({ page }) => {
    await page.goto("/");
    for (const [key, varName] of Object.entries(EASE_VARS) as [
      keyof typeof easing,
      string,
    ][]) {
      const cssPoints = parseCubicBezier(await readVar(page, varName));
      expect(cssPoints, `${varName} vs easing.${key}`).toEqual(easing[key]);
    }
  });

  test("durations match — CSS ms against motion.dev seconds", async ({ page }, testInfo) => {
    // Deliberately collapsed under reduced motion (see tokens.css) — that's
    // the point, not a divergence this spec should catch.
    testInfo.skip(
      testInfo.project.name === "reduced-motion",
      "durations intentionally collapse under prefers-reduced-motion: reduce"
    );
    await page.goto("/");
    for (const [key, varName] of Object.entries(DURATION_VARS) as [
      keyof typeof duration,
      string,
    ][]) {
      const cssSeconds = parseMs(await readVar(page, varName)) / 1000;
      expect(cssSeconds, `${varName} vs duration.${key}`).toBeCloseTo(duration[key], 5);
    }
  });

  test("stagger intervals match — CSS ms against motion.dev seconds", async ({
    page,
  }, testInfo) => {
    testInfo.skip(
      testInfo.project.name === "reduced-motion",
      "stagger intervals intentionally collapse under prefers-reduced-motion: reduce"
    );
    await page.goto("/");
    for (const [key, varName] of Object.entries(STAGGER_VARS) as [
      keyof typeof stagger,
      string,
    ][]) {
      const cssSeconds = parseMs(await readVar(page, varName)) / 1000;
      expect(cssSeconds, `${varName} vs stagger.${key}`).toBeCloseTo(stagger[key], 5);
    }
  });
});

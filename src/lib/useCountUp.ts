"use client";

import { useEffect, useRef, type RefObject } from "react";

const NUMBER_PATTERN = /\d[\d,]*\.?\d*/g;

type Segment =
  | { type: "text"; value: string }
  | { type: "number"; target: number; hasComma: boolean; decimals: number };

function parseSegments(value: string): Segment[] {
  const segments: Segment[] = [];
  let lastIndex = 0;

  for (const match of value.matchAll(NUMBER_PATTERN)) {
    const index = match.index ?? 0;
    if (index > lastIndex) {
      segments.push({ type: "text", value: value.slice(lastIndex, index) });
    }
    const raw = match[0];
    const numeric = parseFloat(raw.replace(/,/g, ""));
    segments.push({
      type: "number",
      target: numeric,
      hasComma: raw.includes(","),
      decimals: raw.includes(".") ? raw.split(".")[1].length : 0,
    });
    lastIndex = index + raw.length;
  }

  if (lastIndex < value.length) {
    segments.push({ type: "text", value: value.slice(lastIndex) });
  }

  return segments;
}

function formatNumber(n: number, hasComma: boolean, decimals: number): string {
  const fixed = decimals > 0 ? n.toFixed(decimals) : Math.round(n).toString();
  if (!hasComma) return fixed;
  const [intPart, decPart] = fixed.split(".");
  const withCommas = Number(intPart).toLocaleString("en-US");
  return decPart ? `${withCommas}.${decPart}` : withCommas;
}

function render(segments: Segment[], progress: number): string {
  return segments
    .map((s) =>
      s.type === "text" ? s.value : formatNumber(s.target * progress, s.hasComma, s.decimals)
    )
    .join("");
}

/** The zero-progress render of a stat string — the SSR/first-paint text. */
export function renderCountUpInitial(value: string): string {
  return render(parseSegments(value), 0);
}

/**
 * Animates the numeric portions of a stat string (e.g. "94%", "566K+",
 * "38%→80%+") from 0 to their target while leaving surrounding text intact.
 * Runs once, when `active` first becomes true.
 *
 * Writes straight to `ref.current.textContent` instead of `setState`: the
 * previous version re-rendered its StatBlock on every animation frame, and
 * this page mounts 10+ of them simultaneously. Harmless while the page is
 * static, but a re-render storm competing with motion.dev for the main
 * thread is how a StatBlock janks and motion gets blamed for it.
 */
export function useCountUp<T extends HTMLElement>(
  ref: RefObject<T | null>,
  value: string,
  active: boolean,
  duration = 900
): void {
  const segments = useRef(parseSegments(value));
  const startedRef = useRef(false);

  useEffect(() => {
    segments.current = parseSegments(value);
    if (!startedRef.current && ref.current) {
      ref.current.textContent = render(segments.current, 0);
    }
  }, [value, ref]);

  useEffect(() => {
    if (!active || startedRef.current || !ref.current) return;
    startedRef.current = true;

    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion || segments.current.every((s) => s.type === "text")) {
      ref.current.textContent = render(segments.current, 1);
      return;
    }

    const start = performance.now();
    let frame: number;

    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      if (ref.current) ref.current.textContent = render(segments.current, eased);
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, duration, ref]);
}

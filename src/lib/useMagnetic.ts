"use client";

import { useEffect, useRef } from "react";

const DEFAULT_RADIUS = 70;
const DEFAULT_STRENGTH = 0.35;
const DEFAULT_MAX_PULL = 9;

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

type MagneticOptions = {
  radius?: number;
  strength?: number;
  maxPull?: number;
};

/**
 * Nudges the returned ref's element toward the cursor when it passes
 * nearby. No-ops on touch devices and when prefers-reduced-motion is set.
 *
 * maxPull defaults are kept small on purpose: these wrap short index
 * labels sitting right next to sibling text (nav label, "/" heading
 * separator) with only 8-12px of gap, so a large pull visually overlaps
 * the neighbor. Tighten radius/maxPull further for any tightly packed
 * context (see Nav's usage).
 */
export function useMagnetic<T extends HTMLElement>(options: MagneticOptions = {}) {
  const {
    radius = DEFAULT_RADIUS,
    strength = DEFAULT_STRENGTH,
    maxPull = DEFAULT_MAX_PULL,
  } = options;
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const canHover =
      window.matchMedia("(pointer: fine)").matches &&
      window.matchMedia("(prefers-reduced-motion: no-preference)").matches;
    if (!canHover) return;

    function handleMove(e: MouseEvent) {
      const rect = el!.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);

      if (dist < radius) {
        const t = 1 - dist / radius;
        const px = clamp(dx * strength * t, -maxPull, maxPull);
        const py = clamp(dy * strength * t, -maxPull, maxPull);
        el!.style.transform = `translate(${px.toFixed(1)}px, ${py.toFixed(1)}px)`;
        el!.style.color = t > 0.3 ? "var(--color-accent)" : "";
      } else {
        el!.style.transform = "";
        el!.style.color = "";
      }
    }

    window.addEventListener("mousemove", handleMove);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      el.style.transform = "";
      el.style.color = "";
    };
  }, [radius, strength, maxPull]);

  return ref;
}

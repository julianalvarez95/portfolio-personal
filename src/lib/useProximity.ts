"use client";

import { useEffect, useRef } from "react";
import { subscribe } from "./pointerField";

/**
 * Replaces the two byte-identical inline proximity handlers that used to
 * live in ArchiveRow and StatBlock (radius 34 vs 30, otherwise the same
 * "is the pointer hovering this element's top edge" check). Publishes
 * continuous progress as `--proximity` (0 at `radius`, 1 at the edge) and
 * a boolean `data-near` attribute — styles nothing itself, so `--proximity`
 * only does anything once a consumer's CSS reads it (e.g. via `color-mix`),
 * which the toggle-class version could never drive.
 *
 * No-ops on touch devices and under prefers-reduced-motion, matching the
 * behavior it replaces.
 */
export function useProximity<T extends HTMLElement>(radius: number) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const canHover =
      window.matchMedia("(pointer: fine)").matches &&
      window.matchMedia("(prefers-reduced-motion: no-preference)").matches;
    if (!canHover) return;

    return subscribe(({ x, y }) => {
      const rect = el.getBoundingClientRect();
      const withinX = x >= rect.left && x <= rect.right;
      const distance = Math.abs(y - rect.top);
      const proximity = withinX ? Math.max(0, 1 - distance / radius) : 0;

      el.style.setProperty("--proximity", proximity.toFixed(3));
      if (proximity > 0) {
        el.setAttribute("data-near", "");
      } else {
        el.removeAttribute("data-near");
      }
    });
  }, [radius]);

  return ref;
}

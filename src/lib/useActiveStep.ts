"use client";

import { useEffect, useRef } from "react";
import { register } from "./activeStepField";

/**
 * Flags an element `data-current` while it's the frontmost item in its
 * group sitting inside Nav's own active-section band — "the step being
 * built now," Work and Archive's expression of the direction's interaction
 * signature. Imperative attribute write on scroll, no re-render, matching
 * useProximity's shape.
 */
export function useActiveStep<T extends HTMLElement>(group: string, id: string) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    return register(group, id, el, (activeId) => {
      if (activeId === id) el.setAttribute("data-current", "");
      else el.removeAttribute("data-current");
    });
  }, [group, id]);

  return ref;
}

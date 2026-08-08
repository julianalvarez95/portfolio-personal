"use client";

import { useEffect, useRef } from "react";
import { register, subscribe } from "./activeStepField";

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

/**
 * Same `data-current` write as useActiveStep, but mirrors the group instead
 * of contributing an observed element to it — for a decorative echo of a
 * real step (AssemblyRail's dots) that shouldn't itself be intersection-
 * tracked. See activeStepField.ts's `subscribe` for why.
 */
export function useActiveStepListener<T extends HTMLElement>(group: string, id: string) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    return subscribe(group, (activeId) => {
      if (activeId === id) el.setAttribute("data-current", "");
      else el.removeAttribute("data-current");
    });
  }, [group, id]);

  return ref;
}

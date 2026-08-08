"use client";

import type { ReactNode } from "react";
import { MotionConfig } from "motion/react";

/**
 * `reducedMotion="user"` is the JS half of the reduced-motion policy — it
 * gates motion.dev's own animations (gestures, springs, exit) at the
 * library level. The CSS override (`--dur-*: 1ms` in tokens.css) can't
 * reach those; they don't run through a duration token at all.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

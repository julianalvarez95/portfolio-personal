/**
 * Mirrors src/styles/tokens.css's motion vocabulary as plain data.
 *
 * CSS custom properties aren't readable from motion.dev's config objects,
 * and reading them via getComputedStyle at config time is fragile and
 * forces a layout read — so this is a second, hand-kept copy, not a
 * derivation. e2e/tokens.spec.ts fails the build if the two ever diverge.
 * Durations here are in seconds (motion.dev's unit); tokens.css's are in
 * ms (CSS's unit).
 */

export const easing = {
  outStrong: [0.23, 1, 0.32, 1], // --ease-out-strong
  inOutStrong: [0.77, 0, 0.175, 1], // --ease-in-out-strong
  drawer: [0.32, 0.72, 0, 1], // --ease-drawer
  arrival: [0.16, 1, 0.3, 1], // --ease-arrival
} as const;

export const duration = {
  feedback: 0.12, // --dur-feedback
  popover: 0.16, // --dur-popover
  dropdown: 0.2, // --dur-dropdown
  overlay: 0.32, // --dur-overlay
  focal: 0.64, // --dur-focal
} as const;

export const stagger = {
  tight: 0.04, // --stagger-tight
  normal: 0.07, // --stagger-normal
  loose: 0.11, // --stagger-loose
} as const;

/** Fed to <MotionConfig transition={defaultTransition}> so every motion.dev animation inherits the CSS vocabulary by default. */
export const defaultTransition = {
  duration: duration.dropdown,
  ease: easing.outStrong,
} as const;

/**
 * Springs have no CSS equivalent — that's the line that justifies running
 * two motion runtimes instead of one. Authored directly here, not mirrored
 * from anywhere.
 */
export const springs = {
  snappy: { type: "spring", stiffness: 420, damping: 32, mass: 1 },
  gentle: { type: "spring", stiffness: 220, damping: 26, mass: 1 },
} as const;

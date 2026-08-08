// The only file in this codebase allowed to import from `motion/react*`
// (enforced by eslint.config.mjs's no-restricted-imports) — a single swap
// point if the runtime ever changes.
//
// Explicit named re-exports only, never `export *`: motion's own source
// warns that re-exporting all of `motion/react-client`'s 100+ element
// components that way OOM'd Turbopack (upstream issue #3741), and
// Turbopack is Next 16's default builder. Add an element here the first
// time a component actually needs it.
export {
  div as MotionDiv,
  span as MotionSpan,
  a as MotionA,
  button as MotionButton,
  li as MotionLi,
  ul as MotionUl,
  svg as MotionSvg,
  path as MotionPath,
} from "motion/react-client";

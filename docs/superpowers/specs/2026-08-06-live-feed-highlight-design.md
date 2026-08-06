# Live feed highlight — design

## Problem

The "Morning digest — live feed" header in the Lab section already explains its source in the tagline ("Actual daily output from the morning-digest CronJob above, pulled in via a Vercel Eve agent"), but that text is small and muted — it reads as metadata, not as a claim. Julian wants the section to visibly signal that this data comes from a pipeline he built himself, not a canned feed.

## Approach

Two additions to the existing `digestHeader` row in `Lab.tsx`, no copy changes:

1. **Live indicator** — a small pulsing dot + "LIVE" label in mono, separated from the tagline by a hairline border. Reuses the `travel`/pulse animation language already established in `LabDiagram.module.css` (`.pulse`), so it extends an existing motion pattern instead of introducing a new one. Respects `prefers-reduced-motion` (dot renders static, no animation, when reduced motion is requested).
2. **Pipeline link** — a mono uppercase anchor, "↑ View pipeline", styled like the existing `.repoLink` in `Lab.module.css`. Jumps to the `LabDiagram` above via a plain in-page anchor (`#lab-diagram`, no smooth-scroll polyfill — the site doesn't use one elsewhere, so this stays consistent). `LabDiagram` needs an `id="lab-diagram"` added to its root element.

Both are appended to the existing `.digestHeader` flex row: dot indicator inline after the tagline, pipeline link pushed to the row's end (`margin-left: auto`) so it doesn't crowd the title/tagline on wide screens. On narrow screens the row wraps naturally (existing `flex-wrap: wrap` behavior) and the left border on the live tag drops so it doesn't look orphaned.

## Out of scope

- No changes to the digest tagline copy (variant B from the mockup) — rejected.
- No changes to `MorningDigestCarousel` itself.
- No new design tokens — everything reads from existing `tokens.css` values (`--color-accent`, `--space-*`, `--font-mono`, etc).

## Files touched

- `src/components/Lab.tsx` — add the two elements to the `digestHeader` block, add `id="lab-diagram"` anchor target (either directly on `<LabDiagram />`'s wrapper or the component itself).
- `src/components/Lab.module.css` — new classes: `.liveTag`, `.liveDot`, `.pipelineLink`, `@keyframes dotPulse`.
- `src/components/LabDiagram.tsx` — add `id="lab-diagram"` to the root `div`.

## Accessibility

- The dot is decorative (`aria-hidden="true"`); "Live" text carries the meaning.
- Pipeline link's visible text ("↑ View pipeline") is descriptive on its own — no extra `aria-label` needed.
- Dot animation gated behind `prefers-reduced-motion: no-preference`, matching the pattern already used for `.pulse` and the carousel's auto-advance.

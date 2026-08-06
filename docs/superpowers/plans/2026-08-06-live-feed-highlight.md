# Live Feed Highlight Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the "Morning digest — live feed" header in the Lab section visibly signal that the feed is Julian's own pipeline output, via a pulsing "LIVE" indicator and a link back to the architecture diagram above it.

**Architecture:** Two new elements added to the existing `.digestHeader` row in `Lab.tsx` — a decorative pulsing-dot + "LIVE" label, and a "↑ View pipeline" anchor pointing at a new `id="lab-diagram"` on `LabDiagram`'s root element. Both are pure CSS/markup additions to existing components; no new components, no data changes, no client-side JS.

**Tech Stack:** Next.js App Router (React Server Components), CSS Modules, existing design tokens in `src/styles/tokens.css`.

## Global Constraints

- No new design tokens — every color/spacing/font value must reference an existing custom property from `src/styles/tokens.css` (verbatim requirement from the spec).
- No copy changes to the existing digest tagline text.
- No changes to `MorningDigestCarousel.tsx` or its module CSS.
- Dot animation must be gated behind `@media (prefers-reduced-motion: no-preference)`, matching the existing `.pulse` pattern in `LabDiagram.module.css`.
- This project has no test framework (no jest/vitest/playwright configured, no `*.test.*` files) — verification is `npm run lint`, `npm run build`, and a manual visual check in the dev server, not unit tests.

---

### Task 1: Add live indicator + pipeline link to the Lab digest header

**Files:**
- Modify: `src/components/LabDiagram.tsx` (add anchor id)
- Modify: `src/components/Lab.module.css` (new classes + keyframes)
- Modify: `src/components/Lab.tsx:32-38` (new markup in `digestHeader`)

**Interfaces:**
- Consumes: existing `styles.digestHeader`, `styles.project`, `styles.tagline` classes from `Lab.module.css` (unchanged); existing `--color-accent`, `--space-2`..`--space-4`, `--font-mono`, `--text-label`, `--tracking-label`, `--border-hairline`, `--ease-standard`, `--duration-standard` tokens from `src/styles/tokens.css`.
- Produces: `id="lab-diagram"` on `LabDiagram`'s root `div` (anchor target, not consumed by any other task in this plan).

- [ ] **Step 1: Add the anchor target to `LabDiagram`**

In `src/components/LabDiagram.tsx`, give the root element an id so the new "View pipeline" link has something to jump to:

```tsx
export function LabDiagram() {
  return (
    <div
      id="lab-diagram"
      className={styles.diagram}
      role="img"
      aria-label="GitOps reconciliation loop: a git push is picked up by ArgoCD, applied to the k3s cluster, run by the morning-digest and watchdog agents, and delivered via Telegram — with tracing branching off to Phoenix and VictoriaMetrics."
    >
```

(Only the opening tag changes — everything inside stays as-is.)

- [ ] **Step 2: Add the new CSS classes to `Lab.module.css`**

Append to `src/components/Lab.module.css`:

```css
.liveTag {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  font-family: var(--font-mono);
  font-size: var(--text-label);
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: var(--tracking-label);
  color: var(--color-accent);
  padding-left: var(--space-4);
  border-left: var(--border-hairline);
}

.liveDot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--color-accent);
}

@media (prefers-reduced-motion: no-preference) {
  .liveDot {
    animation: dotPulse 2.4s var(--ease-standard) infinite;
  }
}

@keyframes dotPulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.25;
  }
}

.pipelineLink {
  margin-left: auto;
  font-family: var(--font-mono);
  font-size: var(--text-meta);
  text-transform: uppercase;
  letter-spacing: var(--tracking-label);
  color: var(--color-fg-muted);
  text-decoration: none;
  border-bottom: 1px solid transparent;
  white-space: nowrap;
  transition: color var(--duration-standard) var(--ease-standard),
    border-color var(--duration-standard) var(--ease-standard);
}

.pipelineLink:hover,
.pipelineLink:focus-visible {
  color: var(--color-ink);
  border-color: var(--color-accent);
}

@media (max-width: 560px) {
  .liveTag {
    padding-left: 0;
    border-left: none;
  }

  .pipelineLink {
    margin-left: 0;
  }
}
```

This reuses `--color-fg-muted` and `--text-meta` the same way `.repoLink` does elsewhere in this same file, and matches `.repoLink`'s hover transition exactly for visual consistency.

- [ ] **Step 3: Add the markup to the digest header in `Lab.tsx`**

Replace the existing `digestHeader` block (`src/components/Lab.tsx:32-38`):

```tsx
        <div className={styles.digestHeader}>
          <span className={styles.project}>Morning digest — live feed</span>
          <span className={styles.tagline}>
            Actual daily output from the morning-digest CronJob above, pulled
            in via a Vercel Eve agent.
          </span>
          <span className={styles.liveTag}>
            <span className={styles.liveDot} aria-hidden="true" />
            Live
          </span>
          <a className={styles.pipelineLink} href="#lab-diagram">
            ↑ View pipeline
          </a>
        </div>
```

- [ ] **Step 4: Lint**

Run: `npm run lint`
Expected: no errors.

- [ ] **Step 5: Build**

Run: `npm run build`
Expected: build succeeds with no type or compile errors.

- [ ] **Step 6: Visual check in the dev server**

Run: `npm run dev`, open the site, scroll to the Lab section.

Confirm:
- The "LIVE" tag with pulsing dot appears after the tagline, separated by a hairline border.
- "↑ View pipeline" appears at the right edge of the header row on desktop widths.
- Clicking "↑ View pipeline" jumps the page to the architecture diagram above.
- On a narrow viewport (~375px), the row wraps and the live tag's left border/padding disappear (no orphaned hairline).
- With OS-level "reduce motion" enabled, the dot is static (no pulse).
- Stop the dev server when done.

- [ ] **Step 7: Commit**

```bash
git add src/components/Lab.tsx src/components/Lab.module.css src/components/LabDiagram.tsx
git commit -m "$(cat <<'EOF'
Highlight morning-digest feed as self-built with LIVE indicator + pipeline link

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01MjrR6gDdwDF92pk1Z15qKD
EOF
)"
```

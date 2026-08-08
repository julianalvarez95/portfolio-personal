# Julian Alvarez — Portfolio

A single-route Next.js site with an unusual claim baked into it: the "morning digest" feed on the [Lab](#) section isn't sample copy. It's the real output of an LLM agent running right now on a battery-less, GPU-less Dell Latitude 7490, governed entirely by Git, that Julian operates himself. The site's whole job is to prove that a PM/engineer boundary is dissolved in one person — not narrate it.

This README covers what shipped in the **EXPLODED VIEW** redesign: why it happened, how it was built, and what changed.

---

## Why this got rebuilt

The original site (warm cream ground, red-orange accent, General Sans + IBM Plex Mono, hairline-ruled editorial sections) was well-engineered — disciplined CSS Modules, centralized tokens, RSC by default, a genuinely live feed — but it landed in exactly the visual rut a lot of AI-assisted portfolios land in: a warm-cream ground with a terracotta accent, and broadsheet-editorial hairlines with small tracked mono labels doing double duty as "technical." Two recognizable defaults, stacked on top of each other.

The brief was blunt about it: full redesign, not refinement. Keep 100% of the content and every real mechanism — the live feed, the CV, the contact channels — and replace the entire visual world around them. Dark theme, committed, no toggle. One authored motion moment only this product could have. A test suite that survives the whole thing.

## The direction: EXPLODED VIEW

The new visual world came out of a concept lottery, not a mood board. A structured roll assigned a **SILKSCREEN** direction — a PCB-schematic world — as the default. The user overrode it with a challenger: render Julian's career as an **assembly manual**, one committed step at a time, the way real hardware documentation reads.

That challenger's own honest risk, on paper, was toy-plastic LEGO-instruction color. The fix was grounding it in real engineering-drawing culture instead: a **cyanotype blueprint register** — saturated Prussian blue, not desaturated near-black-navy — white ruled linework, brick-red/safety-orange marking *the step being built now*, muted brass for *inventory held in reserve*, oversized stencil numerals on a visible module grid.

The full direction contract ships in the production HTML itself, as a zero-footprint comment on `<body>`'s first child (`grep 48c86ba9 .next/server/app/index.html` after any build proves it survived):

> **STORY:** A technical hiring manager scrolls Julian's career as an assembly manual — each role clicks into a growing, ghosted structure behind it; the live digest is the one step that never finishes, still dropping new pieces right now.

## Before → after

| | v1 — Brutalist Editorial | v2 — EXPLODED VIEW |
|---|---|---|
| **Ground** | Warm cream `#f5f4f0` | Saturated Prussian blue `#0a2645` |
| **Accent** | Terracotta / signal-red `#ff4b1e` | Brick-red / safety-orange, tuned to clear 4.5:1 text contrast |
| **Type** | General Sans + **IBM Plex Mono** (a flagged "default tech mono") | General Sans + **Fragment Mono** + **Allerta Stencil**, reserved exclusively for numerals |
| **Section markers** | Bare `00–06` numbers, eyebrow labels above headings | Stencil index plates; every kicker/eyebrow removed — headings carry their own weight |
| **Motion** | None — sections teleported in fully formed | `Reveal` entrances, proximity-driven magnetic indices, a current-step indicator, a continuous "still running" digest progress drain, and one signature overdrive moment (below) |
| **Stat numbers** | One repeated "big number, small label" template everywhere | Three distinct blueprint-native readouts — ledger, spec-plate, instrument-bracket — because one template repeated verbatim is exactly the AI-portfolio default the floor bans |
| **Live/mock honesty** | Digest fallback rendered as an unlabeled "Live" tag | `getDigests()` returns `{ live }`; a synthetic fallback renders a dashed brass **"Simulated feed"** badge instead of impersonating the real thing |
| **Cursor / overflow** | Custom crosshair cursor, `overflow-x: hidden` papering over real horizontal overflow | Native cursor; the actual overflow bugs it was hiding (grid blowout on stat values, an unwrapped email link) fixed at the source |
| **Design tokens** | Flat token list | Two-tier system — Tier 1 raw 12-step ramps, Tier 2 semantic roles; no component reads Tier 1 directly |

### The signature moment: `AssemblyRail`

The one animation asked for by name in the original brief — "an authored motion moment only this product could have" — is a scroll-scrubbed rail beside the Archive section. Ghost nodes for every past role accumulate as you scroll and **never un-build** if you scroll back up, literalizing "each role clicks into a growing, ghosted structure behind it."

It ships as two independently complete motion tiers, not a broken enhancement over a placeholder:

- **Everywhere:** a JS-driven step that eases in with the same focal-moment vocabulary as the rest of the site.
- **Chromium, `@supports`-gated:** a CSS named `view-timeline` that replaces the discrete step with a continuous draw scrubbed directly by the real scroll position.

Picking this design wasn't a unilateral call — three real technical directions (this CSS scroll-timeline rail, an illustrative SVG diagram, a ghost-tile accumulator) were weighed and handed to the user to choose between before a line of code was written.

## How it was built

The redesign ran as a sequenced plan, each phase gated and committed on its own:

1. **Setup** — `PRODUCT.md` written from a real product interview (primary visitor, success criteria, the one open honesty gap in the mock digest fallback), plus a live design-quality hook wired into every file edit.
2. **Direction** — the concept lottery above, recorded as a durable contract in the shipped HTML.
3. **Safety net** — a Playwright suite (`@playwright/test`) written against the *original* site first: content, structure, and behavior assertions that must survive a full visual redesign unmodified.
4. **Tokens, zero visual change** — the two-tier palette/motion token system introduced with the old colors still in Tier 1, so restructuring and re-skinning never happened in the same commit.
5. **Global surgery** — `overflow-x: hidden` (which was quietly hiding real overflow bugs) and a custom crosshair cursor removed; the actual bugs underneath fixed at the source instead of re-hidden.
6. **Motion runtime** — [motion.dev](https://motion.dev) installed behind a single audited import boundary, plus shared performance primitives (one page-wide pointer listener instead of 25+ per-component ones, imperative `textContent` writes instead of a React re-render on every count-up frame).
7. **Landing the direction** — every section recomposed into the assembly-manual register, real motion wired in as part of the same pass (not bolted on after), the honest live/simulated digest state given a real visual form.
8. **Overdrive** — `AssemblyRail`, gated behind a three-option technical proposal and an explicit user decision before implementation.
9. **Inspection & close-out** — a two-round finish review against the direction contract, a manual-vs-automated animation audit, a generated `DESIGN.md` derived from the *shipped* code (not intentions), and a promoted set of visual-regression baselines.

Every phase left the test suite green and the production build carrying the direction contract's seed key before moving to the next one.

## Tooling

- **[impeccable](https://github.com/anthropics)** — the design-system skill running throughout: a live editing hook flagging anti-patterns (banned kickers, off-ramp font sizes, dead CSS) as files change, a `finish-reviewer` agent running a fresh, contract-blind review at close-out, and a `documenter` agent that writes `DESIGN.md` from the built artifact rather than from what was planned.
- **Emil Kowalski's design-engineering skill pack** (tracked in `.agents/skills/`, symlinked from `.claude/skills/` so every `git worktree` gets them for free) — `find-animation-opportunities` scouted real motion opportunities in the codebase before any animation was authored; `review-animations` and the rest of the pack encode a high craft bar for judging the result.
- **[motion.dev](https://motion.dev)** + hand-authored CSS, paired always through one duration/easing vocabulary (`tokens.css` ↔ `src/lib/motion-tokens.ts`, kept in sync by a dedicated test).
- **Playwright** — both as an MCP-driven iteration loop during the build (real-browser verification of the scroll-timeline math, contrast, overflow at every viewport) and as the committed regression suite (`desktop-chromium`, `desktop-webkit`, `mobile-chromium`, `reduced-motion` projects, plus promoted visual baselines with masked time-varying regions).

## Stack

- [Next.js 16](https://nextjs.org) (Turbopack), React Server Components by default
- React 19
- [motion](https://motion.dev) 13 for spring/gesture motion; CSS custom properties + `animation-timeline` for everything else
- `@playwright/test` for the committed suite; Playwright MCP for build-time verification
- Self-hosted variable fonts via `next/font` — General Sans, Fragment Mono, Allerta Stencil

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

```bash
npm run dev        # dev server
npm run build      # production build (Turbopack)
npm run lint       # eslint
npm run test:e2e   # full Playwright regression suite
npm run shots      # plain PNG artifacts per section/viewport, for visual review
```

## Design system

See [`DESIGN.md`](./DESIGN.md) for the full recorded system — palette strategy, type ramp, named rules (the numerals-only stencil rule, the byline-not-kicker rule, the reserve-not-secondary-accent rule), and component patterns — derived from the shipped code, kept honest about what's a system rule versus a known interim gap.

## Deploy

Deployed on [Vercel](https://vercel.com). See the [Next.js deployment docs](https://nextjs.org/docs/app/building-your-application/deploying) for the general path.

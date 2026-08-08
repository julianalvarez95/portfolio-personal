---
name: Julian Alvarez — Portfolio
description: A career rendered as an assembly manual on a cyanotype blueprint ground — steps click into place, one committed at a time.
colors:
  page-ground: "#0a2645"
  raised-surface: "#12395f"
  hover-surface: "#17436d"
  active-surface: "#1d4d7a"
  border-subtle: "#3f6e98"
  border-default: "#6089ac"
  border-hover: "#83a8c7"
  text-muted: "#d9e7f2"
  text-primary: "#f4f8fc"
  accent-solid: "#ef6c34"
  accent-solid-hover: "#f68a52"
  accent-deepest: "#2a140a"
  material-reserve: "#b28c58"
  signal-positive: "#4caf6a"
  signal-caution: "#e0a930"
  signal-critical: "#d1373f"
typography:
  hero:
    fontFamily: "General Sans, system-ui, arial, sans-serif"
    fontSize: "clamp(3rem, 9vw, 8.5rem)"
    fontWeight: 700
    lineHeight: 0.95
    letterSpacing: "-0.02em"
  section-heading:
    fontFamily: "General Sans, system-ui, arial, sans-serif"
    fontSize: "clamp(2rem, 5vw, 3.5rem)"
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  stat:
    fontFamily: "General Sans, system-ui, arial, sans-serif"
    fontSize: "clamp(2.5rem, 6vw, 5.5rem)"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "-0.02em"
  body:
    fontFamily: "General Sans, system-ui, arial, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Fragment Mono, ui-monospace, monospace"
    fontSize: "0.75rem"
    fontWeight: 400
    letterSpacing: "0.08em"
  stencil-numeral:
    fontFamily: "Allerta Stencil, system-ui, arial, sans-serif"
    fontWeight: 400
rounded:
  sm: "2px"
  none: "0px"
spacing:
  1: "4px"
  2: "8px"
  3: "12px"
  4: "16px"
  5: "24px"
  6: "32px"
  7: "48px"
  8: "64px"
  9: "96px"
  10: "128px"
  11: "192px"
components:
  legend-link:
    backgroundColor: "transparent"
    textColor: "{colors.text-primary}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "12px 24px"
  legend-link-hover:
    backgroundColor: "rgb(255 255 255 / 0.1)"
    textColor: "{colors.accent-solid}"
  nav-brand:
    backgroundColor: "transparent"
    textColor: "{colors.text-primary}"
    typography: "{typography.stencil-numeral}"
    rounded: "{rounded.none}"
    width: "32px"
    height: "32px"
  nav-link-active:
    textColor: "{colors.text-primary}"
  stat-plate:
    backgroundColor: "transparent"
    textColor: "{colors.text-primary}"
    typography: "{typography.stat}"
    rounded: "{rounded.none}"
    padding: "16px"
---

# Design System: Julian Alvarez — Portfolio

## Overview

**Creative North Star: "The Assembly Manual"**

The site is a technical manual for a career built like real hardware: a saturated Prussian-blue blueprint ground, white ruled linework, and oversized stencil numerals turn each section into a step in an assembly sequence rather than a scrolling highlight reel. This is EXPLODED VIEW, the challenger form chosen over the assigned SILKSCREEN direction — parts (roles, capabilities, the live digest) are laid out with dashed leader lines and index plates the way an assembly diagram explodes a product into its labeled components. The palette deliberately refuses both defaults it was built against: no near-black-navy standing in for "dark mode," and no neon-on-black "developer portfolio" register — the blue reads as a genuinely saturated pigment, not a desaturated neutral.

Brick-red/safety-orange marks "the step being built now" — the one live accent, spent on the thing currently active (hover states, current-step indices, the live digest signal). Muted brass is reserved inventory: it marks something real but not currently active (a not-yet-expanded skill group, a passed archive node, a synthetic-feed disclosure), never a second decorative accent. Everything else is white-on-blue linework: hairline borders, ruled dividers, bordered plates standing in for shadows. Density is manual-page dense — mono labels, tabular figures, dimension-line stat strips — but never cramped; the 8px spacing scale keeps ruled sections breathing.

**Key Characteristics:**
- Saturated cyanotype-blue ground, never a desaturated near-black
- One live accent (brick-red/safety-orange) spent only on "what's active now"
- A second, strictly-scoped reserve color (muted brass) for inactive/held/simulated states
- Borders and bordered plates instead of shadows; the system is flat and linework-driven
- Oversized stencil numerals as the module-grid motif, reserved for numerals only
- Mono labels and tabular-numeral stat readouts throughout, never a repeated single hero-metric template

## Colors

A two-tier system: Tier 1 raw 12-step ramps and single-step signal/material anchors live in `tokens.css`; Tier 2 semantic roles (`--surface-*`, `--text-*`, `--border-*`, `--accent-*`, `--material-*`, `--signal-*`) are the only tokens components may reference. No component reads a Tier 1 token directly.

### Primary
- **Cyanotype Ground** (`#0a2645`): the page background (`--surface-page`, neutral-1) — a genuinely saturated deep Prussian blue, not a desaturated navy-gray. The base every other color is judged for contrast against.
- **Assembly Orange** (`#ef6c34`): `--accent-solid`, reading `--accent-10` (not `--accent-9` — step 9 tested at 4.18:1 on the ground, under the 4.5:1 text floor this token needs since it's read as text everywhere: indices, subIndex labels, stat values, hover states). Marks "the step being built now" — the single live accent. Hover moves one step further to `--accent-11` (`#f68a52`, `--accent-solid-hover`) to keep a visible step above resting.

### Secondary
- **Muted Brass** (`#b28c58`): `--material-reserve`, reading `--material-brass-9` — corrected from an initial `#a8824f` (4.34:1, failed the 4.5:1 floor for small mono labels) to `#b28c58` (4.93:1, clears with margin). Marks "inventory held in reserve," and only that: Capabilities' unexpanded skill-group headers, the digest's "Simulated feed" disclosure tag, Archive's ghost-rail passed-but-not-current nodes, and CaseStudy's not-current sub-index label. It is not a general secondary accent — a component reaching for brass to decorate something that isn't a reserve/inactive/not-yet-current state is using the token outside its rule.

### Neutral
- **Ruled White** (`#f4f8fc`): `--text-primary` (neutral-12) — primary text, headings, active states. Never pure `#fff`; stays on the blueprint's own ramp.
- **Faded Linework** (`#d9e7f2`): `--text-muted` (neutral-11) — secondary text, meta rows, labels.
- **Hairline Border** (`#3f6e98` / `#6089ac` / `#83a8c7`): `--border-subtle` / `--border-default` / `--border-hover` (neutral-6/7/8) — the system's only depth device; see Elevation & Depth.
- **Raised Plate** (`#12395f` / `#17436d` / `#1d4d7a`): `--surface-raised` / `--surface-hover` / `--surface-active` (neutral-3/4/5) — used sparingly for raised surfaces, never a competing background register.

### Named Rules
**The One Live Step Rule.** Assembly Orange marks only the thing currently active or being hovered/focused. It is not a decorative highlight color; a screen with orange scattered across unrelated static elements is off-system.

**The Reserve, Not Secondary, Rule.** Muted Brass marks inactive/held/simulated state only — an unexpanded group, a passed rail node, a disclosed-synthetic tag, a not-current sub-index. It never substitutes for Assembly Orange as a second "pick me" accent.

## Typography

**Display Font:** General Sans (with `system-ui, arial, sans-serif`) — self-hosted variable-weight sans (400/500/600/700), used for all headings and body copy.
**Label/Mono Font:** Fragment Mono (with `ui-monospace, monospace`) — a single static weight, deliberately chosen over IBM Plex Mono specifically to avoid the generic "tech portfolio mono" association; reads as manual/annotation lettering, not a dev-tool default.
**Stencil Font:** Allerta Stencil (with `system-ui, arial, sans-serif`) — reserved exclusively for oversized step numerals (Hero legend keys, SectionHeading indices, Nav brand mark, AssemblyRail nodes). Never used for body copy or full words.

**Character:** A clean geometric sans carries the manual's actual reading content; the mono carries every label, meta line, and byline in uppercase tracked caps; the stencil face is spent only on numerals, so it reads as a printed part-number stamp rather than display type doing double duty as body text.

### Hierarchy
- **Hero** (700, `clamp(3rem, 9vw, 8.5rem)`, line-height 0.95): the name on the Hero cover page only.
- **Section Heading** (600, `clamp(2rem, 5vw, 3.5rem)`, line-height 1.1, uppercase): one per section, paired with a stencil index plate via `SectionHeading`.
- **Case Title** (600, `clamp(1.5rem, 3vw, 2rem)`): CaseStudy role titles — a real sub-heading carrying its own weight, not a label sitting above a heading.
- **Index Numeral** (`--text-index-stencil`, `clamp(1.5rem, 4vw, 2.5rem)`, stencil): SectionHeading's oversized step-index plate.
- **Stat** (700, tabular-nums): `--text-stat` (`clamp(2.5rem, 6vw, 5.5rem)`) for StatBlock's `plate` and `bracket` variants; `--text-stat-sm` (`clamp(1.25rem, 2.4vw, 1.75rem)`) for the denser `ledger` variant (Now's inline dimension-line strip) — the three variants share weight and tabular-nums, not necessarily size.
- **Body** (400, 1rem, line-height 1.6): running copy, max ~70ch.
- **Body Large** (400, 1.125rem, line-height 1.6): Hero specs, Now's bio line.
- **Label/Meta** (400, 0.75–0.875rem, mono, 0.08em tracking, uppercase): nav labels, spec keys, bylines, stat labels, tags — the system's dominant small-text register.

### Named Rules
**The Numerals-Only Stencil Rule.** Allerta Stencil renders index numerals and the two-letter nav brand mark exclusively. It never sets a full word or sentence.

**The Byline-Not-Kicker Rule.** A mono label sitting directly above a heading with no informational content of its own (a pure announcement kicker/eyebrow) is not part of this system. A mono line is only legitimate when it carries real facts on one baseline — row index + company + role + dates (ArchiveRow), company + dates + location (CaseStudy header), source + timestamp (digest byline). Metadata earns its place by content, not by position.

## Layout

Single-column content flows inside a `1200px` max-width container (`--content-max-width`) with `24px` horizontal padding (`16px` under 640px). Section vertical rhythm runs on `--space-11` (192px) desktop / `--space-9` (96px) mobile, switching at the 768px breakpoint — generous manual-page whitespace between assembly steps. The base spatial unit is an 8px scale (`--space-1`…`--space-11`, 4px to 192px) used for every gap, padding, and rhythm value in the system; no ad hoc pixel values outside it.

A faint global module grid (`body::before`, a repeating 96px linear-gradient at ~4% white opacity) reads as blueprint graph paper across the whole page — one shared layer instead of a grid pattern duplicated per section.

Responsive grids step up by content: Capabilities' skill groups go 1 → 2 (640px) → 5 columns (1024px); CaseStudy's stat plates go 2 → 4 columns (640px); ArchiveRow's grid columns collapse to a stacked area layout under 720px.

**AssemblyRail** — the Archive section's scroll-scrubbed progress rail — is hidden below `1400px` and only appears at that width and above. This is a deliberate box-math constraint, not a missed breakpoint: the container's right inner edge sits at `50% + 568px`, and the rail needs a further 96px of real margin outside the 1200px column to sit without overlapping content. It is tuned to actually reach desk-monitor viewing (PRODUCT.md's "large monitor at a desk" scene), not just to gate out mobile.

## Elevation & Depth

Flat by design. There is no shadow vocabulary in this system — `box-shadow` is not used anywhere. Depth and separation are conveyed entirely through hairline borders (`--border-hairline`, 1px solid `--border-subtle`), bordered "plates" (SectionHeading's index card, CaseStudy's stat plate, Nav's brand tile), and layered alpha overlays (`--overlay-white-a*` for hover highlights, `--overlay-black-a*` reserved for scrims) rather than blur/offset shadows. A blueprint's own materials are ruled lines and stamped plates, not cast light — shadows would be a foreign device in this world, not merely an unused one.

### Named Rules
**The Border-Over-Shadow Rule.** Any surface that needs to read as "raised" or "distinct" gets a 1px border or a bordered plate treatment, never a `box-shadow`. Radius stays near-zero (`--radius-sm: 2px`, `--radius-none: 0`) throughout — corners are square or barely eased, consistent with drafted linework rather than soft UI chrome.

## Shapes

Corners are square-to-barely-rounded: `--radius-sm` (2px) is the only non-zero radius token in the system, used sparingly (scrollbar thumb); everything else — buttons, plates, panels, cards — sits at `--radius-none` (0px). Borders are hairline (1px) throughout, never thick strokes. Recurring silhouettes: the bordered "plate" (a 1px-bordered rectangle, sometimes with accent corner ticks per `StatBlock`'s `plate` variant), the "dimension-line" ruled baseline (`StatBlock`'s `ledger` variant, Hero's spec rows), and the flanking instrument bracket (`StatBlock`'s `bracket` variant). Dashed strokes (`strokeDasharray`, `border: 1px dashed`) are reserved for two specific meanings: leader lines in the Hero schematic, and the brass "not live / reserve" state (Lab's simulated-feed dot, LabDiagram's dashed paths) — dashing signals provisional or non-committed, never decorative.

## Components

### Buttons / Links (Legend Links)
- **Shape:** square corners (`--radius-none`), 1px border (`--border-default`).
- **Primary:** Hero's front-cover legend links (Contact, Download CV) — transparent background, `--text-primary` text, mono uppercase label, `12px 24px` padding, paired with a stencil-numeral key (`01`, `02`).
- **Hover / Focus:** border and text shift to `--accent-solid`, background gains a faint white overlay (`--overlay-white-a3`), `120ms` feedback transition. `:active` scales to 0.98.
- **Ghost:** Contact's back-cover link tiles repeat the identical grammar — same bordered-plate legend, confirming this as one system pattern rather than a Hero-only device.

### Stat Readouts (signature component — three named variants)
`StatBlock` exposes a required `variant` prop with three distinct blueprint-native readouts sharing one animated core (count-up on scroll-into-view, proximity-driven accent border). This exists specifically because the system bans a single hero-metric card repeated verbatim across sections.
- **`ledger`:** an inline dimension-line strip — value+label pairs on one ruled baseline with a hairline bottom border. Used for Now's quick/dense facts.
- **`plate`:** a bordered spec-panel cell with accent corner ticks (7px L-brackets) that light up on proximity. Used for CaseStudy's impact metrics (repeats three times, once per case study).
- **`bracket`:** flanking instrument-gauge brackets (6px, top/bottom + one side) standing apart from the plate's full box. Used for Lab's homelab control-panel readout.

### Navigation
Fixed top bar, 64px tall, `--surface-page` background with a bottom hairline. The brand mark is a 32×32px bordered stencil-numeral tile ("JA"), not a wordmark. Nav items pair a `MagneticIndex` stencil-adjacent two-digit index with a mono uppercase label; the active item gets an accent bottom border and its index turns `--accent-solid`. Labels collapse below 640px, leaving indices only.

### Cards / Rows (Archive)
`ArchiveRow` is a disclosure row, not a card: full-width, top hairline border (accent on hover/current-step via `data-near`/`data-current`), a mono grid trigger (index · company · role · dates · toggle) that expands a detail panel via `grid-template-rows` animation. `CaseStudy` is the equivalent expanded form for the Work section — bordered plate absent; instead an index + company/dates/location byline row, a title, narrative copy, a `plate`-variant stat grid, and a bulleted contributions list.

### Signature Component: AssemblyRail
The Archive section's scroll-scrubbed progress rail: a sticky vertical line with numbered stencil nodes, only rendered ≥1400px (see Layout). It has two motion tiers — a JS/CSS-transition base tier (always active) driven by scroll-position tracking, and a Chromium-only `@supports (animation-timeline: view())` enhancement tier that replaces the JS-driven fill with a continuous named-view-timeline scroll-scrubbed draw. Nodes gain `--material-reserve` styling once passed (permanent, one-shot — a node never reverts once its real row has been active) and `--accent-solid` styling while current, mirroring the direction contract's "growing, ghosted structure behind it."

## Do's and Don'ts

### Do:
- **Do** read every color from Tier 2 semantic tokens (`--surface-*`, `--text-*`, `--border-*`, `--accent-*`, `--material-*`, `--signal-*`); never reference a Tier 1 ramp step directly from a component.
- **Do** pair duration and easing tokens together as the paired `--transition-*` tokens define them (`--dur-feedback`/`--ease-out-strong`, etc.) — never mix a duration from one pairing with an easing from another; `e2e/tokens.spec.ts` fails the build if `tokens.css` and its JS mirror (`src/lib/motion-tokens.ts`) ever diverge.
- **Do** use borders and bordered plates for elevation; never introduce `box-shadow`.
- **Do** scope `--material-reserve` to genuine inactive/held/simulated states only (unexpanded groups, passed rail nodes, disclosed-synthetic tags, not-current indices).
- **Do** choose one of `StatBlock`'s three named variants (`ledger`/`plate`/`bracket`) deliberately per context rather than defaulting to one.
- **Do** disclose a degraded or synthetic state honestly and visually — the Lab digest's `simulatedTag` (static brass plate, no pulse, dashed dot) is the confirmed pattern for "this is not the live thing."

### Don't:
- **Don't** introduce a standalone kicker/eyebrow label (an announcement line above a heading carrying no facts of its own). Metadata lines are legitimate only when they carry real content on their baseline (index + company + dates, byline + source).
- **Don't** use `--material-reserve` as a generic secondary accent color; it marks reserve/inactive state only, never decoration.
- **Don't** add a hard-offset drop shadow anywhere; this world's depth vocabulary is entirely borders, plates, and alpha overlays.
- **Don't** set Allerta Stencil on body copy, labels, or full words — numerals (and the two-letter Nav brand mark) only.
- **Don't** author a new hand-timed animation outside the `--dur-*`/`--ease-*` pairing system without an explicit exception and its own `prefers-reduced-motion` guard, matching the one confirmed exception: the digest's `dotPulse` (2.4s, continuous ambient "Live" signal, not a discrete state transition) — documented as an intentional exception directly in `tokens.css`, guarded independently in both `tokens.css` and the `globals.css` reduced-motion backstop.

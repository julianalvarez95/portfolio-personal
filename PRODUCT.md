# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

**Primary: a technical hiring manager evaluating Julian for an AI/Platform PM role.** They can read the machine — the live feed, the repo, the pipeline — and are inclined to verify rather than take the copy at its word. They will likely open the GitHub repo in a second tab while reading this site. They are screening under time pressure, sometimes from a phone at night after reading Julian's CV, sometimes on a desk monitor during work hours.

Success for this visitor: sending a message or booking a call, with **downloading the CV as an equally first-class action alongside contact** — not a fallback to it.

## Product Purpose

A personal portfolio for Julian Alvarez, an AI Product Manager (Internal Platforms). It exists to get a qualified technical evaluator to reach out or download the CV, by demonstrating — not claiming — that he operates the engineering side of his own products.

## Positioning

Julian is a PM who runs the machine himself. The site proves this live: the digest feed it renders on the page is the real output of his own LLM agent, currently running on a Dell Latitude 7490 with no battery and no GPU, governed entirely by Git. A neighboring PM portfolio can claim "technical" in prose; it cannot show a real agent's live output rendered on the same page making that claim.

## Operating Context

- The visitor's evaluation ritual: skim, then verify. A technical hiring manager who is qualified to check will open the linked GitHub repo in a second tab.
- The bar for this surface is not to impress — it is to **survive that second tab**: nothing shown here should look like more than what the linked repo can back up.
- Physical scene for rendering decisions: a technical recruiter or hiring manager opening this at night on a phone right after reading a CV, or an engineer opening it on a large monitor at a desk. (This scene informs contrast, density, and touch-target decisions — it does not by itself dictate light or dark; dark was already decided by the user as a separate, explicit brief.)

## Capabilities and Constraints

- Single-route Next.js 16 (Turbopack) site, React Server Components by default.
- Sections today: Nav, Hero, Now, Work, Archive, Capabilities, Lab, Contact.
- `Lab` renders a live "morning digest" feed via `getDigests()` (`src/lib/digest.ts`): when `DIGEST_READ_SECRET` is set (production), it fetches real output from Julian's deployed digest-agent with `cache: "no-store"`; when unset (local/tests), it falls back to `MOCK_DIGESTS` and never touches the network.
- **Open constraint, not yet resolved:** `MOCK_DIGESTS` is synthetic content written to closely resemble the real agent's output (plausible headlines, real sources, credible dates) and the page does not currently label it as such. Given the primary visitor is inclined to verify, an unlabeled synthetic fallback showing when the live cluster is down is the highest-cost failure this page can have. This is a product decision to carry into the new visual world, not a styling detail — the chosen direction must give a degraded/synthetic state an honest visual form.
- CV is a real downloadable asset (`/julian-alvarez-profile.pdf`), already wired as a first-class action.
- Contact channels: email, phone, LinkedIn, GitHub — all real, already in `src/data/site.ts`.

## Brand Commitments

- Name and role are fixed: Julian Alvarez, AI Product Manager — Internal Platforms.
- Career facts are fixed and must not be altered: 6+ years in product, 10 roles, 8 companies, 3 countries; Mercado Libre (NASDAQ: MELI), Mudafy (YC S19), currently leading Wave CRM at Willdom.
- All content in `src/data/` (experience, capabilities, lab, site) is durable product truth for this redesign — the visual world may recompose it, but the facts do not change.

## Evidence on Hand

- Real, live digest feed rendered from Julian's own agent (see Capabilities above) — the single strongest piece of evidence this site has, and the one the redesign should not bury.
- Real CV asset, real contact links, real GitHub/LinkedIn — no fabricated testimonials, logos, or benchmarks exist or should be introduced.
- Career history in `src/data/experience.ts` (roles, companies, stats) and `src/data/capabilities.ts` are the factual record; treat them as ground truth, not copy to be embellished.

## Product Principles

1. **Prove, don't claim.** Every assertion this site makes (technical fluency, self-built systems, product-engineering fusion) must point at something the visitor can verify — the live feed, the repo, the CV.
2. **The second tab is the real bar.** Nothing on the page should overstate what the linked repository shows.
3. **Contact and CV are peers, never a hierarchy.** Both stay first-class, unhidden actions throughout.
4. **Content and function are load-bearing, not decorative.** A visual redesign may recompose sections but must preserve every fact and every real mechanism (the live feed, the CV, the contact channels) intact.
5. **Honesty extends to failure states.** A degraded or synthetic state (e.g. the digest mock fallback) must say so, not impersonate the real thing.

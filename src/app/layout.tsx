import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { fontDisplay, fontMono } from "./fonts";
import { site } from "@/data/site";
import "./globals.css";

export const metadata: Metadata = {
  title: `${site.name} — ${site.role}`,
  description: site.summary,
  metadataBase: new URL("https://julianalvarez.dev"),
  openGraph: {
    title: `${site.name} — ${site.role}`,
    description: site.summary,
    type: "profile",
  },
};

// Next 16: themeColor lives on the `viewport` export, not `metadata`.
// Hardcoded, not read from tokens.css — this is a static export with no
// access to CSS custom properties. Mirrors --surface-page (Tier 1
// --neutral-1); update it here too whenever that value changes.
export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#f5f4f0",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${fontDisplay.variable} ${fontMono.variable}`}>
      <body>
        {/*
          React has no public API for a bare top-level HTML comment node,
          so the direction contract below ships as the sole content of a
          zero-footprint first child — verify with `grep 48c86ba9` on the
          production build output, per Fase A.6.
        */}
        <div
          aria-hidden="true"
          style={{ display: "none" }}
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: `<!--
THESIS: A career built like real hardware, one committed step at a time — not narrated after the fact. Refuses the polished highlight-reel default and the near-black-plus-neon portfolio rut alike.
OWN-WORLD: Cyanotype blueprint ground (saturated Prussian blue), white ruled linework, brick-red/safety-orange marking the step being built now, muted brass for inventory held in reserve, oversized stencil step numerals on a visible module grid.
STORY: A technical hiring manager scrolls Julian's career as an assembly manual — each role clicks into a growing, ghosted structure behind it; the live digest is the one step that never finishes, still dropping new pieces right now.
FIRST VIEWPORT: A parts-inventory cover — name, role, tagline as box contents, the finished model's silhouette teased at the corner; CV and contact sit as the manual's permanent front-cover legend, never hidden.
FORM: EXPLODED VIEW — challenger chosen over the assigned SILKSCREEN direction (candidate 6/7), seed key 48c86ba9.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, and DESIGN.md
-->`,
          }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  );
}

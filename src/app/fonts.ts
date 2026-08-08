import localFont from "next/font/local";
import { Allerta_Stencil, Fragment_Mono } from "next/font/google";

export const fontDisplay = localFont({
  src: [
    {
      path: "../fonts/general-sans/GeneralSans-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/general-sans/GeneralSans-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/general-sans/GeneralSans-Semibold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../fonts/general-sans/GeneralSans-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-display",
  display: "swap",
  fallback: ["system-ui", "arial"],
});

// IBM Plex Mono is on new-work.md §63's training-data-default list — "tech
// wanting a mono" is exactly the association that list exists to break.
// Fragment Mono reads as manual/annotation lettering, not generic dev-mono.
export const fontMono = Fragment_Mono({
  subsets: ["latin"],
  weight: "400", // Fragment Mono ships a single static weight.
  variable: "--font-mono",
  display: "swap",
  fallback: ["ui-monospace", "monospace"],
});

// Reserved for oversized step numerals only (SectionHeading, Hero) — never
// body copy. The direction's own "oversized stencil step numerals" line.
export const fontStencil = Allerta_Stencil({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-stencil",
  display: "swap",
  fallback: ["system-ui", "arial"],
});

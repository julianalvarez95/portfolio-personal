import type { Metadata } from "next";
import { fontDisplay, fontMono } from "./fonts";
import { site } from "@/data/site";
import { CursorCrosshair } from "@/components/CursorCrosshair";
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

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${fontDisplay.variable} ${fontMono.variable}`}>
      <body>
        <CursorCrosshair />
        {children}
      </body>
    </html>
  );
}

"use client";

import posthog from "posthog-js";
import { site } from "@/data/site";
import { ScrollIndicator } from "./ScrollIndicator";
import styles from "./Hero.module.css";

export function Hero() {
  return (
    <section id="index" className={`section ${styles.hero}`}>
      {/* Abstract line-art, strokes only — "the finished model's silhouette
          teased at the corner." No image generation was available for this
          build, so this stands in for a comp-sourced asset: scattered parts
          with dashed leader lines toward an assembled target, exploded-view
          grammar without a literal figure. */}
      <svg
        className={styles.schematic}
        viewBox="0 0 240 240"
        fill="none"
        stroke="currentColor"
        aria-hidden="true"
      >
        <rect x="126" y="24" width="52" height="36" strokeWidth="1" />
        <rect x="150" y="104" width="38" height="38" strokeWidth="1" />
        <circle cx="58" cy="66" r="4" strokeWidth="1" />
        <circle cx="92" cy="154" r="19" strokeWidth="1" />
        <line
          x1="58"
          y1="66"
          x2="126"
          y2="42"
          strokeWidth="1"
          strokeDasharray="3 5"
        />
        <line
          x1="176"
          y1="60"
          x2="169"
          y2="104"
          strokeWidth="1"
          strokeDasharray="3 5"
        />
        <line
          x1="111"
          y1="154"
          x2="150"
          y2="128"
          strokeWidth="1"
          strokeDasharray="3 5"
        />
      </svg>

      <div className={`container ${styles.top}`}>
        <h1 className={styles.name}>{site.name}</h1>
        <dl className={styles.specs}>
          <div className={styles.spec}>
            <dt>Role</dt>
            <dd>{site.role}</dd>
          </div>
          <div className={styles.spec}>
            <dt>Summary</dt>
            <dd>{site.tagline}</dd>
          </div>
        </dl>
      </div>

      <div className={`container ${styles.bottom}`}>
        {/* The manual's permanent front-cover legend — contact and CV as
            peers, never buried below the fold as Contact-section-only. */}
        <div className={styles.legend}>
          <a
            className={styles.legendLink}
            href={`mailto:${site.email}`}
            onClick={() => posthog.capture("hero_email_clicked")}
          >
            <span className={styles.legendKey}>01</span>
            Contact
          </a>
          <a
            className={styles.legendLink}
            href={site.cvFile}
            target="_blank"
            rel="noreferrer"
            onClick={() => posthog.capture("cv_downloaded", { source: "hero" })}
          >
            <span className={styles.legendKey}>02</span>
            Download CV
          </a>
        </div>
        <div className={styles.bottomRow}>
          <span className={styles.meta}>
            <span>{site.location}</span>
            <span>00 / Index</span>
          </span>
          <ScrollIndicator />
        </div>
      </div>
    </section>
  );
}

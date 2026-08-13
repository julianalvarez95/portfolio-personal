"use client";

import posthog from "posthog-js";
import { site } from "@/data/site";
import { SectionHeading } from "./SectionHeading";
import { LiveClock } from "./LiveClock";
import { BrandIcon } from "./icons/BrandIcon";
import styles from "./Contact.module.css";

export function Contact() {
  const educationLine = site.education
    .map((e) => (e.period ? `${e.school} (${e.period})` : e.school))
    .join(" · ");

  return (
    <section id="contact" className="section">
      <div className="container">
        <SectionHeading index="06" title="Contact" />
        <div className={styles.layout}>
          <div className={styles.primary}>
            <a
              className={styles.email}
              href={`mailto:${site.email}`}
              onClick={() =>
                posthog.capture("contact_link_clicked", { link_type: "email" })
              }
            >
              <BrandIcon icon="gmail" className={styles.emailIcon} />
              {site.email}
            </a>
            <nav className={styles.links} aria-label="Contact links">
              <a
                href={site.linkedin}
                target="_blank"
                rel="noreferrer"
                onClick={() =>
                  posthog.capture("contact_link_clicked", {
                    link_type: "linkedin",
                  })
                }
              >
                <BrandIcon icon="linkedin" className={styles.linkIcon} />
                LinkedIn
              </a>
              <a
                href={site.github}
                target="_blank"
                rel="noreferrer"
                onClick={() =>
                  posthog.capture("contact_link_clicked", {
                    link_type: "github",
                  })
                }
              >
                <BrandIcon icon="github" className={styles.linkIcon} />
                GitHub
              </a>
              <a
                href={site.cvFile}
                target="_blank"
                rel="noreferrer"
                onClick={() =>
                  posthog.capture("cv_downloaded", { source: "contact" })
                }
              >
                Download CV
              </a>
              <a
                href={`tel:${site.phone.replace(/\s+/g, "")}`}
                onClick={() =>
                  posthog.capture("contact_link_clicked", { link_type: "phone" })
                }
              >
                {site.phone}
              </a>
            </nav>
          </div>

          <div className={styles.footer}>
            <span className={styles.education}>{educationLine}</span>
            <span className={styles.locationTime}>
              <span>{site.location.toUpperCase()}</span>
              <LiveClock timeZone={site.timeZone} />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

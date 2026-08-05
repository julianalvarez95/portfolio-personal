import { site } from "@/data/site";
import { SectionHeading } from "./SectionHeading";
import { LiveClock } from "./LiveClock";
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
            <a className={styles.email} href={`mailto:${site.email}`}>
              {site.email}
            </a>
            <nav className={styles.links} aria-label="Contact links">
              <a href={site.linkedin} target="_blank" rel="noreferrer">
                LinkedIn
              </a>
              <a href={site.github} target="_blank" rel="noreferrer">
                GitHub
              </a>
              <a href={site.cvFile} target="_blank" rel="noreferrer">
                Download CV
              </a>
              <a href={`tel:${site.phone.replace(/\s+/g, "")}`}>{site.phone}</a>
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

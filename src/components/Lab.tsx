import { lab } from "@/data/lab";
import { getDigests, flattenDigests } from "@/lib/digest";
import { SectionHeading } from "./SectionHeading";
import { StatBlock } from "./StatBlock";
import { LabDiagram } from "./LabDiagram";
import { MorningDigestCarousel } from "./MorningDigestCarousel";
import styles from "./Lab.module.css";

export async function Lab() {
  const digestSlides = flattenDigests(await getDigests());

  return (
    <section id="lab" className="section">
      <div className="container">
        <SectionHeading index="05" title="Lab" />

        <div className={styles.header}>
          <span className={styles.project}>{lab.project}</span>
          <span className={styles.tagline}>{lab.tagline}</span>
        </div>

        <p className={styles.narrative}>{lab.narrative}</p>

        <div className={styles.stats}>
          {lab.stats.map((stat) => (
            <StatBlock key={stat.label} value={stat.value} label={stat.label} />
          ))}
        </div>

        <LabDiagram />

        <div className={styles.digestHeader}>
          <span className={styles.project}>Morning digest — live feed</span>
          <span className={styles.tagline}>
            Actual daily output from the morning-digest CronJob above, pulled
            in via a Vercel Eve agent.
          </span>
        </div>
        <MorningDigestCarousel slides={digestSlides} />

        <div className={styles.footer}>
          <ul className={styles.stack}>
            {lab.stack.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <a
            className={styles.repoLink}
            href={lab.repoUrl}
            target="_blank"
            rel="noreferrer"
          >
            View repo ↗
          </a>
        </div>
      </div>
    </section>
  );
}

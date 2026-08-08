import { lab } from "@/data/lab";
import { getDigests, flattenDigests } from "@/lib/digest";
import { SectionHeading } from "./SectionHeading";
import { StatBlock } from "./StatBlock";
import { LabDiagram } from "./LabDiagram";
import { MorningDigestCarousel } from "./MorningDigestCarousel";
import { BrandIcon } from "./icons/BrandIcon";
import styles from "./Lab.module.css";

export async function Lab() {
  const { digests, live } = await getDigests();
  const digestSlides = flattenDigests(digests);

  return (
    <section id="lab" className="section">
      <div className="container">
        <SectionHeading index="05" title="Lab" />

        <div className={styles.header}>
          <h3 className={styles.project}>{lab.project}</h3>
          <p className={styles.tagline}>{lab.tagline}</p>
        </div>

        <p className={styles.narrative}>{lab.narrative}</p>

        <div className={styles.stats}>
          {lab.stats.map((stat) => (
            <StatBlock
              key={stat.label}
              value={stat.value}
              label={stat.label}
              variant="bracket"
            />
          ))}
        </div>

        <LabDiagram />

        <div className={styles.digestHeader}>
          <h3 className={styles.project}>Morning digest</h3>
          <p className={styles.tagline}>
            Actual daily output from the morning-digest CronJob above, pulled
            in via a Vercel Eve agent.
          </p>
          <div className={styles.digestMeta}>
            <span className={live ? styles.liveTag : styles.simulatedTag}>
              <span
                className={live ? styles.liveDot : styles.simulatedDot}
                aria-hidden="true"
              />
              {live ? "Live" : "Simulated feed"}
            </span>
            <a className={styles.pipelineLink} href="#lab-diagram">
              ↑ View pipeline
            </a>
          </div>
        </div>
        <MorningDigestCarousel slides={digestSlides} />

        <div className={styles.footer}>
          <ul className={styles.stack}>
            {lab.stack.map((item) => (
              <li key={item.label}>
                {item.icon && (
                  <BrandIcon icon={item.icon} className={styles.stackIcon} />
                )}
                <span>{item.label}</span>
              </li>
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

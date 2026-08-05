import type { ExperienceEntry } from "@/data/experience";
import { StatBlock } from "./StatBlock";
import styles from "./CaseStudy.module.css";

export function CaseStudy({
  entry,
  subIndex,
}: {
  entry: ExperienceEntry;
  subIndex: string;
}) {
  return (
    <article className={styles.study}>
      <div className={styles.header}>
        <span className={styles.subIndex}>{subIndex}</span>
        <span className={styles.company}>{entry.company}</span>
        <span>{entry.dateRange}</span>
        <span>{entry.location}</span>
      </div>

      <h3 className={styles.title}>{entry.role}</h3>

      {entry.narrative && <p className={styles.narrative}>{entry.narrative}</p>}

      {entry.stats && entry.stats.length > 0 && (
        <div className={styles.stats}>
          {entry.stats.map((stat) => (
            <StatBlock
              key={stat.label}
              value={stat.value}
              label={stat.label}
              accent={stat.accent}
            />
          ))}
        </div>
      )}

      {entry.contributions && entry.contributions.length > 0 && (
        <ul className={styles.contributions}>
          {entry.contributions.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )}
    </article>
  );
}

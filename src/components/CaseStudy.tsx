"use client";

import type { CSSProperties } from "react";
import type { ExperienceEntry } from "@/data/experience";
import { StatBlock } from "./StatBlock";
import { MagneticIndex } from "./MagneticIndex";
import { Reveal } from "./motion/Reveal";
import { useActiveStep } from "@/lib/useActiveStep";
import { useProximity } from "@/lib/useProximity";
import styles from "./CaseStudy.module.css";

const PROXIMITY_PX = 40;

export function CaseStudy({
  entry,
  subIndex,
}: {
  entry: ExperienceEntry;
  subIndex: string;
}) {
  const activeRef = useActiveStep<HTMLElement>("work", entry.id);
  const proximityRef = useProximity<HTMLElement>(PROXIMITY_PX);

  const setRefs = (el: HTMLElement | null) => {
    activeRef.current = el;
    proximityRef.current = el;
  };

  return (
    <Reveal className={styles.study} threshold={0.15}>
      <article ref={setRefs} className={styles.inner}>
        <div className={styles.header}>
          <MagneticIndex
            className={styles.subIndex}
            radius={40}
            strength={0.25}
            maxPull={4}
          >
            {subIndex}
          </MagneticIndex>
          <span className={styles.company}>{entry.company}</span>
          <span>{entry.dateRange}</span>
          <span>{entry.location}</span>
        </div>

        <h3 className={styles.title}>{entry.role}</h3>

        {entry.narrative && <p className={styles.narrative}>{entry.narrative}</p>}

        {entry.stats && entry.stats.length > 0 && (
          <div className={styles.stats}>
            {entry.stats.map((stat, i) => (
              <div
                key={stat.label}
                className={styles.statSlot}
                style={{ "--i": i } as CSSProperties}
              >
                <StatBlock value={stat.value} label={stat.label} accent={stat.accent} />
              </div>
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
    </Reveal>
  );
}

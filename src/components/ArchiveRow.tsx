"use client";

import { useState } from "react";
import posthog from "posthog-js";
import type { ExperienceEntry } from "@/data/experience";
import { useProximity } from "@/lib/useProximity";
import { useActiveStep } from "@/lib/useActiveStep";
import { MagneticIndex } from "./MagneticIndex";
import { Reveal } from "./motion/Reveal";
import styles from "./ArchiveRow.module.css";

const PROXIMITY_PX = 34;

export function ArchiveRow({
  entry,
  index,
}: {
  entry: ExperienceEntry;
  index: number;
}) {
  const [open, setOpen] = useState(false);
  const proximityRef = useProximity<HTMLDivElement>(PROXIMITY_PX);
  const activeRef = useActiveStep<HTMLDivElement>("archive", entry.id);
  const hasDetail = Boolean(entry.detail && entry.detail.length > 0);
  const panelId = `archive-detail-${entry.id}`;

  const setRefs = (el: HTMLDivElement | null) => {
    proximityRef.current = el;
    activeRef.current = el;
  };

  return (
    <Reveal className={styles.entrance} threshold={0.4}>
      <div ref={setRefs} className={styles.row}>
        <button
          type="button"
          className={`${styles.trigger} ${hasDetail ? "" : styles.triggerStatic}`}
          onClick={() => {
            if (!hasDetail) return;
            const nextOpen = !open;
            setOpen(nextOpen);
            if (nextOpen) {
              posthog.capture("archive_entry_expanded", {
                company: entry.company,
                role: entry.role,
              });
            }
          }}
          aria-expanded={hasDetail ? open : undefined}
          aria-controls={hasDetail ? panelId : undefined}
        >
          <MagneticIndex
            className={styles.index}
            radius={30}
            strength={0.25}
            maxPull={3}
          >
            {String(index).padStart(2, "0")}
          </MagneticIndex>
          <span className={styles.company}>{entry.company}</span>
          <span className={styles.role}>{entry.role}</span>
          <span className={styles.dates}>{entry.dateRange}</span>
          <span className={styles.toggle}>{hasDetail ? (open ? "−" : "+") : ""}</span>
        </button>

        <p className={styles.oneLiner}>{entry.oneLiner}</p>

        {hasDetail && (
          <div
            id={panelId}
            className={`${styles.panel} ${open ? styles.panelOpen : ""}`}
          >
            <div className={styles.panelInner}>
              <ul className={styles.detail}>
                {entry.detail!.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </Reveal>
  );
}

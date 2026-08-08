"use client";

import { useState } from "react";
import type { ExperienceEntry } from "@/data/experience";
import { useProximity } from "@/lib/useProximity";
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
  const rowRef = useProximity<HTMLDivElement>(PROXIMITY_PX);
  const hasDetail = Boolean(entry.detail && entry.detail.length > 0);
  const panelId = `archive-detail-${entry.id}`;

  return (
    <div ref={rowRef} className={styles.row}>
      <button
        type="button"
        className={`${styles.trigger} ${hasDetail ? "" : styles.triggerStatic}`}
        onClick={() => hasDetail && setOpen((v) => !v)}
        aria-expanded={hasDetail ? open : undefined}
        aria-controls={hasDetail ? panelId : undefined}
      >
        <span className={styles.index}>{String(index).padStart(2, "0")}</span>
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
  );
}

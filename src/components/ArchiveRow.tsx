"use client";

import { useEffect, useRef, useState } from "react";
import type { ExperienceEntry } from "@/data/experience";
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
  const rowRef = useRef<HTMLDivElement | null>(null);
  const hasDetail = Boolean(entry.detail && entry.detail.length > 0);
  const panelId = `archive-detail-${entry.id}`;

  useEffect(() => {
    const row = rowRef.current;
    if (!row) return;

    const canHover =
      window.matchMedia("(pointer: fine)").matches &&
      window.matchMedia("(prefers-reduced-motion: no-preference)").matches;
    if (!canHover) return;

    function handleMove(e: MouseEvent) {
      const rect = row!.getBoundingClientRect();
      const withinX = e.clientX >= rect.left && e.clientX <= rect.right;
      const near = withinX && Math.abs(e.clientY - rect.top) < PROXIMITY_PX;
      row!.classList.toggle(styles.lit, near);
    }

    window.addEventListener("mousemove", handleMove);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      row.classList.remove(styles.lit);
    };
  }, []);

  return (
    <div ref={rowRef} className={styles.row}>
      <button
        type="button"
        className={styles.trigger}
        onClick={() => hasDetail && setOpen((v) => !v)}
        aria-expanded={hasDetail ? open : undefined}
        aria-controls={hasDetail ? panelId : undefined}
        style={{ cursor: hasDetail ? "pointer" : "default" }}
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

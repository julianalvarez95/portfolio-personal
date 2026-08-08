"use client";

import { useEffect, useRef } from "react";
import type { ExperienceEntry } from "@/data/experience";
import { subscribe } from "@/lib/activeStepField";
import { useActiveStepListener } from "@/lib/useActiveStep";
import styles from "./AssemblyRail.module.css";

/**
 * The decorative echo of Archive's "archive" activeStepField group — the
 * direction contract's "growing, ghosted structure": each node stamps
 * `data-passed` permanently once its real row has been the active step,
 * and never loses it again even scrolling back up, mirroring Reveal's
 * one-shot semantics at the group level instead of per-node intersection
 * (a node here can't observe its own viewport position meaningfully once
 * the rail is sticky-pinned — see activeStepField's `subscribe`).
 */
function RailNode({ entry, index }: { entry: ExperienceEntry; index: number }) {
  const currentRef = useActiveStepListener<HTMLDivElement>("archive", entry.id);

  return (
    <div ref={currentRef} className={styles.node} data-index={index}>
      {String(index + 1).padStart(2, "0")}
    </div>
  );
}

export function AssemblyRail({ entries }: { entries: ExperienceEntry[] }) {
  const pinRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const pin = pinRef.current;
    if (!pin) return;

    const ids = entries.map((e) => e.id);
    let maxIndex = -1;

    return subscribe("archive", (activeId) => {
      const idx = activeId ? ids.indexOf(activeId) : -1;
      if (idx > maxIndex) maxIndex = idx;

      pin.style.setProperty("--progress", String((maxIndex + 1) / ids.length));

      const nodes = pin.querySelectorAll<HTMLElement>("[data-index]");
      nodes.forEach((node) => {
        if (Number(node.dataset.index) <= maxIndex) node.setAttribute("data-passed", "");
        else node.removeAttribute("data-passed");
      });
    });
  }, [entries]);

  return (
    <div className={styles.rail} aria-hidden="true">
      <div ref={pinRef} className={styles.pin}>
        <div className={styles.lineBase} />
        <div className={styles.lineFill} />
        <div className={styles.nodes}>
          {entries.map((entry, i) => (
            <RailNode key={entry.id} entry={entry} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

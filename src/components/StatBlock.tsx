"use client";

import { useRef } from "react";
import { useInView } from "@/lib/useInView";
import { useCountUp, renderCountUpInitial } from "@/lib/useCountUp";
import { useProximity } from "@/lib/useProximity";
import styles from "./StatBlock.module.css";

const PROXIMITY_PX = 30;

export function StatBlock({
  value,
  label,
  accent,
  variant,
}: {
  value: string;
  label: string;
  accent?: boolean;
  /**
   * Distinct blueprint-native readouts sharing one animated core
   * (count-up, proximity-driven accent) instead of one template repeated
   * verbatim per section: `ledger` (Now's inline dimension-line strip),
   * `plate` (CaseStudy's stamped spec panel), `bracket` (Lab's
   * instrument-gauge readout). Required, not defaulted — a call site
   * that doesn't choose one is exactly how the banned generic template
   * creeps back in.
   */
  variant: "ledger" | "plate" | "bracket";
}) {
  const { ref: inViewRef, inView } = useInView<HTMLDivElement>();
  const proximityRef = useProximity<HTMLDivElement>(PROXIMITY_PX);
  const valueRef = useRef<HTMLSpanElement>(null);
  useCountUp(valueRef, value, inView);

  const setRefs = (el: HTMLDivElement | null) => {
    inViewRef.current = el;
    proximityRef.current = el;
  };

  const classes = [styles.block, styles[variant]].filter(Boolean).join(" ");
  const valueClasses = [styles.value, accent ? styles.accent : ""]
    .filter(Boolean)
    .join(" ");

  return (
    <div ref={setRefs} className={classes}>
      <span ref={valueRef} className={valueClasses}>
        {renderCountUpInitial(value)}
      </span>
      <span className={styles.label}>{label}</span>
    </div>
  );
}

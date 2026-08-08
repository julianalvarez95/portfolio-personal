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
  compact,
}: {
  value: string;
  label: string;
  accent?: boolean;
  compact?: boolean;
}) {
  const { ref: inViewRef, inView } = useInView<HTMLDivElement>();
  const proximityRef = useProximity<HTMLDivElement>(PROXIMITY_PX);
  const valueRef = useRef<HTMLSpanElement>(null);
  useCountUp(valueRef, value, inView);

  const setRefs = (el: HTMLDivElement | null) => {
    inViewRef.current = el;
    proximityRef.current = el;
  };

  const classes = [styles.block, compact ? styles.compact : ""]
    .filter(Boolean)
    .join(" ");
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

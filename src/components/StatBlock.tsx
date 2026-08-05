"use client";

import { useEffect } from "react";
import { useInView } from "@/lib/useInView";
import { useCountUp } from "@/lib/useCountUp";
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
  const { ref, inView } = useInView<HTMLDivElement>();
  const display = useCountUp(value, inView);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const canHover =
      window.matchMedia("(pointer: fine)").matches &&
      window.matchMedia("(prefers-reduced-motion: no-preference)").matches;
    if (!canHover) return;

    function handleMove(e: MouseEvent) {
      const rect = el!.getBoundingClientRect();
      const withinX = e.clientX >= rect.left && e.clientX <= rect.right;
      const near = withinX && Math.abs(e.clientY - rect.top) < PROXIMITY_PX;
      el!.classList.toggle(styles.litBorder, near);
    }

    window.addEventListener("mousemove", handleMove);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      el.classList.remove(styles.litBorder);
    };
  }, [ref]);

  const classes = [styles.block, compact ? styles.compact : ""]
    .filter(Boolean)
    .join(" ");
  const valueClasses = [styles.value, accent ? styles.accent : ""]
    .filter(Boolean)
    .join(" ");

  return (
    <div ref={ref} className={classes}>
      <span className={valueClasses}>{display}</span>
      <span className={styles.label}>{label}</span>
    </div>
  );
}

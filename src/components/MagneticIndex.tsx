"use client";

import type { ReactNode } from "react";
import { useMagnetic } from "@/lib/useMagnetic";
import styles from "./MagneticIndex.module.css";

export function MagneticIndex({
  children,
  className,
  radius,
  strength,
  maxPull,
}: {
  children: ReactNode;
  className?: string;
  radius?: number;
  strength?: number;
  maxPull?: number;
}) {
  const ref = useMagnetic<HTMLSpanElement>({ radius, strength, maxPull });

  return (
    <span ref={ref} className={`${styles.magnetic} ${className ?? ""}`}>
      {children}
    </span>
  );
}

"use client";

import { useEffect, useState } from "react";
import { formatLocalTime } from "@/lib/format";
import styles from "./LiveClock.module.css";

export function LiveClock({ timeZone }: { timeZone: string }) {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const update = () => setTime(formatLocalTime(timeZone, new Date()));
    update();
    const interval = setInterval(update, 15_000);
    return () => clearInterval(interval);
  }, [timeZone]);

  // Rendered only after mount to avoid a server/client time mismatch.
  if (!time) return null;

  return <span className={styles.clock}>{time}</span>;
}

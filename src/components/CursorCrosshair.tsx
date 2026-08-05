"use client";

import { useEffect, useRef } from "react";
import styles from "./CursorCrosshair.module.css";

export function CursorCrosshair() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const hLineRef = useRef<HTMLDivElement | null>(null);
  const vLineRef = useRef<HTMLDivElement | null>(null);
  const coordsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const canHover =
      window.matchMedia("(pointer: fine)").matches &&
      window.matchMedia("(prefers-reduced-motion: no-preference)").matches;
    if (!canHover) return;

    let frame = 0;
    let pending: { x: number; y: number } | null = null;

    function apply() {
      frame = 0;
      if (!pending) return;
      const { x, y } = pending;
      if (hLineRef.current) hLineRef.current.style.transform = `translateY(${y}px)`;
      if (vLineRef.current) vLineRef.current.style.transform = `translateX(${x}px)`;
      if (coordsRef.current) {
        coordsRef.current.style.transform = `translate(${x + 14}px, ${y - 28}px)`;
        coordsRef.current.textContent = `X: ${Math.round(x)}   Y: ${Math.round(y)}`;
      }
    }

    function handleMove(e: MouseEvent) {
      pending = { x: e.clientX, y: e.clientY };
      rootRef.current?.classList.add(styles.active);
      if (!frame) frame = requestAnimationFrame(apply);
    }

    window.addEventListener("mousemove", handleMove);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={rootRef} className={styles.overlay} aria-hidden="true">
      <div ref={hLineRef} className={styles.hLine} />
      <div ref={vLineRef} className={styles.vLine} />
      <div ref={coordsRef} className={styles.coords}>
        X: 000   Y: 000
      </div>
    </div>
  );
}

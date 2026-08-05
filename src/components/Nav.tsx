"use client";

import { useEffect, useState } from "react";
import { MagneticIndex } from "./MagneticIndex";
import styles from "./Nav.module.css";

const NAV_ITEMS = [
  { id: "index", index: "00", label: "Index" },
  { id: "now", index: "01", label: "Now" },
  { id: "work", index: "02", label: "Work" },
  { id: "archive", index: "03", label: "Archive" },
  { id: "capabilities", index: "04", label: "Capabilities" },
  { id: "lab", index: "05", label: "Lab" },
  { id: "contact", index: "06", label: "Contact" },
] as const;

export function Nav() {
  const [activeId, setActiveId] = useState<string>("index");

  useEffect(() => {
    const sections = NAV_ITEMS.map((item) => document.getElementById(item.id)).filter(
      (el): el is HTMLElement => el !== null
    );
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <nav className={styles.nav} aria-label="Section navigation">
      <a href="#index" className={styles.brand}>
        JA
      </a>
      <ul className={styles.list}>
        {NAV_ITEMS.map((item) => {
          const isActive = activeId === item.id;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={`${styles.link} ${isActive ? styles.active : ""}`}
                aria-current={isActive ? "true" : undefined}
              >
                <MagneticIndex
                  className={styles.linkIndex}
                  radius={44}
                  strength={0.3}
                  maxPull={4}
                >
                  {item.index}
                </MagneticIndex>
                <span className={styles.linkLabel}>{item.label}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

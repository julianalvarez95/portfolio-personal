"use client";

import posthog from "posthog-js";
import styles from "./Lab.module.css";

export function LabRepoLink({ href }: { href: string }) {
  return (
    <a
      className={styles.repoLink}
      href={href}
      target="_blank"
      rel="noreferrer"
      onClick={() => posthog.capture("lab_repo_opened")}
    >
      View repo ↗
    </a>
  );
}

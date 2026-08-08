import { archiveEntries } from "@/data/experience";
import { SectionHeading } from "./SectionHeading";
import { ArchiveRow } from "./ArchiveRow";
import { AssemblyRail } from "./AssemblyRail";
import styles from "./Archive.module.css";

export function Archive() {
  return (
    <section id="archive" className="section">
      <div className="container">
        <SectionHeading index="03" title="Archive" />
        <div className={styles.labels}>
          <span>No.</span>
          <span>Company</span>
          <span>Role</span>
          <span>Dates</span>
          <span />
        </div>
        <div className={styles.track}>
          {archiveEntries.map((entry, i) => (
            <ArchiveRow key={entry.id} entry={entry} index={i + 1} />
          ))}
          <AssemblyRail entries={archiveEntries} />
        </div>
      </div>
    </section>
  );
}

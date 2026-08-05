import { site } from "@/data/site";
import { SectionHeading } from "./SectionHeading";
import { StatStrip } from "./StatStrip";
import styles from "./Now.module.css";

export function Now() {
  return (
    <section id="now" className="section">
      <div className="container">
        <SectionHeading index="01" title="Now" />
        <div className={styles.layout}>
          <p className={styles.bio}>{site.summary}</p>
          <StatStrip stats={[...site.metaStats]} />
        </div>
      </div>
    </section>
  );
}

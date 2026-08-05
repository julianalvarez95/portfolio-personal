import { site } from "@/data/site";
import { ScrollIndicator } from "./ScrollIndicator";
import styles from "./Hero.module.css";

export function Hero() {
  return (
    <section id="index" className={`section ${styles.hero}`}>
      <div className={`container ${styles.top}`}>
        <span className={styles.eyebrow}>{site.role}</span>
        <h1 className={styles.name}>{site.name}</h1>
        <p className={styles.tagline}>{site.tagline}</p>
      </div>
      <div className={`container ${styles.bottom}`}>
        <span className={styles.meta}>
          <span>{site.location}</span>
          <span>00 / Index</span>
        </span>
        <ScrollIndicator />
      </div>
    </section>
  );
}

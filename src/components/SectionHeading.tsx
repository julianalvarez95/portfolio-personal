import { MagneticIndex } from "./MagneticIndex";
import { Reveal } from "./motion/Reveal";
import styles from "./SectionHeading.module.css";

export function SectionHeading({
  index,
  title,
}: {
  index: string;
  title: string;
}) {
  return (
    <Reveal className={styles.wrap} threshold={0.4}>
      <div className={styles.row}>
        <span className={styles.plate}>
          <MagneticIndex className={styles.index}>{index}</MagneticIndex>
        </span>
        <span className={styles.slash}>/</span>
        <h2 className={styles.title}>{title}</h2>
      </div>
      <div className={styles.rule} />
    </Reveal>
  );
}

import { MagneticIndex } from "./MagneticIndex";
import styles from "./SectionHeading.module.css";

export function SectionHeading({
  index,
  title,
}: {
  index: string;
  title: string;
}) {
  return (
    <div className={styles.wrap}>
      <div className={styles.row}>
        <MagneticIndex className={styles.index}>{index}</MagneticIndex>
        <span className={styles.slash}>/</span>
        <h2 className={styles.title}>{title}</h2>
      </div>
      <div className={styles.rule} />
    </div>
  );
}

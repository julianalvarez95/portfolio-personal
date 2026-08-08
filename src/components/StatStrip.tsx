import { StatBlock } from "./StatBlock";
import styles from "./StatStrip.module.css";

export function StatStrip({
  stats,
}: {
  stats: { value: string; label: string }[];
}) {
  return (
    <div className={styles.strip}>
      {stats.map((stat) => (
        <StatBlock
          key={stat.label}
          value={stat.value}
          label={stat.label}
          variant="ledger"
        />
      ))}
    </div>
  );
}

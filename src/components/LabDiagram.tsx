import styles from "./LabDiagram.module.css";

const LOOP_NODES = [
  { label: "Git push", detail: "this repo" },
  { label: "ArgoCD", detail: "watch + sync" },
  { label: "k3s", detail: "self-heal on" },
  { label: "Agents", detail: "morning-digest, watchdog" },
  { label: "Telegram", detail: "delivery" },
];

export function LabDiagram() {
  return (
    <div
      id="lab-diagram"
      className={styles.diagram}
      role="img"
      aria-label="GitOps reconciliation loop: a git push is picked up by ArgoCD, applied to the k3s cluster, run by the morning-digest and watchdog agents, and delivered via Telegram — with tracing branching off to Phoenix and VictoriaMetrics."
    >
      <div className={styles.row}>
        {LOOP_NODES.map((node, i) => (
          <div className={styles.step} key={node.label}>
            <div className={styles.node}>
              <span className={styles.nodeLabel}>{node.label}</span>
              <span className={styles.nodeDetail}>{node.detail}</span>
            </div>
            {i < LOOP_NODES.length - 1 && (
              <span className={styles.arrow} aria-hidden="true">
                →
              </span>
            )}
          </div>
        ))}
      </div>

      <div className={styles.rail}>
        <span className={styles.pulse} />
      </div>
      <p className={styles.railCaption}>
        continuous reconciliation loop — nothing changes on the cluster by hand
      </p>

      <div className={styles.branch}>
        <span className={styles.branchArrow} aria-hidden="true">
          ↳
        </span>
        <div className={styles.branchNode}>
          <span className={styles.nodeLabel}>Observability</span>
          <span className={styles.nodeDetail}>
            Phoenix + VictoriaMetrics — fail-open tracing on every agent run
          </span>
        </div>
      </div>
    </div>
  );
}

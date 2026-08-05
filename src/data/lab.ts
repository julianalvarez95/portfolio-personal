export const lab = {
  project: "homelab-gitops",
  tagline: "A retired laptop, governed entirely by Git, running LLM agents.",
  narrative:
    "A Dell Latitude 7490 that used to gather dust — no battery, no GPU, plugged in 24/7 — turned into a single-node Kubernetes cluster where nothing is touched by hand: if something changes, it changes in this repo, gets committed, and ArgoCD applies it with self-heal on. Two agents run as CronJobs against the OpenAI API — one turns RSS feeds into a daily digest, the other watches cluster health and pages only on real state changes, with its own hysteresis logic to avoid alert spam.",
  repoUrl: "https://github.com/julianalvarez95/homelab-gitops",
  stats: [
    {
      value: "1",
      label: "node — Dell Latitude 7490, no GPU, no battery",
    },
    {
      value: "2",
      label: "LLM agents in production — morning-digest, watchdog",
    },
    { value: "10min", label: "watchdog health-check interval" },
    { value: "10 day", label: "metrics retention — VictoriaMetrics" },
  ],
  stack: [
    "k3s",
    "ArgoCD",
    "Debian 13",
    "Docker",
    "Python",
    "OpenAI API",
    "Phoenix",
    "VictoriaMetrics",
    "Pi-hole",
    "Tailscale",
  ],
} as const;

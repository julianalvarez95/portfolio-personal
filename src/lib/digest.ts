export type DigestItem = {
  headline: string;
  summary: string;
  source: string;
  url: string;
};

export type Digest = {
  generatedAt: string;
  items: DigestItem[];
};

export type DigestSlide = DigestItem & {
  generatedAt: string;
};

const DIGEST_AGENT_URL = "https://digest-agent.vercel.app/digests";

/**
 * Fallback content, shown until `digest-agent` has accumulated real digests
 * from homelab-gitops' morning-digest CronJob (that patch is separate from
 * this repo). Newest first, capped at 3 — mirrors digest-agent's retention
 * window. Once real digests exist, `getDigests` prefers them automatically.
 */
const MOCK_DIGESTS: Digest[] = [
  {
    generatedAt: "2026-08-06T09:00:00Z",
    items: [
      {
        headline: "k3s 1.31 ships in-place node upgrades for single-node clusters",
        summary:
          "Reduces the downtime window for homelab-scale clusters running on a single node with no failover.",
        source: "Kubernetes Blog",
        url: "https://kubernetes.io/blog/",
      },
      {
        headline: "ArgoCD adds native drift-detection webhooks",
        summary:
          "Self-heal loops can now react to out-of-band changes in seconds instead of polling on an interval.",
        source: "CNCF",
        url: "https://argo-cd.readthedocs.io/",
      },
      {
        headline: "VictoriaMetrics cuts default retention overhead for single-node setups",
        summary:
          "New storage engine defaults trim disk usage for low-cardinality homelab deployments.",
        source: "VictoriaMetrics",
        url: "https://victoriametrics.com/blog/",
      },
    ],
  },
  {
    generatedAt: "2026-08-05T09:00:00Z",
    items: [
      {
        headline: "Tailscale Funnel adds per-route access rules",
        summary:
          "Lets self-hosters expose a single read-only endpoint without opening the rest of the tailnet.",
        source: "Tailscale",
        url: "https://tailscale.com/blog/",
      },
      {
        headline: "Pi-hole 6 stabilizes its REST API",
        summary:
          "Cleaner scripting surface for homelab dashboards that poll DNS-blocking stats.",
        source: "Pi-hole",
        url: "https://pi-hole.net/",
      },
    ],
  },
  {
    generatedAt: "2026-08-04T09:00:00Z",
    items: [
      {
        headline: "OpenAI API adds stricter per-key spend caps",
        summary:
          "Useful for CronJob-based agents that must fail closed rather than run up an unbounded bill.",
        source: "OpenAI",
        url: "https://platform.openai.com/docs/",
      },
      {
        headline: "Debian 13 point release improves low-RAM install defaults",
        summary:
          "Relevant for repurposed hardware running a single-node cluster with no memory to spare.",
        source: "Debian",
        url: "https://www.debian.org/News/",
      },
      {
        headline: "Phoenix tracing adds cost-per-span for LLM calls",
        summary:
          "Makes it possible to see exactly which agent run drove a spike in API spend.",
        source: "Arize Phoenix",
        url: "https://phoenix.arize.com/",
      },
    ],
  },
];

export type DigestResult = { digests: Digest[]; live: boolean };

/**
 * `live: false` means MOCK_DIGESTS shipped — synthetic content written to
 * closely resemble the real agent's output. The primary visitor is a
 * technical hiring manager inclined to verify, so the UI must label this
 * state honestly instead of presenting invented headlines as "Live" (see
 * PRODUCT.md's Capabilities and Constraints).
 */
export async function getDigests(): Promise<DigestResult> {
  const secret = process.env.DIGEST_READ_SECRET;
  if (secret) {
    try {
      const res = await fetch(DIGEST_AGENT_URL, {
        headers: { "X-Digest-Secret": secret },
        cache: "no-store",
      });
      if (res.ok) {
        const data = (await res.json()) as { digests?: Digest[] };
        if (data.digests && data.digests.length > 0) {
          return { digests: data.digests, live: true };
        }
      }
    } catch {
      // digest-agent unreachable — fall through to the mock below.
    }
  }
  return { digests: MOCK_DIGESTS, live: false };
}

export function flattenDigests(digests: Digest[]): DigestSlide[] {
  return digests.flatMap((digest) =>
    digest.items.map((item) => ({ ...item, generatedAt: digest.generatedAt }))
  );
}

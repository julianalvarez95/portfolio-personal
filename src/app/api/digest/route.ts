import { NextResponse } from "next/server";
import { getDigests } from "@/lib/digest";
import { getPostHogClient } from "@/lib/posthog-server";

export async function GET() {
  const { digests, live } = await getDigests();

  const posthog = getPostHogClient();
  if (posthog) {
    posthog.capture({
      distinctId: "server",
      event: "digest_feed_requested",
      properties: { live, digest_count: digests.length },
    });
    await posthog.flush();
  }

  return NextResponse.json({ digests });
}

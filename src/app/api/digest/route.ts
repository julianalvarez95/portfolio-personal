import { NextResponse } from "next/server";
import { getDigests } from "@/lib/digest";

export async function GET() {
  const digests = await getDigests();
  return NextResponse.json({ digests });
}

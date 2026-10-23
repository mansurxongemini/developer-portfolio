import { NextResponse } from "next/server";
import { buildHomeBundle } from "@/lib/home-data";
import { buildDefaultBundle } from "@/lib/home-shape";

export const dynamic = "force-dynamic";

// GET - everything the public pages render from admin-managed data (no auth)
export async function GET() {
  try {
    const bundle = await buildHomeBundle();
    return NextResponse.json(bundle, {
      headers: { "Cache-Control": "public, s-maxage=15, stale-while-revalidate=120" },
    });
  } catch (error) {
    console.error("[GET /api/content/home]", error instanceof Error ? error.message : error);
    return NextResponse.json(buildDefaultBundle(), { headers: { "Cache-Control": "no-store" } });
  }
}

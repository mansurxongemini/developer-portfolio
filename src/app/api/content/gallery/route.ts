import { NextResponse } from "next/server";
import { getGalleryItems } from "@/lib/firestore-server";

// GET - Fetch all gallery items (public, no auth)
export async function GET() {
  try {
    const items = await getGalleryItems();
    return NextResponse.json({ items });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch gallery";
    console.error("[GET /api/content/gallery]", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

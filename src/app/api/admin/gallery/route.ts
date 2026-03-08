import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getGalleryItems, addGalleryItem } from "@/lib/firestore-server";
import { verifyAdminRequest } from "@/lib/admin-auth";

// GET - List all gallery items
export async function GET(request: NextRequest) {
  if (!(await verifyAdminRequest(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const items = await getGalleryItems();
    return NextResponse.json({ items }, { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch gallery items";
    console.error("[GET /api/admin/gallery]", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// POST - Create a new gallery item
export async function POST(request: NextRequest) {
  if (!(await verifyAdminRequest(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { title, description, imageUrl, category, ratio, date, featured } = body;

    if (!title || !imageUrl || !category) {
      return NextResponse.json({ error: "Missing required fields (title, imageUrl, category)" }, { status: 400 });
    }

    const id = await addGalleryItem({
      title,
      description: description || "",
      imageUrl,
      category,
      ratio: ratio || "landscape",
      date: date || new Date().getFullYear().toString(),
      featured: featured ?? false,
    });

    return NextResponse.json({ success: true, id }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to create gallery item";
    console.error("[POST /api/admin/gallery]", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

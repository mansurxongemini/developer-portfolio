import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { updateGalleryItem, deleteGalleryItem } from "@/lib/firestore-server";
import { verifyAdminRequest } from "@/lib/admin-auth";

// PUT - Update a gallery item
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await verifyAdminRequest(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  try {
    const body = await request.json();
    await updateGalleryItem(id, body);
    return NextResponse.json({ success: true, id }, { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to update gallery item";
    console.error("[PUT /api/admin/gallery/id]", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// DELETE - Delete a gallery item
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await verifyAdminRequest(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  try {
    await deleteGalleryItem(id);
    return NextResponse.json({ success: true, id }, { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to delete gallery item";
    console.error("[DELETE /api/admin/gallery/id]", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

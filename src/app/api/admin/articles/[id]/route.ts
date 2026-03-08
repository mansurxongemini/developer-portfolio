import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { deleteArticle, getArticleById, updateArticle } from "@/lib/firestore-server";
import { verifyAdminRequest } from "@/lib/admin-auth";

// GET - Get a single article by id
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await verifyAdminRequest(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  try {
    const article = await getArticleById(id);
    if (!article) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }

    return NextResponse.json({ article }, { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch article";
    console.error("[GET /api/admin/articles/id]", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// PUT - Update an article
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
    await updateArticle(id, {
      ...body,
      image: body.image ?? body.imageUrl,
      imageUrl: body.imageUrl ?? body.image,
    });
    return NextResponse.json({ success: true, id }, { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to update article";
    console.error("[PUT /api/admin/articles/id]", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// DELETE - Delete an article
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await verifyAdminRequest(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  try {
    await deleteArticle(id);
    return NextResponse.json({ success: true, id }, { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to delete article";
    console.error("[DELETE /api/admin/articles/id]", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { deleteProject, getProjectById, updateProject } from "@/lib/firestore-server";
import { verifyAdminRequest } from "@/lib/admin-auth";

// GET - Get a single project by id
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await verifyAdminRequest(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  try {
    const project = await getProjectById(id);
    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json({ project }, { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch project";
    console.error("[GET /api/admin/projects/id]", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// PUT - Update a project
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
    await updateProject(id, {
      ...body,
      image: body.image ?? body.imageUrl,
      imageUrl: body.imageUrl ?? body.image,
    });
    return NextResponse.json({ success: true, id });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to update project";
    console.error("[PUT /api/admin/projects/id]", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// DELETE - Delete a project
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await verifyAdminRequest(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  try {
    await deleteProject(id);
    return NextResponse.json({ success: true, id });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to delete project";
    console.error("[DELETE /api/admin/projects/id]", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

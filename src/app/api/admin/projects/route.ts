import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { verifyAdminRequest } from "@/lib/admin-auth";
import { listAllProjects, createProject, getProjectBySlug, isFirestoreConfigured } from "@/lib/firestore-server";

// GET - List all projects
export async function GET(request: NextRequest) {
  if (!(await verifyAdminRequest(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    if (!isFirestoreConfigured()) {
      return NextResponse.json(
        { error: "Firestore is not configured on this server (FIREBASE_SERVICE_ACCOUNT_KEY is missing)." },
        { status: 503 },
      );
    }
    const projects = await listAllProjects();
    return NextResponse.json({ projects });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch projects";
    console.error("[GET /api/admin/projects]", message);
    return NextResponse.json(
      { error: message },
      { status: 500 },
    );
  }
}

// POST - Create a new project
export async function POST(request: NextRequest) {
  if (!(await verifyAdminRequest(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { title, shortTitle, slug, description, content, tags, image, imageUrl, link, status } = body;

    if (!title || !slug || !description) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (!/^[a-z0-9-]+$/.test(slug)) {
      return NextResponse.json({ error: "Slug must only contain lowercase letters, numbers, and hyphens" }, { status: 400 });
    }

    const existing = await getProjectBySlug(slug);
    if (existing) {
      return NextResponse.json({ error: "Slug already exists" }, { status: 409 });
    }

    const id = await createProject({
      title,
      shortTitle: typeof shortTitle === "string" && shortTitle.trim() ? shortTitle.trim() : undefined,
      slug,
      description,
      content: content || "",
      tags: tags || [],
      image: image || imageUrl || undefined,
      imageUrl: imageUrl || image || undefined,
      link: link || undefined,
      status: status || "draft",
      publishedAt: status === "published" ? new Date() : null,
    });

    return NextResponse.json({ success: true, id });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Invalid request body";
    console.error("[POST /api/admin/projects]", message);
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

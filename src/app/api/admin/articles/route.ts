import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { verifyAdminRequest } from "@/lib/admin-auth";
import { getArticles, createArticle, getArticleBySlug } from "@/lib/firestore-server";

// GET - List all articles
export async function GET(request: NextRequest) {
  if (!(await verifyAdminRequest(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const articles = await getArticles();
    return NextResponse.json({ articles }, { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch articles";
    console.error("[GET /api/admin/articles]", message);
    return NextResponse.json(
      { error: message },
      { status: 500 },
    );
  }
}

// POST - Create a new article
export async function POST(request: NextRequest) {
  if (!(await verifyAdminRequest(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { title, slug, content, summary, tags, category, status, locale, image, imageUrl } = body;

    if (!title || !slug || !content || !category) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Validate slug format
    if (!/^[a-z0-9-]+$/.test(slug)) {
      return NextResponse.json({ error: "Slug must only contain lowercase letters, numbers, and hyphens" }, { status: 400 });
    }

    const existing = await getArticleBySlug(slug);
    if (existing) {
      return NextResponse.json({ error: "Slug already exists" }, { status: 409 });
    }

    const id = await createArticle({
      title,
      slug,
      content,
      summary: summary || "",
      tags: tags || [],
      category,
      status: status || "draft",
      locale: locale || "en",
      image: image || imageUrl || undefined,
      imageUrl: imageUrl || image || undefined,
      publishedAt: status === "published" ? new Date() : null,
    });

    return NextResponse.json({ success: true, id }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to create article";
    console.error("[POST /api/admin/articles]", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

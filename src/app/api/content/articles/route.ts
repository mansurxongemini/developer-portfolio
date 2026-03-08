import { NextRequest, NextResponse } from "next/server";
import { getPublishedArticles, getArticleBySlug } from "@/lib/firestore-server";

// GET - Fetch published articles (public, no auth)
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const locale = searchParams.get("locale") || undefined;
  const slug = searchParams.get("slug");

  try {
    if (slug) {
      const article = await getArticleBySlug(slug);
      if (!article || article.status !== "published") {
        return NextResponse.json({ error: "Article not found" }, { status: 404 });
      }
      return NextResponse.json({ article });
    }

    const articles = await getPublishedArticles(locale);
    return NextResponse.json({ articles });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch articles";
    console.error("[GET /api/content/articles]", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

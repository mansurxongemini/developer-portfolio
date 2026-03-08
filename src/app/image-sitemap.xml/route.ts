import { NextResponse } from "next/server";
import { baseURL } from "@/resources";

export const dynamic = "force-static";

type ImageEntry = {
  pageUrl: string;
  imageUrl: string;
  title?: string;
};

function xmlEscape(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export async function GET() {
  const entries: ImageEntry[] = [
    {
      pageUrl: `${baseURL}/about`,
      imageUrl: `${baseURL}/images/avatar.jpg`,
      title: "Mansurxon Rustamov avatar",
    },
    {
      pageUrl: `${baseURL}/`,
      imageUrl: `${baseURL}/images/og/home.jpg`,
      title: "Mansurxon Rustamov homepage cover",
    },
  ];

  try {
    const { getPublishedArticles, getPublishedProjects } = await import("@/lib/firestore-server");

    const [articles, projects] = await Promise.all([
      getPublishedArticles(),
      getPublishedProjects(),
    ]);

    for (const article of articles) {
      if (!article.image) continue;
      entries.push({
        pageUrl: `${baseURL}/${article.locale}/blog/${article.slug}`,
        imageUrl: article.image.startsWith("http") ? article.image : `${baseURL}${article.image}`,
        title: article.title,
      });
    }

    for (const project of projects) {
      const image = project.image || project.imageUrl;
      if (!image) continue;
      entries.push({
        pageUrl: `${baseURL}/work/${project.slug}`,
        imageUrl: image.startsWith("http") ? image : `${baseURL}${image}`,
        title: project.title,
      });
    }
  } catch {
    // Keep route resilient when Firestore is unavailable.
  }

  const uniqueEntries = entries.filter(
    (entry, index, list) =>
      list.findIndex((candidate) => candidate.pageUrl === entry.pageUrl && candidate.imageUrl === entry.imageUrl) === index,
  );

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${uniqueEntries
  .map(
    (entry) => `  <url>
    <loc>${xmlEscape(entry.pageUrl)}</loc>
    <image:image>
      <image:loc>${xmlEscape(entry.imageUrl)}</image:loc>
      ${entry.title ? `<image:title>${xmlEscape(entry.title)}</image:title>` : ""}
    </image:image>
  </url>`,
  )
  .join("\n")}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}

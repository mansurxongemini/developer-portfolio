import { getPublishedArticles } from "@/lib/firestore-server";
import { baseURL, blog, person } from "@/resources";
import { NextResponse } from "next/server";

export async function GET() {
  let sortedPosts: { slug: string; title: string; summary: string; publishedAt: string; image?: string; category?: string }[] = [];

  try {
    const articles = await getPublishedArticles();
    sortedPosts = articles
      .map((a) => ({
        slug: a.slug,
        title: a.title,
        summary: a.summary,
        publishedAt: (a.publishedAt instanceof Date ? a.publishedAt : a.createdAt instanceof Date ? a.createdAt : new Date()).toISOString(),
        image: a.image,
        category: a.category,
      }))
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  } catch {
    // Firestore unavailable — return empty feed
  }

  // Generate RSS XML
  const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${blog.title}</title>
    <link>${baseURL}/blog</link>
    <description>${blog.description}</description>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseURL}/api/rss" rel="self" type="application/rss+xml" />
    <managingEditor>${person.email || "noreply@example.com"} (${person.name})</managingEditor>
    <webMaster>${person.email || "noreply@example.com"} (${person.name})</webMaster>
    <image>
      <url>${baseURL}${person.avatar || "/images/avatar.jpg"}</url>
      <title>${blog.title}</title>
      <link>${baseURL}/blog</link>
    </image>
    ${sortedPosts
      .map(
        (post) => `
    <item>
      <title>${post.title}</title>
      <link>${baseURL}/blog/${post.slug}</link>
      <guid>${baseURL}/blog/${post.slug}</guid>
      <pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>
      <description><![CDATA[${post.summary}]]></description>
      ${post.image ? `<enclosure url="${baseURL}${post.image}" type="image/jpeg" />` : ""}
      ${post.category ? `<category>${post.category}</category>` : ""}
      <author>${person.email || "noreply@example.com"} (${person.name})</author>
    </item>`,
      )
      .join("")}
  </channel>
</rss>`;

  // Return the RSS XML with the appropriate content type
  return new NextResponse(rssXml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}

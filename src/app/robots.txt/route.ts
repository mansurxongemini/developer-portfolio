import { NextResponse } from "next/server";

import { baseURL } from "@/resources";

export const dynamic = "force-static";

export async function GET() {
  const robots = [
    "User-agent: Googlebot",
    "Allow: /",
    "Disallow: /admin",
    "Disallow: /admin/*",
    "Disallow: /api/admin",
    "Disallow: /api/admin/*",
    "",
    "User-agent: *",
    "Allow: /",
    "Disallow: /admin",
    "Disallow: /admin/*",
    "Disallow: /api/admin",
    "Disallow: /api/admin/*",
    "",
    `Sitemap: ${baseURL}/sitemap.xml`,
    `Sitemap: ${baseURL}/image-sitemap.xml`,
    "",
    `LLMs: ${baseURL}/llms.txt`,
  ].join("\n");

  return new NextResponse(robots, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}

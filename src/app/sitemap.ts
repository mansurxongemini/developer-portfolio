import type { MetadataRoute } from "next";

import { baseURL, routes as routesConfig } from "@/resources";

type RouteMetadata = {
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
};

const ROUTE_METADATA: Record<string, RouteMetadata> = {
  "/": { changeFrequency: "yearly", priority: 1.0 },
  "/work": { changeFrequency: "monthly", priority: 0.8 },
  "/blog": { changeFrequency: "weekly", priority: 0.8 },
};

const DEFAULT_ROUTE_METADATA: RouteMetadata = {
  changeFrequency: "monthly",
  priority: 0.5,
};

function toIsoDate(value: Date | string | null | undefined): string {
  if (!value) return new Date().toISOString();
  return (value instanceof Date ? value : new Date(value)).toISOString();
}

async function getPublishedBlogEntries(): Promise<MetadataRoute.Sitemap> {
  try {
    const { getPublishedArticles } = await import("@/lib/firestore-server");
    const articles = await getPublishedArticles();

    return articles
      .filter((article) => Boolean(article.slug))
      .map((article) => ({
        url: `${baseURL}/${article.locale}/blog/${article.slug}`,
        lastModified: toIsoDate(article.publishedAt ?? article.updatedAt ?? article.createdAt),
        changeFrequency: "weekly" as const,
        priority: 0.6,
      }));
  } catch {
    // Keep sitemap generation available even when Firestore is unavailable.
    return [];
  }
}

async function getPublishedWorkEntries(): Promise<MetadataRoute.Sitemap> {
  try {
    const { getPublishedProjects } = await import("@/lib/firestore-server");
    const projects = await getPublishedProjects();

    return projects
      .filter((project) => Boolean(project.slug))
      .map((project) => ({
        url: `${baseURL}/work/${project.slug}`,
        lastModified: toIsoDate(project.publishedAt ?? project.updatedAt ?? project.createdAt),
        changeFrequency: "monthly" as const,
        priority: 0.7,
      }));
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [blogs, works] = await Promise.all([
    getPublishedBlogEntries(),
    getPublishedWorkEntries(),
  ]);

  const activeRoutes = Object.keys(routesConfig).filter(
    (route) => routesConfig[route as keyof typeof routesConfig],
  );

  const routes = activeRoutes.map((route) => {
    const meta = ROUTE_METADATA[route] ?? DEFAULT_ROUTE_METADATA;
    return {
      url: `${baseURL}${route !== "/" ? route : ""}`,
      lastModified: new Date().toISOString(),
      changeFrequency: meta.changeFrequency,
      priority: meta.priority,
    };
  });

  return [...routes, ...blogs, ...works].filter(
    (entry, index, list) => list.findIndex((candidate) => candidate.url === entry.url) === index,
  );
}

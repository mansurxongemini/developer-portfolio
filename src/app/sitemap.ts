import type { MetadataRoute } from "next";

import { baseURL, routes as routesConfig } from "@/resources";

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

  const routes = activeRoutes.map((route) => ({
    url: `${baseURL}${route !== "/" ? route : ""}`,
    lastModified: new Date().toISOString(),
  }));

  return [...routes, ...blogs, ...works].filter(
    (entry, index, list) => list.findIndex((candidate) => candidate.url === entry.url) === index,
  );
}

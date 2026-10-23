// Client-safe shaping of projects/articles for the public pages, plus the bundle built
// only from what ships with the code (first render, offline, errors).

import type { Project, Article } from "@/lib/firestore-server";
import { getStaticProjects } from "@/lib/projects-data";
import { getArticles as getStaticArticles } from "@/lib/mock-articles";
import {
  LOCS,
  deriveShortTitle,
  type HomeArticle,
  type HomeBundle,
  type HomeProject,
  type Loc,
} from "@/lib/home-types";

const FALLBACK_COVER = "/images/site/texture-desk.jpg";

function yearOf(d: unknown): string {
  const date = d instanceof Date ? d : typeof d === "string" ? new Date(d) : null;
  return date && !Number.isNaN(date.getTime()) ? String(date.getFullYear()) : "";
}

export function toHomeProject(p: Project): HomeProject {
  const tags = Array.isArray(p.tags) ? p.tags : [];
  return {
    slug: p.slug,
    title: p.title,
    shortTitle: deriveShortTitle(p.slug, p.title, p.shortTitle),
    description: p.description || "",
    category: tags[0] || "",
    stack: tags.slice(1, 4),
    year: yearOf(p.publishedAt) || yearOf(p.createdAt),
    image: p.image || p.imageUrl || FALLBACK_COVER,
    link: p.link || "",
  };
}

export function toHomeArticle(a: Article): HomeArticle {
  const date = a.publishedAt || a.createdAt;
  return {
    slug: a.slug,
    title: a.title,
    date: date instanceof Date ? date.toISOString().slice(0, 10) : typeof date === "string" ? String(date).slice(0, 10) : "",
    image: a.image || a.imageUrl || undefined,
  };
}

export function byDateDesc<T extends { date?: string; year?: string }>(a: T, b: T): number {
  return (b.date || b.year || "").localeCompare(a.date || a.year || "");
}

export function buildDefaultBundle(): HomeBundle {
  const projects = {} as Record<Loc, HomeProject[]>;
  const articles = {} as Record<Loc, HomeArticle[]>;
  for (const loc of LOCS) {
    projects[loc] = getStaticProjects(loc).map(toHomeProject);
    articles[loc] = getStaticArticles(loc)
      .map((a) => ({ slug: a.slug, title: a.title, date: a.publishedAt, image: a.image }))
      .sort(byDateDesc);
  }
  return { projects, articles };
}

/** Accept whatever came over the wire; anything malformed falls back to the shipped content. */
export function normalizeBundle(raw: unknown): HomeBundle {
  const fallback = buildDefaultBundle();
  if (!raw || typeof raw !== "object") return fallback;
  const r = raw as Record<string, any>;
  const out: HomeBundle = { projects: { ...fallback.projects }, articles: { ...fallback.articles } };
  for (const loc of LOCS) {
    if (Array.isArray(r.projects?.[loc]) && r.projects[loc].length) {
      out.projects[loc] = r.projects[loc]
        .filter((p: any) => p && typeof p.slug === "string" && typeof p.title === "string")
        .map((p: any) => ({
          slug: p.slug,
          title: p.title,
          shortTitle: typeof p.shortTitle === "string" && p.shortTitle ? p.shortTitle : p.title,
          description: typeof p.description === "string" ? p.description : "",
          category: typeof p.category === "string" ? p.category : "",
          stack: Array.isArray(p.stack) ? p.stack.filter((x: unknown) => typeof x === "string") : [],
          year: typeof p.year === "string" ? p.year : "",
          image: typeof p.image === "string" && p.image ? p.image : FALLBACK_COVER,
          link: typeof p.link === "string" ? p.link : "",
        }));
    }
    if (Array.isArray(r.articles?.[loc])) {
      out.articles[loc] = r.articles[loc]
        .filter((a: any) => a && typeof a.slug === "string" && typeof a.title === "string")
        .map((a: any) => ({
          slug: a.slug,
          title: a.title,
          date: typeof a.date === "string" ? a.date : "",
          image: typeof a.image === "string" && a.image ? a.image : undefined,
        }));
    }
  }
  return out;
}

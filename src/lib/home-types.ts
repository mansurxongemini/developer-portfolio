// Shapes the public pages use for the admin-managed projects and articles.
// Client-safe: no server imports.

export type Loc = "uz" | "en" | "ru";
export const LOCS: Loc[] = ["uz", "en", "ru"];

export interface HomeProject {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  category: string;
  stack: string[];
  year: string;
  image: string;
  link: string;
}

export interface HomeArticle {
  slug: string;
  title: string;
  date: string;
  image?: string;
}

export interface HomeBundle {
  projects: Record<Loc, HomeProject[]>;
  articles: Record<Loc, HomeArticle[]>;
}

/** Short 1–3 word names shown in the project list. */
export const KNOWN_SHORT_TITLES: Record<string, string> = {
  "inclusive-legal-rag": "Inclusive Legal RAG",
  "alloma-cognitive-engine": "Alloma AI",
  "multi-agent-roundtable-system": "Roundtable",
  "mahalla-management-system": "Mahalla",
  "uzbekistan-map-puzzle": "Map Puzzle",
};

export function deriveShortTitle(slug: string, title: string, explicit?: string): string {
  if (explicit && explicit.trim()) return explicit.trim();
  if (KNOWN_SHORT_TITLES[slug]) return KNOWN_SHORT_TITLES[slug];
  const head = title.split(/\s+[—–:&|-]\s+|:\s+/)[0] || title;
  return head.split(/\s+/).slice(0, 3).join(" ");
}

// Server-side builder for what the public pages show from the admin-managed data:
// projects and articles. Firestore first, starter content as the safety net.

import { getProjects, getArticles } from "@/lib/firestore-server";
import { LOCS, type HomeArticle, type HomeBundle, type HomeProject, type Loc } from "@/lib/home-types";
import { byDateDesc, toHomeArticle, toHomeProject } from "@/lib/home-shape";

export async function buildHomeBundle(): Promise<HomeBundle> {
  // getProjects / getArticles return the starter content when Firestore has nothing,
  // so these lists are never empty and need no extra fallback here.
  const projects = {} as Record<Loc, HomeProject[]>;
  const articles = {} as Record<Loc, HomeArticle[]>;
  for (const loc of LOCS) {
    projects[loc] = (await getProjects("published", loc)).map(toHomeProject);
    articles[loc] = (await getArticles(undefined, "published", loc)).map(toHomeArticle).sort(byDateDesc);
  }
  return { projects, articles };
}

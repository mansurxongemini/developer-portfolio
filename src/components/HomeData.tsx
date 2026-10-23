"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useI18n } from "@/components/I18nProvider";
import { buildDefaultBundle, normalizeBundle } from "@/lib/home-shape";
import type { HomeArticle, HomeBundle, HomeProject } from "@/lib/home-types";

type Ctx = { bundle: HomeBundle; ready: boolean };

const DEFAULT = buildDefaultBundle();
const HomeDataContext = createContext<Ctx>({ bundle: DEFAULT, ready: true });

/**
 * Loads the admin-managed projects and articles once per visit. The page renders the shipped
 * content straight away; `ready` flips when the saved content has arrived (or failed), and the
 * motion engines wait for it so they never split text that is about to be replaced.
 */
export function HomeDataProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<Ctx>({ bundle: DEFAULT, ready: false });

  useEffect(() => {
    let alive = true;
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 2500);

    fetch("/api/content/home", { signal: controller.signal })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (alive) setState({ bundle: data ? normalizeBundle(data) : DEFAULT, ready: true });
      })
      .catch(() => {
        if (alive) setState({ bundle: DEFAULT, ready: true });
      })
      .finally(() => clearTimeout(timer));

    return () => {
      alive = false;
      controller.abort();
      clearTimeout(timer);
    };
  }, []);

  return <HomeDataContext.Provider value={state}>{children}</HomeDataContext.Provider>;
}

export function useHomeData(): {
  projects: HomeProject[];
  articles: HomeArticle[];
  ready: boolean;
} {
  const { bundle, ready } = useContext(HomeDataContext);
  const { locale } = useI18n();
  return useMemo(
    () => ({
      projects: bundle.projects[locale] ?? bundle.projects.uz,
      articles: bundle.articles[locale] ?? bundle.articles.uz,
      ready,
    }),
    [bundle, locale, ready],
  );
}

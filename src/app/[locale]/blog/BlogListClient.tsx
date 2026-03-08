"use client";

import { useEffect } from "react";
import { useI18n, type Locale } from "@/components/I18nProvider";
import { ArticleCard } from "@/components/blog-public";
import type { PublicArticle } from "@/lib/blog-types";

interface BlogListClientProps {
  articles: PublicArticle[];
  labels: {
    title: string;
    subtitle: string;
    noArticles: string;
  };
  locale: Locale;
}

export function BlogListClient({ articles, labels, locale }: BlogListClientProps) {
  const { locale: cookieLocale, setLocale } = useI18n();

  useEffect(() => {
    if (locale !== cookieLocale) setLocale(locale);
  }, [locale, cookieLocale, setLocale]);

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-12 text-center">
        <h1 className="mb-3 text-4xl font-bold tracking-tight text-white/95 sm:text-5xl">
          {labels.title}
        </h1>
        <p className="text-lg text-white/50">{labels.subtitle}</p>
      </div>

      {articles.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <ArticleCard key={article.slug} article={article} locale={locale} />
          ))}
        </div>
      ) : (
        <p className="text-center text-white/40">{labels.noArticles}</p>
      )}
    </section>
  );
}

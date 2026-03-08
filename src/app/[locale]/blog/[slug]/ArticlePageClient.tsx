"use client";

import { useEffect } from "react";
import Image from "next/image";
import { useI18n, type Locale } from "@/components/I18nProvider";
import {
  MarkdownRenderer,
  ArticleShareSection,
  BackToBlogButton,
  ArticleCard,
} from "@/components/blog-public";
import type { PublicArticle } from "@/lib/blog-types";
import { Calendar, Clock, User } from "lucide-react";

interface ArticlePageClientProps {
  article: PublicArticle;
  related: PublicArticle[];
  labels: {
    minRead: string;
    relatedArticles: string;
  };
  locale: Locale;
  slug: string;
}

export function ArticlePageClient({ article, related, labels, locale, slug }: ArticlePageClientProps) {
  const { locale: cookieLocale, setLocale } = useI18n();

  useEffect(() => {
    if (locale !== cookieLocale) setLocale(locale);
  }, [locale, cookieLocale, setLocale]);

  return (
    <>
      <div className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-6">
        <span
          className="mb-4 inline-block rounded-full bg-cyan-400/10 px-3 py-1
                     text-xs font-semibold tracking-wide text-cyan-300"
        >
          {article.category}
        </span>

        <h1 className="mb-4 text-3xl font-bold leading-tight text-white/95 sm:text-4xl lg:text-5xl">
          {article.title}
        </h1>

        <div className="mb-8 flex flex-wrap items-center gap-5 text-sm text-white/45">
          <span className="flex items-center gap-1.5">
            <User size={14} />
            {article.author}
          </span>
          <span className="flex items-center gap-1.5">
            <Calendar size={14} />
            {new Date(article.publishedAt).toLocaleDateString(
              locale === "uz" ? "uz-UZ" : locale === "ru" ? "ru-RU" : "en-US",
              { year: "numeric", month: "long", day: "numeric" },
            )}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock size={14} />
            {article.readingTime} {labels.minRead}
          </span>
        </div>

        {article.image && (
          <div className="relative mb-10 aspect-video overflow-hidden rounded-2xl">
            <Image
              src={article.image}
              alt={article.title}
              fill
              quality={95}
              priority
              sizes="(min-width: 1024px) 896px, (min-width: 768px) 90vw, 100vw"
              className="object-cover"
            />
          </div>
        )}

        <MarkdownRenderer content={article.content} />

        <ArticleShareSection title={article.title} locale={locale} slug={slug} />
      </div>

      {related.length > 0 && (
        <section className="mx-auto w-full max-w-6xl px-4 pb-16 sm:px-6 lg:px-8">
          <h2 className="mb-6 text-xl font-semibold text-white/70">{labels.relatedArticles}</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {related.map((a) => (
              <ArticleCard key={a.slug} article={a} locale={locale} />
            ))}
          </div>
        </section>
      )}

      <BackToBlogButton locale={locale} />
    </>
  );
}

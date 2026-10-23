"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useI18n, type Locale } from "@/components/I18nProvider";
import { MarkdownRenderer, ArticleCard, ArticleShareSection } from "@/components/blog-public";
import type { PublicArticle } from "@/lib/blog-types";

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

function formatLongDate(iso: string, locale: Locale): string {
  const tag = locale === "uz" ? "uz-UZ" : locale === "ru" ? "ru-RU" : "en-US";
  try {
    return new Date(iso).toLocaleDateString(tag, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return iso;
  }
}

export function ArticlePageClient({ article, related, labels, locale, slug }: ArticlePageClientProps) {
  const { locale: cookieLocale, setLocale } = useI18n();

  useEffect(() => {
    if (locale !== cookieLocale) setLocale(locale);
  }, [locale, cookieLocale, setLocale]);

  const backLabel = locale === "ru" ? "← Назад" : locale === "uz" ? "← Orqaga" : "← Back";

  return (
    <article className="sec post-page" data-theme-trigger="bone">
      <div className="post__col">
        <Link href={`/${locale}/blog`} className="case__back font-mono">
          {backLabel}
        </Link>

        <p className="case__file">
          {article.category} · {formatLongDate(article.publishedAt, locale)}
        </p>

        <h1 className="case__title case__title--post">
          <span data-redact data-redact-mode="title">
            {article.title}
          </span>
        </h1>

        <p className="post__byline font-mono">
          {article.author} · {formatLongDate(article.publishedAt, locale)} ·{" "}
          {article.readingTime} {labels.minRead}
        </p>

        {article.image ? (
          <figure className="case__key frame" data-img-reveal>
            <Image
              src={article.image}
              alt={article.title}
              width={1200}
              height={675}
              priority
              sizes="(max-width: 900px) 92vw, 44rem"
            />
          </figure>
        ) : null}

        <MarkdownRenderer content={article.content} />

        <ArticleShareSection title={article.title} locale={locale} slug={slug} />

        {related.length > 0 ? (
          <div className="post__next">
            <p className="case__next-label">{labels.relatedArticles}</p>
            <div className="briefs__list">
              {related.map((a) => (
                <ArticleCard key={a.slug} article={a} locale={locale} />
              ))}
            </div>
            <Link href={`/${locale}/blog`} className="briefs__all">
              {backLabel} →
            </Link>
          </div>
        ) : null}
      </div>
    </article>
  );
}

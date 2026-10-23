"use client";

import Link from "next/link";
import type { PublicArticle } from "@/lib/blog-types";
import type { Locale } from "@/components/I18nProvider";

interface ArticleCardProps {
  article: PublicArticle;
  locale: Locale;
  index?: number;
}

export function ArticleCard({ article, locale, index = 0 }: ArticleCardProps) {
  const num = String(index + 1).padStart(2, "0");
  const date = new Date(article.publishedAt).toLocaleDateString(
    locale === "uz" ? "uz-UZ" : locale === "ru" ? "ru-RU" : "en-US",
    { year: "numeric", month: "short", day: "numeric" },
  );

  return (
    <Link
      href={`/${locale}/blog/${article.slug}`}
      className="brief-row"
      data-preview={article.image || undefined}
      data-cursor="O'qish"
      aria-label={article.title}
    >
      <span className="brief-row__index font-mono">{num}</span>
      <span className="brief-row__title font-display">
        {article.title}
        {article.category ? (
          <span className="brief-row__tag font-mono"> · {article.category}</span>
        ) : null}
      </span>
      <span className="brief-row__date font-mono">{date}</span>
      <span className="brief-row__arrow" aria-hidden="true">
        →
      </span>
    </Link>
  );
}

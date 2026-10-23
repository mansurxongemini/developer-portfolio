"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useI18n, type Locale } from "@/components/I18nProvider";
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

function formatShortDate(iso: string, locale: Locale): string {
  const tag = locale === "uz" ? "uz-UZ" : locale === "ru" ? "ru-RU" : "en-US";
  try {
    return new Date(iso).toLocaleDateString(tag, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return iso;
  }
}

export function BlogListClient({ articles, labels, locale }: BlogListClientProps) {
  const { locale: cookieLocale, setLocale } = useI18n();

  useEffect(() => {
    if (locale !== cookieLocale) setLocale(locale);
  }, [locale, cookieLocale, setLocale]);

  return (
    <section className="sec briefs briefs--page" data-theme-trigger="bone">
      <header className="sec-head">
        <div className="sec-head__left">
          <span className="stamp stamp--index" data-stamp aria-hidden="true">
            № 05
          </span>
          <h1 className="sec-head__title">
            <span data-redact>{labels.title}</span>
          </h1>
        </div>
        <p className="sec-head__field">{labels.subtitle}</p>
      </header>

      <div className="briefs__list-wrap">
        {articles.length > 0 ? (
          <div className="briefs__list">
            {articles.map((article, i) => (
              <Link
                key={article.slug}
                href={`/${locale}/blog/${article.slug}`}
                className="brief-row"
                data-preview={article.image || undefined}
                data-cursor="O'qish"
                aria-label={article.title}
              >
                <span className="brief-row__index font-mono">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="brief-row__title font-display">
                  {article.title}
                  {article.category ? (
                    <span className="brief-row__tag font-mono">
                      {" "}
                      · {article.category}
                    </span>
                  ) : null}
                </span>
                <span className="brief-row__date font-mono">
                  {formatShortDate(article.publishedAt, locale)}
                </span>
                <span className="brief-row__arrow" aria-hidden="true">
                  →
                </span>
              </Link>
            ))}
          </div>
        ) : (
          <p className="marginalia">{labels.noArticles}</p>
        )}
      </div>
    </section>
  );
}

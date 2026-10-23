"use client";

import Link from "next/link";
import { useI18n } from "@/components/I18nProvider";
import { getArticles } from "@/lib/mock-articles";

const briefsCopy = {
  uz: {
    stamp: "№ 05",
    title: "Maqolalar",
    field: "01",
    allBriefs: "Barcha maqolalar →",
  },
  en: {
    stamp: "№ 05",
    title: "Articles",
    field: "01",
    allBriefs: "All articles →",
  },
  ru: {
    stamp: "№ 05",
    title: "Статьи",
    field: "01",
    allBriefs: "Все статьи →",
  },
};

export function DossierBriefs() {
  const { locale } = useI18n();
  const t = briefsCopy[locale] || briefsCopy.en;
  const articles = getArticles(locale).slice(0, 3);

  return (
    <section
      className="sec briefs"
      id="briefs"
      data-theme-trigger="bone"
      data-tab-target="briefs"
    >
      <header className="sec-head">
        <div className="sec-head__left">
          <span className="stamp stamp--index" data-stamp aria-hidden="true">
            {t.stamp}
          </span>
          <h2 className="sec-head__title">
            <span data-redact>{t.title}</span>
          </h2>
        </div>
        <p className="sec-head__field">{t.field}</p>
      </header>

      {/* 3 latest briefs as rows */}
      <div className="briefs__list-wrap">
        <ul className="briefs__list" role="list">
          {articles.map((item, idx) => (
            <li key={item.slug}>
              <Link
                href={`/blog/${item.slug}`}
                className="brief-row"
                data-preview={(item as { image?: string }).image || undefined}
                data-cursor="Read"
                aria-label={`${item.title} — ${item.publishedAt}`}
              >
                <span className="brief-row__index">[0{idx + 1}]</span>
                <span className="brief-row__title">{item.title}</span>
                <span className="brief-row__date">{item.publishedAt}</span>
                <span className="brief-row__arrow" aria-hidden="true">
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="briefs__foot">
          <Link href="/blog" className="briefs__all" data-magnetic>
            {t.allBriefs}
          </Link>
        </div>
      </div>
    </section>
  );
}

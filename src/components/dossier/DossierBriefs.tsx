"use client";

import Link from "next/link";
import { useI18n } from "@/components/I18nProvider";
import { getArticles } from "@/lib/mock-articles";

const briefsCopy = {
  uz: {
    stamp: "№ 05",
    title: "Xulosalar",
    subtitle: "The Briefs",
    field: "Rasmiy Tahlillar · 2024—2026",
    dispatchPrefix: "TAHLIL",
    readAction: "Xulosani o'qish",
    allBriefsBtn: "Barcha tahliliy maqolalar blogini ochish",
    minRead: "daqiqa",
    marginalia: "Har bir maqola yuridik normalar va sun'iy intellekt arxitekturalarining amaliy tahliliga bag'ishlangan.",
  },
  en: {
    stamp: "№ 05",
    title: "Briefs",
    subtitle: "The Briefs",
    field: "Public Dispatches · 2024—2026",
    dispatchPrefix: "BRIEF",
    readAction: "Read Analysis",
    allBriefsBtn: "Explore All Analytical Briefs",
    minRead: "min",
    marginalia: "Each dispatch evaluates statutory jurisprudence and neural systems architecture.",
  },
  ru: {
    stamp: "№ 05",
    title: "Выводы",
    subtitle: "The Briefs",
    field: "Аналитика · 2024—2026",
    dispatchPrefix: "ОБЗОР",
    readAction: "Читать заключение",
    allBriefsBtn: "Открыть полный каталог аналитики",
    minRead: "мин",
    marginalia: "Каждый обзор посвящен практическому анализу правовых норм и архитектур ИИ.",
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
            <span data-redact>{t.title}</span> <em>{t.subtitle}</em>
          </h2>
        </div>
        <p className="sec-head__field font-mono">{t.field}</p>
      </header>

      {/* Grid of 3 Analytical Briefs */}
      <div className="briefs__grid">
        {articles.map((item, idx) => (
          <Link
            key={item.slug}
            href={`/blog/${item.slug}`}
            className="brief-card group"
            data-clip
            data-cursor="O'qish"
          >
            <div>
              <div className="mb-4 flex items-center justify-between border-b border-[#131108]/15 pb-3 font-mono text-xs text-[#131108]/70">
                <span className="font-bold text-[#c53a00]">
                  {t.dispatchPrefix} № 0{idx + 1}
                </span>
                <span>
                  {item.readingTime} {t.minRead}
                </span>
              </div>

              <div className="mb-2 font-mono text-[11px] font-bold uppercase tracking-wider text-[#131108]/60">
                {item.category}
              </div>

              <h3 className="font-display text-xl font-bold uppercase leading-snug tracking-tight text-[#131108] transition-colors group-hover:text-[#c53a00]">
                {item.title}
              </h3>

              <p className="mt-3 font-serif text-sm italic leading-relaxed text-[#131108]/80 line-clamp-3">
                {item.excerpt}
              </p>
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-[#131108]/15 pt-4 font-mono text-xs font-bold uppercase tracking-wider text-[#131108]">
              <span>{t.readAction}</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1 font-sans">
                →
              </span>
            </div>
          </Link>
        ))}
      </div>

      <div className="col-span-12 mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-[#131108]/15 pt-8">
        <p className="marginalia font-serif">
          <span className="marginalia__ast mr-1">*</span>
          {t.marginalia}
        </p>

        <Link
          href="/blog"
          className="btn btn--solid font-mono text-xs uppercase"
          data-magnetic
        >
          <span>{t.allBriefsBtn}</span>
          <span className="icon-arrow ml-1">↗</span>
        </Link>
      </div>
    </section>
  );
}

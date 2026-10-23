"use client";

import Link from "next/link";
import { useI18n } from "@/components/I18nProvider";
import { getArticles } from "@/lib/mock-articles";
import { ArrowRight, Clock, Calendar, ArrowUpRight } from "lucide-react";

const briefsCopy = {
  uz: {
    stamp: "№ 05",
    title: "BRIEFS",
    subtitle: "The Analyses",
    metaRight: "RASMIY TAHLILLAR · 2024—2026",
    dispatchPrefix: "TAHLILNOMA",
    readAction: "Xulosani o'qish",
    allBriefsBtn: "Barcha tahliliy maqolalar blogini ochish",
    minRead: "daqiqa o'qish",
  },
  en: {
    stamp: "№ 05",
    title: "BRIEFS",
    subtitle: "The Analyses",
    metaRight: "PUBLIC DISPATCHES · 2024—2026",
    dispatchPrefix: "BRIEF",
    readAction: "Read Analysis",
    allBriefsBtn: "Explore All Analytical Briefs",
    minRead: "min read",
  },
  ru: {
    stamp: "№ 05",
    title: "BRIEFS",
    subtitle: "The Analyses",
    metaRight: "АНАЛИТИКА · 2024—2026",
    dispatchPrefix: "ОБЗОР",
    readAction: "Читать заключение",
    allBriefsBtn: "Открыть полный каталог аналитики",
    minRead: "мин чтения",
  },
};

export function DossierBriefs() {
  const { locale } = useI18n();
  const copy = briefsCopy[locale] || briefsCopy.uz;
  const articles = getArticles(locale).slice(0, 3);

  return (
    <section
      id="briefs"
      className="relative w-full border-t border-[#131108]/10 bg-[#e9e3d2] px-5 py-20 text-[#131108] sm:px-10 lg:px-16"
    >
      {/* Top Header Strip */}
      <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-[#131108]/15 pb-6">
        <div className="flex items-center gap-3">
          <span className="dossier-stamp">{copy.stamp}</span>
          <h2 className="font-sans text-2xl font-black uppercase tracking-tight text-[#131108] sm:text-3xl">
            {copy.title}
          </h2>
          <span className="font-serif text-lg italic text-[#57534e] sm:text-xl">
            {copy.subtitle}
          </span>
        </div>

        <div className="font-mono text-xs uppercase tracking-widest text-[#78716c]">
          {copy.metaRight}
        </div>
      </div>

      {/* 3 Briefs Grid */}
      <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-3">
        {articles.map((item, idx) => {
          const dispatchCode = `№ 0${idx + 1}`;
          return (
            <Link
              key={item.slug}
              href={`/blog/${item.slug}`}
              className="group flex flex-col justify-between border border-[#131108]/15 bg-[#FAF8F5] p-6 shadow-sm transition-all duration-300 hover:border-[#ff5100] hover:bg-white hover:shadow-xl hover:-translate-y-1"
            >
              <div className="space-y-4">
                {/* Header row */}
                <div className="flex items-center justify-between border-b border-[#131108]/10 pb-3">
                  <span className="font-mono text-xs font-bold text-[#ff5100]">
                    {copy.dispatchPrefix} {dispatchCode}
                  </span>
                  <span className="flex items-center gap-1 font-mono text-[10px] text-[#78716c]">
                    <Clock size={11} className="text-[#ff5100]" />
                    <span>
                      {item.readingTime} {copy.minRead}
                    </span>
                  </span>
                </div>

                {/* Category */}
                <div className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#57534e]">
                  {item.category}
                </div>

                {/* Title */}
                <h3 className="font-sans text-lg font-bold leading-snug tracking-tight text-[#131108] transition-colors group-hover:text-[#ff5100]">
                  {item.title}
                </h3>

                {/* Excerpt */}
                <p className="font-serif text-xs italic leading-relaxed text-[#57534e] line-clamp-3">
                  {item.excerpt}
                </p>
              </div>

              {/* Footer */}
              <div className="mt-6 flex items-center justify-between border-t border-[#131108]/10 pt-4 font-mono text-xs">
                <span className="flex items-center gap-1 text-[11px] text-[#78716c]">
                  <Calendar size={11} />
                  <span>{item.publishedAt}</span>
                </span>

                <span className="flex items-center gap-1 font-bold uppercase text-[#131108] transition-colors group-hover:text-[#ff5100]">
                  <span>{copy.readAction}</span>
                  <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Bottom Action */}
      <div className="mt-12 flex justify-end">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 border-b border-[#131108] pb-1 font-mono text-xs font-bold uppercase tracking-wider text-[#131108] transition hover:border-[#ff5100] hover:text-[#ff5100]"
        >
          <span>{copy.allBriefsBtn}</span>
          <ArrowRight size={14} />
        </Link>
      </div>
    </section>
  );
}

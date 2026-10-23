"use client";

import Link from "next/link";
import { ArrowRight, BookOpen, Clock, Calendar } from "lucide-react";
import { useI18n } from "@/components/I18nProvider";
import { getArticles } from "@/lib/mock-articles";

const sectionContent = {
  uz: {
    kicker: "TAHLIL VA ILMIY MAQOLALAR",
    title: "So'nggi Tahlillar va Huquqiy Maqolalar",
    subtitle: "Sun'iy intellektni tartibga solish, kiberxavfsizlik va raqamli iqtisodiyot bo'yicha mustaqil tahliliy izlanishlar.",
    readArticle: "Maqolani o'qish",
    viewAllArticles: "Barcha tahliliy maqolalar blogini ochish",
    minRead: "daqiqa o'qish",
  },
  en: {
    kicker: "LEGAL & TECH DISPATCHES",
    title: "Latest Analyses & Legal Insights",
    subtitle: "Independent research and statutory commentary on AI regulation, cybersecurity, and the digital economy.",
    readArticle: "Read Article",
    viewAllArticles: "Explore All Analytical Articles",
    minRead: "min read",
  },
  ru: {
    kicker: "АНАЛИТИЧЕСКИЕ ПУБЛИКАЦИИ",
    title: "Последние статьи и правовая аналитика",
    subtitle: "Независимые исследования и комментарии по регулированию ИИ, кибербезопасности и цифровой экономике.",
    readArticle: "Читать статью",
    viewAllArticles: "Открыть полный блог аналитики",
    minRead: "мин чтения",
  },
};

export function LatestArticles() {
  const { locale } = useI18n();
  const t = sectionContent[locale] || sectionContent.uz;
  const articles = getArticles(locale).slice(0, 3);

  if (articles.length === 0) return null;

  return (
    <section className="relative w-full space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 border-b border-[#E7E5E4] pb-6 sm:flex-row sm:items-end">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-amber-900">
            {t.kicker}
          </p>
          <h2 className="text-2xl font-bold tracking-tight text-[#1C1917] md:text-3xl">
            {t.title}
          </h2>
          <p className="max-w-2xl text-sm leading-relaxed text-[#57534E]">
            {t.subtitle}
          </p>
        </div>

        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 self-start text-xs font-semibold text-amber-900 transition hover:text-amber-700 sm:self-auto"
        >
          <span>{t.viewAllArticles}</span>
          <ArrowRight size={14} />
        </Link>
      </div>

      {/* 3 Articles Grid */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {articles.map((article) => (
          <Link
            key={article.slug}
            href={`/blog/${article.slug}`}
            className="group flex flex-col justify-between rounded-2xl border border-[#E7E5E4] bg-white p-6 shadow-[0_4px_24px_rgba(44,38,30,0.03)] transition-all duration-300 hover:border-amber-400/50 hover:shadow-[0_12px_32px_rgba(44,38,30,0.07)]"
          >
            <div className="space-y-3.5">
              {/* Category + Reading Time */}
              <div className="flex items-center justify-between gap-2">
                <span className="inline-flex items-center rounded-full border border-amber-200/70 bg-amber-50 px-2.5 py-0.5 text-[11px] font-semibold text-amber-900">
                  {article.category}
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] text-[#78716C]">
                  <Clock size={11} className="text-amber-800" />
                  <span>
                    {article.readingTime} {t.minRead}
                  </span>
                </span>
              </div>

              {/* Title */}
              <h3 className="text-base font-bold leading-snug tracking-tight text-[#1C1917] transition-colors group-hover:text-amber-900 line-clamp-2">
                {article.title}
              </h3>

              {/* Excerpt */}
              <p className="text-xs leading-relaxed text-[#57534E] line-clamp-3">
                {article.excerpt}
              </p>
            </div>

            {/* Footer with Date and Link */}
            <div className="mt-5 flex items-center justify-between border-t border-[#F5F2EB] pt-4 text-xs font-medium">
              <span className="inline-flex items-center gap-1.5 text-[11px] text-[#78716C]">
                <Calendar size={12} className="text-[#A8A29E]" />
                <span>{article.publishedAt}</span>
              </span>
              <span className="inline-flex items-center gap-1 font-semibold text-amber-950 transition group-hover:translate-x-0.5">
                <span>{t.readArticle}</span>
                <ArrowRight size={13} />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

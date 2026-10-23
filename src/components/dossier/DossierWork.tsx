"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useI18n } from "@/components/I18nProvider";
import { ArrowUpRight, ArrowRight, Github } from "lucide-react";

interface ExhibitProject {
  id: string;
  num: string;
  slug: string;
  year: string;
  image: string;
  githubUrl: string;
  titles: Record<"uz" | "en" | "ru", string>;
  categories: Record<"uz" | "en" | "ru", string>;
  exhibitCaptions: Record<"uz" | "en" | "ru", string>;
  tags: string[];
}

const exhibits: ExhibitProject[] = [
  {
    id: "exhibit-01",
    num: "01",
    slug: "inclusive-legal-rag",
    year: "2025",
    image: "/images/projects/inclusive-legal-rag.svg",
    githubUrl: "https://github.com/mansurxongemini/inclusive-legal-rag",
    titles: {
      uz: "INCLUSIVE LEGAL RAG",
      en: "INCLUSIVE LEGAL RAG",
      ru: "INCLUSIVE LEGAL RAG",
    },
    categories: {
      uz: "STATUTORY AI & GIBRID LANCEDB QIDIRUV",
      en: "STATUTORY INTELLIGENCE & HYBRID RAG",
      ru: "ПРАВОВАЯ АНАЛИТИКА И ГИБРИДНЫЙ RAG",
    },
    exhibitCaptions: {
      uz: "EKSPONAT 01 — BMT Konvensiyasi (UN CRPD) va milliy qonunchilik korpusini semantik tahlil qiluvchi LegalTech tizimi.",
      en: "EXHIBIT 01 — Statutory intelligence bridging national disability legislation in Uzbekistan with the UN CRPD framework.",
      ru: "ЭКСПОНАТ 01 — Анализ законодательства о правах инвалидов и норм ООН с использованием LanceDB и RRF.",
    },
    tags: ["LanceDB", "FastAPI", "Hybrid RRF", "Python"],
  },
  {
    id: "exhibit-02",
    num: "02",
    slug: "alloma-cognitive-engine",
    year: "2025",
    image: "/images/projects/alloma-ai.svg",
    githubUrl: "https://github.com/mansurxongemini/alloma-cognitive-engine",
    titles: {
      uz: "ALLOMA COGNITIVE ENGINE",
      en: "ALLOMA COGNITIVE ENGINE",
      ru: "ALLOMA COGNITIVE ENGINE",
    },
    categories: {
      uz: "KOGNITIV AI & DOIMIY VEKTORLI XOTIRA",
      en: "COGNITIVE ARCHITECTURE & VECTOR MEMORY",
      ru: "КОГНИТИВНЫЙ ИИ И ВЕКТОРНАЯ ПАМЯТЬ",
    },
    exhibitCaptions: {
      uz: "EKSPONAT 02 — Talabalar uchun shaxsiy bilimlarni saqlovchi va ko'p modulli LLM marshrutlashga ega mentor platformasi.",
      en: "EXHIBIT 02 — Intelligent educational cognitive architecture with persistent vector indexing and semantic cache.",
      ru: "ЭКСПОНАТ 02 — Персонализированный ИИ-ментор с долговременной векторной памятью Pinecone.",
    },
    tags: ["Pinecone", "OpenRouter", "TypeScript", "Next.js"],
  },
  {
    id: "exhibit-03",
    num: "03",
    slug: "multi-agent-roundtable-system",
    year: "2025",
    image: "/images/projects/multi-agent-roundtable.svg",
    githubUrl: "https://github.com/mansurxongemini/multi-agent-roundtable-system",
    titles: {
      uz: "MULTI-AGENT ROUNDTABLE",
      en: "MULTI-AGENT ROUNDTABLE",
      ru: "MULTI-AGENT ROUNDTABLE",
    },
    categories: {
      uz: "KO'P AGENTLI KONSENSUS VA PEER-REVIEW",
      en: "MULTI-AGENT CONSENSUS & DEBATE PROTOCOL",
      ru: "МНОГОАГЕНТНЫЙ КОНСЕНСУС И ЭКСПЕРТИЗА",
    },
    exhibitCaptions: {
      uz: "EKSPONAT 03 — Karpathy LLM Council asosidagi 5 ta mustaqil agent rollari va anonim ekspertiza tizimi.",
      en: "EXHIBIT 03 — Collaborative framework featuring automated peer-review consensus inspired by the LLM Council.",
      ru: "ЭКСПОНАТ 03 — Оркестрация специализированных агентов для глубокого анализа без предвзятости.",
    },
    tags: ["FastAPI", "Docker", "Consensus", "Python"],
  },
  {
    id: "exhibit-04",
    num: "04",
    slug: "huquqplus-uz",
    year: "2025",
    image: "/images/projects/huquqplus.svg",
    githubUrl: "https://github.com/mansurxongemini/Huquqplus.uz",
    titles: {
      uz: "HUQUQPLUS.UZ",
      en: "HUQUQPLUS.UZ",
      ru: "HUQUQPLUS.UZ",
    },
    categories: {
      uz: "OCHIQ HUQUQIY AXBOROT VA MASLAHAT",
      en: "CITIZEN LEGAL PORTAL & COMPLIANCE",
      ru: "ПРАВОВОЙ ПОРТАЛ И КОНСУЛЬТАЦИИ",
    },
    exhibitCaptions: {
      uz: "EKSPONAT 04 — Fuqarolar huquqiy savodxonligi, normativ tahlil va advokatlar bilan tezkor bog'lanish portali.",
      en: "EXHIBIT 04 — Comprehensive civic legal empowerment platform delivering automated statutory advice.",
      ru: "ЭКСПОНАТ 04 — Открытый правовой портал для автоматизированной юридической помощи гражданам.",
    },
    tags: ["FastAPI", "Aiogram 3", "Redis", "Celery"],
  },
  {
    id: "exhibit-05",
    num: "05",
    slug: "mahalla-management-system",
    year: "2024",
    image: "/images/projects/mahalla-management.svg",
    githubUrl: "https://github.com/mansurxongemini/mahalla-management-system",
    titles: {
      uz: "MAHALLA MANAGEMENT",
      en: "MAHALLA MANAGEMENT",
      ru: "MAHALLA MANAGEMENT",
    },
    categories: {
      uz: "FUQAROLIK VA MA'MURIYAT TIZIMI",
      en: "CIVIC WORKFLOW & COMMUNITY PORTAL",
      ru: "СИСТЕМА УПРАВЛЕНИЯ МАХАЛЛЕЙ",
    },
    exhibitCaptions: {
      uz: "EKSPONAT 05 — Mahalla fuqarolar yig'inlari uchun murojaatlar, ijtimoiy yordam va reyestrlarni avtomatlashtirish tizimi.",
      en: "EXHIBIT 05 — Civic community management system tracking municipal appeals, civic records, and community welfare.",
      ru: "ЭКСПОНАТ 05 — Автоматизация работы махаллинских комитетов, учёт обращений и социальный реестр.",
    },
    tags: ["Full-Stack", "Workflow", "Next.js", "TypeScript"],
  },
  {
    id: "exhibit-06",
    num: "06",
    slug: "kitobplus",
    year: "2024",
    image: "/images/projects/kitobplus.svg",
    githubUrl: "https://github.com/mansurxongemini/kitobplus",
    titles: {
      uz: "KITOBPLUS PLATFORM",
      en: "KITOBPLUS PLATFORM",
      ru: "KITOBPLUS PLATFORM",
    },
    categories: {
      uz: "ELEKTRON KUTUBXONA VA QIDIRUV",
      en: "DIGITAL LIBRARY & ACCESSIBILITY",
      ru: "ЦИФРОВАЯ БИБЛИОТЕКА И ПОИСК",
    },
    exhibitCaptions: {
      uz: "EKSPONAT 06 — Raqamlashtirilgan kitoblar, ilmiy adabiyotlar va to'liq matnli indeksatsiyaga ega o'quv platformasi.",
      en: "EXHIBIT 06 — Accessible digital library with semantic text search and rich audio streaming capabilities.",
      ru: "ЭКСПОНАТ 06 — Электронная библиотека с полнотекстовой каталогизацией и удобным поиском.",
    },
    tags: ["React", "FastAPI", "Fulltext Index", "Tailwind"],
  },
  {
    id: "exhibit-07",
    num: "07",
    slug: "uzbekistan-map-puzzle",
    year: "2024",
    image: "/images/projects/uzbekistan-map-puzzle.svg",
    githubUrl: "https://github.com/mansurxongemini/uzbekistan-map-puzzle",
    titles: {
      uz: "UZBEKISTAN MAP PUZZLE",
      en: "UZBEKISTAN MAP PUZZLE",
      ru: "UZBEKISTAN MAP PUZZLE",
    },
    categories: {
      uz: "INTERAKTIV GEOGRAFIYA VA TA'LIM",
      en: "INTERACTIVE GEOGRAPHY & CIVIC ED",
      ru: "ИНТЕРАКТИВНАЯ ГЕОГРАФИЯ И КАРТЫ",
    },
    exhibitCaptions: {
      uz: "EKSPONAT 07 — O'zbekiston viloyatlari, madaniyati va ma'muriy tuzilishini o'rgatuvchi interaktiv ta'limiy dastur.",
      en: "EXHIBIT 07 — Interactive educational geography puzzle mapping 14 regions and historical landmarks of Uzbekistan.",
      ru: "ЭКСПОНАТ 07 — Образовательная интерактивная карта-головоломка по 14 регионам Узбекистана.",
    },
    tags: ["Canvas", "Interactive SVG", "Gamification", "TypeScript"],
  },
];

const workSectionCopy = {
  uz: {
    stamp: "№ 03",
    title: "WORK",
    subtitle: "The Evidence",
    metaRight: "EKSPONATLAR 07 · 2024—2026",
    openBadge: "OCHIQ",
    caseStudyBtn: "Loyiha Tahlili",
    githubBtn: "GitHub Kodi",
    allProjectsBtn: "Barcha loyihalar sahifasi →",
  },
  en: {
    stamp: "№ 03",
    title: "WORK",
    subtitle: "The Evidence",
    metaRight: "EXHIBITS 07 · 2024—2026",
    openBadge: "OPEN",
    caseStudyBtn: "Case Study",
    githubBtn: "GitHub Code",
    allProjectsBtn: "View Project Index →",
  },
  ru: {
    stamp: "№ 03",
    title: "WORK",
    subtitle: "The Evidence",
    metaRight: "УЛИКИ 07 · 2024—2026",
    openBadge: "ОТКРЫТЬ",
    caseStudyBtn: "Анализ проекта",
    githubBtn: "GitHub Код",
    allProjectsBtn: "Все проекты →",
  },
};

export function DossierWork() {
  const { locale } = useI18n();
  const copy = workSectionCopy[locale] || workSectionCopy.uz;
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const activeExhibit = exhibits[activeIndex];

  return (
    <section
      id="work"
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

      {/* Main Split Grid: Left Exhibit List, Right Sticky Paperclip Frame */}
      <div className="mt-14 grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16">
        {/* Left Column: Interactive Project List (7 cols) */}
        <div className="space-y-1 lg:col-span-7">
          {exhibits.map((item, idx) => {
            const isActive = activeIndex === idx;
            return (
              <div
                key={item.id}
                onMouseEnter={() => setActiveIndex(idx)}
                onClick={() => setActiveIndex(idx)}
                className={`group relative cursor-pointer border-b border-[#131108]/15 p-5 transition-all duration-200 sm:p-6 ${
                  isActive
                    ? "bg-[#131108] text-[#f2eee3] shadow-md"
                    : "hover:bg-[#131108]/05 text-[#131108]"
                }`}
              >
                <div className="flex items-baseline justify-between gap-4">
                  <div className="flex items-baseline gap-4 sm:gap-6">
                    <span
                      className={`font-mono text-xs font-semibold ${
                        isActive ? "text-[#ff5100]" : "text-[#78716c]"
                      }`}
                    >
                      {item.num}
                    </span>
                    <h3
                      className={`font-sans text-xl font-black tracking-tight sm:text-2xl ${
                        isActive ? "text-[#f2eee3]" : "text-[#131108]"
                      }`}
                    >
                      {item.titles[locale]}
                    </h3>
                  </div>

                  {/* Year + Status badge */}
                  <div className="flex items-center gap-2">
                    {isActive ? (
                      <span className="inline-flex items-center gap-1 border border-[#ff5100] bg-[#ff5100]/15 px-2 py-0.5 font-mono text-[10px] font-bold uppercase text-[#ff5100]">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#ff5100] pulse-orange-dot" />
                        {copy.openBadge}
                      </span>
                    ) : (
                      <span className="font-mono text-xs text-[#78716c]">
                        {item.year}
                      </span>
                    )}

                    <span
                      className={`text-sm transition-transform duration-200 ${
                        isActive
                          ? "translate-x-1 text-[#ff5100]"
                          : "text-[#78716c] group-hover:translate-x-0.5"
                      }`}
                    >
                      {isActive ? <ArrowRight size={16} /> : <ArrowUpRight size={15} />}
                    </span>
                  </div>
                </div>

                {/* Subtitle */}
                <div
                  className={`mt-2 font-mono text-[11px] uppercase tracking-wider ${
                    isActive ? "text-[#d6d3d1]" : "text-[#57534e]"
                  }`}
                >
                  {item.categories[locale]}
                </div>
              </div>
            );
          })}

          <div className="pt-6">
            <Link
              href="/work"
              className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-[#131108] transition hover:text-[#ff5100]"
            >
              <span>{copy.allProjectsBtn}</span>
            </Link>
          </div>
        </div>

        {/* Right Column: Sticky Floating Exhibit Frame with Paperclip (5 cols) */}
        <div className="sticky top-24 lg:col-span-5">
          <div className="dossier-exhibit-frame p-4">
            {/* Paperclip */}
            <div className="dossier-paperclip" />

            {/* Exhibit Number Stamp */}
            <div className="flex items-center justify-between border-b border-[#131108]/10 pb-3 pl-10 pr-2">
              <span className="dossier-stamp-dark">
                EXHIBIT {activeExhibit.num}
              </span>
              <span className="font-mono text-[11px] text-[#78716c]">
                {activeExhibit.year}
              </span>
            </div>

            {/* Visual SVG Container */}
            <div className="relative mt-3 aspect-[16/11] w-full overflow-hidden rounded-[2px] border border-[#131108]/10 bg-[#FAF8F5]">
              <Image
                src={activeExhibit.image}
                alt={activeExhibit.titles[locale]}
                fill
                className="object-cover object-top transition duration-500 hover:scale-[1.02]"
                unoptimized
              />
            </div>

            {/* Caption & Metadata */}
            <div className="mt-4 space-y-3">
              <p className="font-serif text-xs italic leading-relaxed text-[#44403c]">
                {activeExhibit.exhibitCaptions[locale]}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5">
                {activeExhibit.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-[2px] border border-[#131108]/15 bg-[#e9e3d2]/60 px-2 py-0.5 font-mono text-[10px] uppercase text-[#44403c]"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between border-t border-[#131108]/10 pt-3">
                <Link
                  href={`/work/${activeExhibit.slug}`}
                  className="inline-flex items-center gap-1.5 rounded-[2px] bg-[#131108] px-3.5 py-2 font-mono text-xs font-semibold uppercase text-[#f2eee3] shadow-sm transition hover:bg-[#ff5100]"
                >
                  <span>{copy.caseStudyBtn}</span>
                  <ArrowRight size={13} />
                </Link>

                <a
                  href={activeExhibit.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-[2px] border border-[#131108]/20 bg-white px-3 py-2 font-mono text-xs font-semibold uppercase text-[#131108] transition hover:border-[#ff5100] hover:text-[#ff5100]"
                >
                  <Github size={13} />
                  <span>{copy.githubBtn}</span>
                  <ArrowUpRight size={12} className="text-[#78716c]" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

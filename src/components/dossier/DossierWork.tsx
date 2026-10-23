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
  title: string;
  category: Record<"uz" | "en" | "ru", string>;
  caption: Record<"uz" | "en" | "ru", string>;
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
    title: "INCLUSIVE LEGAL RAG",
    category: {
      uz: "STATUTORY AI & HYBRID RAG",
      en: "STATUTORY AI & HYBRID RAG",
      ru: "STATUTORY AI & HYBRID RAG",
    },
    caption: {
      uz: "EXHIBIT 01 — BMT Konvensiyasi (UN CRPD) va milliy qonunchilik korpusini semantik tahlil qiluvchi ixtisoslashgan LegalTech tizimi.",
      en: "EXHIBIT 01 — Statutory intelligence bridging national disability legislation in Uzbekistan with the UN CRPD framework.",
      ru: "ЭКСПОНАТ 01 — Анализ законодательства о правах лиц с инвалидностью и норм ООН с использованием LanceDB и RRF.",
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
    title: "ALLOMA COGNITIVE ENGINE",
    category: {
      uz: "COGNITIVE ARCHITECTURE & MEMORY",
      en: "COGNITIVE ARCHITECTURE & MEMORY",
      ru: "COGNITIVE ARCHITECTURE & MEMORY",
    },
    caption: {
      uz: "EXHIBIT 02 — Talabalar uchun shaxsiy bilimlarni saqlovchi va ko'p modulli LLM marshrutlashga ega kognitiv mentor.",
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
    title: "MULTI-AGENT ROUNDTABLE",
    category: {
      uz: "CONSENSUS & DEBATE PROTOCOL",
      en: "CONSENSUS & DEBATE PROTOCOL",
      ru: "CONSENSUS & DEBATE PROTOCOL",
    },
    caption: {
      uz: "EXHIBIT 03 — Karpathy LLM Council asosidagi 5 ta mustaqil agent rollari va anonim ekspertiza platformasi.",
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
    title: "HUQUQPLUS.UZ",
    category: {
      uz: "CITIZEN LEGAL PORTAL",
      en: "CITIZEN LEGAL PORTAL",
      ru: "CITIZEN LEGAL PORTAL",
    },
    caption: {
      uz: "EXHIBIT 04 — Fuqarolar huquqiy savodxonligi, normativ tahlil va advokatlar bilan tezkor bog'lanish portali.",
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
    title: "MAHALLA MANAGEMENT",
    category: {
      uz: "CIVIC WORKFLOW & REGISTRIES",
      en: "CIVIC WORKFLOW & REGISTRIES",
      ru: "CIVIC WORKFLOW & REGISTRIES",
    },
    caption: {
      uz: "EXHIBIT 05 — Mahalla fuqarolar yig'inlari uchun murojaatlar, ijtimoiy yordam va reyestrlarni avtomatlashtirish tizimi.",
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
    title: "KITOBPLUS PLATFORM",
    category: {
      uz: "DIGITAL LIBRARY & INDEXING",
      en: "DIGITAL LIBRARY & INDEXING",
      ru: "DIGITAL LIBRARY & INDEXING",
    },
    caption: {
      uz: "EXHIBIT 06 — Raqamlashtirilgan kitoblar, ilmiy adabiyotlar va to'liq matnli indeksatsiyaga ega o'quv platformasi.",
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
    title: "UZBEKISTAN MAP PUZZLE",
    category: {
      uz: "INTERACTIVE GEOGRAPHY & CIVIC",
      en: "INTERACTIVE GEOGRAPHY & CIVIC",
      ru: "INTERACTIVE GEOGRAPHY & CIVIC",
    },
    caption: {
      uz: "EXHIBIT 07 — O'zbekiston viloyatlari, madaniyati va ma'muriy tuzilishini o'rgatuvchi interaktiv ta'limiy dastur.",
      en: "EXHIBIT 07 — Interactive educational geography puzzle mapping 14 regions and historical landmarks of Uzbekistan.",
      ru: "ЭКСПОНАТ 07 — Образовательная интерактивная карта-головоломка по 14 регионам Узбекистана.",
    },
    tags: ["Canvas", "Interactive SVG", "Gamification", "TypeScript"],
  },
];

const workCopy = {
  uz: {
    stamp: "№ 03",
    title: "WORK",
    subtitle: "The Evidence",
    metaRight: "EXHIBITS 07 · 2024—2026",
    openBadge: "OPEN",
    caseStudyBtn: "Loyiha Tahlili",
    githubBtn: "GitHub",
    allProjectsBtn: "Barcha loyihalar indeksi →",
  },
  en: {
    stamp: "№ 03",
    title: "WORK",
    subtitle: "The Evidence",
    metaRight: "EXHIBITS 07 · 2024—2026",
    openBadge: "OPEN",
    caseStudyBtn: "Case Study",
    githubBtn: "GitHub",
    allProjectsBtn: "View Project Index →",
  },
  ru: {
    stamp: "№ 03",
    title: "WORK",
    subtitle: "The Evidence",
    metaRight: "УЛИКИ 07 · 2024—2026",
    openBadge: "ОТКРЫТЬ",
    caseStudyBtn: "Анализ проекта",
    githubBtn: "GitHub",
    allProjectsBtn: "Все проекты →",
  },
};

export function DossierWork() {
  const { locale } = useI18n();
  const copy = workCopy[locale] || workCopy.en;
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const activeExhibit = exhibits[activeIndex];

  return (
    <section
      id="work"
      className="relative w-full border-t border-[#131108]/15 bg-[#e9e3d2] px-6 py-24 text-[#131108] sm:px-12 lg:px-20"
    >
      {/* Top Header Strip */}
      <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-[#131108]/15 pb-6">
        <div className="flex items-center gap-3.5">
          <span className="dossier-stamp">{copy.stamp}</span>
          <h2 className="font-sans text-3xl font-black uppercase tracking-tight text-[#131108] sm:text-4xl">
            {copy.title}
          </h2>
          <span className="font-serif text-xl italic text-[#57534e] sm:text-2xl">
            {copy.subtitle}
          </span>
        </div>

        <div className="font-mono text-xs uppercase tracking-widest text-[#78716c]">
          {copy.metaRight}
        </div>
      </div>

      {/* Main Split Grid: Left Exhibit List with Exact Jopecuro Slide Fill, Right Sticky Paperclip Frame */}
      <div className="mt-16 grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16">
        {/* Left Column: Interactive Project Rows (7 cols) */}
        <div className="space-y-0 lg:col-span-7">
          {exhibits.map((item, idx) => {
            const isActive = activeIndex === idx;
            return (
              <div
                key={item.id}
                onMouseEnter={() => setActiveIndex(idx)}
                onClick={() => setActiveIndex(idx)}
                className={`work-row ${isActive ? "is-active" : ""}`}
              >
                {/* 1: Number */}
                <span className="font-mono text-xs font-bold text-[#78716c]">
                  {item.num}
                </span>

                {/* 2: Title */}
                <h3 className="font-sans text-lg font-black tracking-tight sm:text-xl">
                  {item.title}
                </h3>

                {/* 3: Category */}
                <span className="font-mono text-[10.5px] uppercase tracking-wider text-[#57534e]">
                  {item.category[locale]}
                </span>

                {/* 4: Year + Live Red Dot if active */}
                <div className="flex items-center justify-end gap-1.5 font-mono text-xs text-[#78716c]">
                  {isActive && (
                    <span className="h-1.5 w-1.5 rounded-full bg-[#ff5100] pulse-orange-dot" />
                  )}
                  <span>{item.year}</span>
                </div>

                {/* 5: Arrow */}
                <span className="work-row__arrow font-sans text-sm font-bold">
                  {isActive ? "→" : "↗"}
                </span>
              </div>
            );
          })}

          <div className="pt-8">
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
          <div className="dossier-exhibit-frame p-4 shadow-2xl">
            {/* Metallic Paperclip SVG */}
            <div className="absolute -top-3 left-6 z-20">
              <svg
                width="18"
                height="36"
                viewBox="0 0 18 34"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-[#57534e] drop-shadow"
              >
                <path d="M4 1h10a3 3 0 0 1 3 3v22a8 8 0 0 1-16 0V4a3 3 0 0 1 3-3Zm2 5v18a3 3 0 0 0 6 0V6"></path>
              </svg>
            </div>

            {/* Exhibit Number Stamp */}
            <div className="flex items-center justify-between border-b border-[#131108]/10 pb-3 pl-12 pr-2">
              <span className="dossier-stamp-dark">
                EXHIBIT {activeExhibit.num}
              </span>
              <span className="font-mono text-xs font-bold text-[#78716c]">
                {activeExhibit.year}
              </span>
            </div>

            {/* Visual SVG Container */}
            <div className="relative mt-3 aspect-[16/11] w-full overflow-hidden rounded-[2px] border border-[#131108]/10 bg-[#FAF8F5]">
              <Image
                src={activeExhibit.image}
                alt={activeExhibit.title}
                fill
                className="object-cover object-top transition duration-500 hover:scale-[1.02]"
                unoptimized
              />
            </div>

            {/* Caption & Metadata */}
            <div className="mt-4 space-y-3.5">
              <p className="font-serif text-xs italic leading-relaxed text-[#44403c]">
                {activeExhibit.caption[locale]}
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
                  className="inline-flex items-center gap-1.5 rounded-[2px] bg-[#131108] px-4 py-2 font-mono text-xs font-bold uppercase text-[#f2eee3] shadow transition hover:bg-[#ff5100]"
                >
                  <span>{copy.caseStudyBtn}</span>
                  <ArrowRight size={13} />
                </Link>

                <a
                  href={activeExhibit.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-[2px] border border-[#131108]/20 bg-white px-3.5 py-2 font-mono text-xs font-semibold uppercase text-[#131108] transition hover:border-[#ff5100] hover:text-[#ff5100]"
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

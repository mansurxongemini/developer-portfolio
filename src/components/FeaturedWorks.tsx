"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Github, ArrowRight, Layers, Cpu, ShieldCheck, CheckCircle2, Send } from "lucide-react";
import { useI18n } from "@/components/I18nProvider";

interface FlagshipProject {
  slug: string;
  image: string;
  githubUrl: string;
  tags: string[];
  kicker: Record<"uz" | "en" | "ru", string>;
  title: Record<"uz" | "en" | "ru", string>;
  desc: Record<"uz" | "en" | "ru", string>;
  highlights: Record<"uz" | "en" | "ru", string[]>;
}

const flagshipProjects: FlagshipProject[] = [
  {
    slug: "inclusive-legal-rag",
    image: "/images/projects/inclusive-legal-rag.svg",
    githubUrl: "https://github.com/mansurxongemini/inclusive-legal-rag",
    tags: ["Legal-AI", "LanceDB", "FastAPI", "Hybrid RRF", "Python"],
    kicker: {
      uz: "FLAGMAN LEGALTECH & STATUTORY RAG",
      en: "FLAGSHIP LEGALTECH & STATUTORY RAG",
      ru: "ФЛАГМАНСКИЙ LEGALTECH & STATUTORY RAG",
    },
    title: {
      uz: "Inclusive Legal AI & Statutory RAG Platform",
      en: "Inclusive Legal AI & Statutory RAG Platform",
      ru: "Inclusive Legal AI & Statutory RAG Platform",
    },
    desc: {
      uz: "O'zbekiston milliy qonunchiligi va BMT Konvensiyasi (UN CRPD) normalarini LanceDB va gibrid RRF algoritmi orqali semantik tahlil qiluvchi ixtisoslashgan LegalTech tizimi.",
      en: "Statutory intelligence and hybrid RAG engine bridging national disability legislation in Uzbekistan with the UN CRPD framework using LanceDB and Reciprocal Rank Fusion.",
      ru: "Правовая аналитическая платформа и гибридный RAG-движок для анализа законодательства о правах лиц с инвалидностью и нормах ООН (UN CRPD).",
    },
    highlights: {
      uz: [
        "LanceDB + SQLite FTS5 gibrid qidiruv (RRF)",
        "0 gallyutsinatsiya: normativ moddalar bilan qat'iy tasdiqlash",
        "FastAPI asinxron mikroservis arxitekturasi",
      ],
      en: [
        "LanceDB + SQLite FTS5 hybrid retrieval (RRF)",
        "Zero hallucination: strict statutory citation grounding",
        "FastAPI asynchronous microservice runtime",
      ],
      ru: [
        "Гибридный поиск LanceDB + SQLite FTS5 (RRF)",
        "Без галлюцинаций: строгая привязка к статьям закона",
        "Асинхронный бэкенд на базе FastAPI",
      ],
    },
  },
  {
    slug: "alloma-cognitive-engine",
    image: "/images/projects/alloma-ai.svg",
    githubUrl: "https://github.com/mansurxongemini/alloma-cognitive-engine",
    tags: ["Cognitive-AI", "Vector Memory", "TypeScript", "Next.js"],
    kicker: {
      uz: "KOGNITIV AI & DOIMIY XOTIRA",
      en: "COGNITIVE AI & PERSISTENT MEMORY",
      ru: "КОГНИТИВНЫЙ ИИ И ПАМЯТЬ",
    },
    title: {
      uz: "Alloma AI Cognitive Engine",
      en: "Alloma AI Cognitive Engine",
      ru: "Alloma AI Cognitive Engine",
    },
    desc: {
      uz: "Doimiy vektorli xotira va ko'p modulli LLM marshrutlashga ega shaxsiy ta'lim mentori.",
      en: "Intelligent cognitive architecture with persistent vector memory for personalized educational workflows.",
      ru: "Когнитивный движок с постоянной векторной памятью для персонализированного обучения.",
    },
    highlights: {
      uz: [
        "Pinecone vektorli xotira va semantik kesh",
        "OpenRouter dinamik model marshrutlash",
      ],
      en: [
        "Pinecone vector memory & semantic caching",
        "OpenRouter dynamic multi-model routing",
      ],
      ru: [
        "Векторная память Pinecone и семантический кэш",
        "Динамическая маршрутизация через OpenRouter",
      ],
    },
  },
  {
    slug: "multi-agent-roundtable-system",
    image: "/images/projects/multi-agent-roundtable.svg",
    githubUrl: "https://github.com/mansurxongemini/multi-agent-roundtable-system",
    tags: ["Multi-Agent", "Consensus", "FastAPI", "Docker"],
    kicker: {
      uz: "KO'P AGENTLI KONSENSUS",
      en: "MULTI-AGENT CONSENSUS",
      ru: "МНОГОАГЕНТНЫЙ КОНСЕНСУС",
    },
    title: {
      uz: "Multi-Agent Roundtable Platform",
      en: "Multi-Agent Roundtable Platform",
      ru: "Multi-Agent Roundtable Platform",
    },
    desc: {
      uz: "Mustaqil subagentlar va anonim peer-review orqali murakkab muammolarni tahlil qilish tizimi.",
      en: "Collaborative multi-agent framework featuring dynamic provider routing and automated peer-review consensus.",
      ru: "Многоагентная система принятия решений с анонимным peer-review и консенсусом.",
    },
    highlights: {
      uz: [
        "LLM Council protokoli: 5 ta mustaqil qarash",
        "O'zaro anonim ekspertiza va sintez",
      ],
      en: [
        "LLM Council protocol: 5 independent viewpoints",
        "Anonymous peer review and synthesis",
      ],
      ru: [
        "Протокол LLM Council: 5 независимых экспертов",
        "Анонимный перекрёстный анализ и синтез",
      ],
    },
  },
];

const i18nContent = {
  uz: {
    kicker: "SARALANGAN MUHANDISLIK ISHLARI",
    title: "Huquqiy Texnologiyalar va Sun'iy Intellekt Tizimlari",
    subtitle: "Haqiqiy ochiq manbali kod, mustahkam ma'lumotlar arxitekturasi va qat'iy qonunchilik normativlariga tayangan loyihalar.",
    caseStudyBtn: "Loyiha tahlili",
    githubBtn: "GitHub kodi",
    viewAllProjects: "Barcha 7 ta muhandislik loyihasini ko'rish",
    channelKicker: "MUSTAQIL TAHLIL",
    channelTitle: "Tahlil Telegram Kanali",
    channelDesc: "Huquq, texnologiya va jamiyat masalalari tahlili.",
    channelBtn: "Kanalga obuna bo'lish",
  },
  en: {
    kicker: "FEATURED ENGINEERING SHOWCASE",
    title: "Statutory Intelligence & Agentic Systems",
    subtitle: "Production-ready open source code, robust data architectures, and rigorous statutory grounding.",
    caseStudyBtn: "Case Study",
    githubBtn: "GitHub Repository",
    viewAllProjects: "Explore All 7 Engineering Projects",
    channelKicker: "INDEPENDENT ANALYSIS",
    channelTitle: "Tahlil Telegram Channel",
    channelDesc: "In-depth commentary on law, technology, and society.",
    channelBtn: "Join Channel",
  },
  ru: {
    kicker: "ФЛАГМАНСКИЕ РАЗРАБОТКИ",
    title: "Правовые технологии и агентные ИИ системы",
    subtitle: "Реальный открытый исходный код, надёжные архитектуры данных и строгая юридическая валидация.",
    caseStudyBtn: "Анализ проекта",
    githubBtn: "GitHub репозиторий",
    viewAllProjects: "Посмотреть все 7 инженерных проектов",
    channelKicker: "НЕЗАВИСИМАЯ АНАЛИТИКА",
    channelTitle: "Telegram-канал «Тахлил»",
    channelDesc: "Глубокая аналитика на стыке права, технологий и общества.",
    channelBtn: "Подписаться",
  },
};

export function FeaturedWorks() {
  const { locale } = useI18n();
  const content = i18nContent[locale] || i18nContent.uz;
  const [heroProject, ...secondaryProjects] = flagshipProjects;

  return (
    <section className="relative w-full space-y-6">
      {/* Header */}
      <div className="space-y-2 border-b border-[#E7E5E4] pb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-amber-900">
          {content.kicker}
        </p>
        <h2 className="text-2xl font-bold tracking-tight text-[#1C1917] md:text-3xl">
          {content.title}
        </h2>
        <p className="max-w-2xl text-sm leading-relaxed text-[#57534E]">
          {content.subtitle}
        </p>
      </div>

      {/* Main Flagship Project (Inclusive Legal RAG) */}
      <article className="group relative overflow-hidden rounded-2xl border border-[#E7E5E4] bg-white p-6 shadow-[0_4px_24px_rgba(44,38,30,0.04)] transition-all duration-300 hover:border-amber-400/50 hover:shadow-[0_12px_36px_rgba(44,38,30,0.08)] lg:p-8">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
          {/* Left: Info */}
          <div className="flex flex-col justify-between space-y-5 lg:col-span-7">
            <div className="space-y-2.5">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-600/20 bg-amber-600/[0.08] px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-amber-900">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-600" />
                {heroProject.kicker[locale]}
              </span>
              <h3 className="text-2xl font-bold tracking-tight text-[#1C1917] md:text-3xl">
                {heroProject.title[locale]}
              </h3>
              <p className="text-sm leading-relaxed text-[#57534E]">
                {heroProject.desc[locale]}
              </p>
            </div>

            {/* Architecture Highlights */}
            <div className="space-y-2 rounded-xl border border-[#F5F2EB] bg-[#FAF8F5] p-3.5">
              {heroProject.highlights[locale].map((point, i) => (
                <div key={i} className="flex items-center gap-2.5 text-xs font-medium text-[#44403C]">
                  <CheckCircle2 size={14} className="shrink-0 text-amber-700" />
                  <span>{point}</span>
                </div>
              ))}
            </div>

            {/* Stack Tags */}
            <div className="flex flex-wrap gap-1.5">
              {heroProject.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md border border-[#E7E5E4] bg-[#FAF8F5] px-2.5 py-1 text-xs font-medium text-[#57534E]"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <Link
                href={`/work/${heroProject.slug}`}
                className="inline-flex items-center gap-2 rounded-xl bg-[#1C1917] px-4 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-[#292524] hover:shadow-md"
              >
                <span>{content.caseStudyBtn}</span>
                <ArrowRight size={14} />
              </Link>
              <a
                href={heroProject.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-[#D6D3D1] bg-white px-4 py-2.5 text-xs font-semibold text-[#1C1917] shadow-sm transition hover:border-amber-500/50 hover:bg-[#FAF8F5]"
              >
                <Github size={14} />
                <span>{content.githubBtn}</span>
                <ArrowUpRight size={13} className="text-[#78716C]" />
              </a>
            </div>
          </div>

          {/* Right: Rich Visual Preview */}
          <div className="relative aspect-[16/11] w-full overflow-hidden rounded-xl border border-[#E7E5E4] bg-[#FAF8F5] shadow-inner lg:col-span-5">
            <Image
              src={heroProject.image}
              alt={heroProject.title[locale]}
              fill
              className="object-cover object-top transition duration-500 group-hover:scale-[1.02]"
              unoptimized
            />
          </div>
        </div>
      </article>

      {/* Secondary Flagship Grid (Alloma AI & Multi-Agent Roundtable) */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {secondaryProjects.map((proj) => (
          <article
            key={proj.slug}
            className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-[#E7E5E4] bg-white p-6 shadow-[0_4px_24px_rgba(44,38,30,0.03)] transition-all duration-300 hover:border-amber-400/40 hover:shadow-[0_12px_32px_rgba(44,38,30,0.07)]"
          >
            <div className="space-y-4">
              {/* Visual Banner */}
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-[#E7E5E4] bg-[#FAF8F5]">
                <Image
                  src={proj.image}
                  alt={proj.title[locale]}
                  fill
                  className="object-cover object-top transition duration-500 group-hover:scale-[1.02]"
                  unoptimized
                />
              </div>

              {/* Info */}
              <div className="space-y-2">
                <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-amber-800">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-600" />
                  {proj.kicker[locale]}
                </span>
                <h3 className="text-xl font-bold tracking-tight text-[#1C1917]">
                  {proj.title[locale]}
                </h3>
                <p className="text-xs leading-relaxed text-[#57534E]">
                  {proj.desc[locale]}
                </p>
              </div>

              {/* Bullets */}
              <div className="space-y-1.5 rounded-lg border border-[#F5F2EB] bg-[#FAF8F5] p-3 text-xs text-[#44403C]">
                {proj.highlights[locale].map((point, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <CheckCircle2 size={13} className="shrink-0 text-amber-700" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5">
                {proj.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md border border-[#E7E5E4] bg-[#FAF8F5] px-2 py-0.5 text-[11px] font-medium text-[#57534E]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="mt-5 flex items-center justify-between border-t border-[#F5F2EB] pt-4">
              <Link
                href={`/work/${proj.slug}`}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1C1917] transition hover:text-amber-800"
              >
                <span>{content.caseStudyBtn}</span>
                <ArrowRight size={13} />
              </Link>
              <a
                href={proj.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg border border-[#E7E5E4] bg-[#FAF8F5] px-3 py-1.5 text-xs font-medium text-[#44403C] transition hover:border-amber-400/50 hover:bg-white"
              >
                <Github size={13} />
                <span>{content.githubBtn}</span>
                <ArrowUpRight size={12} className="text-[#78716C]" />
              </a>
            </div>
          </article>
        ))}
      </div>

      {/* Bottom Action Bar: Explore All Projects + Telegram Spotlight */}
      <div className="flex flex-col items-center justify-between gap-4 rounded-2xl border border-[#E7E5E4] bg-[#FBF9F5] p-5 sm:flex-row">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-amber-900">
            {content.channelKicker}
          </p>
          <p className="text-sm font-medium text-[#1C1917]">
            {content.channelTitle} — <span className="font-normal text-[#57534E]">{content.channelDesc}</span>
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <a
            href="https://t.me/+OWASsFa4TGg2MWYy"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-xl border border-[#D6D3D1] bg-white px-3.5 py-2 text-xs font-medium text-[#44403C] shadow-sm transition hover:border-amber-600/40 hover:bg-[#F7F5F0] hover:text-[#1C1917]"
          >
            <Send size={13} />
            <span>{content.channelBtn}</span>
          </a>
          <Link
            href="/work"
            className="inline-flex items-center gap-2 rounded-xl border border-amber-600/30 bg-amber-600/[0.08] px-4 py-2 text-xs font-semibold text-amber-950 transition hover:border-amber-600/60 hover:bg-amber-600/[0.16] hover:shadow-[0_2px_12px_rgba(217,119,6,0.12)]"
          >
            <span>{content.viewAllProjects}</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}

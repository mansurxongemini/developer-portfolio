"use client";

import { useState } from "react";
import { useI18n } from "@/components/I18nProvider";
import { Plus, Minus, CheckCircle2 } from "lucide-react";

interface CapabilityItem {
  num: string;
  titles: Record<"uz" | "en" | "ru", string>;
  descs: Record<"uz" | "en" | "ru", string>;
  points: Record<"uz" | "en" | "ru", string[]>;
  tags: string[];
}

const capabilities: CapabilityItem[] = [
  {
    num: "01",
    titles: {
      uz: "STATUTORY RAG VA GIBRID QIDIRUV",
      en: "STATUTORY RAG & HYBRID RETRIEVAL",
      ru: "STATUTORY RAG И ГИБРИДНЫЙ ПОИСК",
    },
    descs: {
      uz: "Qonun hujjatlari va normativ aktlar uchun maxsus gibrid qidiruv (RAG) arxitekturasi. Gallyutsinatsiyasiz, aniq modda va bandlarga tayanuvchi ishonchli yechim.",
      en: "Specialized statutory RAG architecture designed for complex legislative corpora. Guarantees zero hallucinations through exact statutory citation grounding.",
      ru: "Специализированная гибридная архитектура RAG для нормативно-правовых актов с гарантией нулевых галлюцинаций и точной привязкой к статьям.",
    },
    points: {
      uz: [
        "LanceDB vektorli qidiruv + SQLite FTS5 to'liq matnli leksik qidiruv",
        "Reciprocal Rank Fusion (RRF) orqali semantik va leksik natijalarni birlashtirish",
        "BMT Konvensiyasi (UN CRPD) va milliy qonunchilik korpusini sinxronlash",
      ],
      en: [
        "LanceDB dense vector search paired with SQLite FTS5 lexical matching",
        "Reciprocal Rank Fusion (RRF) for optimal ranking of legal hits",
        "Alignment with UN CRPD international standards and national legislation",
      ],
      ru: [
        "Векторная база LanceDB + полнотекстовый лексический поиск SQLite FTS5",
        "Reciprocal Rank Fusion (RRF) для точного ранжирования результатов",
        "Согласование с международными нормами ООН (CRPD) и законами Узбекистана",
      ],
    },
    tags: ["LanceDB", "FastAPI", "Hybrid RRF", "Python", "UN CRPD"],
  },
  {
    num: "02",
    titles: {
      uz: "KO'P AGENTLI KONSENSUS TIZIMLARI",
      en: "MULTI-AGENT ROUNDTABLE & CONSENSUS",
      ru: "МНОГОАГЕНТНЫЙ КОНСЕНСУС И ЭКСПЕРТИЗА",
    },
    descs: {
      uz: "Bir nechta ixtisoslashgan AI agentlari o'rtasida munozara, anonim ekspertiza (peer-review) va xolis qarorlar sintezini ta'minlovchi platforma.",
      en: "Collaborative multi-agent framework orchestrating debate, anonymous peer-review, and synthesized consensus among specialized AI personas.",
      ru: "Оркестрация независимых ИИ-агентов для глубокого дебатирования, анонимного взаимного рецензирования и синтеза взвешенных решений.",
    },
    points: {
      uz: [
        "Karpathy LLM Council metodologiyasiga asoslangan 5 ta mustaqil qarash",
        "Anonim o'zaro tekshirish va xatolarni (bias) avtomatik yo'qotish",
        "Asinxron Docker mikroservislari orqali xavfsiz izolyatsiya",
      ],
      en: [
        "Inspired by Karpathy LLM Council: 5 specialized independent viewpoints",
        "Automated anonymous peer review eliminating individual model bias",
        "Asynchronous runtime isolated across Docker containers",
      ],
      ru: [
        "Методология LLM Council: 5 независимых экспертных ролей",
        "Анонимная перекрёстная оценка и устранение субъективной предвзятости",
        "Асинхронная микросервисная изоляция в Docker",
      ],
    },
    tags: ["Multi-Agent", "Consensus", "FastAPI", "Docker", "Python"],
  },
  {
    num: "03",
    titles: {
      uz: "KOGNITIV ARXITEKTURA VA DOIMIY XOTIRA",
      en: "COGNITIVE ARCHITECTURE & VECTOR MEMORY",
      ru: "КОГНИТИВНАЯ ПАМЯТЬ И EDTECH ДВИЖКИ",
    },
    descs: {
      uz: "Talabalar va tadqiqotchilar uchun shaxsiy bilimlarni doimiy vektor bazasida saqlovchi va muloqot davomida chuqur kontekstni eslab qoluvchi intellekt dvigateli.",
      en: "Persistent long-term cognitive architecture for educational mentoring, personal knowledge indexing, and context-aware dialogue.",
      ru: "Когнитивная архитектура с постоянной долговременной памятью для образовательного менторства и анализа сложных академических текстов.",
    },
    points: {
      uz: [
        "Pinecone vektorli xotira va semantik kesh tizimi",
        "OpenRouter orqali eng tejamkor va kuchli modellarni dinamik tanlash",
        "Next.js va TypeScript asosidagi yuqori unumdor interfeys",
      ],
      en: [
        "Pinecone vector index paired with high-performance semantic caching",
        "OpenRouter integration for dynamic cost-efficient model routing",
        "TypeScript and Next.js frontend with modular agent backends",
      ],
      ru: [
        "Векторная память Pinecone с семантическим кэшированием",
        "Динамическая маршрутизация через OpenRouter",
        "Современный фронтенд на TypeScript и Next.js",
      ],
    },
    tags: ["Pinecone", "OpenRouter", "TypeScript", "Next.js", "EdTech"],
  },
  {
    num: "04",
    titles: {
      uz: "NORMATIV HUQUQIY TAHLIL VA YURISPRUDENSIYA",
      en: "STATUTORY RISK AUDIT & JURISPRUDENCE",
      ru: "НОРМАТИВНО-ПРАВОВОЙ АНАЛИЗ И АУДИТ",
    },
    descs: {
      uz: "Qonunchilik normalarini tizimli tahlil qilish, normativ ziddiyatlarni aniqlash va qat'iy yuridik xulosalar tayyorlash (TDYU bazasi).",
      en: "Systematic statutory analysis, compliance auditing, legislative conflict detection, and evidence-grounded legal evaluation (TSUL foundation).",
      ru: "Системный анализ законодательства, выявление нормативных коллизий и подготовка строгих юридических заключений (база ТГЮУ).",
    },
    points: {
      uz: [
        "Qonun hujjatlarining ijtimoiy va texnologik sohalarga ta'sirini baholash",
        "Inson huquqlari va raqamli maxfiylik standartlari nazorati",
        "Qonunchilik loyihalari bo'yicha mustaqil tahliliy ekspertiza",
      ],
      en: [
        "Assessing regulatory impacts on technology, data privacy, and digital rights",
        "Compliance monitoring against constitutional and international treaties",
        "Independent analytical briefings on emerging tech legislation",
      ],
      ru: [
        "Оценка регуляторного воздействия на технологии и защиту персональных данных",
        "Контроль соответствия конституционным и международным нормам",
        "Независимая юридическая экспертиза законопроектов в сфере IT",
      ],
    },
    tags: ["TSUL Law", "Compliance", "Statutory Audit", "LegalTech", "Civil Code"],
  },
  {
    num: "05",
    titles: {
      uz: "ASINXRON BACKEND VA ISHONCHLI PIPELINELAR",
      en: "ASYNCHRONOUS BACKEND & DATA PIPELINES",
      ru: "АСИНХРОННЫЙ БЭКЕНД И ИНЖЕНЕРИЯ ДАННЫХ",
    },
    descs: {
      uz: "Yuqori yuklamalarga chidamli asinxron API servislari, navbatlar (queues) va ma'lumotlar bazasi arxitekturasi.",
      en: "Resilient asynchronous microservice APIs, background task queues, and zero-downtime data architectures.",
      ru: "Отказоустойчивые асинхронные API-сервисы, очереди фоновых задач и надёжные структуры данных.",
    },
    points: {
      uz: [
        "FastAPI va Python 3.11+ asinxron runtime",
        "Redis va Celery orqali og'ir vazifalarni fonda qayta ishlash",
        "SQLModel, PostgreSQL va xavfsiz autentifikatsiya protokollari",
      ],
      en: [
        "FastAPI runtime with native Python 3.11+ asynchronous concurrency",
        "Redis and Celery background workers for compute-intensive pipelines",
        "SQLModel, PostgreSQL, and hardened cryptographic authentication",
      ],
      ru: [
        "Асинхронный FastAPI бэкенд на Python 3.11+",
        "Фоновые очереди задач на базе Redis и Celery",
        "SQLModel, PostgreSQL и строгие протоколы аутентификации",
      ],
    },
    tags: ["FastAPI", "Redis", "Celery", "PostgreSQL", "Docker"],
  },
];

const capabilitiesCopy = {
  uz: {
    stamp: "№ 02",
    title: "CAPABILITIES",
    subtitle: "Modus Operandi",
    metaRight: "USULLAR 05 · AMALIYOT",
    summaryTitle: "Amaliy Komponentlar",
    summaryText:
      "Huquqshunoslik bilimlari va ilg'or AI muhandisligi sintezi. Har bir uslub amalda sinovdan o'tgan ochiq manbali kod va aniq ilmiy asoslarga tayanadi.",
  },
  en: {
    stamp: "№ 02",
    title: "CAPABILITIES",
    subtitle: "Modus Operandi",
    metaRight: "METHODS 05 · PRACTICE",
    summaryTitle: "Core Disciplines",
    summaryText:
      "Synthesis of statutory law and frontier AI engineering. Every method is verified through open-source production code and empirical research.",
  },
  ru: {
    stamp: "№ 02",
    title: "CAPABILITIES",
    subtitle: "Modus Operandi",
    metaRight: "МЕТОДЫ 05 · ПРАКТИКА",
    summaryTitle: "Ключевые Компетенции",
    summaryText:
      "Синтез строгого правового анализа и передовой инженерии ИИ. Каждый метод подтверждён работающим открытым кодом и практикой.",
  },
};

export function DossierCapabilities() {
  const { locale } = useI18n();
  const copy = capabilitiesCopy[locale] || capabilitiesCopy.uz;
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="capabilities"
      className="relative w-full border-t border-[#f2eee3]/10 bg-[#0b0a06] px-5 py-20 text-[#f2eee3] sm:px-10 lg:px-16"
    >
      {/* Top Header Strip */}
      <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-[#f2eee3]/15 pb-6">
        <div className="flex items-center gap-3">
          <span className="dossier-stamp">{copy.stamp}</span>
          <h2 className="font-sans text-2xl font-black uppercase tracking-tight text-[#f2eee3] sm:text-3xl">
            {copy.title}
          </h2>
          <span className="font-serif text-lg italic text-[#a8a29e] sm:text-xl">
            {copy.subtitle}
          </span>
        </div>

        <div className="font-mono text-xs uppercase tracking-widest text-[#78716c]">
          {copy.metaRight}
        </div>
      </div>

      {/* Main Grid: Left Taxonomy, Right Interactive Accordion */}
      <div className="mt-14 grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16">
        {/* Left Column (4 cols) */}
        <div className="space-y-6 lg:col-span-4">
          <div className="font-mono text-xs font-semibold uppercase tracking-widest text-[#ff5100]">
            {copy.summaryTitle}
          </div>
          <p className="font-serif text-base italic leading-relaxed text-[#d6d3d1]">
            {copy.summaryText}
          </p>

          <div className="space-y-2 border-t border-[#f2eee3]/10 pt-6 font-mono text-xs text-[#a8a29e]">
            <div>• STATUTORY RAG & CITATIONS</div>
            <div>• MULTI-AGENT ROUNDTABLE</div>
            <div>• VECTOR MEMORY & EDTECH</div>
            <div>• NORMATIVE LEGAL COMPLIANCE</div>
            <div>• ASYNC BACKEND PIPELINES</div>
          </div>
        </div>

        {/* Right Column: Accordion Rows (8 cols) */}
        <div className="space-y-4 lg:col-span-8">
          {capabilities.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={item.num}
                className={`overflow-hidden rounded-[2px] border transition-all duration-300 ${
                  isOpen
                    ? "border-[#ff5100] bg-[#131108] shadow-[0_0_24px_rgba(255,81,0,0.12)]"
                    : "border-[#f2eee3]/15 bg-[#131108]/60 hover:border-[#f2eee3]/40"
                }`}
              >
                {/* Accordion Trigger */}
                <button
                  onClick={() => toggle(idx)}
                  className="flex w-full items-center justify-between bg-transparent p-5 text-left sm:p-6"
                >
                  <div className="flex items-center gap-4 sm:gap-6">
                    <span
                      className={`font-sans text-2xl font-black transition-colors sm:text-3xl ${
                        isOpen ? "text-[#ff5100]" : "dossier-wireframe-text"
                      }`}
                    >
                      {item.num}
                    </span>
                    <h3 className="font-sans text-sm font-bold uppercase tracking-wider text-[#f2eee3] sm:text-base">
                      {item.titles[locale]}
                    </h3>
                  </div>

                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#f2eee3]/20 text-[#f2eee3] transition hover:border-[#ff5100] hover:text-[#ff5100]">
                    {isOpen ? <Minus size={14} /> : <Plus size={14} />}
                  </span>
                </button>

                {/* Accordion Expandable Content */}
                {isOpen && (
                  <div className="space-y-4 border-t border-[#f2eee3]/10 p-5 pt-4 sm:p-6 sm:pt-4">
                    <p className="text-sm leading-relaxed text-[#d6d3d1]">
                      {item.descs[locale]}
                    </p>

                    {/* Bullet Points */}
                    <div className="space-y-2 rounded-[2px] border border-[#f2eee3]/10 bg-[#0b0a06]/60 p-4">
                      {item.points[locale].map((pt, i) => (
                        <div key={i} className="flex items-start gap-2.5 text-xs text-[#e7e5e4]">
                          <CheckCircle2 size={13} className="mt-0.5 shrink-0 text-[#ff5100]" />
                          <span>{pt}</span>
                        </div>
                      ))}
                    </div>

                    {/* Stack Badges */}
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-[2px] border border-[#f2eee3]/15 bg-[#0b0a06] px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-[#a8a29e]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

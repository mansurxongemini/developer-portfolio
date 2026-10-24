"use client";

import Image from "next/image";
import { useI18n } from "@/components/I18nProvider";

interface CapabilityItem {
  num: string;
  titles: Record<"uz" | "en" | "ru", string>;
  descs: Record<"uz" | "en" | "ru", string>;
}

const capabilities: CapabilityItem[] = [
  {
    num: "01",
    titles: { uz: "Huquqiy RAG", en: "Legal RAG", ru: "Правовой RAG" },
    descs: {
      uz: "Qonunlar bo'yicha gibrid qidiruv: LanceDB, FTS5 va RRF.",
      en: "Hybrid search over statutes: LanceDB, FTS5 and RRF.",
      ru: "Гибридный поиск по законам: LanceDB, FTS5 и RRF.",
    },
  },
  {
    num: "02",
    titles: { uz: "Ko'p agentli AI", en: "Multi-agent AI", ru: "Мультиагентный ИИ" },
    descs: {
      uz: "Bir nechta AI modelining javoblarini taqqoslab, umumiy xulosaga keltiradi.",
      en: "Compares answers from several AI models and reaches a common conclusion.",
      ru: "Сравнивает ответы нескольких моделей ИИ и приходит к общему выводу.",
    },
  },
  {
    num: "03",
    titles: { uz: "AI xotira", en: "AI memory", ru: "Память ИИ" },
    descs: {
      uz: "Doimiy vektor xotira: shaxsiy bilim va suhbat konteksti (Alloma AI).",
      en: "Persistent vector memory for personal knowledge and context (Alloma AI).",
      ru: "Постоянная векторная память для знаний и контекста (Alloma AI).",
    },
  },
  {
    num: "04",
    titles: { uz: "Huquqiy portallar", en: "Legal portals", ru: "Правовые порталы" },
    descs: {
      uz: "HuquqPlus: nogironligi bo'lgan shaxslar uchun bepul huquqiy axborot.",
      en: "HuquqPlus: free legal information for persons with disabilities.",
      ru: "HuquqPlus: бесплатная правовая информация для лиц с инвалидностью.",
    },
  },
  {
    num: "05",
    titles: { uz: "Full-Stack veb", en: "Full-Stack web", ru: "Full-Stack веб" },
    descs: {
      uz: "React, Next.js, TypeScript, Python va Django bilan veb-ilovalar.",
      en: "Web applications with React, Next.js, TypeScript, Python and Django.",
      ru: "Веб-приложения на React, Next.js, TypeScript, Python и Django.",
    },
  },
];

const capCopy = {
  uz: {
    stamp: "№ 02",
    title: "Yo'nalishlar",
    field: "",
  },
  en: {
    stamp: "№ 02",
    title: "Focus",
    field: "",
  },
  ru: {
    stamp: "№ 02",
    title: "Направления",
    field: "",
  },
};

export function DossierCapabilities() {
  const { locale } = useI18n();
  const t = capCopy[locale] || capCopy.en;

  return (
    <section
      className="sec caps"
      id="capabilities"
      data-theme-trigger="ink"
      data-tab-target="capabilities"
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

      <figure className="caps__rail frame frame--hung" data-frame data-tilt="1.6" aria-hidden="true">
        <span className="frame__clip" aria-hidden="true">
          <svg viewBox="0 0 18 34" width="18" height="34" focusable="false">
            <path
              d="M4 1h10a3 3 0 0 1 3 3v22a8 8 0 0 1-16 0V4a3 3 0 0 1 3-3Zm2 5v18a3 3 0 0 0 6 0V6"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </svg>
        </span>
        <div className="frame__mat" data-img-reveal>
          <div className="relative aspect-[4/5] w-full overflow-hidden shot">
            <Image
              src="/images/site/texture-books.jpg"
              alt=""
              fill
              sizes="(max-width: 899px) 40vw, 16vw"
              className="object-cover"
              style={{ objectPosition: "32% 50%" }}
            />
          </div>
        </div>
      </figure>

      {/* Accordion Body with Weight Lens */}
      <div className="caps__body" data-lens>
        {capabilities.map((cap) => (
          <div key={cap.num} className="cap" data-cap data-clip>
            <h3>
              <button
                className="cap__head"
                type="button"
                aria-expanded="false"
                data-cursor="Open"
              >
                <span className="cap__num">{cap.num}</span>
                <span className="cap__name" data-lens-item>
                  {cap.titles[locale]}
                </span>
                <span className="cap__plus" aria-hidden="true" />
              </button>
            </h3>

            <div className="cap__body">
              <div className="cap__inner">
                <p className="cap__text">{cap.descs[locale]}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

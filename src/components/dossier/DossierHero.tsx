"use client";

import Image from "next/image";
import { useState } from "react";
import { useI18n } from "@/components/I18nProvider";

const heroContent = {
  uz: {
    subjectLabel: "Predmet",
    subjectName: "Mansurxon Rustamov",
    roleLabel: "Yo'nalish",
    roleVal: "TDYU Huquqshunosi & AI Tizimlari Muhandisi",
    locationLabel: "Manzil",
    locationVal: "Toshkent, UZ",
    statusLabel: "Holat",
    statusVal: "Loyiha va tadqiqotlar uchun ochiq",
    recordLabel: "Yozuv",
    recordVal: "TDYU (TSUL) · 2025—2029",
    codeLabel: "Arxiv",
    codeVal: "7 ta ochiq manbali tizim",
    headlineLine1: "HUQUQ VA",
    headlineLine2: "NEYRON KOD",
    footnoteAst: "*",
    footnote:
      "Toshkent davlat yuridik universiteti 1-kurs talabasi va AI muhandisi. Normativ qonun hujjatlarini aniq, gallyutsinatsiyasiz va ijtimoiy himoyaga yo'naltirilgan statutory RAG hamda kognitiv xotira tizimlariga aylantiraman.",
    badgeText: "TDYU HUQUQSHUNOSLIK • AI TIZIMLARI MUHANDISI • 2026 • ",
    badgeLabel: "Ishni ko'rish",
    noteTitle: "Yurisprudensiya va Kod Arxitekturasi",
    noteClose: "Yopish",
  },
  en: {
    subjectLabel: "Subject",
    subjectName: "Mansurxon Rustamov",
    roleLabel: "Field",
    roleVal: "TSUL Jurisprudence & AI Systems Engineer",
    locationLabel: "Location",
    locationVal: "Tashkent, UZ",
    statusLabel: "Status",
    statusVal: "Open for select initiatives",
    recordLabel: "Record",
    recordVal: "TSUL · 2025—2029",
    codeLabel: "Archive",
    codeVal: "7 Open-Source Systems",
    headlineLine1: "BRIDGING LAW",
    headlineLine2: "NEURAL CODE",
    footnoteAst: "*",
    footnote:
      "First-year law student at Tashkent State University of Law and AI systems engineer. Bridging statutory legislation with production RAG architectures, cognitive memory, and multi-agent consensus protocols.",
    badgeText: "TSUL STATUTORY LAB • AI SYSTEMS ARCHITECTURE • 2026 • ",
    badgeLabel: "Explore file",
    noteTitle: "Statutory Law & Neural Code Architecture",
    noteClose: "Close",
  },
  ru: {
    subjectLabel: "Предмет",
    subjectName: "Мансурхон Рустамов",
    roleLabel: "Профиль",
    roleVal: "Юриспруденция ТГЮУ и Инженерия ИИ",
    locationLabel: "Локация",
    locationVal: "Ташкент, UZ",
    statusLabel: "Статус",
    statusVal: "Открыт к сотрудничеству",
    recordLabel: "Запись",
    recordVal: "ТГЮУ · 2025—2029",
    codeLabel: "Архив",
    codeVal: "7 открытых систем ИИ",
    headlineLine1: "ПРАВО И",
    headlineLine2: "НЕЙРОННЫЙ КОД",
    footnoteAst: "*",
    footnote:
      "Студент 1-го курса ТГЮУ и инженер систем ИИ. Соединяю нормативно-правовые акты с проверяемой когнитивной векторной памятью, гибридным RRF и многоагентным консенсусом.",
    badgeText: "ТГЮУ ПРАВОВОЙ ЛАБ • АРХИТЕКТУРЫ ИИ • 2026 • ",
    badgeLabel: "Открыть дело",
    noteTitle: "Правовая Норма и Код Архитектуры",
    noteClose: "Закрыть",
  },
};

export function DossierHero() {
  const { locale } = useI18n();
  const t = heroContent[locale] || heroContent.en;
  const [noteOpen, setNoteOpen] = useState(false);

  return (
    <section
      className="hero sec"
      id="hero"
      data-theme="ink-deep"
      data-theme-trigger="ink-deep"
      data-tab-target="hero"
    >
      <h1 className="sr-only">
        {t.subjectName} — {t.roleVal}. {t.headlineLine1} {t.headlineLine2}.
      </h1>

      {/* Layer 1: The Dark Room (Bust at 12%, headline in outline) */}
      <div className="hero__layer hero__layer--base" aria-hidden="true">
        <div className="hero__bust">
          <Image
            src="/images/avatar.jpg"
            alt={t.subjectName}
            fill
            priority
            className="object-cover object-top"
          />
        </div>

        <div className="hero__title">
          <div className="hero__line">
            <span className="hero__word" data-redact data-redact-mode="hero">
              {t.headlineLine1}
            </span>
          </div>
          <div className="hero__line hero__line--2">
            <span
              className="hero__word hero__word--outline"
              data-redact
              data-redact-mode="hero"
            >
              {t.headlineLine2}
            </span>
            <span className="hero__word hero__word--fill" data-hero-fill>
              {t.headlineLine2}
            </span>
            <button
              className="hero__star"
              type="button"
              onClick={() => setNoteOpen(true)}
              data-cursor="Izoh"
              aria-label="Izohni ochish"
            >
              *
            </button>
          </div>
        </div>
      </div>

      {/* Layer 2: The Torch Spotlight (Reveals lit copy with vibrant orange fill) */}
      <div className="torch" data-torch aria-hidden="true">
        <div className="torch__inner" data-torch-inner>
          <div className="hero__layer hero__layer--lit">
            <div className="hero__bust">
              <Image
                src="/images/avatar.jpg"
                alt=""
                fill
                priority
                className="object-cover object-top"
              />
            </div>
            <div className="hero__title">
              <div className="hero__line">
                <span className="hero__word" data-redact data-redact-mode="hero">
                  {t.headlineLine1}
                </span>
              </div>
              <div className="hero__line hero__line--2">
                <span
                  className="hero__word hero__word--lit"
                  data-redact
                  data-redact-mode="hero"
                >
                  {t.headlineLine2}
                </span>
                <span className="hero__star">*</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Layer 3: Foreground UI Paperwork */}
      <div className="hero__ui">
        <dl className="field hero__field" data-clip>
          <div>
            <dt>{t.subjectLabel}</dt>
            <dd>{t.subjectName}</dd>
          </div>
          <div>
            <dt>{t.roleLabel}</dt>
            <dd>{t.roleVal}</dd>
          </div>
          <div>
            <dt>{t.locationLabel}</dt>
            <dd>{t.locationVal}</dd>
          </div>
          <div>
            <dt>{t.statusLabel}</dt>
            <dd>
              <span className="field__dot" aria-hidden="true" />
              {t.statusVal}
            </dd>
          </div>
          <div>
            <dt>{t.recordLabel}</dt>
            <dd>{t.recordVal}</dd>
          </div>
          <div>
            <dt>{t.codeLabel}</dt>
            <dd>
              <a href="#work">{t.codeVal}</a>
            </dd>
          </div>
        </dl>

        <div className="hero__aside">
          <p className="marginalia hero__margin" data-clip>
            <button
              type="button"
              onClick={() => setNoteOpen(true)}
              className="marginalia__ast-btn mr-1 font-mono text-[#ff5100]"
              aria-label="Izoh"
            >
              {t.footnoteAst}
            </button>
            {t.footnote}
          </p>

          <a
            href="#about"
            className="hero__badge"
            data-clip
            data-magnetic
            aria-label={t.badgeLabel}
          >
            <svg viewBox="0 0 120 120" className="badge-spin" aria-hidden="true">
              <defs>
                <path
                  id="circlePathHero"
                  d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0"
                />
              </defs>
              <text>
                <textPath href="#circlePathHero">{t.badgeText}</textPath>
              </text>
            </svg>
            <span className="badge-spin__center" aria-hidden="true">
              ↓
            </span>
            <span className="hero__badge-label">{t.badgeLabel}</span>
          </a>
        </div>
      </div>

      <div className="vignette" aria-hidden="true" />

      {/* Explanatory Modal on clicking asterisk '*' */}
      {noteOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[300] flex items-center justify-center bg-black/75 p-6 backdrop-blur-sm"
          onClick={() => setNoteOpen(false)}
        >
          <div
            className="relative max-w-lg rounded-sm border border-[#ff5100]/40 bg-[#e9e3d2] p-8 text-[#131108] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between border-b border-[#131108]/15 pb-3">
              <span className="stamp font-mono text-xs">HUQUQ + KOD</span>
              <button
                type="button"
                onClick={() => setNoteOpen(false)}
                className="font-mono text-xs uppercase tracking-wider text-[#c53a00] hover:underline"
              >
                [{t.noteClose} ✕]
              </button>
            </div>
            <h3 className="font-display text-xl font-bold uppercase tracking-tight text-[#131108]">
              {t.noteTitle}
            </h3>
            <p className="mt-4 font-serif text-base italic leading-relaxed text-[#131108]/90">
              {t.footnote}
            </p>
            <div className="mt-6 border-t border-[#131108]/15 pt-4 text-xs font-mono text-[#131108]/70">
              MANSURXON RUSTAMOV · TDYU HUQUQSHUNOSLIK VA AI TIZIMLARI
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

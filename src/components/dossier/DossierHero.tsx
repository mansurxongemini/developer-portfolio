"use client";

import Image from "next/image";
import { useI18n } from "@/components/I18nProvider";

const heroContent = {
  uz: {
    subjectName: "Mansurxon Rustamov",
    statusVal: "Loyihalar uchun ochiq",
    headlineLine1: "HUQUQ",
    headlineLine2: "VA KOD",
    footnoteAst: "*",
    footnote: "TDYU huquqshunosligi talabasi, Full-Stack va AI dasturchi.",
    badgeText: "TDYU HUQUQSHUNOSLIK • FULL-STACK & AI • 2026 • ",
    badgeLabel: "Ishni ko'rish",
  },
  en: {
    subjectName: "Mansurxon Rustamov",
    statusVal: "Open for projects",
    headlineLine1: "LAW AND",
    headlineLine2: "CODE",
    footnoteAst: "*",
    footnote: "Law student at TSUL, Full-Stack and AI developer.",
    badgeText: "TSUL LAW STUDENT • FULL-STACK & AI • 2026 • ",
    badgeLabel: "Explore file",
  },
  ru: {
    subjectName: "Мансурхон Рустамов",
    statusVal: "Открыт к проектам",
    headlineLine1: "ПРАВО",
    headlineLine2: "И КОД",
    footnoteAst: "*",
    footnote: "Студент-юрист ТГЮУ, Full-Stack и AI-разработчик.",
    badgeText: "ТГЮУ ЮРИСПРУДЕНЦИЯ • FULL-STACK И AI • 2026 • ",
    badgeLabel: "Открыть дело",
  },
};

export function DossierHero() {
  const { locale } = useI18n();
  const t = heroContent[locale] || heroContent.en;

  return (
    <section
      className="hero sec"
      id="hero"
      data-theme="ink-deep"
      data-theme-trigger="ink-deep"
      data-tab-target="hero"
    >
      <h1 className="sr-only">
        {t.subjectName} — {t.headlineLine1} {t.headlineLine2}.
      </h1>

      {/* Layer 1: The Dark Room (Bust at 12%, headline in outline) */}
      <div className="hero__layer hero__layer--base" aria-hidden="true">
        <div className="hero__bust">
          <Image
            src="/images/site/hero-portrait.jpg"
            alt={t.subjectName}
            fill
            priority
            sizes="(max-width: 899px) 100vw, 64vw"
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
            <span className="hero__star" aria-hidden="true">
              *
            </span>
          </div>
        </div>
      </div>

      {/* Layer 2: The Torch Spotlight (Reveals lit copy with vibrant orange fill) */}
      <div className="torch" data-torch aria-hidden="true">
        <div className="torch__inner" data-torch-inner>
          <div className="hero__layer hero__layer--lit">
            <div className="hero__bust">
              <Image
                src="/images/site/hero-portrait.jpg"
                alt=""
                fill
                priority
                sizes="(max-width: 899px) 100vw, 64vw"
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
        <p className="field hero__field" data-clip>
          <span className="field__dot" aria-hidden="true" />
          {t.statusVal}
        </p>

        <div className="hero__aside">
          <p className="marginalia hero__margin" data-clip>
            <span className="marginalia__ast mr-1" aria-hidden="true">
              {t.footnoteAst}
            </span>
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
    </section>
  );
}

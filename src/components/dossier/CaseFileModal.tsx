"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useI18n } from "@/components/I18nProvider";
import { useHomeData } from "@/components/HomeData";
import type { HomeProject } from "@/lib/home-types";

const modalLabels = {
  uz: {
    field: "Yo'nalish",
    stack: "Texnologiya",
    year: "Yil",
    link: "Havola",
    close: "Yopish ✕",
    full: "Batafsil →",
    next: "Keyingi loyiha:",
    project: "loyiha",
    openCode: "GitHub · Ochiq kod",
  },
  en: {
    field: "Field",
    stack: "Stack",
    year: "Year",
    link: "Link",
    close: "Close ✕",
    full: "Details →",
    next: "Next project:",
    project: "project",
    openCode: "GitHub · Open source",
  },
  ru: {
    field: "Область",
    stack: "Стек",
    year: "Год",
    link: "Ссылка",
    close: "Закрыть ✕",
    full: "Подробнее →",
    next: "Следующий проект:",
    project: "проект",
    openCode: "GitHub · Открытый код",
  },
};

export function CaseFileModal() {
  const { locale } = useI18n();
  const labels = modalLabels[locale] || modalLabels.en;
  const { projects } = useHomeData();
  const [slug, setSlug] = useState<string | null>(null);

  useEffect(() => {
    const handleOpen = (e: any) => {
      const next = e.detail?.slug;
      if (typeof next === "string") setSlug(next);
    };
    window.addEventListener("open-case-modal", handleOpen);
    return () => window.removeEventListener("open-case-modal", handleOpen);
  }, []);

  if (projects.length === 0) return null;

  const currentIndex = Math.max(0, projects.findIndex((p) => p.slug === slug));
  const currentProject: HomeProject = projects[currentIndex];
  const nextProject = projects[(currentIndex + 1) % projects.length];
  const short = currentProject.shortTitle;
  const nextShort = nextProject.shortTitle;
  const year = currentProject.year;
  const linkHost = (() => {
    try {
      return currentProject.link ? new URL(currentProject.link).hostname.replace(/^www\./, "") : "";
    } catch {
      return "";
    }
  })();
  const isGithub = /github\.com/i.test(currentProject.link);

  const handleNext = () => {
    setSlug(nextProject.slug);
    const panel = document.querySelector("[data-case-panel]");
    if (panel) panel.scrollTop = 0;
  };

  return (
    <div
      className="case"
      data-case-overlay
      aria-hidden="true"
      role="dialog"
      aria-modal="true"
      aria-label={`${short} — ${labels.project}`}
    >
      <div className="case__backdrop" data-case-close />

      <div className="case__panel" data-case-panel>
        {/* Sticky Top Bar */}
        <div className="case__bar">
          <p className="case__bar-file">{short}</p>
          <button
            className="stamp stamp--close"
            type="button"
            data-case-close
            aria-label={labels.close}
            data-cursor="Close"
          >
            {labels.close}
          </button>
        </div>

        {/* Content Container */}
        <article className="case__content">
          <p className="case__file">
            <span
              className="stamp stamp--opened"
              data-stamp-opened
              aria-hidden="true"
            >
              {year}
            </span>
          </p>

          <h2 className="case__title">{short}</h2>

          <dl className="case__meta">
            <div>
              <dt>{labels.field}</dt>
              <dd>{currentProject.category || "—"}</dd>
            </div>
            <div>
              <dt>{labels.stack}</dt>
              <dd>{currentProject.stack.join(" · ") || "—"}</dd>
            </div>
            <div>
              <dt>{labels.year}</dt>
              <dd>{year}</dd>
            </div>
            <div>
              <dt>{labels.link}</dt>
              <dd>{linkHost || "—"}</dd>
            </div>
          </dl>

          {/* Key Featured Image (FLIP target) */}
          <div className="case__key frame__mat" data-case-key>
            <Image
              src={currentProject.image}
              alt={short}
              fill
              className="object-contain p-6 bg-[#FAF8F5]"
              unoptimized={/^https?:/i.test(currentProject.image)}
            />
          </div>

          <p className="case__lede">{currentProject.description}</p>

          {/* Action CTAs */}
          <div className="case__cta">
            {currentProject.link ? (
              <a
                href={currentProject.link}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--solid"
                data-magnetic
              >
                <span>{isGithub ? "GitHub ↗" : `${linkHost || "Link"} ↗`}</span>
              </a>
            ) : null}
            <Link
              href={`/work/${currentProject.slug}`}
              className="btn btn--ghost"
              data-magnetic
            >
              <span>{labels.full}</span>
            </Link>
          </div>
        </article>

        {/* Next Project Navigation */}
        <div className="case__next">
          <p className="case__next-label">{labels.next}</p>
          <button
            type="button"
            onClick={handleNext}
            className="btn btn--ghost"
          >
            <span>№ {String(((currentIndex + 1) % projects.length) + 1).padStart(2, "0")} — {nextShort}</span>
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>
    </div>
  );
}

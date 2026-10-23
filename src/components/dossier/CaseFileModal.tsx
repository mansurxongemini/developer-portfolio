"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useI18n } from "@/components/I18nProvider";
import { staticProjectsData, LocalizedProjectData } from "@/lib/projects-data";

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

export function CaseFileModal({
  shortTitles,
}: {
  shortTitles: Record<string, string>;
}) {
  const { locale } = useI18n();
  const labels = modalLabels[locale] || modalLabels.en;
  const [currentProject, setCurrentProject] = useState<LocalizedProjectData>(
    staticProjectsData[0],
  );

  useEffect(() => {
    const handleOpen = (e: any) => {
      const slug = e.detail?.slug;
      if (slug) {
        const found = staticProjectsData.find((p) => p.slug === slug);
        if (found) setCurrentProject(found);
      }
    };
    window.addEventListener("open-case-modal", handleOpen);
    return () => window.removeEventListener("open-case-modal", handleOpen);
  }, []);

  const t = currentProject.translations[locale] || currentProject.translations.en;
  const short = shortTitles[currentProject.slug] || currentProject.slug;
  const currentIndex = staticProjectsData.findIndex((p) => p.slug === currentProject.slug);
  const nextProject = staticProjectsData[(currentIndex + 1) % staticProjectsData.length];
  const nextShort = shortTitles[nextProject.slug] || nextProject.slug;
  const year = currentProject.publishedAt.getFullYear();

  const handleNext = () => {
    setCurrentProject(nextProject);
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
              <dd>{currentProject.tags[0]}</dd>
            </div>
            <div>
              <dt>{labels.stack}</dt>
              <dd>{currentProject.tags.slice(1, 4).join(" · ")}</dd>
            </div>
            <div>
              <dt>{labels.year}</dt>
              <dd>{year}</dd>
            </div>
            <div>
              <dt>{labels.link}</dt>
              <dd>{labels.openCode}</dd>
            </div>
          </dl>

          {/* Key Featured Image (FLIP target) */}
          <div className="case__key frame__mat" data-case-key>
            <Image
              src={currentProject.image}
              alt={short}
              fill
              className="object-contain p-6 bg-[#FAF8F5]"
            />
          </div>

          <p className="case__lede">{t.description}</p>

          {/* Action CTAs */}
          <div className="case__cta">
            <a
              href={currentProject.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--solid"
              data-magnetic
            >
              <span>GitHub ↗</span>
            </a>
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
            <span>№ 0{((currentIndex + 1) % staticProjectsData.length) + 1} — {nextShort}</span>
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useI18n } from "@/components/I18nProvider";
import { staticProjectsData } from "@/lib/projects-data";
import { CaseFileModal } from "./CaseFileModal";

/** Short 1–3 word exhibit names shown in the row list. */
const shortTitles: Record<string, string> = {
  "inclusive-legal-rag": "Inclusive Legal RAG",
  "alloma-cognitive-engine": "Alloma AI",
  "multi-agent-roundtable-system": "Roundtable",
  "huquqplus-uz": "HuquqPlus",
  "mahalla-management-system": "Mahalla",
  "kitobplus-app": "KitobPlus",
  "uzbekistan-map-puzzle": "Map Puzzle",
};

const workCopy = {
  uz: {
    stamp: "№ 03",
    title: "Loyihalar",
    field: "07",
  },
  en: {
    stamp: "№ 03",
    title: "Projects",
    field: "07",
  },
  ru: {
    stamp: "№ 03",
    title: "Проекты",
    field: "07",
  },
};

export function DossierWork() {
  const { locale } = useI18n();
  const t = workCopy[locale] || workCopy.en;

  const tilts = ["-1.4", "1.2", "-0.8", "1.5", "-1.1", "0.9", "-1.3"];
  const first = staticProjectsData[0];
  const firstTitle = shortTitles[first.slug] || first.slug;
  const firstYear = first.publishedAt.getFullYear();

  return (
    <section
      className="sec work"
      id="work"
      data-theme-trigger="bone"
      data-tab-target="work"
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

      {/* Left List of Exhibits */}
      <div className="work__list-wrap">
        <div className="work-list">
          {staticProjectsData.map((project, idx) => {
            const tilt = tilts[idx % tilts.length];
            const short = shortTitles[project.slug] || project.slug;
            const year = project.publishedAt.getFullYear();

            return (
              <button
                key={project.slug}
                type="button"
                className={`ex-row ${idx === 0 ? "is-active" : ""}`}
                data-key={project.slug}
                data-slug={project.slug}
                data-img={project.image}
                data-ar="1.4"
                data-tilt={tilt}
                data-index={idx}
                data-cursor="Open"
                aria-label={`№ 0${idx + 1} ${short}`}
              >
                <span className="ex-row__index">[0{idx + 1}]</span>

                <div className="ex-row__thumb" aria-hidden="true">
                  <img src={project.image} alt="" loading="lazy" />
                </div>

                <span className="ex-row__title">{short}</span>

                <span className="ex-row__cat">{project.tags[0]}</span>

                <span className="ex-row__year">{year}</span>

                <span className="ex-row__arrow" aria-hidden="true">
                  →
                </span>
              </button>
            );
          })}
        </div>

      </div>

      {/* Right Sticky Hung Frame Viewer */}
      <aside className="viewer" data-viewer aria-hidden="true">
        <div
          className="viewer__frame frame"
          data-viewer-frame
          data-tilt="-1.4"
          data-cursor="Open"
        >
          {/* Metal Clip */}
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

          <div className="frame__mat">
            <div className="viewer__stage" data-viewer-stage>
              <img
                src={first.image}
                alt=""
                className="is-current"
                decoding="async"
              />
            </div>
            <div className="exposure" data-exposure aria-hidden="true" />
          </div>

          <p className="viewer__caption" data-viewer-caption>
            {firstTitle} · {firstYear}
          </p>
        </div>
      </aside>

      {/* Case File Slide-Up Sheet Modal */}
      <CaseFileModal shortTitles={shortTitles} />
    </section>
  );
}

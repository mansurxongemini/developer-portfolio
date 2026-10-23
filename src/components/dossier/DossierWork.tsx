"use client";

import Image from "next/image";
import { useI18n } from "@/components/I18nProvider";
import { staticProjectsData } from "@/lib/projects-data";
import { CaseFileModal } from "./CaseFileModal";

const workCopy = {
  uz: {
    stamp: "№ 03",
    title: "Dalillar",
    subtitle: "The Evidence",
    field: "07 Eksponat · Tekshirilgan Kod",
    clickHint: "Ishni ochish uchun qatorga bosing",
    marginalia:
      "Barcha 7 ta tizim real muammolarni hal qilish uchun ishlab chiqilgan va kodi GitHub'da ochiq.",
  },
  en: {
    stamp: "№ 03",
    title: "Evidence",
    subtitle: "The Evidence",
    field: "07 Exhibits · Verifiable Code",
    clickHint: "Click any row to open full case file",
    marginalia:
      "All 7 systems were engineered for real-world impact and are publicly accessible on GitHub.",
  },
  ru: {
    stamp: "№ 03",
    title: "Улики",
    subtitle: "The Evidence",
    field: "07 Экспонатов · Открытый Код",
    clickHint: "Нажмите на строку для открытия дела",
    marginalia:
      "Все 7 инженерных систем решают практические задачи и открыты для аудита на GitHub.",
  },
};

export function DossierWork() {
  const { locale } = useI18n();
  const t = workCopy[locale] || workCopy.en;

  const tilts = ["-1.4", "1.2", "-0.8", "1.5", "-1.1", "0.9", "-1.3"];

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
            <span data-redact>{t.title}</span> <em>{t.subtitle}</em>
          </h2>
        </div>
        <p className="sec-head__field font-mono">{t.field}</p>
      </header>

      {/* Left List of Exhibits */}
      <div className="work__list-wrap">
        <div className="work-list">
          {staticProjectsData.map((project, idx) => {
            const projectT = project.translations[locale] || project.translations.en;
            const tilt = tilts[idx % tilts.length];

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
                data-cursor="Ochish"
                aria-label={`№ 0${idx + 1} ${projectT.title}`}
              >
                <span className="ex-row__index font-mono">
                  [0{idx + 1}]
                </span>

                <div className="ex-row__thumb">
                  <img src={project.image} alt="" />
                </div>

                <span className="ex-row__title font-display">
                  {projectT.title}
                </span>

                <span className="ex-row__cat font-mono">
                  {project.tags[0]}
                </span>

                <span className="ex-row__year font-mono">
                  2025
                </span>

                <span className="ex-row__arrow font-mono" aria-hidden="true">
                  →
                </span>
              </button>
            );
          })}
        </div>

        <p className="marginalia mt-8 font-serif">
          <span className="marginalia__ast mr-1">*</span>
          {t.marginalia}
        </p>
      </div>

      {/* Right Sticky Hung Frame Viewer */}
      <aside className="viewer" data-viewer>
        <div
          className="viewer__frame frame"
          data-viewer-frame
          data-tilt="-1.4"
          data-cursor="Ochish"
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
                src={staticProjectsData[0].image}
                alt=""
                className="is-current"
                decoding="async"
              />
            </div>
            <div className="exposure" data-exposure aria-hidden="true" />
          </div>

          <p className="viewer__caption font-mono" data-viewer-caption>
            Exhibit 01 — {staticProjectsData[0].translations[locale]?.title || "Inclusive Legal RAG"} · {staticProjectsData[0].tags[0]}
          </p>
        </div>
      </aside>

      {/* Case File Slide-Up Sheet Modal */}
      <CaseFileModal />
    </section>
  );
}

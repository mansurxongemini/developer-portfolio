"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useI18n } from "@/components/I18nProvider";
import { staticProjectsData, LocalizedProjectData } from "@/lib/projects-data";

export function CaseFileModal() {
  const { locale } = useI18n();
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
  const currentIndex = staticProjectsData.findIndex((p) => p.slug === currentProject.slug);
  const nextProject = staticProjectsData[(currentIndex + 1) % staticProjectsData.length];
  const nextT = nextProject.translations[locale] || nextProject.translations.en;

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
      aria-label={`${t.title} — case study`}
    >
      <div className="case__backdrop" data-case-close />

      <div className="case__panel" data-case-panel>
        {/* Sticky Top Bar */}
        <div className="case__bar">
          <p className="case__bar-file font-mono">
            № 0{currentIndex + 1} · {currentProject.slug}
          </p>
          <button
            className="stamp stamp--close font-mono"
            type="button"
            data-case-close
            aria-label="Ishni yopish"
            data-cursor="Yopish"
          >
            Yopish ✕
          </button>
        </div>

        {/* Content Container */}
        <article className="case__content">
          <p className="case__file font-mono">
            <span>ISh VARAG'I — 0{currentIndex + 1}</span>
            <span
              className="stamp stamp--opened font-mono"
              data-stamp-opened
              aria-hidden="true"
            >
              OCHILDI
            </span>
          </p>

          <h2 className="case__title font-display text-4xl sm:text-5xl font-black uppercase text-[#131108]">
            {t.title}
          </h2>

          <dl className="case__meta font-mono">
            <div>
              <dt>Yo'nalish</dt>
              <dd className="font-semibold text-[#131108]">{currentProject.tags[0]}</dd>
            </div>
            <div>
              <dt>Stack</dt>
              <dd>{currentProject.tags.slice(1, 4).join(" · ")}</dd>
            </div>
            <div>
              <dt>Yil</dt>
              <dd>2025—2026</dd>
            </div>
            <div>
              <dt>Holat</dt>
              <dd className="text-[#c53a00] font-bold">Ochiq Manbali Kod</dd>
            </div>
          </dl>

          {/* Key Featured Image (FLIP target) */}
          <div className="case__key frame__mat" data-case-key>
            <Image
              src={currentProject.image}
              alt={t.title}
              fill
              className="object-contain p-6 bg-[#FAF8F5]"
            />
          </div>

          <p className="text-lg leading-relaxed text-[#131108]/90 font-serif italic border-l-2 border-[#ff5100] pl-4 my-6">
            {t.description}
          </p>

          <div className="prose prose-stone max-w-none text-base leading-relaxed text-[#131108]/90 whitespace-pre-line font-body">
            {t.content}
          </div>

          {/* Action CTAs */}
          <div className="case__cta">
            <a
              href={currentProject.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--solid font-mono text-xs"
              data-magnetic
            >
              <span>GitHub Repozitoriyasini Ochish</span>
              <span className="icon-arrow">↗</span>
            </a>
            <Link
              href={`/work/${currentProject.slug}`}
              className="btn btn--ghost font-mono text-xs text-[#131108]"
              data-magnetic
            >
              <span>To'liq Spetsifikatsiyani Ko'rish</span>
              <span className="icon-arrow">→</span>
            </Link>
          </div>
        </article>

        {/* Next Case Study Navigation */}
        <div className="case__next border-t border-[#131108]/15 pt-8 mt-12">
          <p className="font-mono text-xs uppercase tracking-wider text-[#131108]/60 mb-3">
            Keyingi Hujjat:
          </p>
          <button
            type="button"
            onClick={handleNext}
            className="btn btn--ghost font-display text-lg text-left py-3 px-6 hover:text-[#c53a00]"
          >
            <span>№ 0{((currentIndex + 1) % staticProjectsData.length) + 1} — {nextT.title}</span>
            <span className="icon-arrow ml-2">→</span>
          </button>
        </div>
      </div>
    </div>
  );
}

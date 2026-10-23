"use client";

import { useI18n } from "@/components/I18nProvider";

interface WorkContentProps {
  projects: React.ReactNode;
}

const copy = {
  uz: {
    stamp: "№ 03",
    title: "Loyihalar",
    field: "",
  },
  en: {
    stamp: "№ 03",
    title: "Projects",
    field: "",
  },
  ru: {
    stamp: "№ 03",
    title: "Проекты",
    field: "",
  },
};

export function WorkContent({ projects }: WorkContentProps) {
  const { locale } = useI18n();
  const t = copy[locale] || copy.en;

  return (
    <section className="sec work work--page" data-theme-trigger="bone">
      <header className="sec-head">
        <div className="sec-head__left">
          <span className="stamp stamp--index" data-stamp aria-hidden="true">
            {t.stamp}
          </span>
          <h1 className="sec-head__title">
            <span data-redact>{t.title}</span>
          </h1>
        </div>
        <p className="sec-head__field">{t.field}</p>
      </header>

      {projects}
    </section>
  );
}

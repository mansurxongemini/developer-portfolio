"use client";

import { useEffect } from "react";
import { useI18n } from "@/components/I18nProvider";

const copy = {
  uz: { line: "Bunday sahifa yo'q.", back: "Bosh sahifaga →" },
  en: { line: "This page doesn't exist.", back: "Back home →" },
  ru: { line: "Такой страницы нет.", back: "На главную →" },
};

export function NotFoundContent() {
  const { locale, content } = useI18n();
  const t = copy[locale] || copy.en;

  useEffect(() => {
    document.body.dataset.theme = "ink-deep";
    return () => {
      document.body.dataset.theme = "bone";
    };
  }, []);

  return (
    <section className="sec notfound" data-theme-trigger="ink-deep">
      <p className="notfound__code font-display" aria-hidden="true" data-clip>
        404
      </p>
      <h1 className="notfound__title font-display">
        <span data-redact>{content.ui.page_not_found}</span>
      </h1>
      <p className="marginalia notfound__line">{t.line}</p>
      <a href="/" className="briefs__all notfound__back" data-cursor="Bosh sahifa">
        {t.back}
      </a>
    </section>
  );
}

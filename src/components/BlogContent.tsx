"use client";

import { useI18n } from "@/components/I18nProvider";

interface BlogContentProps {
  postsFirst: React.ReactNode;
  postsMiddle: React.ReactNode;
  postsLater: React.ReactNode;
}

const copy = {
  uz: {
    stamp: "№ 05",
    title: "Maqolalar",
    field: "",
    earlier: "Oldingi maqolalar",
  },
  en: {
    stamp: "№ 05",
    title: "Articles",
    field: "",
    earlier: "Earlier articles",
  },
  ru: {
    stamp: "№ 05",
    title: "Статьи",
    field: "",
    earlier: "Ранние статьи",
  },
};

export function BlogContent({ postsFirst, postsMiddle, postsLater }: BlogContentProps) {
  const { locale } = useI18n();
  const t = copy[locale] || copy.en;

  return (
    <section className="sec briefs briefs--page" data-theme-trigger="bone">
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

      <div className="briefs__list-wrap">
        <div className="briefs__list">
          {postsFirst}
          {postsMiddle}
        </div>

        <div className="briefs__earlier">
          <p className="briefs__earlier-label font-mono">{t.earlier}</p>
          <div className="briefs__list">{postsLater}</div>
        </div>
      </div>
    </section>
  );
}

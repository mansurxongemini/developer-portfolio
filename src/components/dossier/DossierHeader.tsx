"use client";

import Link from "next/link";
import { useI18n } from "@/components/I18nProvider";

export function DossierHeader() {
  const { locale } = useI18n();

  const labels = {
    uz: {
      about: "Men haqimda",
      work: "Loyihalar",
      record: "Yo'l",
      contact: "Aloqa",
      menu: "Menyu",
      backTop: "Mansurxon — boshiga qaytish",
    },
    en: {
      about: "About",
      work: "Projects",
      record: "Path",
      contact: "Contact",
      menu: "Menu",
      backTop: "Mansurxon — back to top",
    },
    ru: {
      about: "Обо мне",
      work: "Проекты",
      record: "Путь",
      contact: "Контакты",
      menu: "Меню",
      backTop: "Мансурхон — наверх",
    },
  }[locale] || {
    about: "About",
    work: "Projects",
    record: "Path",
    contact: "Contact",
    menu: "Menu",
    backTop: "Mansurxon — back to top",
  };

  return (
    <header className="site-head" data-header>
      <a
        className="site-head__brand"
        href="/"
        data-magnetic
        aria-label={labels.backTop}
      >
        <svg
          className="site-head__mark"
          viewBox="0 0 24 24"
          width="22"
          height="26"
          aria-hidden="true"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Statutory Scales + Logic Gate Icon */}
          <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
          <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
          <path d="M7 21h10" />
          <path d="M12 3v18" />
          <path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2" />
        </svg>
        <span className="site-head__word font-display font-semibold tracking-tight">
          Mansurxon Rustamov
        </span>
      </a>

      <p className="site-head__meta font-mono">
        Toshkent, UZ&nbsp;—&nbsp;
        <span className="site-head__clock" data-clock>
          00:00:00
        </span>
      </p>

      <button
        className="menu-toggle"
        data-menu-toggle
        aria-expanded="false"
        aria-controls="menu"
        data-magnetic
      >
        <span className="menu-toggle__label">{labels.menu}</span>
        <span className="menu-toggle__bars" aria-hidden="true">
          <i />
          <i />
        </span>
      </button>
    </header>
  );
}

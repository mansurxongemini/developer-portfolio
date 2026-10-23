"use client";

import { usePathname } from "next/navigation";
import { useI18n } from "@/components/I18nProvider";

const HOME_RE = /^\/(uz|en|ru)?\/?$/;

export function DossierMenu() {
  const { locale, setLocale } = useI18n();
  const pathname = usePathname() ?? "/";
  const isHome = HOME_RE.test(pathname);

  const menuItems = [
    {
      num: "01",
      href: "/",
      labels: { uz: "Bosh sahifa", en: "Home", ru: "Главная" },
    },
    {
      num: "02",
      href: "/work",
      labels: { uz: "Loyihalar", en: "Projects", ru: "Проекты" },
    },
    {
      num: "03",
      href: "/blog",
      labels: { uz: "Maqolalar", en: "Articles", ru: "Статьи" },
    },
    {
      num: "04",
      href: "/about",
      labels: { uz: "Men haqimda", en: "About", ru: "Обо мне" },
    },
    {
      num: "05",
      // On home this stays a same-page anchor (smooth scroll);
      // from inner pages it navigates home first.
      href: isHome ? "#contact" : "/#contact",
      labels: { uz: "Aloqa", en: "Contact", ru: "Контакты" },
    },
  ];

  const closeLabel =
    locale === "ru" ? "Закрыть" : locale === "uz" ? "Yopish" : "Close";
  const navLabel =
    locale === "ru" ? "Меню" : locale === "uz" ? "Menyu" : "Menu";
  const langLabel =
    locale === "ru" ? "Язык:" : locale === "uz" ? "Til:" : "Language:";
  const fileLine =
    locale === "ru"
      ? "Мансурхон Рустамов · Меню"
      : locale === "uz"
        ? "Mansurxon Rustamov · Menyu"
        : "Mansurxon Rustamov · Menu";

  return (
    <div className="menu" id="menu" data-menu aria-hidden="true" data-lenis-prevent>
      <button
        className="menu__close"
        data-menu-close
        type="button"
        aria-label={closeLabel}
        data-cursor={closeLabel}
      >
        <span className="menu__close-label font-mono text-xs">{closeLabel}</span>
        <span className="menu__close-x" aria-hidden="true">
          <i />
          <i />
        </span>
      </button>

      <p className="menu__file font-mono" aria-hidden="true">
        {fileLine}
      </p>

      <nav className="menu__nav" aria-label={navLabel}>
        {menuItems.map((item) => (
          <a
            key={item.num}
            href={item.href}
            className="menu__link group"
            data-menu-link
          >
            <span className="menu__index font-mono">{item.num}</span>
            <span className="menu__word font-display font-medium">
              {item.labels[locale]}
            </span>
          </a>
        ))}
      </nav>

      {/* Language Switcher in Menu */}
      <div className="my-6 flex items-center gap-3 border-t border-[rgba(19,17,8,0.15)] pt-6 font-mono text-xs uppercase tracking-widest text-[#131108]/70">
        <span>{langLabel}</span>
        {(["uz", "en", "ru"] as const).map((lang) => (
          <button
            key={lang}
            onClick={() => setLocale(lang)}
            className={`px-2.5 py-1 rounded transition-colors ${
              locale === lang
                ? "bg-[#131108] text-[#f2eee3] font-bold"
                : "hover:bg-[#131108]/10 text-[#131108]"
            }`}
          >
            {lang.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="menu__foot">
        <a href="mailto:r.mansurxon01@gmail.com" className="menu__mail">
          r.mansurxon01@gmail.com
        </a>

        <div className="menu__socials font-mono">
          <a
            href="https://t.me/mansurxonrustamov"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#c53a00]"
          >
            Telegram
          </a>
          <a
            href="https://github.com/mansurxongemini"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#c53a00]"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/mansurxon-rustamov"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#c53a00]"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </div>
  );
}

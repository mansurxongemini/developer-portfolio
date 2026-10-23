"use client";

import { useI18n } from "@/components/I18nProvider";

export function DossierMenu() {
  const { locale, setLocale } = useI18n();

  const menuItems = [
    {
      num: "01",
      id: "about",
      labels: { uz: "Dosye", en: "About", ru: "Досье" },
      sub: { uz: "Shaxsiyat va Faktlar", en: "Identity & Foundations", ru: "Личность и Факты" },
    },
    {
      num: "02",
      id: "capabilities",
      labels: { uz: "Usullar", en: "Capabilities", ru: "Методы" },
      sub: { uz: "Methods", en: "Methods", ru: "Архитектура Систем" },
    },
    {
      num: "03",
      id: "work",
      labels: { uz: "Dalillar", en: "Evidence", ru: "Улики" },
      sub: { uz: "Ochiq Manbali Kod", en: "Verifiable Code", ru: "Открытый Код" },
    },
    {
      num: "04",
      id: "timeline",
      labels: { uz: "Yozuv", en: "Record", ru: "Запись" },
      sub: { uz: "TDYU va AI Xronologiyasi", en: "Statutory & AI Timeline", ru: "Хронология ТГЮУ и ИИ" },
    },
    {
      num: "05",
      id: "briefs",
      labels: { uz: "Xulosalar", en: "Briefs", ru: "Выводы" },
      sub: { uz: "Rasmiy Tahlilnomalar", en: "Analytical Dispatches", ru: "Правовая Аналитика" },
    },
    {
      num: "06",
      id: "contact",
      labels: { uz: "Murojaat", en: "Vault", ru: "Связь" },
      sub: { uz: "To'g'ridan-to'g'ri Aloqa", en: "Direct Dialogue", ru: "Прямой Диалог" },
    },
  ];

  return (
    <div className="menu" id="menu" data-menu aria-hidden="true" data-lenis-prevent>
      <button
        className="menu__close"
        data-menu-close
        type="button"
        aria-label="Close menu"
        data-cursor="Close"
      >
        <span className="menu__close-label font-mono text-xs">Yopish</span>
        <span className="menu__close-x" aria-hidden="true">
          <i />
          <i />
        </span>
      </button>

      <p className="menu__file font-mono" aria-hidden="true">
        Ish hujjati — Mansurxon Rustamov · Indeks
      </p>

      <nav className="menu__nav" aria-label="Menu Navigation">
        {menuItems.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className="menu__link group"
            data-menu-link
          >
            <span className="menu__index font-mono">{item.num}</span>
            <span className="menu__word font-display font-medium">
              {item.labels[locale]}
            </span>
            <em className="font-serif italic">{item.sub[locale]}</em>
          </a>
        ))}
      </nav>

      {/* Language Switcher in Menu */}
      <div className="my-6 flex items-center gap-3 border-t border-[rgba(19,17,8,0.15)] pt-6 font-mono text-xs uppercase tracking-widest text-[#131108]/70">
        <span>Til:</span>
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
        <a href="mailto:mansurxon.rustamov@gmail.com" className="menu__mail">
          mansurxon.rustamov@gmail.com
        </a>

        <div className="menu__socials font-mono">
          <a
            href="https://t.me/mansurxongemini"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#c53a00]"
          >
            Telegram Tahlil
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

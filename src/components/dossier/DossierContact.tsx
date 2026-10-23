"use client";

import { useI18n } from "@/components/I18nProvider";

const contactCopy = {
  uz: {
    stamp: "№ 06",
    title: "Murojaat",
    subtitle: "The Vault",
    field: "To'g'ridan-to'g'ri Aloqa",
    line1: "HAMKORLIKNI",
    line2: "BOSHLAYMIZ",
    email: "mansurxon.rustamov@gmail.com",
    telegramTitle: "Telegram Tahlil Kanali",
    telegramDesc: "Huquq, sun'iy intellekt va jamiyat tahlillari",
    githubTitle: "GitHub Kod Bazasi",
    githubDesc: "7 ta ochiq manbali tizim va arxitektura",
    locationTitle: "Manzil & Rezidensiya",
    locationDesc: "Toshkent, O'zbekiston · TDYU",
    btnTelegram: "TELEGRAM ↗",
    btnTelegramHover: "TAHLIL KANALI",
    btnGithub: "GITHUB ↗",
    btnGithubHover: "OCHIQ KOD",
    footerText: "Mansurxon Rustamov — Huquq va Kod Arxivlari",
    closedStamp: "ISh YOPILDI",
    backTop: "Yuqoriga ↗",
  },
  en: {
    stamp: "№ 06",
    title: "Vault",
    subtitle: "The Vault",
    field: "Direct Dialogue",
    line1: "INITIATE",
    line2: "THE DIALOGUE",
    email: "mansurxon.rustamov@gmail.com",
    telegramTitle: "Telegram Dispatches",
    telegramDesc: "Law, artificial intelligence, and civic structures",
    githubTitle: "GitHub Codebase",
    githubDesc: "7 open-source production architectures",
    locationTitle: "Location & Residence",
    locationDesc: "Tashkent, Uzbekistan · TSUL",
    btnTelegram: "TELEGRAM ↗",
    btnTelegramHover: "DISPATCHES",
    btnGithub: "GITHUB ↗",
    btnGithubHover: "CODEBASE",
    footerText: "Mansurxon Rustamov — Statutory Law & Code Archive",
    closedStamp: "CASE CLOSED",
    backTop: "Back to top ↗",
  },
  ru: {
    stamp: "№ 06",
    title: "Связь",
    subtitle: "The Vault",
    field: "Прямой Диалог",
    line1: "НАЧНЁМ",
    line2: "ДИАЛОГ",
    email: "mansurxon.rustamov@gmail.com",
    telegramTitle: "Telegram-канал «Тахлил»",
    telegramDesc: "Аналитика на стыке права, ИИ и общественных систем",
    githubTitle: "GitHub Репозиторий",
    githubDesc: "7 открытых верифицируемых систем",
    locationTitle: "Локация",
    locationDesc: "Ташкент, Узбекистан · ТГЮУ",
    btnTelegram: "TELEGRAM ↗",
    btnTelegramHover: "АНАЛИТИКА",
    btnGithub: "GITHUB ↗",
    btnGithubHover: "ОТКРЫТЫЙ КОД",
    footerText: "Мансурхон Рустамов — Архивы Права и Кода",
    closedStamp: "ДЕЛО ЗАКРЫТО",
    backTop: "Наверх ↗",
  },
};

export function DossierContact() {
  const { locale } = useI18n();
  const t = contactCopy[locale] || contactCopy.en;
  const currentYear = new Date().getFullYear();

  return (
    <>
      <section
        className="sec contact"
        id="contact"
        data-theme-trigger="ink-deep"
        data-tab-target="contact"
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

        {/* Vault Block with Doors & Glow */}
        <div className="contact__block" data-vault>
          <div className="vault__glow" aria-hidden="true" />

          <div className="vault__door" aria-hidden="true">
            <div className="vault__leaf vault__leaf--l" data-door-l />
            <div className="vault__leaf vault__leaf--r" data-door-r />
            <div className="vault__seam" data-door-seam />
          </div>

          <div className="contact__inner">
            <h2 className="contact__title">
              <span
                className="hero__word hero__word--outline"
                data-redact
                data-redact-mode="title"
              >
                {t.line1}
              </span>
              <span
                className="hero__word hero__word--fill"
                data-contact-fill
                aria-hidden="true"
              >
                {t.line1}
              </span>
              <br />
              <span
                className="hero__word"
                data-redact
                data-redact-mode="title"
              >
                {t.line2}
              </span>
            </h2>

            <a
              href={`mailto:${t.email}`}
              className="contact__mail"
              data-magnetic
              data-cursor="Maktub"
            >
              <span>{t.email}</span>
              <span className="icon-arrow ml-2">↗</span>
            </a>

            <div className="contact__meta">
              <div>
                <h4 className="font-mono text-xs uppercase tracking-wider text-[#ff5100]">
                  {t.telegramTitle}
                </h4>
                <p className="mt-1 font-serif text-sm italic text-[#f2eee3]/70">
                  {t.telegramDesc}
                </p>
                <div className="mt-3">
                  <a
                    href="https://t.me/mansurxongemini"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn--solid font-mono text-xs"
                    data-magnetic
                  >
                    <span data-scramble-to={t.btnTelegramHover}>{t.btnTelegram}</span>
                  </a>
                </div>
              </div>

              <div>
                <h4 className="font-mono text-xs uppercase tracking-wider text-[#ff5100]">
                  {t.githubTitle}
                </h4>
                <p className="mt-1 font-serif text-sm italic text-[#f2eee3]/70">
                  {t.githubDesc}
                </p>
                <div className="mt-3">
                  <a
                    href="https://github.com/mansurxongemini"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn--ghost font-mono text-xs text-[#f2eee3]"
                    data-magnetic
                  >
                    <span data-scramble-to={t.btnGithubHover}>{t.btnGithub}</span>
                  </a>
                </div>
              </div>

              <div>
                <h4 className="font-mono text-xs uppercase tracking-wider text-[#ff5100]">
                  {t.locationTitle}
                </h4>
                <p className="mt-1 font-serif text-sm italic text-[#f2eee3]/70">
                  {t.locationDesc}
                </p>
                <p className="mt-2 font-mono text-xs text-[#f2eee3]/50">
                  Asia/Tashkent (UTC+5)
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="vignette" aria-hidden="true" />
      </section>

      {/* Case Closed Site Footer */}
      <footer className="site-foot">
        <span
          className="stamp stamp--closed font-mono"
          data-stamp-closed
          aria-hidden="true"
        >
          {t.closedStamp}
        </span>

        <p className="font-mono">
          © {currentYear} {t.footerText}
        </p>

        <a href="#hero" className="site-foot__top font-mono" data-magnetic>
          {t.backTop}
        </a>
      </footer>
    </>
  );
}

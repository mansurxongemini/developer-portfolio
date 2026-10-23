"use client";

import { useI18n } from "@/components/I18nProvider";

const contactCopy = {
  uz: {
    stamp: "№ 06",
    eyebrow: "Loyihangiz bormi?",
    line1: "BIRGA",
    line2: "QURAMIZ",
    email: "r.mansurxon01@gmail.com",
    city: "Toshkent, O'zbekiston",
    timeWord: "vaqti",
    socials: [
      { label: "Telegram", href: "https://t.me/mansurxonrustamov" },
      { label: "GitHub", href: "https://github.com/mansurxongemini" },
      {
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/mansurxon-rustamov",
      },
    ],
    footerText: "Mansurxon Rustamov",
    backTop: "Yuqoriga ↑",
  },
  en: {
    stamp: "№ 06",
    eyebrow: "Have a project?",
    line1: "LET'S",
    line2: "TALK",
    email: "r.mansurxon01@gmail.com",
    city: "Tashkent, Uzbekistan",
    timeWord: "local time",
    socials: [
      { label: "Telegram", href: "https://t.me/mansurxonrustamov" },
      { label: "GitHub", href: "https://github.com/mansurxongemini" },
      {
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/mansurxon-rustamov",
      },
    ],
    footerText: "Mansurxon Rustamov",
    backTop: "Back to top ↑",
  },
  ru: {
    stamp: "№ 06",
    eyebrow: "Есть проект?",
    line1: "НАЧНЁМ",
    line2: "ДИАЛОГ",
    email: "r.mansurxon01@gmail.com",
    city: "Ташкент, Узбекистан",
    timeWord: "местное время",
    socials: [
      { label: "Telegram", href: "https://t.me/mansurxonrustamov" },
      { label: "GitHub", href: "https://github.com/mansurxongemini" },
      {
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/mansurxon-rustamov",
      },
    ],
    footerText: "Мансурхон Рустамов",
    backTop: "Наверх ↑",
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
        <p className="contact__eyebrow marginalia" data-clip>
          <span className="stamp stamp--index" aria-hidden="true">
            {t.stamp}
          </span>
          {t.eyebrow}
        </p>

        <div className="contact__title" aria-hidden="true">
          <div className="hero__line">
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
          </div>
          <div className="hero__line">
            <span
              className="hero__word"
              data-redact
              data-redact-mode="title"
            >
              {t.line2}
            </span>
          </div>
        </div>
        <h2 className="sr-only">
          {t.line1} {t.line2} — {t.email}
        </h2>

        <div className="contact__block" data-vault>
          <div className="vault__glow" aria-hidden="true" />

          <div className="contact__inner">
            <a
              className="contact__mail"
              href={`mailto:${t.email}`}
              data-magnetic
              data-cursor="Write"
            >
              {t.email}
            </a>
            <div className="contact__meta">
              <p>
                {t.city}
                <br />
                <span data-clock>00:00:00</span> {t.timeWord}
              </p>
              <ul className="contact__socials" role="list">
                {t.socials.map((s) => (
                  <li key={s.label}>
                    <a href={s.href} target="_blank" rel="noopener noreferrer">
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="vault__door" aria-hidden="true">
            <span className="vault__leaf vault__leaf--l" data-door-l />
            <span className="vault__leaf vault__leaf--r" data-door-r />
            <span className="vault__seam" data-door-seam />
          </div>
        </div>

        <div className="vignette" aria-hidden="true" />
      </section>

      {/* Site Footer */}
      <footer className="site-foot" data-theme="ink-deep">
        <span
          className="stamp stamp--closed"
          data-stamp-closed
          aria-hidden="true"
        >
          {currentYear}
        </span>

        <p>
          © {currentYear} {t.footerText}
        </p>

        <a href="#hero" className="site-foot__top" data-magnetic>
          {t.backTop}
        </a>
      </footer>
    </>
  );
}

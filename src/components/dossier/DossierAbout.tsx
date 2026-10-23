"use client";

import Image from "next/image";
import { useI18n } from "@/components/I18nProvider";

const aboutContent = {
  uz: {
    stamp: "№ 01",
    title: "Men haqimda",
    field: "",
    facts: [
      { odo: "7", pad: 2, suffix: "", label: "Loyiha" },
      { odo: "24", pad: 2, suffix: "", label: "Repozitoriy" },
      { odo: "2026", pad: 4, suffix: "", label: "HuquqPlus.uz volontyori" },
      { odo: "2029", pad: 4, suffix: "", label: "TDYU bitiruvi" },
    ],
    manifesto:
      "TDYU huquqshunosligi talabasi. Dasturlayman, HuquqPlus.uz'da volontyorlik qilaman, IT Club'ni tashkil etaman.",
    exhibitStamp: "TDYU",
  },
  en: {
    stamp: "№ 01",
    title: "About",
    field: "",
    facts: [
      { odo: "7", pad: 2, suffix: "", label: "Projects" },
      { odo: "24", pad: 2, suffix: "", label: "Repositories" },
      { odo: "2026", pad: 4, suffix: "", label: "HuquqPlus.uz volunteer" },
      { odo: "2029", pad: 4, suffix: "", label: "TSUL graduation" },
    ],
    manifesto:
      "Law student at TSUL. I code, volunteer at HuquqPlus.uz and organize the IT Club.",
    exhibitStamp: "TSUL",
  },
  ru: {
    stamp: "№ 01",
    title: "Обо мне",
    field: "",
    facts: [
      { odo: "7", pad: 2, suffix: "", label: "Проекты" },
      { odo: "24", pad: 2, suffix: "", label: "Репозитории" },
      { odo: "2026", pad: 4, suffix: "", label: "Волонтёр HuquqPlus.uz" },
      { odo: "2029", pad: 4, suffix: "", label: "Выпуск ТГЮУ" },
    ],
    manifesto:
      "Студент-юрист ТГЮУ. Программирую, волонтёрю на HuquqPlus.uz и организую IT Club.",
    exhibitStamp: "ТГЮУ",
  },
};

export function DossierAbout() {
  const { locale } = useI18n();
  const t = aboutContent[locale] || aboutContent.en;

  return (
    <section
      className="sec about"
      id="about"
      data-theme-trigger="bone"
      data-tab-target="about"
    >
      <header className="sec-head">
        <div className="sec-head__left">
          <span className="stamp stamp--index" data-stamp aria-hidden="true">
            {t.stamp}
          </span>
          <h2 className="sec-head__title">
            <span data-redact>{t.title}</span>
          </h2>
        </div>
        <p className="sec-head__field">{t.field}</p>
      </header>

      {/* Rail with 4 Facts & Odometers */}
      <div className="about__rail">
        <ul className="facts" role="list">
          {t.facts.map((fact, idx) => (
            <li key={idx} className="fact">
              <span className="fact__num">
                <span
                  className="odo"
                  data-odo={fact.odo}
                  data-odo-pad={String(fact.pad)}
                >
                  {fact.odo}
                </span>
                {fact.suffix}
              </span>
              <span className="fact__label">{fact.label}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Scrub Redacted Manifesto */}
      <p className="manifesto about__body" data-redact data-redact-mode="scrub">
        {t.manifesto}
      </p>

      {/* Hung Frame Photo with Clip */}
      <figure
        className="about__media frame frame--hung"
        data-frame
        data-tilt="-0.8"
        data-cursor="*"
      >
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
        <span className="stamp stamp--exhibit" data-stamp-exhibit aria-hidden="true">
          {t.exhibitStamp}
        </span>
        <div className="frame__mat" data-img-reveal>
          <div className="relative aspect-[4/5] w-full overflow-hidden shot">
            <Image
              src="/images/site/about-exhibit.jpg"
              alt="Mansurxon Rustamov"
              fill
              sizes="(max-width: 899px) 92vw, 32vw"
              className="object-cover object-top"
            />
          </div>
        </div>
      </figure>
    </section>
  );
}

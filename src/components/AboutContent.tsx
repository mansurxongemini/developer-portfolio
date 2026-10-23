"use client";

import Image from "next/image";
import { useI18n } from "@/components/I18nProvider";

const copy = {
  uz: {
    stamp: "№ 01",
    title: "Men haqimda",
    field: "",
    facts: [
      { num: "07", label: "Loyiha" },
      { num: "24", label: "Repozitoriy" },
      { num: "2026", label: "HuquqPlus.uz volontyori" },
      { num: "2029", label: "TDYU bitiruvi" },
    ],
    record: "Qisqacha",
    more: "Barcha loyihalar →",
    manifesto:
      "TDYU huquqshunosligi talabasi. Dasturlayman, HuquqPlus.uz'da volontyorlik qilaman, IT Club'ni tashkil etaman.",
  },
  en: {
    stamp: "№ 01",
    title: "About",
    field: "",
    facts: [
      { num: "07", label: "Projects" },
      { num: "24", label: "Repositories" },
      { num: "2026", label: "HuquqPlus.uz volunteer" },
      { num: "2029", label: "TSUL graduation" },
    ],
    record: "Short bio",
    more: "All projects →",
    manifesto:
      "Law student at TSUL. I code, volunteer at HuquqPlus.uz and organize the IT Club.",
  },
  ru: {
    stamp: "№ 01",
    title: "Обо мне",
    field: "",
    facts: [
      { num: "07", label: "Проекты" },
      { num: "24", label: "Репозитории" },
      { num: "2026", label: "Волонтёр HuquqPlus.uz" },
      { num: "2029", label: "Выпуск ТГЮУ" },
    ],
    record: "Кратко",
    more: "Все проекты →",
    manifesto:
      "Студент-юрист ТГЮУ. Программирую, волонтёрю на HuquqPlus.uz и организую IT Club.",
  },
};

export function AboutContent() {
  const { locale, content } = useI18n();
  const t = copy[locale] || copy.en;
  const { about, person } = content;

  const timeline = [
    ...about.work.experiences.slice(0, 2).map((e) => ({
      when: e.timeframe,
      what: `${e.company} — ${e.role}`,
    })),
    ...(about.studies.institutions.slice(0, 1).map((s) => ({
      when: "2025—2029",
      what: s.name,
    })) || []),
  ];

  return (
    <section className="sec about about--page" data-theme-trigger="bone">
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

      <div className="about__rail">
        <ul className="facts" role="list">
          {t.facts.map((fact) => (
            <li key={fact.label} className="fact">
              <span className="fact__num">{fact.num}</span>
              <span className="fact__label">{fact.label}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="about__body">
        <p className="manifesto" data-redact data-redact-mode="scrub">
          {t.manifesto}
        </p>

        <div className="record-mini">
          <p className="record-mini__label font-mono">{t.record}</p>
          <ul className="record-mini__list">
            {timeline.map((row) => (
              <li key={row.what} className="record-mini__row" data-clip>
                <span className="font-mono">{row.when}</span>
                <span>{row.what}</span>
              </li>
            ))}
          </ul>
          <a href="/work" className="briefs__all">
            {t.more}
          </a>
        </div>
      </div>

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
        <div className="frame__mat" data-img-reveal>
          <div className="relative aspect-[4/5] w-full overflow-hidden shot">
            <Image
              src="/images/site/about-exhibit.jpg"
              alt={person.name}
              fill
              sizes="(max-width: 899px) 92vw, 32vw"
              className="object-cover object-top"
            />
          </div>
        </div>
      </figure>

      <div className="about__strip">
        {[
          { src: "/images/site/texture-desk.jpg", tilt: "-1.2", pos: "50% 55%" },
          { src: "/images/site/texture-hands.jpg", tilt: "1", pos: "60% 50%" },
        ].map((item) => (
          <figure key={item.src} className="frame frame--hung" data-frame data-tilt={item.tilt}>
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
            <div className="frame__mat" data-img-reveal>
              <div className="relative aspect-[3/2] w-full overflow-hidden shot">
                <Image
                  src={item.src}
                  alt=""
                  fill
                  sizes="(max-width: 899px) 92vw, 36vw"
                  className="object-cover"
                  style={{ objectPosition: item.pos }}
                />
              </div>
            </div>
          </figure>
        ))}
      </div>
    </section>
  );
}

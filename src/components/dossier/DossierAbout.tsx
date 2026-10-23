"use client";

import Image from "next/image";
import { useI18n } from "@/components/I18nProvider";

const aboutContent = {
  uz: {
    stamp: "№ 01",
    title: "Dosye",
    subtitle: "Shaxsiyat va Faktlar",
    field: "Arxiv hujjati",
    facts: [
      { odo: "7", pad: 2, suffix: "+", label: "Ochiq manbali tizimlar" },
      { odo: "4", pad: 2, suffix: "", label: "Huquqiy tahlilnomalar" },
      { odo: "1", pad: 2, suffix: "", label: "Statutory RAG (UN CRPD)" },
      { odo: "2029", pad: 4, suffix: "", label: "TDYU tamomlash (LL.B.)" },
    ],
    manifesto:
      "Huquq shunchaki qog'ozdagi statik matn emas — u xalqqa xizmat qiladigan ijro mexanizmidir. Toshkent davlat yuridik universitetida huquqshunoslikni o'rganish barobarida, qonun normalarini leksik va semantik qidiruv (LanceDB, SQLite FTS5) orqali gallyutsinatsiyasiz ishlaydigan sun'iy intellekt tizimlariga aylantirmoqdaman. Yurisprudensiya va neyron kod bir-biriga qarama-qarshi emas, balki adolat va shaffoflikni ta'minlovchi yagona poydevordir.",
    exhibitStamp: "Hujjat A",
    caption: "Mansurxon Rustamov. Toshkent, UZ.",
    marginalia: "Faqat real natijalar va ochiq manbali kod. Har bir yechim jamiyat manfaati uchun.",
  },
  en: {
    stamp: "№ 01",
    title: "Dossier",
    subtitle: "Identity & Facts",
    field: "Record on file",
    facts: [
      { odo: "7", pad: 2, suffix: "+", label: "Open-source systems" },
      { odo: "4", pad: 2, suffix: "", label: "Statutory legal briefs" },
      { odo: "1", pad: 2, suffix: "", label: "Statutory RAG (UN CRPD)" },
      { odo: "2029", pad: 4, suffix: "", label: "TSUL Law graduation (LL.B.)" },
    ],
    manifesto:
      "Law is not merely static parchment; it is an executable civic framework. While mastering jurisprudence at Tashkent State University of Law, I engineer specialized hybrid RAG pipelines (LanceDB, SQLite FTS5, RRF) that ground language models in statutory guarantees with zero hallucination. Formal jurisprudence and neural computation are not adversaries — together they form an immutable foundation for verifiable justice.",
    exhibitStamp: "Exhibit A",
    caption: "Mansurxon Rustamov. Tashkent, UZ.",
    marginalia: "Verifiable engineering and open-source architectures. Built for civic access.",
  },
  ru: {
    stamp: "№ 01",
    title: "Досье",
    subtitle: "Личность и Факты",
    field: "Архивные данные",
    facts: [
      { odo: "7", pad: 2, suffix: "+", label: "Открытых систем ИИ" },
      { odo: "4", pad: 2, suffix: "", label: "Правовых аналитических обзора" },
      { odo: "1", pad: 2, suffix: "", label: "Statutory RAG (ООН CRPD)" },
      { odo: "2029", pad: 4, suffix: "", label: "Выпуск из ТГЮУ (LL.B.)" },
    ],
    manifesto:
      "Право — это не просто текст на пергаменте, а работающий общественный механизм. Обучаясь в Ташкентском государственном юридическом университете, я разрабатываю гибридные системы RAG (LanceDB, SQLite FTS5, RRF), гарантирующие точную привязку ответов к статьям законодательства без галлюцинаций. Строгость права и гибкость нейросетей взаимно обогащают друг друга.",
    exhibitStamp: "Экспонат А",
    caption: "Мансурхон Рустамов. Ташкент, UZ.",
    marginalia: "Проверяемый открытый код и практическая инженерия на службе общества.",
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
            <span data-redact>{t.title}</span> <em>{t.subtitle}</em>
          </h2>
        </div>
        <p className="sec-head__field font-mono">{t.field}</p>
      </header>

      {/* Rail with 4 Facts & Odometers */}
      <div className="about__rail">
        <ul className="facts" role="list">
          {t.facts.map((fact, idx) => (
            <li key={idx} className="fact">
              <span className="fact__num font-display">
                <span
                  className="odo"
                  data-odo={fact.odo}
                  data-odo-pad={String(fact.pad)}
                >
                  {fact.odo}
                </span>
                {fact.suffix}
              </span>
              <span className="fact__label font-mono">{fact.label}</span>
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
        className="about__media frame frame--hung frame--id"
        data-frame
        data-tilt="-0.8"
        data-cursor="Exhibit"
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
        <span className="stamp stamp--exhibit font-mono" data-stamp-exhibit aria-hidden="true">
          {t.exhibitStamp}
        </span>
        <div className="frame__mat" data-img-reveal>
          <div className="relative aspect-[4/5] w-full overflow-hidden shot">
            <Image
              src="/images/avatar.jpg"
              alt="Mansurxon Rustamov — Exhibit A"
              fill
              sizes="(max-width: 899px) 92vw, 32vw"
              className="object-cover object-top"
            />
          </div>
        </div>
        <figcaption className="marginalia">{t.caption}</figcaption>
      </figure>

      <p className="marginalia about__margin">
        <span className="marginalia__ast mr-1">*</span>
        {t.marginalia}
      </p>
    </section>
  );
}

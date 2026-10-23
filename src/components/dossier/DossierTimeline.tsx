"use client";

import { useI18n } from "@/components/I18nProvider";

interface RecordEntry {
  tag: string;
  name: string;
  when: string;
}

interface TimelineBlock {
  year: string;
  left: RecordEntry[];
  right: RecordEntry[];
}

const timelineCopy = {
  uz: {
    stamp: "№ 04",
    title: "Yo'l",
    field: "",
    leftLegend: "Kod",
    rightLegend: "Huquq",
    tagWork: "Ish",
    tagProject: "Loyiha",
    tagStudy: "O'qish",
    tagAward: "Sertifikat",
    tagWin: "Yutuq",
  },
  en: {
    stamp: "№ 04",
    title: "Path",
    field: "",
    leftLegend: "Code",
    rightLegend: "Law",
    tagWork: "Work",
    tagProject: "Project",
    tagStudy: "Study",
    tagAward: "Certificate",
    tagWin: "Award",
  },
  ru: {
    stamp: "№ 04",
    title: "Путь",
    field: "",
    leftLegend: "Код",
    rightLegend: "Право",
    tagWork: "Работа",
    tagProject: "Проект",
    tagStudy: "Учёба",
    tagAward: "Сертификат",
    tagWin: "Достижение",
  },
};

const names = {
  uz: {
    alloma: "Alloma AI — shaxsiy AI-mentor",
    rag: "Inclusive Legal RAG",
    club: "TDYU IT Club — tashkilotchi",
    huquqplus: "HuquqPlus.uz — huquqshunos volontyor",
    iymc: "International Youth Math Challenge, saralash bosqichi",
    tdyu: "TDYU, Jinoiy odil sudlov fakulteti",
    dev: "Mustaqil Full-Stack dasturchi",
    itpark: "IT Park — Python va Frontend kurslari",
    informatics: "Informatika olimpiadasi (IMA tizimi), viloyat bosqichi — 1-o'rin",
    tatu: "TATU sport dasturlash musobaqasi, respublika bosqichi — 1-o'rin",
    turin: "Turin politexnika hackathoni, respublika bosqichi — ishtirokchi",
    robo: "Robo Coding olimpiadasi, viloyat bosqichi — maktab jamoasi bilan 1-o'rin",
    school: "Oqdaryo tuman ixtisoslashtirilgan maktabi (IMA tizimi)",
  },
  en: {
    alloma: "Alloma AI — personal AI mentor",
    rag: "Inclusive Legal RAG",
    club: "TSUL IT Club — organizer",
    huquqplus: "HuquqPlus.uz — legal volunteer",
    iymc: "International Youth Math Challenge, qualification round",
    tdyu: "TSUL, Criminal Justice Faculty",
    dev: "Independent Full-Stack developer",
    itpark: "IT Park — Python and Frontend courses",
    informatics: "Informatics olympiad (IMA system), regional stage — 1st place",
    tatu: "TUIT competitive programming contest, republic stage — 1st place",
    turin: "Turin Polytechnic hackathon, republic stage — participant",
    robo: "Robo Coding olympiad, regional stage — 1st place with the school team",
    school: "Oqdaryo District Specialized School (IMA system)",
  },
  ru: {
    alloma: "Alloma AI — персональный ИИ-ментор",
    rag: "Inclusive Legal RAG",
    club: "IT Club ТГЮУ — организатор",
    huquqplus: "HuquqPlus.uz — волонтёр-юрист",
    iymc: "International Youth Math Challenge, отборочный этап",
    tdyu: "ТГЮУ, факультет уголовного правосудия",
    dev: "Независимый Full-Stack разработчик",
    itpark: "IT Park — курсы Python и Frontend",
    informatics: "Олимпиада по информатике (система АСУЗ), региональный этап — 1 место",
    tatu: "Соревнование по спортивному программированию ТУИТ, республиканский этап — 1 место",
    turin: "Хакатон Туринского политехнического, республиканский этап — участник",
    robo: "Олимпиада Robo Coding, региональный этап — 1 место в составе школьной команды",
    school: "Окдарьинская районная специализированная школа (система АСУЗ)",
  },
};

function EntryList({
  entries,
  side,
}: {
  entries: RecordEntry[];
  side: "l" | "r";
}) {
  return (
    <ul className={`alibi__col alibi__col--${side}`} role="list">
      {entries.map((entry, i) => (
        <li key={i} className="entry" data-clip>
          <span className="entry__tag">{entry.tag}</span>
          <span className="entry__who">{entry.name}</span>
          <span className="entry__when">{entry.when}</span>
        </li>
      ))}
    </ul>
  );
}

export function DossierTimeline() {
  const { locale } = useI18n();
  const t = timelineCopy[locale] || timelineCopy.en;
  const n = names[locale] || names.en;

  const timelineData: TimelineBlock[] = [
    {
      year: "2026",
      left: [
        { tag: t.tagProject, name: n.rag, when: "2026" },
        { tag: t.tagProject, name: n.alloma, when: "2026" },
        { tag: t.tagWork, name: n.club, when: "2026 —" },
        { tag: t.tagAward, name: n.iymc, when: "2026" },
      ],
      right: [{ tag: t.tagWork, name: n.huquqplus, when: "2026 —" }],
    },
    {
      year: "2025",
      left: [],
      right: [{ tag: t.tagStudy, name: n.tdyu, when: "2025—2029" }],
    },
    {
      year: "2024",
      left: [
        { tag: t.tagWin, name: n.informatics, when: "2024" },
        { tag: t.tagWin, name: n.tatu, when: "2023—24" },
        { tag: t.tagAward, name: n.turin, when: "2024" },
      ],
      right: [],
    },
    {
      year: "2023",
      left: [
        { tag: t.tagWin, name: n.robo, when: "2023" },
        { tag: t.tagWork, name: n.dev, when: "2023 —" },
      ],
      right: [],
    },
    {
      year: "2022",
      left: [{ tag: t.tagStudy, name: n.itpark, when: "2022" }],
      right: [],
    },
    {
      year: "2021",
      left: [],
      right: [{ tag: t.tagStudy, name: n.school, when: "2021—2024" }],
    },
  ];

  return (
    <section
      className="sec record"
      id="timeline"
      data-theme-trigger="ink"
      data-tab-target="timeline"
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

      {/* Center Animated Scrub Line & Year Columns */}
      <div className="record__body">
        <div className="alibi" data-alibi>
          <div className="alibi__line" data-alibi-line aria-hidden="true" />

          <div className="alibi__legend">
            <span>{t.leftLegend}</span>
            <span>{t.rightLegend}</span>
          </div>

          {timelineData.map((block) => (
            <div key={block.year} className="alibi__year" data-alibi-year>
              <div className="alibi__y">
                <span className="alibi__drop" aria-hidden="true" />
                <span className="alibi__yn">{block.year}</span>
              </div>

              <EntryList entries={block.left} side="l" />
              <EntryList entries={block.right} side="r" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

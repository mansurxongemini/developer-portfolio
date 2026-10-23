"use client";

import { useI18n } from "@/components/I18nProvider";

interface TimelineBlock {
  year: string;
  leftRole: Record<"uz" | "en" | "ru", string>;
  leftProject: string;
  leftDesc: Record<"uz" | "en" | "ru", string>;
  rightRole: Record<"uz" | "en" | "ru", string>;
  rightInst: string;
  rightDesc: Record<"uz" | "en" | "ru", string>;
}

const timelineData: TimelineBlock[] = [
  {
    year: "2026",
    leftRole: {
      uz: "AI TIZIMLARI MUHANDISI & ASOSCHI",
      en: "AI SYSTEMS ENGINEER & FOUNDER",
      ru: "AI-ИНЖЕНЕР И ОСНОВАТЕЛЬ",
    },
    leftProject: "Inclusive Legal RAG & Alloma AI",
    leftDesc: {
      uz: "LanceDB va gibrid RRF asosidagi statutory RAG hamda doimiy vektor xotirali kognitiv mentor tizimlarini ishlab chiqish.",
      en: "Production engineering of statutory hybrid RAG architectures (LanceDB + RRF) and persistent vector memory cognitive engines.",
      ru: "Разработка специализированных statutory RAG платформ (LanceDB + RRF) и когнитивных движков с долговременной памятью.",
    },
    rightRole: {
      uz: "TDYU HUQUQSHUNOSLIK (LL.B.)",
      en: "TSUL JURISPRUDENCE (LL.B.)",
      ru: "ЮРИСПРУДЕНЦИЯ ТГЮУ (LL.B.)",
    },
    rightInst: "Toshkent Davlat Yuridik Universiteti",
    rightDesc: {
      uz: "Yurisprudensiya, davlat nazariyasi, konstitutsiyaviy huquq va normativ aktlarni talqin qilish bo'yicha chuqur akademik ta'lim.",
      en: "Comprehensive curriculum in jurisprudence, theory of state, constitutional law, and statutory interpretation.",
      ru: "Фундаментальное академическое обучение теории государства и права, конституционному праву и толкованию норм.",
    },
  },
  {
    year: "2025",
    leftRole: {
      uz: "KO'P AGENTLI TIZIMLAR DASTURCHISI",
      en: "MULTI-AGENT SYSTEMS DEVELOPER",
      ru: "РАЗРАБОТЧИК МНОГОАГЕНТНЫХ СИСТЕМ",
    },
    leftProject: "Multi-Agent Roundtable & HuquqPlus",
    leftDesc: {
      uz: "Karpathy LLM Council asosidagi anonim peer-review va konsensus tizimi hamda fuqarolar uchun ochiq yuridik portalni yaratish.",
      en: "Collaborative multi-agent debate and anonymous peer-review framework alongside citizen legal information portals.",
      ru: "Архитектура консенсуса LLM Council с анонимным peer-review и открытый портал правовой помощи гражданам.",
    },
    rightRole: {
      uz: "HUQUQIY TAHLIL VA SERTIFIKATLAR",
      en: "STATUTORY RESEARCH & CERTIFICATIONS",
      ru: "ПРАВОВАЯ АНАЛИТИКА И СЕРТИФИКАЦИЯ",
    },
    rightInst: "BMT Konvensiyasi (UN CRPD) & LegalTech",
    rightDesc: {
      uz: "Nogironlar huquqlari bo'yicha BMT xalqaro konvensiyasi normalarini milliy qonunchilik bilan muvofiqlashtirish tahlillari.",
      en: "Comparative legal analysis evaluating national legislation against the UN Convention on the Rights of Persons with Disabilities.",
      ru: "Сравнительно-правовой анализ национального законодательства и норм Конвенции ООН о правах инвалидов.",
    },
  },
  {
    year: "2024",
    leftRole: {
      uz: "FULL-STACK DASTURCHI",
      en: "FULL-STACK ENGINEER",
      ru: "FULL-STACK РАЗРАБОТЧИК",
    },
    leftProject: "Mahalla Management & KitobPlus",
    leftDesc: {
      uz: "Mahalla fuqarolar yig'inlari uchun avtomatlashtirilgan reyestrlar va to'liq matnli elektron kutubxona platformasi.",
      en: "Automated municipal record workflows for local community councils and accessible full-text digital library platforms.",
      ru: "Цифровизация работы махаллинских комитетов и платформа электронной библиотеки с полнотекстовым поиском.",
    },
    rightRole: {
      uz: "AKADEMIK VA YURIDIK TAYYORGARLIK",
      en: "ACADEMIC & CIVIC FOUNDATIONS",
      ru: "АКАДЕМИЧЕСКАЯ И ПРАВОВАЯ БАЗА",
    },
    rightInst: "Yuridik Fanlar va Dasturlash Asoslari",
    rightDesc: {
      uz: "Huquqiy mantiq, algoritmik fikrlash va ijtimoiy jarayonlarni tizimli tahlil qilish asoslarini egallash.",
      en: "Formative grounding in legal logic, algorithmic problem-solving, and systematic analysis of civic institutions.",
      ru: "Формирование фундамента в области правовой логики, алгоритмического мышления и системного анализа.",
    },
  },
];

const timelineCopy = {
  uz: {
    stamp: "№ 04",
    title: "Yozuv",
    subtitle: "The Record",
    field: "Xronologiya · 2024—2026",
    leftLegend: "AI Tizimlari Muhandisligi",
    rightLegend: "TDYU Yurisprudensiya",
    marginalia: "Har bir bosqich huquqiy bilim va amaliy kodning sinxron o'sishini aks ettiradi.",
  },
  en: {
    stamp: "№ 04",
    title: "Record",
    subtitle: "The Record",
    field: "Chronology · 2024—2026",
    leftLegend: "AI Systems Engineering",
    rightLegend: "TSUL Jurisprudence",
    marginalia: "Each chapter reflects simultaneous mastery of statutory law and software systems.",
  },
  ru: {
    stamp: "№ 04",
    title: "Запись",
    subtitle: "The Record",
    field: "Хронология · 2024—2026",
    leftLegend: "Инженерия Систем ИИ",
    rightLegend: "Юриспруденция ТГЮУ",
    marginalia: "Каждый этап демонстрирует синхронное развитие юридической экспертизы и программного кода.",
  },
};

export function DossierTimeline() {
  const { locale } = useI18n();
  const t = timelineCopy[locale] || timelineCopy.en;

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
            <span data-redact>{t.title}</span> <em>{t.subtitle}</em>
          </h2>
        </div>
        <p className="sec-head__field font-mono">{t.field}</p>
      </header>

      {/* Left Rail Field Card */}
      <dl className="field record__rail" data-clip>
        <div>
          <dt>Institut</dt>
          <dd>Toshkent Davlat Yuridik Universiteti</dd>
        </div>
        <div>
          <dt>Kurs</dt>
          <dd>1-kurs talabasi (2025—2029)</dd>
        </div>
        <div>
          <dt>Yo'nalish</dt>
          <dd>Statut Huquqi & AI Muhandisligi</dd>
        </div>
        <div>
          <dt>Fokus</dt>
          <dd>RAG · Multi-Agent · Vektor Xotira</dd>
        </div>
      </dl>

      {/* Center Animated Scrub Line & Year Columns */}
      <div className="record__body">
        <div className="alibi" data-alibi>
          <div className="alibi__line" data-alibi-line aria-hidden="true" />

          <div className="alibi__legend font-mono">
            <span>{t.leftLegend}</span>
            <span>{t.rightLegend}</span>
          </div>

          {timelineData.map((block) => (
            <div key={block.year} className="alibi__year" data-alibi-year>
              <div className="alibi__y">
                <span className="alibi__drop" aria-hidden="true" />
                <span className="alibi__yn font-display">{block.year}</span>
              </div>

              {/* Left Column (AI Engineering) */}
              <div className="alibi__col pr-4">
                <article className="entry" data-clip>
                  <span className="entry__tag font-mono">{block.leftRole[locale]}</span>
                  <h4 className="entry__who font-display text-lg font-bold text-[#f2eee3]">
                    {block.leftProject}
                  </h4>
                  <p className="entry__what mt-1 font-body text-sm leading-relaxed">
                    {block.leftDesc[locale]}
                  </p>
                  <span className="entry__when font-mono">{block.year}</span>
                </article>
              </div>

              {/* Right Column (TSUL Jurisprudence) */}
              <div className="alibi__col pl-4">
                <article className="entry" data-clip>
                  <span className="entry__tag font-mono text-[#f2eee3]/70">
                    {block.rightRole[locale]}
                  </span>
                  <h4 className="entry__who font-display text-lg font-bold text-[#f2eee3]">
                    {block.rightInst}
                  </h4>
                  <p className="entry__what mt-1 font-body text-sm leading-relaxed">
                    {block.rightDesc[locale]}
                  </p>
                  <span className="entry__when font-mono">{block.year}</span>
                </article>
              </div>
            </div>
          ))}
        </div>

        <p className="marginalia record__margin font-serif">
          <span className="marginalia__ast mr-1">*</span>
          {t.marginalia}
        </p>
      </div>
    </section>
  );
}

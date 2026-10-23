"use client";

import { useI18n } from "@/components/I18nProvider";

interface TimelineYearBlock {
  year: string;
  leftWork: {
    role: Record<"uz" | "en" | "ru", string>;
    project: string;
    desc: Record<"uz" | "en" | "ru", string>;
  };
  rightLaw: {
    role: Record<"uz" | "en" | "ru", string>;
    institution: string;
    desc: Record<"uz" | "en" | "ru", string>;
  };
}

const timelineData: TimelineYearBlock[] = [
  {
    year: "2026",
    leftWork: {
      role: {
        uz: "AI TIZIMLARI MUHANDISI & ASOSCHI",
        en: "AI SYSTEMS ENGINEER & FOUNDER",
        ru: "AI-ИНЖЕНЕР И ОСНОВАТЕЛЬ СИСТЕМ",
      },
      project: "Inclusive Legal RAG & Alloma AI",
      desc: {
        uz: "LanceDB va gibrid RRF asosidagi ixtisoslashgan statutory RAG hamda doimiy vektor xotirali kognitiv mentor tizimlarini ishlab chiqish.",
        en: "Production engineering of statutory hybrid RAG architectures (LanceDB + RRF) and persistent vector memory cognitive engines.",
        ru: "Разработка специализированных statutory RAG платформ (LanceDB + RRF) и когнитивных движков с долговременной памятью.",
      },
    },
    rightLaw: {
      role: {
        uz: "YURISPRUDENSIYA TALABASI (LL.B.)",
        en: "TSUL LAW STUDENT (LL.B.)",
        ru: "СТУДЕНТ-ЮРИСТ ТГЮУ (LL.B.)",
      },
      institution: "Toshkent Davlat Yuridik Universiteti",
      desc: {
        uz: "Yurisprudensiya, davlat nazariyasi, konstitutsiyaviy huquq va normativ aktlarni talqin qilish bo'yicha chuqur akademik ta'lim.",
        en: "Comprehensive curriculum in jurisprudence, theory of state, constitutional law, and statutory interpretation.",
        ru: "Фундаментальное академическое обучение теории государства и права, конституционному праву и толкованию норм.",
      },
    },
  },
  {
    year: "2025",
    leftWork: {
      role: {
        uz: "KO'P AGENTLI TIZIMLAR DASTURCHISI",
        en: "MULTI-AGENT SYSTEMS DEVELOPER",
        ru: "РАЗРАБОТЧИК МНОГОАГЕНТНЫХ СИСТЕМ",
      },
      project: "Multi-Agent Roundtable & HuquqPlus",
      desc: {
        uz: "Karpathy LLM Council asosidagi anonim peer-review va konsensus tizimi hamda fuqarolar uchun ochiq yuridik portalni yaratish.",
        en: "Collaborative multi-agent debate and anonymous peer-review framework alongside citizen legal information portals.",
        ru: "Архитектура консенсуса LLM Council с анонимным peer-review и открытый портал правовой помощи гражданам.",
      },
    },
    rightLaw: {
      role: {
        uz: "HUQUQIY TAHLIL VA SERTIFIKATLAR",
        en: "STATUTORY RESEARCH & CERTIFICATIONS",
        ru: "ПРАВОВАЯ АНАЛИТИКА И СЕРТИФИКАЦИЯ",
      },
      institution: "BMT Konvensiyasi (UN CRPD) & LegalTech",
      desc: {
        uz: "Nogironlar huquqlari bo'yicha BMT xalqaro konvensiyasi normalarini milliy qonunchilik bilan muvofiqlashtirish tahlillari.",
        en: "Comparative legal analysis evaluating national legislation against the UN Convention on the Rights of Persons with Disabilities.",
        ru: "Сравнительно-правовой анализ национального законодательства и норм Конвенции ООН о правах инвалидов.",
      },
    },
  },
  {
    year: "2024",
    leftWork: {
      role: {
        uz: "FULL-STACK DASTURCHI",
        en: "FULL-STACK ENGINEER",
        ru: "FULL-STACK РАЗРАБОТЧИК",
      },
      project: "Mahalla Management & KitobPlus",
      desc: {
        uz: "Mahalla fuqarolar yig'inlari uchun avtomatlashtirilgan reyestrlar va to'liq matnli elektron kutubxona platformasi.",
        en: "Automated municipal record workflows for local community councils and accessible full-text digital library platforms.",
        ru: "Цифровизация работы махаллинских комитетов и платформа электронной библиотеки с полнотекстовым поиском.",
      },
    },
    rightLaw: {
      role: {
        uz: "AKADEMIK VA YURIDIK TAYYORGARLIK",
        en: "ACADEMIC & CIVIC FOUNDATIONS",
        ru: "АКАДЕМИЧЕСКАЯ И ПРАВОВАЯ БАЗА",
      },
      institution: "Akademik mukammallik va huquqiy intilish",
      desc: {
        uz: "TDYU ga kirish, huquq falsafasi, davlat boshqaruvi va mantiqiy tahlil asoslarini chuqur o'rganish.",
        en: "Admission to TSUL with academic honors, rigorous study of analytical philosophy, governance, and legal logic.",
        ru: "Поступление в ТГЮУ с отличием, углублённое изучение философии права, логики и основ государственного управления.",
      },
    },
  },
];

const timelineCopy = {
  uz: {
    stamp: "№ 04",
    title: "RECORD",
    subtitle: "The Timeline",
    metaRight: "XRONOLOGIYA · 2024—2026",
    leftStreamHeader: "AI MUHANDISLIGI & ISHLANMALAR",
    rightStreamHeader: "YURISPRUDENSIYA & AKADEMIK TA'LIM",
  },
  en: {
    stamp: "№ 04",
    title: "RECORD",
    subtitle: "The Timeline",
    metaRight: "ON FILE · 2024—2026",
    leftStreamHeader: "AI ENGINEERING & PLATFORMS",
    rightStreamHeader: "JURISPRUDENCE & STATUTORY STUDY",
  },
  ru: {
    stamp: "№ 04",
    title: "RECORD",
    subtitle: "The Timeline",
    metaRight: "УЧЁТ · 2024—2026",
    leftStreamHeader: "AI-ИНЖЕНЕРИЯ И СИСТЕМЫ",
    rightStreamHeader: "ЮРИСПРУДЕНЦИЯ И ТА'ЛИМ ТГЮУ",
  },
};

export function DossierTimeline() {
  const { locale } = useI18n();
  const copy = timelineCopy[locale] || timelineCopy.uz;

  return (
    <section
      id="timeline"
      className="relative w-full border-t border-[#f2eee3]/10 bg-[#0b0a06] px-5 py-20 text-[#f2eee3] sm:px-10 lg:px-16"
    >
      {/* Top Header Strip */}
      <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-[#f2eee3]/15 pb-6">
        <div className="flex items-center gap-3">
          <span className="dossier-stamp">{copy.stamp}</span>
          <h2 className="font-sans text-2xl font-black uppercase tracking-tight text-[#f2eee3] sm:text-3xl">
            {copy.title}
          </h2>
          <span className="font-serif text-lg italic text-[#a8a29e] sm:text-xl">
            {copy.subtitle}
          </span>
        </div>

        <div className="font-mono text-xs uppercase tracking-widest text-[#78716c]">
          {copy.metaRight}
        </div>
      </div>

      {/* Stream Column Headers */}
      <div className="mt-12 hidden grid-cols-2 gap-16 border-b border-[#f2eee3]/10 pb-4 font-mono text-xs font-bold uppercase tracking-wider md:grid">
        <div className="text-right text-[#ff5100]">
          {copy.leftStreamHeader}
        </div>
        <div className="text-left text-[#f2eee3]">
          {copy.rightStreamHeader}
        </div>
      </div>

      {/* Central Thread Timeline Container */}
      <div className="relative mt-12 space-y-20">
        {/* Central Red Glowing Thread Line (desktop) */}
        <div
          aria-hidden
          className="absolute bottom-4 left-1/2 top-4 hidden w-[1px] -translate-x-1/2 bg-[#ff5100]/60 md:block"
        />

        {timelineData.map((block) => (
          <div key={block.year} className="relative">
            {/* Giant Wireframe Outline Year in Center */}
            <div className="relative z-10 flex justify-center pb-6">
              <div className="flex items-center gap-3 rounded-full border border-[#f2eee3]/15 bg-[#0b0a06] px-6 py-2 shadow-xl">
                <span className="h-2 w-2 rounded-full bg-[#ff5100] pulse-orange-dot" />
                <span className="dossier-wireframe-text font-sans text-4xl font-black tracking-tight sm:text-5xl">
                  {block.year}
                </span>
                <span className="h-2 w-2 rounded-full bg-[#ff5100] pulse-orange-dot" />
              </div>
            </div>

            {/* Two Branching Cards (Left & Right) */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-16">
              {/* Left Branch (AI & Systems) */}
              <div className="group rounded-[2px] border border-[#f2eee3]/10 bg-[#131108] p-6 text-left transition-all duration-300 hover:border-[#ff5100] hover:shadow-[0_0_24px_rgba(255,81,0,0.1)] md:text-right">
                <div className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#ff5100]">
                  {block.leftWork.role[locale]}
                </div>
                <h4 className="mt-1 font-sans text-lg font-bold text-[#f2eee3]">
                  {block.leftWork.project}
                </h4>
                <p className="mt-2 text-xs leading-relaxed text-[#a8a29e]">
                  {block.leftWork.desc[locale]}
                </p>
              </div>

              {/* Right Branch (Law & Jurisprudence) */}
              <div className="group rounded-[2px] border border-[#f2eee3]/10 bg-[#131108] p-6 text-left transition-all duration-300 hover:border-[#f2eee3]/40">
                <div className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#d6d3d1]">
                  {block.rightLaw.role[locale]}
                </div>
                <h4 className="mt-1 font-sans text-lg font-bold text-[#f2eee3]">
                  {block.rightLaw.institution}
                </h4>
                <p className="mt-2 text-xs leading-relaxed text-[#a8a29e]">
                  {block.rightLaw.desc[locale]}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

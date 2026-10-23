"use client";

import Image from "next/image";
import { useI18n } from "@/components/I18nProvider";
import { ArrowDown, Send, ArrowUpRight } from "lucide-react";

const heroContent = {
  uz: {
    subjectLabel: "SUBJECT",
    subjectName: "Mansurxon Rustamov",
    fieldLabel: "FIELD",
    fieldVal: "Statutory Law & AI",
    statusLabel: "STATUS",
    statusVal: "Open for select initiatives",
    registryLabel: "RECORD",
    registryVal: "TSUL · 2025-2029",
    headlineSolid: "BRIDGING LAW",
    headlineWireframe: "AND INTELLIGENCE",
    footnote:
      "*Legally speaking. First-year law student at Tashkent State University of Law and AI systems engineer. Building production RAG pipelines, cognitive vector memory, and multi-agent consensus frameworks.",
    viewWorkBtn: "№ 04 · The Evidence",
    telegramBtn: "Tahlil Channel ↗",
    badgeText: "• MANSURXON RUSTAMOV • TDYU VA SUN'IY INTELLEKT • 2026 • ",
  },
  en: {
    subjectLabel: "SUBJECT",
    subjectName: "Mansurxon Rustamov",
    fieldLabel: "FIELD",
    fieldVal: "Statutory Law & AI",
    statusLabel: "STATUS",
    statusVal: "Open for select initiatives",
    registryLabel: "RECORD",
    registryVal: "TSUL · 2025-2029",
    headlineSolid: "BRIDGING LAW",
    headlineWireframe: "AND INTELLIGENCE",
    footnote:
      "*Legally speaking. First-year law student at Tashkent State University of Law and AI systems engineer. Building production RAG pipelines, cognitive vector memory, and multi-agent consensus frameworks.",
    viewWorkBtn: "№ 04 · The Evidence",
    telegramBtn: "Tahlil Channel ↗",
    badgeText: "• MANSURXON RUSTAMOV • TSUL LAW & AI SYSTEMS • 2026 • ",
  },
  ru: {
    subjectLabel: "SUBJECT",
    subjectName: "Мансурхон Рустамов",
    fieldLabel: "FIELD",
    fieldVal: "Право и Архитектуры ИИ",
    statusLabel: "STATUS",
    statusVal: "Открыт к сотрудничеству",
    registryLabel: "RECORD",
    registryVal: "ТГЮУ · 2025-2029",
    headlineSolid: "BRIDGING LAW",
    headlineWireframe: "AND INTELLIGENCE",
    footnote:
      "*Юридически безупречно. Студент ТГЮУ и инженер систем ИИ. Разработка гибридных statutory RAG, когнитивной памяти и многоагентного консенсуса.",
    viewWorkBtn: "№ 04 · The Evidence",
    telegramBtn: "Канал «Тахлил» ↗",
    badgeText: "• МАНСУРХОН РУСТАМОВ • ТГЮУ И АРХИТЕКТУРЫ ИИ • 2026 • ",
  },
};

export function DossierHero() {
  const { locale } = useI18n();
  const t = heroContent[locale] || heroContent.en;

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative flex min-h-screen w-full flex-col justify-between overflow-hidden bg-[#0b0a06] px-6 py-8 text-[#f2eee3] sm:px-12 lg:px-20"
    >
      {/* Background Universal Classical Plaster Bust with Orange Translucent Wrap */}
      <div className="hero__bust">
        <Image
          src="/images/jopecuro_bag-1400.jpg"
          alt="Boredom, apprehended"
          fill
          priority
          className="object-cover object-right"
          unoptimized
        />
      </div>

      {/* Ambient flashlight beam */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-1/4 top-1/3 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,81,0,0.18)_0%,transparent_65%)] blur-2xl"
      />

      {/* Top Dossier Metadata Strip */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-y-3 border-b border-[#f2eee3]/10 pb-6 font-mono text-[11px] tracking-wider text-[#a8a29e]">
        <div className="flex flex-wrap items-center gap-x-8 gap-y-2">
          <div className="flex items-center gap-2">
            <span className="text-[#78716c]">{t.subjectLabel}</span>
            <span className="font-semibold uppercase text-[#f2eee3]">{t.subjectName}</span>
          </div>
          <div className="hidden items-center gap-2 sm:flex">
            <span className="text-[#78716c]">{t.fieldLabel}</span>
            <span className="text-[#e7e5e4]">{t.fieldVal}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[#78716c]">{t.statusLabel}</span>
            <span className="flex items-center gap-1.5 font-medium text-[#ff5100]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#ff5100] pulse-orange-dot" />
              {t.statusVal}
            </span>
          </div>
        </div>

        <div className="hidden font-mono text-[10px] uppercase text-[#78716c] md:block">
          {t.registryLabel} · {t.registryVal}
        </div>
      </div>

      {/* Monumental Headline Area */}
      <div className="relative z-10 my-auto max-w-4xl py-12">
        <div className="space-y-0.5">
          <h1 className="text-left font-sans text-5xl font-black uppercase tracking-tight text-[#f2eee3] sm:text-7xl md:text-8xl lg:text-[7.6rem] lg:leading-[0.9]">
            <span className="block">{t.headlineSolid}</span>
            <span className="dossier-wireframe-text block">{t.headlineWireframe}</span>
          </h1>
        </div>

        {/* Lead Footnote Quote */}
        <div className="mt-8 max-w-xl font-serif text-sm italic leading-relaxed text-[#d6d3d1] sm:text-base">
          <p>
            <span className="text-[#ff5100] font-sans font-bold not-italic mr-1">*</span>
            {t.footnote}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <button
            onClick={() => scrollToSection("work")}
            className="group flex items-center gap-2.5 rounded-[2px] bg-[#f2eee3] px-6 py-3.5 font-mono text-xs font-bold uppercase tracking-wider text-[#0b0a06] transition-all duration-200 hover:bg-[#ff5100] hover:text-white hover:shadow-[0_0_24px_rgba(255,81,0,0.5)]"
          >
            <span>{t.viewWorkBtn}</span>
            <ArrowDown size={14} className="transition-transform group-hover:translate-y-0.5" />
          </button>

          <a
            href="https://t.me/+OWASsFa4TGg2MWYy"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-[2px] border border-[#f2eee3]/20 bg-[#131108] px-5 py-3.5 font-mono text-xs font-semibold uppercase tracking-wider text-[#e7e5e4] transition-all duration-200 hover:border-[#ff5100] hover:text-[#ff5100]"
          >
            <Send size={13} className="text-[#ff5100]" />
            <span>{t.telegramBtn}</span>
          </a>
        </div>
      </div>

      {/* Bottom Bar: Circular Spinning Badge & Footer Tag */}
      <div className="relative z-10 flex items-end justify-between border-t border-[#f2eee3]/10 pt-6">
        <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-widest text-[#78716c]">
          <span className="h-1.5 w-1.5 bg-[#ff5100]" />
          <span>STATUTORY GROUNDING & CODE EXHIBITS · 2026</span>
        </div>

        {/* Rotating Circular Badge (Jopecuro signature) */}
        <div
          onClick={() => scrollToSection("about")}
          className="group relative h-28 w-28 cursor-pointer text-[#d6d3d1] transition hover:text-[#ff5100]"
          title="Scroll to Dossier"
        >
          <svg className="badge-spin h-full w-full" viewBox="0 0 120 120">
            <defs>
              <path
                id="heroCirclePath"
                d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0"
              />
            </defs>
            <text className="fill-current font-mono text-[9.5px] uppercase tracking-[0.16em]">
              <textPath href="#heroCirclePath">
                {t.badgeText}
              </textPath>
            </text>
          </svg>
          <div className="absolute inset-0 flex items-center justify-center font-mono text-xs font-bold transition-transform group-hover:translate-y-1">
            ↓
          </div>
        </div>
      </div>
    </section>
  );
}

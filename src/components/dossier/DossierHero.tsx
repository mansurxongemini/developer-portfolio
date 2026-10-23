"use client";

import { useI18n } from "@/components/I18nProvider";
import { ArrowDown, Send, ArrowUpRight } from "lucide-react";

const heroContent = {
  uz: {
    subjectLabel: "OB'YEKT",
    subjectName: "Mansurxon Rustamov",
    fieldLabel: "SOHA",
    fieldVal: "Yurisprudensiya & AI",
    statusLabel: "HOLAT",
    statusVal: "Ochiq muloqot va hamkorlik",
    registryLabel: "QAYD",
    registryVal: "TDYU · 2025-2029",
    headlineSolid: "QONUN VA KOD",
    headlineWireframe: "SUN'IY INTELLEKT",
    footnote:
      "*Normativ qat'iyatlik va muhandislik amaliyoti. Toshkent davlat yuridik universiteti talabasi va sun'iy intellekt tizimlari dasturchisi — huquq va texnologiya o'rtasidagi ko'prik.",
    viewWorkBtn: "Dalillarni ko'rish",
    telegramBtn: "Tahlil kanali",
    scrollHint: "PASTGA SURING",
  },
  en: {
    subjectLabel: "SUBJECT",
    subjectName: "Mansurxon Rustamov",
    fieldLabel: "FIELD",
    fieldVal: "Statutory Law & AI",
    statusLabel: "STATUS",
    statusVal: "Open for initiatives",
    registryLabel: "RECORD",
    registryVal: "TSUL · 2025-2029",
    headlineSolid: "BRIDGING LAW",
    headlineWireframe: "AND INTELLIGENCE",
    footnote:
      "*Strictly grounded in statutory compliance and empirical validation. First-year law student at TSUL and AI systems developer building production RAG & multi-agent architectures.",
    viewWorkBtn: "Inspect Evidence",
    telegramBtn: "Tahlil Channel",
    scrollHint: "SCROLL TO DISCOVER",
  },
  ru: {
    subjectLabel: "ОБЪЕКТ",
    subjectName: "Мансурхон Рустамов",
    fieldLabel: "СФЕРА",
    fieldVal: "Юриспруденция и ИИ",
    statusLabel: "СТАТУС",
    statusVal: "Открыт к сотрудничеству",
    registryLabel: "УЧЁТ",
    registryVal: "ТГЮУ · 2025-2029",
    headlineSolid: "ПРАВО И КОД",
    headlineWireframe: "ИНТЕЛЛЕКТ",
    footnote:
      "*На стыке строгого нормативного права и прикладной инженерии. Студент ТГЮУ и разработчик специализированных LegalTech RAG и когнитивных архитектур.",
    viewWorkBtn: "Смотреть улики",
    telegramBtn: "Канал «Тахлил»",
    scrollHint: "ЛИСТАЙТЕ ВНИЗ",
  },
};

export function DossierHero() {
  const { locale } = useI18n();
  const t = heroContent[locale] || heroContent.uz;

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative flex min-h-[92vh] w-full flex-col justify-between overflow-hidden bg-[#0b0a06] px-5 py-8 text-[#f2eee3] sm:px-10 lg:px-16"
    >
      {/* Ambient background spot lighting similar to Jopecuro */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 top-1/4 h-[550px] w-[550px] rounded-full bg-[radial-gradient(circle,rgba(255,81,0,0.16)_0%,transparent_65%)] blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-20 bottom-10 h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle,rgba(233,227,210,0.06)_0%,transparent_70%)] blur-2xl"
      />

      {/* Top Dossier Metadata Strip */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-y-3 border-b border-[#f2eee3]/10 pb-5 font-mono text-[11px] tracking-wider text-[#a8a29e]">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <div className="flex items-center gap-2">
            <span className="text-[#78716c]">{t.subjectLabel}</span>
            <span className="font-semibold text-[#f2eee3]">{t.subjectName}</span>
          </div>
          <div className="hidden items-center gap-2 sm:flex">
            <span className="text-[#78716c]">{t.fieldLabel}</span>
            <span className="text-[#e7e5e4]">{t.fieldVal}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[#78716c]">{t.statusLabel}</span>
            <span className="flex items-center gap-1.5 text-[#ff5100]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#ff5100] pulse-orange-dot" />
              {t.statusVal}
            </span>
          </div>
        </div>

        <div className="hidden font-mono text-[10px] text-[#78716c] md:block">
          {t.registryLabel} · {t.registryVal}
        </div>
      </div>

      {/* Monumental Headline Area */}
      <div className="relative z-10 my-auto py-12">
        <div className="space-y-1">
          <h1 className="text-left font-sans text-5xl font-black uppercase tracking-tight text-[#f2eee3] sm:text-7xl md:text-8xl lg:text-[7.25rem] lg:leading-[0.92]">
            <span>{t.headlineSolid}</span>
            <br />
            <span className="dossier-wireframe-text">{t.headlineWireframe}</span>
            <span className="font-serif italic text-[#ff5100]">*</span>
          </h1>
        </div>

        {/* Lead Footnote Quote */}
        <div className="mt-8 max-w-2xl font-serif text-sm italic leading-relaxed text-[#d6d3d1] sm:text-base">
          <p>{t.footnote}</p>
        </div>

        {/* Action Buttons */}
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <button
            onClick={() => scrollToSection("work")}
            className="group flex items-center gap-2.5 rounded-[2px] bg-[#f2eee3] px-6 py-3.5 font-mono text-xs font-bold uppercase tracking-wider text-[#0b0a06] transition-all duration-200 hover:bg-[#ff5100] hover:text-white hover:shadow-[0_0_24px_rgba(255,81,0,0.5)]"
          >
            <span>№ 04 · {t.viewWorkBtn}</span>
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
            <ArrowUpRight size={13} className="text-[#78716c]" />
          </a>
        </div>
      </div>

      {/* Bottom Bar: Circular Seal and Scroll Hint */}
      <div className="relative z-10 flex items-end justify-between border-t border-[#f2eee3]/10 pt-5">
        <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-widest text-[#78716c]">
          <span className="h-1.5 w-1.5 bg-[#ff5100]" />
          <span>TSUL STATUTORY LAB · FORENSIC LEGALTECH ARCHIVE</span>
        </div>

        {/* Scroll indicator */}
        <button
          onClick={() => scrollToSection("about")}
          className="group flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-widest text-[#a8a29e] transition hover:text-[#ff5100]"
        >
          <span>{t.scrollHint}</span>
          <ArrowDown size={12} className="transition-transform group-hover:translate-y-1" />
        </button>
      </div>
    </section>
  );
}

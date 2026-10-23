"use client";

import Image from "next/image";
import { useState } from "react";
import { useI18n } from "@/components/I18nProvider";

const aboutContent = {
  uz: {
    stamp: "№ 01",
    title: "ABOUT",
    subtitle: "The Suspect",
    metaRight: "FACTS ON FILE · RECORD 2026",
    stats: [
      { num: "07+", label: "Open-Source AI Systems" },
      { num: "04", label: "Statutory Legal Briefs" },
      { num: "01", label: "Statutory RAG (UN CRPD)" },
      { num: "2029", label: "TSUL Law Graduation (LL.B.)" },
    ],
    p1: "I am Mansurxon Rustamov — a law student at Tashkent State University of Law and an AI systems developer. My mission is bridging formal jurisprudence with neural computation to engineer ",
    redacted1: "zero-hallucination, statutory citation-grounded legal technologies",
    p1_end: " for civic access and justice.",
    p2: "Law is not merely static parchment; it is an executable civic framework. Armed with jurisprudence and modern RAG engineering, I am building specialized systems that translate statutory guarantees into ",
    redacted2: "verifiable production code, localized vector search, and hybrid RRF algorithms",
    p2_end: ".",
    exhibitStamp: "EXHIBIT A",
    exhibitCaption: "Boredom, apprehended. Tashkent, UZ.",
    clickRevealHint: "Hover or click to reveal confidential record",
  },
  en: {
    stamp: "№ 01",
    title: "ABOUT",
    subtitle: "The Suspect",
    metaRight: "FACTS ON FILE · RECORD 2026",
    stats: [
      { num: "07+", label: "Open-Source AI Systems" },
      { num: "04", label: "Statutory Legal Briefs" },
      { num: "01", label: "Statutory RAG (UN CRPD)" },
      { num: "2029", label: "TSUL Law Graduation (LL.B.)" },
    ],
    p1: "I am Mansurxon Rustamov — a law student at Tashkent State University of Law and an AI systems developer. My mission is bridging formal jurisprudence with neural computation to engineer ",
    redacted1: "zero-hallucination, statutory citation-grounded legal technologies",
    p1_end: " for civic access and justice.",
    p2: "Law is not merely static parchment; it is an executable civic framework. Armed with jurisprudence and modern RAG engineering, I am building specialized systems that translate statutory guarantees into ",
    redacted2: "verifiable production code, localized vector search, and hybrid RRF algorithms",
    p2_end: ".",
    exhibitStamp: "EXHIBIT A",
    exhibitCaption: "Boredom, apprehended. Tashkent, UZ.",
    clickRevealHint: "Hover or click to reveal confidential record",
  },
  ru: {
    stamp: "№ 01",
    title: "ABOUT",
    subtitle: "The Suspect",
    metaRight: "АРХИВНЫЕ ДАННЫЕ · 2026",
    stats: [
      { num: "07+", label: "Открытых систем ИИ" },
      { num: "04", label: "Правовых аналитических обзора" },
      { num: "01", label: "Statutory RAG (ООН CRPD)" },
      { num: "2029", label: "Степень бакалавра ТГЮУ" },
    ],
    p1: "Я — Мансурхон Рустамов, студент Ташкентского государственного юридического университета и инженер систем ИИ. Моя цель — соединить строгость права и мощь нейросетей для создания ",
    redacted1: "точных, свободных от галлюцинаций правовых технологий",
    p1_end: " во благо общества.",
    p2: "Законодательство не должно оставаться лишь текстом на бумаге. Соединяя национальные законы с ",
    redacted2: "векторной базой LanceDB и гибридным поиском RRF",
    p2_end: ", мы превращаем правовые гарантии в работающий открытый код.",
    exhibitStamp: "EXHIBIT A",
    exhibitCaption: "Boredom, apprehended. Tashkent, UZ.",
    clickRevealHint: "Нажмите или наведите, чтобы прочесть",
  },
};

export function DossierAbout() {
  const { locale } = useI18n();
  const t = aboutContent[locale] || aboutContent.en;

  const [rev1, setRev1] = useState(false);
  const [rev2, setRev2] = useState(false);

  return (
    <section
      id="about"
      className="relative w-full border-t border-[#131108]/15 bg-[#e9e3d2] px-6 py-24 text-[#131108] sm:px-12 lg:px-20"
    >
      {/* Top Header Strip */}
      <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-[#131108]/15 pb-6">
        <div className="flex items-center gap-3.5">
          <span className="dossier-stamp">{t.stamp}</span>
          <h2 className="font-sans text-3xl font-black uppercase tracking-tight text-[#131108] sm:text-4xl">
            {t.title}
          </h2>
          <span className="font-serif text-xl italic text-[#57534e] sm:text-2xl">
            {t.subtitle}
          </span>
        </div>

        <div className="font-mono text-xs uppercase tracking-widest text-[#78716c]">
          {t.metaRight}
        </div>
      </div>

      {/* Main Grid: Left Stats, Right Editorial + Photo */}
      <div className="mt-16 grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16">
        {/* Left Column: Big Numbers with Hairlines */}
        <div className="space-y-10 lg:col-span-4">
          {t.stats.map((stat, idx) => (
            <div
              key={idx}
              className="group border-b border-[#131108]/15 pb-6 transition-colors hover:border-[#ff5100]"
            >
              <div className="font-sans text-5xl font-black tracking-tight text-[#131108] transition-transform duration-300 group-hover:translate-x-1 sm:text-6xl">
                {stat.num}
              </div>
              <div className="mt-2 font-mono text-xs font-semibold uppercase tracking-wider text-[#57534e]">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Right Column: Editorial Paragraph with Redaction & Pinned Photo */}
        <div className="space-y-12 lg:col-span-8">
          <div className="space-y-8 font-sans text-2xl font-medium leading-relaxed text-[#131108] sm:text-3xl lg:text-[2.1rem] lg:leading-[1.38]">
            <p>
              {t.p1}
              <span
                onClick={() => setRev1(!rev1)}
                className={`dossier-redacted ${rev1 ? "revealed" : ""}`}
                title={t.clickRevealHint}
              >
                {t.redacted1}
              </span>
              {t.p1_end}
            </p>

            <p className="text-xl leading-relaxed text-[#44403c] sm:text-2xl">
              {t.p2}
              <span
                onClick={() => setRev2(!rev2)}
                className={`dossier-redacted ${rev2 ? "revealed" : ""}`}
                title={t.clickRevealHint}
              >
                {t.redacted2}
              </span>
              {t.p2_end}
            </p>
          </div>

          {/* Exhibit Polaroid Frame with Metal Paperclip & Stamp */}
          <div className="relative max-w-lg pt-6">
            <div className="dossier-exhibit-frame overflow-hidden p-4 shadow-2xl transition-transform duration-300 hover:rotate-[-0.5deg]">
              {/* Metallic Paperclip SVG (exact jopecuro match) */}
              <div className="absolute -top-3 left-6 z-20">
                <svg
                  width="18"
                  height="36"
                  viewBox="0 0 18 34"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-[#57534e] drop-shadow"
                >
                  <path d="M4 1h10a3 3 0 0 1 3 3v22a8 8 0 0 1-16 0V4a3 3 0 0 1 3-3Zm2 5v18a3 3 0 0 0 6 0V6"></path>
                </svg>
              </div>

              {/* Red Stamp EXHIBIT A */}
              <div className="stamp--exhibit dossier-stamp-dark border-[#dc2626] bg-[#dc2626]/10 text-[#dc2626]">
                {t.exhibitStamp}
              </div>

              {/* Photo */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#0b0a06]">
                <Image
                  src="/images/jopecuro_bag-1400.jpg"
                  alt="Boredom, apprehended"
                  fill
                  className="object-cover object-center filter transition duration-500 hover:scale-[1.02]"
                  unoptimized
                />
              </div>

              {/* Caption */}
              <div className="mt-3.5 font-serif text-xs italic text-[#57534e]">
                {t.exhibitCaption}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import { useState } from "react";
import { useI18n } from "@/components/I18nProvider";

const aboutContent = {
  uz: {
    stamp: "№ 01",
    title: "ABOUT",
    subtitle: "The Dossier",
    metaRight: "ARXIV HUJJATLARI · 2026",
    stats: [
      { num: "07+", label: "Ochiq Manbali AI Tizimlari" },
      { num: "04", label: "Tahliliy Maqola va Xulosalar" },
      { num: "01", label: "Statutory RAG (UN CRPD)" },
      { num: "2029", label: "TDYU Yurisprudensiya (LL.B.)" },
    ],
    paragraph1_lead:
      "Men Mansurxon Rustamov — Toshkent davlat yuridik universiteti talabasi va sun'iy intellekt tizimlari dasturchisiman. Mening maqsadim — davlat qonunchiligi va zamonaviy LLM arxitekturasini birlashtirish orqali ",
    redacted1: "gallyutsinatsiyalarsiz, 100% dalillarga asoslangan adolatli texnologiyalar",
    paragraph1_trail: " yaratish.",
    paragraph2_lead:
      "Huquq faqat qog'ozda qolib ketmasligi kerak; u amaliyotda ishlaydigan tizimdir. Biz milliy qonunchilik korpusini ",
    redacted2: "LanceDB vektorli qidiruv va gibrid RRF algoritmlari",
    paragraph2_trail:
      " bilan birlashtirib, har bir inson huquqini himoya qiluvchi tahliliy dasturlarni kodga aylantiramiz.",
    exhibitStamp: "EXHIBIT A · SHAXS",
    exhibitCaption: "Mansurxon Rustamov · TDYU Huquq Talabasi & AI Muhandisi",
    clickRevealHint: "Qora chiziq ustiga bosing — matn ochiladi",
  },
  en: {
    stamp: "№ 01",
    title: "ABOUT",
    subtitle: "The Dossier",
    metaRight: "FACTS ON FILE · 2026",
    stats: [
      { num: "07+", label: "Open-Source AI Architectures" },
      { num: "04", label: "Statutory Analytical Briefs" },
      { num: "01", label: "Hybrid Legal RAG (UN CRPD)" },
      { num: "2029", label: "TSUL Law Degree (LL.B.)" },
    ],
    paragraph1_lead:
      "I am Mansurxon Rustamov — a law student at Tashkent State University of Law and an AI systems developer. My mission is synthesizing formal statutory jurisprudence with neural computation to engineer ",
    redacted1: "zero-hallucination, verified citation-grounded legal technologies",
    paragraph1_trail: ".",
    paragraph2_lead:
      "Law is not merely static parchment; it is an executable civic framework. By combining national statutory corpora with ",
    redacted2: "LanceDB localized vector indexing and hybrid RRF algorithms",
    paragraph2_trail:
      ", we translate statutory guarantees into verifiable production code.",
    exhibitStamp: "EXHIBIT A · SUBJECT",
    exhibitCaption: "Mansurxon Rustamov · TSUL Law Student & AI Engineer",
    clickRevealHint: "Hover or click redacted bar to reveal",
  },
  ru: {
    stamp: "№ 01",
    title: "ABOUT",
    subtitle: "The Dossier",
    metaRight: "АРХИВНЫЕ ДАННЫЕ · 2026",
    stats: [
      { num: "07+", label: "Открытых архитектур ИИ" },
      { num: "04", label: "Аналитических обзора права" },
      { num: "01", label: "Statutory RAG (ООН CRPD)" },
      { num: "2029", label: "Диплом юриста ТГЮУ (LL.B.)" },
    ],
    paragraph1_lead:
      "Я — Мансурхон Рустамов, студент Ташкентского государственного юридического университета и AI-инженер. Моя цель — объединение строгости законодательства с нейронными архитектурами для создания ",
    redacted1: "точных, свободных от галлюцинаций правовых технологий",
    paragraph1_trail: ".",
    paragraph2_lead:
      "Правовые нормы должны быть практически применимы. Соединяя национальные законы с ",
    redacted2: "векторной базой LanceDB и гибридным поиском RRF",
    paragraph2_trail:
      ", мы превращаем законодательные гарантии в работающий открытый код.",
    exhibitStamp: "EXHIBIT A · ОБЪЕКТ",
    exhibitCaption: "Мансурхон Рустамов · Студент ТГЮУ и AI-инженер",
    clickRevealHint: "Нажмите на чёрную полосу, чтобы прочитать",
  },
};

export function DossierAbout() {
  const { locale } = useI18n();
  const t = aboutContent[locale] || aboutContent.uz;

  const [revealed1, setRevealed1] = useState(false);
  const [revealed2, setRevealed2] = useState(false);

  return (
    <section
      id="about"
      className="relative w-full border-t border-[#131108]/10 bg-[#e9e3d2] px-5 py-20 text-[#131108] sm:px-10 lg:px-16"
    >
      {/* Top Header Strip */}
      <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-[#131108]/15 pb-6">
        <div className="flex items-center gap-3">
          <span className="dossier-stamp">{t.stamp}</span>
          <h2 className="font-sans text-2xl font-black uppercase tracking-tight text-[#131108] sm:text-3xl">
            {t.title}
          </h2>
          <span className="font-serif text-lg italic text-[#57534e] sm:text-xl">
            {t.subtitle}
          </span>
        </div>

        <div className="font-mono text-xs uppercase tracking-widest text-[#78716c]">
          {t.metaRight}
        </div>
      </div>

      {/* Main Grid: Left Stats, Right Editorial + Photo */}
      <div className="mt-14 grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16">
        {/* Left Column: Big Numbers (4 cols) */}
        <div className="space-y-8 lg:col-span-4">
          {t.stats.map((stat, idx) => (
            <div
              key={idx}
              className="group border-b border-[#131108]/15 pb-6 transition-colors hover:border-[#ff5100]"
            >
              <div className="font-sans text-4xl font-black tracking-tight text-[#131108] transition-transform duration-300 group-hover:translate-x-1 sm:text-5xl">
                {stat.num}
              </div>
              <div className="mt-1 font-mono text-xs font-semibold uppercase tracking-wider text-[#57534e]">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Right Column: Editorial Paragraph with Redaction & Pinned Photo (8 cols) */}
        <div className="space-y-10 lg:col-span-8">
          <div className="space-y-6 font-sans text-xl font-medium leading-relaxed text-[#131108] sm:text-2xl md:leading-normal">
            <p>
              {t.paragraph1_lead}
              <span
                onClick={() => setRevealed1(!revealed1)}
                className={`dossier-redacted ${revealed1 ? "revealed" : ""}`}
                title={t.clickRevealHint}
              >
                {t.redacted1}
              </span>
              {t.paragraph1_trail}
            </p>

            <p className="text-lg text-[#44403c] sm:text-xl">
              {t.paragraph2_lead}
              <span
                onClick={() => setRevealed2(!revealed2)}
                className={`dossier-redacted ${revealed2 ? "revealed" : ""}`}
                title={t.clickRevealHint}
              >
                {t.redacted2}
              </span>
              {t.paragraph2_trail}
            </p>
          </div>

          {/* Exhibit Polaroid Frame with Metal Paperclip */}
          <div className="relative max-w-md pt-4">
            <div className="dossier-exhibit-frame overflow-hidden p-3 transition-transform duration-300 hover:rotate-[-0.5deg]">
              {/* Paperclip */}
              <div className="dossier-paperclip" />

              {/* Red Stamp */}
              <div className="absolute right-4 top-4 z-10 border border-[#dc2626] bg-[#dc2626]/10 px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-widest text-[#dc2626] shadow-sm">
                {t.exhibitStamp}
              </div>

              {/* Photo */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#e9e3d2]">
                <Image
                  src="/images/avatar.jpg"
                  alt="Mansurxon Rustamov"
                  fill
                  className="object-cover object-top grayscale filter transition duration-500 hover:grayscale-0"
                />
              </div>

              {/* Caption */}
              <div className="mt-3 font-serif text-xs italic text-[#57534e]">
                {t.exhibitCaption}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

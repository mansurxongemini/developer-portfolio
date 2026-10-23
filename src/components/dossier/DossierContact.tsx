"use client";

import { useI18n } from "@/components/I18nProvider";
import { Send, Github, Mail, ArrowUpRight, ShieldCheck } from "lucide-react";

const contactCopy = {
  uz: {
    stamp: "№ 06",
    title: "CONTACT",
    subtitle: "Direct Dialogue",
    metaRight: "ALOQA KANALLARI · TOSHKENT",
    headlineSolid: "HAMKORLIKNI",
    headlineWireframe: "BOSHLAYMIZ",
    footnote:
      "*Yurisprudensiya, sun'iy intellekt, yangi tadqiqotlar va LegalTech loyihalar bo'yicha har qanday taklif va mulohazalar uchun ochiqman.",
    telegramTitle: "Telegram Tahlil Kanali",
    telegramDesc: "Qonunchilik, AI va jamiyat tahlillari berib boriladigan asosiy kanal",
    telegramAction: "Kanalga obuna bo'lish",
    githubTitle: "GitHub Repozitoriyasi",
    githubDesc: "Barcha 7 ta ochiq manbali loyihalar kodi va arxitekturalari",
    githubAction: "Kodni ko'rish",
    emailTitle: "To'g'ridan-to'g'ri Maktub",
    emailDesc: "Rasmiy takliflar, ilmiy hamkorlik va savollar uchun",
    emailAction: "Maktub yozish",
    footerText: "MANSURXON RUSTAMOV · TDYU HUQUQSHUNOSLIK VA AI TIZIMLARI · 2026",
  },
  en: {
    stamp: "№ 06",
    title: "CONTACT",
    subtitle: "Direct Dialogue",
    metaRight: "DIRECT CHANNELS · TASHKENT",
    headlineSolid: "INITIATE",
    headlineWireframe: "THE DIALOGUE",
    footnote:
      "*Open for academic initiatives, statutory RAG implementations, and innovative LegalTech research.",
    telegramTitle: "Tahlil Telegram Channel",
    telegramDesc: "Analytical dispatches on law, technology, and civic structures",
    telegramAction: "Join Channel",
    githubTitle: "GitHub Codebase",
    githubDesc: "Public repositories and verifiable engineering architectures",
    githubAction: "View Code",
    emailTitle: "Direct Inquiries",
    emailDesc: "Academic partnerships, technical inquiries, and correspondence",
    emailAction: "Send Email",
    footerText: "MANSURXON RUSTAMOV · TSUL JURISPRUDENCE & AI ARCHITECTURES · 2026",
  },
  ru: {
    stamp: "№ 06",
    title: "CONTACT",
    subtitle: "Direct Dialogue",
    metaRight: "ПРЯМЫЕ КАНАЛЫ · ТАШКЕНТ",
    headlineSolid: "НАЧНЁМ",
    headlineWireframe: "ДИАЛОГ",
    footnote:
      "*Открыт к исследовательским инициативам, внедрению систем LegalTech RAG и академическому сотрудничеству.",
    telegramTitle: "Telegram-канал «Тахлил»",
    telegramDesc: "Регулярная аналитика на стыке права, искусственного интеллекта и общества",
    telegramAction: "Подписаться",
    githubTitle: "GitHub Репозиторий",
    githubDesc: "Открытый исходный код всех 7 инженерных систем",
    githubAction: "Смотреть код",
    emailTitle: "Прямая Почта",
    emailDesc: "Для академических предложений и официальных обращений",
    emailAction: "Написать",
    footerText: "МАНСУРХОН РУСТАМОВ · ПРАВО И АРХИТЕКТУРЫ ИИ ТГЮУ · 2026",
  },
};

export function DossierContact() {
  const { locale } = useI18n();
  const copy = contactCopy[locale] || contactCopy.uz;

  return (
    <section
      id="contact"
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

      {/* Monumental Headline Area */}
      <div className="my-16 max-w-4xl space-y-4">
        <h2 className="font-sans text-4xl font-black uppercase tracking-tight text-[#f2eee3] sm:text-6xl md:text-7xl lg:text-8xl">
          <span>{copy.headlineSolid}</span>{" "}
          <span className="dossier-wireframe-text">{copy.headlineWireframe}</span>
          <span className="font-serif italic text-[#ff5100]">*</span>
        </h2>
        <p className="font-serif text-sm italic leading-relaxed text-[#d6d3d1] sm:text-base">
          {copy.footnote}
        </p>
      </div>

      {/* 3 Interactive Contact Dossier Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Telegram Card */}
        <a
          href="https://t.me/+OWASsFa4TGg2MWYy"
          target="_blank"
          rel="noreferrer"
          className="group flex flex-col justify-between rounded-[2px] border border-[#f2eee3]/15 bg-[#131108] p-6 transition-all duration-300 hover:border-[#ff5100] hover:shadow-[0_0_24px_rgba(255,81,0,0.15)] hover:-translate-y-1"
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="flex h-9 w-9 items-center justify-center rounded-[2px] bg-[#ff5100]/15 text-[#ff5100]">
                <Send size={18} />
              </span>
              <ArrowUpRight size={16} className="text-[#78716c] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#ff5100]" />
            </div>
            <h3 className="font-sans text-lg font-bold text-[#f2eee3]">
              {copy.telegramTitle}
            </h3>
            <p className="text-xs text-[#a8a29e] leading-relaxed">
              {copy.telegramDesc}
            </p>
          </div>
          <div className="mt-6 font-mono text-xs font-semibold uppercase tracking-wider text-[#ff5100]">
            {copy.telegramAction} →
          </div>
        </a>

        {/* GitHub Card */}
        <a
          href="https://github.com/mansurxongemini"
          target="_blank"
          rel="noreferrer"
          className="group flex flex-col justify-between rounded-[2px] border border-[#f2eee3]/15 bg-[#131108] p-6 transition-all duration-300 hover:border-[#ff5100] hover:shadow-[0_0_24px_rgba(255,81,0,0.15)] hover:-translate-y-1"
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="flex h-9 w-9 items-center justify-center rounded-[2px] bg-white/10 text-[#f2eee3]">
                <Github size={18} />
              </span>
              <ArrowUpRight size={16} className="text-[#78716c] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#ff5100]" />
            </div>
            <h3 className="font-sans text-lg font-bold text-[#f2eee3]">
              {copy.githubTitle}
            </h3>
            <p className="text-xs text-[#a8a29e] leading-relaxed">
              {copy.githubDesc}
            </p>
          </div>
          <div className="mt-6 font-mono text-xs font-semibold uppercase tracking-wider text-[#e7e5e4] group-hover:text-[#ff5100]">
            {copy.githubAction} →
          </div>
        </a>

        {/* Email Card */}
        <a
          href="mailto:contact@mansurxon.dev"
          className="group flex flex-col justify-between rounded-[2px] border border-[#f2eee3]/15 bg-[#131108] p-6 transition-all duration-300 hover:border-[#ff5100] hover:shadow-[0_0_24px_rgba(255,81,0,0.15)] hover:-translate-y-1"
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="flex h-9 w-9 items-center justify-center rounded-[2px] bg-white/10 text-[#f2eee3]">
                <Mail size={18} />
              </span>
              <ArrowUpRight size={16} className="text-[#78716c] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#ff5100]" />
            </div>
            <h3 className="font-sans text-lg font-bold text-[#f2eee3]">
              {copy.emailTitle}
            </h3>
            <p className="text-xs text-[#a8a29e] leading-relaxed">
              {copy.emailDesc}
            </p>
          </div>
          <div className="mt-6 font-mono text-xs font-semibold uppercase tracking-wider text-[#e7e5e4] group-hover:text-[#ff5100]">
            {copy.emailAction} →
          </div>
        </a>
      </div>

      {/* Bottom Footer Seal */}
      <div className="mt-20 border-t border-[#f2eee3]/10 pt-8 text-center font-mono text-[10px] tracking-widest text-[#78716c]">
        {copy.footerText}
      </div>
    </section>
  );
}

"use client";

import { ArrowUpRight, Send } from "lucide-react";
import { Prose } from "@/components/ui/prose";
import { useI18n } from "@/components/I18nProvider";
import enMessages from "../../messages/en.json";
import ruMessages from "../../messages/ru.json";
import uzMessages from "../../messages/uz.json";

type FeaturedWorksLocaleMessages = {
  featuredWorks: {
    featured_endeavors: string;
    featured_heading: string;
    startup_spotlight: string;
    alloma_title: string;
    alloma_desc: string;
    view_project_btn: string;
    channel_spotlight: string;
    tahlil_title: string;
    tahlil_desc: string;
    join_channel: string;
  };
};

const messagesByLocale: Record<"uz" | "en" | "ru", FeaturedWorksLocaleMessages> = {
  uz: uzMessages as FeaturedWorksLocaleMessages,
  en: enMessages as FeaturedWorksLocaleMessages,
  ru: ruMessages as FeaturedWorksLocaleMessages,
};

export function FeaturedWorks() {
  const { locale } = useI18n();
  const t = messagesByLocale[locale].featuredWorks;

  return (
    <section className="relative w-full">
      <div className="mb-8 flex items-end justify-between gap-4">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-amber-900">{t.featured_endeavors}</p>
          <h2 className="text-2xl font-bold tracking-tight text-[#1C1917] md:text-3xl">
            {t.featured_heading}
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
        <article className="group relative overflow-hidden rounded-2xl border border-[#E7E5E4] bg-white p-6 shadow-[0_4px_24px_rgba(44,38,30,0.04)] transition-all duration-300 hover:border-amber-400/50 hover:shadow-[0_12px_36px_rgba(44,38,30,0.08)] lg:col-span-8 lg:p-8">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_100%_at_0%_0%,rgba(245,158,11,0.05),transparent_46%)] opacity-80"
          />

          <div className="relative z-10 flex h-full flex-col justify-between gap-7">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-800">{t.startup_spotlight}</p>
              <h3 className="text-3xl font-bold tracking-tight text-[#1C1917] md:text-4xl">{t.alloma_title}</h3>
            </div>

            <Prose compact className="prose-p:text-[#57534E] prose-strong:text-[#1C1917]">
              <p>{t.alloma_desc}</p>
            </Prose>

            <div>
              <a
                href="/work"
                className="inline-flex items-center gap-2 rounded-xl border border-amber-600/30 bg-amber-600/[0.08] px-4 py-2.5 text-sm font-semibold text-amber-950 transition hover:border-amber-600/60 hover:bg-amber-600/[0.16] hover:shadow-[0_2px_12px_rgba(217,119,6,0.12)]"
              >
                <span>{t.view_project_btn}</span>
                <ArrowUpRight size={16} />
              </a>
            </div>
          </div>
        </article>

        <article className="group relative overflow-hidden rounded-2xl border border-[#E7E5E4] bg-[#FBF9F5] p-6 shadow-[0_4px_24px_rgba(44,38,30,0.03)] transition-all duration-300 hover:border-amber-400/40 hover:shadow-[0_12px_32px_rgba(44,38,30,0.06)] lg:col-span-4 lg:p-7">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-800">{t.channel_spotlight}</p>
            <h3 className="text-2xl font-bold tracking-tight text-[#1C1917]">{t.tahlil_title}</h3>
          </div>

          <div className="mt-5">
            <Prose compact className="prose-p:text-[#57534E]">
              <p>{t.tahlil_desc}</p>
            </Prose>
          </div>

          <div className="mt-7">
            <a
              href="https://t.me/+OWASsFa4TGg2MWYy"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-[#D6D3D1] bg-white px-4 py-2.5 text-sm font-medium text-[#44403C] shadow-sm transition hover:border-amber-600/40 hover:bg-[#F7F5F0] hover:text-[#1C1917]"
            >
              <Send size={15} />
              <span>{t.join_channel}</span>
            </a>
          </div>
        </article>
      </div>
    </section>
  );
}

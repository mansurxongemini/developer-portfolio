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
          <p className="text-xs uppercase tracking-[0.22em] text-cyan-200/75">{t.featured_endeavors}</p>
          <h2 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">
            {t.featured_heading}
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        <article className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-cyan-500/10 via-slate-950 to-slate-900 p-6 shadow-halo backdrop-blur-xl transition duration-300 hover:border-cyan-200/30 hover:shadow-glow lg:col-span-8 lg:p-8">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_100%_at_0%_0%,rgba(103,232,249,0.2),transparent_46%)] opacity-80"
          />

          <div className="relative z-10 flex h-full flex-col justify-between gap-7">
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.18em] text-cyan-200/80">{t.startup_spotlight}</p>
              <h3 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">{t.alloma_title}</h3>
            </div>

            <Prose compact className="prose-p:text-gray-200/90 prose-strong:text-cyan-100">
              <p>{t.alloma_desc}</p>
            </Prose>

            <div>
              <a
                href="/work"
                className="inline-flex items-center gap-2 rounded-xl border border-cyan-200/30 bg-cyan-200/10 px-4 py-2.5 text-sm font-medium text-cyan-50 transition hover:border-cyan-100/50 hover:bg-cyan-200/20"
              >
                <span>{t.view_project_btn}</span>
                <ArrowUpRight size={16} />
              </a>
            </div>
          </div>
        </article>

        <article className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.08] to-white/[0.02] p-6 shadow-halo backdrop-blur-xl transition duration-300 hover:border-sky-200/30 hover:shadow-glow lg:col-span-4 lg:p-7">
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.18em] text-sky-200/80">{t.channel_spotlight}</p>
            <h3 className="text-2xl font-semibold tracking-tight text-white">{t.tahlil_title}</h3>
          </div>

          <div className="mt-5">
            <Prose compact className="prose-p:text-gray-300/90">
              <p>{t.tahlil_desc}</p>
            </Prose>
          </div>

          <div className="mt-7">
            <a
              href="https://t.me/+OWASsFa4TGg2MWYy"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-4 py-2.5 text-sm font-medium text-white transition hover:border-sky-200/45 hover:bg-sky-200/10"
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

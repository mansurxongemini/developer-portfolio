"use client";

import Link from "next/link";
import Image from "next/image";
import type { PublicArticle } from "@/lib/blog-types";
import type { Locale } from "@/components/I18nProvider";
import { blogLabels } from "@/lib/blog-types";
import { Calendar, Clock } from "lucide-react";

interface ArticleCardProps {
  article: PublicArticle;
  locale: Locale;
}

export function ArticleCard({ article, locale }: ArticleCardProps) {
  const labels = blogLabels[locale];
  const coverImage = article.image?.trim() || "";

  return (
    <Link
      href={`/${locale}/blog/${article.slug}`}
      className="group block rounded-2xl border border-white/5 bg-white/[0.02] p-5
                 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] backdrop-blur-md
                 transition-all duration-300 ease-out
                 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.04]"
    >
      <div className="relative mb-5 aspect-video overflow-hidden rounded-xl border border-white/5 bg-zinc-950">
        {coverImage ? (
          <Image
            src={coverImage}
            alt={article.title}
            fill
            quality={90}
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
        ) : (
          <div aria-hidden className="h-full w-full bg-zinc-950" />
        )}
      </div>

      <span
        className="mb-4 inline-flex min-h-8 items-center rounded-full border border-white/10 bg-white/[0.02] px-3 text-[11px] font-medium uppercase tracking-[0.16em] text-zinc-400"
      >
        {article.category}
      </span>

      <h3
        className="mb-3 text-xl font-semibold tracking-tighter leading-tight text-white
                   line-clamp-2"
      >
        {article.title}
      </h3>

      <p className="mb-5 text-sm leading-relaxed text-zinc-400 line-clamp-3">
        {article.excerpt}
      </p>

      <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-500">
        <span className="flex items-center gap-1">
          <Clock size={13} />
          {article.readingTime} {labels.minRead}
        </span>
        <span className="flex items-center gap-1">
          <Calendar size={13} />
          {new Date(article.publishedAt).toLocaleDateString(
            locale === "uz" ? "uz-UZ" : locale === "ru" ? "ru-RU" : "en-US",
            { year: "numeric", month: "short", day: "numeric" }
          )}
        </span>
      </div>
    </Link>
  );
}

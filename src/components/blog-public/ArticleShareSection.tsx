"use client";

import type { Locale } from "@/components/I18nProvider";
import { blogLabels } from "@/lib/blog-types";
import { Share2 } from "lucide-react";

interface ArticleShareSectionProps {
  title: string;
  locale: Locale;
  slug: string;
}

export function ArticleShareSection({ title, locale, slug }: ArticleShareSectionProps) {
  const labels = blogLabels[locale];
  const pageUrl = typeof window !== "undefined" ? window.location.href : "";
  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(pageUrl);

  const channels = [
    {
      name: "Telegram",
      href: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
      color: "hover:text-sky-400",
    },
    {
      name: "LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      color: "hover:text-blue-400",
    },
    {
      name: "X (Twitter)",
      href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
      color: "hover:text-white",
    },
  ];

  return (
    <div className="mt-12 border-t border-white/[0.08] pt-8">
      <div className="flex items-center gap-3 mb-4">
        <Share2 size={18} className="text-white/50" />
        <span className="text-sm font-semibold text-white/60">{labels.share}</span>
      </div>
      <div className="flex gap-3">
        {channels.map((ch) => (
          <a
            key={ch.name}
            href={ch.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`rounded-xl border border-white/[0.08] bg-white/[0.04] px-5 py-2.5
                        text-sm text-white/60 transition-all duration-200
                        hover:border-white/[0.14] hover:bg-white/[0.08] ${ch.color}`}
          >
            {ch.name}
          </a>
        ))}
      </div>
    </div>
  );
}

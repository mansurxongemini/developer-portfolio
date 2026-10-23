"use client";

import type { Locale } from "@/components/I18nProvider";
import { blogLabels } from "@/lib/blog-types";

interface ArticleShareSectionProps {
  title: string;
  locale: Locale;
  slug: string;
}

export function ArticleShareSection({ title, locale, slug }: ArticleShareSectionProps) {
  const labels = blogLabels[locale];
  const pageUrl = typeof window !== "undefined" ? window.location.href : `/${locale}/blog/${slug}`;
  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(pageUrl);

  void slug;

  return (
    <div className="post__share">
      <span className="font-mono">{labels.share}:</span>
      <a
        className="post__share-btn font-mono"
        href={`https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        Telegram ↗
      </a>
      <a
        className="post__share-btn font-mono"
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        LinkedIn ↗
      </a>
      <a
        className="post__share-btn font-mono"
        href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        X ↗
      </a>
    </div>
  );
}

"use client";

import Image from "next/image";
import { useState } from "react";
import { useI18n } from "@/components/I18nProvider";
import { baseURL } from "@/resources";
import { formatDate } from "@/utils/formatDate";

interface BlogPostContentProps {
  post: {
    slug: string;
    content: string;
    metadata: {
      title: string;
      summary: string;
      publishedAt: string;
      subtitle?: string;
      image?: string;
      team?: Array<{ name: string; avatar: string; linkedIn?: string }>;
    };
  };
  article: React.ReactNode;
  recentPosts: React.ReactNode;
}

const copy = {
  uz: {
    back: "← Maqolalar",
    file: "Maqola",
    by: "Mansurxon Rustamov",
    next: "Keyingi maqola",
    all: "Barcha maqolalar →",
    share: "Ulashish",
    copied: "Nusxalandi ✓",
    copyLink: "Havolani nusxalash",
  },
  en: {
    back: "← Articles",
    file: "Article",
    by: "Mansurxon Rustamov",
    next: "Next article",
    all: "All articles →",
    share: "Share",
    copied: "Copied ✓",
    copyLink: "Copy link",
  },
  ru: {
    back: "← Статьи",
    file: "Статья",
    by: "Мансурхон Рустамов",
    next: "Следующая статья",
    all: "Все статьи →",
    share: "Поделиться",
    copied: "Скопировано ✓",
    copyLink: "Скопировать ссылку",
  },
};

export function BlogPostContent({ post, article, recentPosts }: BlogPostContentProps) {
  const { locale } = useI18n();
  const t = copy[locale] || copy.en;
  const [copied, setCopied] = useState(false);
  const url = `${baseURL}/blog/${post.slug}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <article className="sec post-page" data-theme-trigger="bone">
      <div className="post__col">
        <a href="/blog" className="case__back font-mono">
          {t.back}
        </a>

        <p className="case__file">
          {t.file} · {formatDate(post.metadata.publishedAt, false)}
        </p>

        <h1 className="case__title case__title--post">
          <span data-redact data-redact-mode="title">
            {post.metadata.title}
          </span>
        </h1>

        <p className="post__byline font-mono">
          {t.by} · {formatDate(post.metadata.publishedAt, false)}
        </p>

        {post.metadata.image ? (
          <figure className="case__key frame" data-img-reveal>
            <Image
              src={post.metadata.image}
              alt={post.metadata.title}
              width={1200}
              height={675}
              priority
              sizes="(max-width: 900px) 92vw, 44rem"
            />
          </figure>
        ) : null}

        {article}

        <div className="post__share">
          <span className="font-mono">{t.share}:</span>
          <button
            type="button"
            onClick={handleCopy}
            className="post__share-btn font-mono"
            data-cursor="Nusxa"
          >
            {copied ? t.copied : t.copyLink}
          </button>
          <a
            className="post__share-btn font-mono"
            href={`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(post.metadata.title)}`}
            target="_blank"
            rel="noreferrer"
          >
            Telegram ↗
          </a>
        </div>

        <div className="post__next">
          <p className="case__next-label">{t.next}</p>
          <div className="briefs__list">{recentPosts}</div>
          <a href="/blog" className="briefs__all">
            {t.all}
          </a>
        </div>
      </div>
    </article>
  );
}

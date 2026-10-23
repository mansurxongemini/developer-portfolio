"use client";

import Image from "next/image";
import { useI18n } from "@/components/I18nProvider";
import { formatDate } from "@/utils/formatDate";

interface WorkProjectContentProps {
  post: {
    slug: string;
    content: string;
    metadata: {
      title: string;
      summary: string;
      publishedAt: string;
      images: string[];
      link?: string;
      team?: Array<{ name: string; avatar: string; linkedIn?: string }>;
    };
  };
  article: React.ReactNode;
  relatedProjects: React.ReactNode;
}

const copy = {
  uz: {
    back: "← Loyihalar",
    file: "Loyiha",
    field: "Yo'nalish",
    stack: "Texnologiya",
    year: "Yil",
    link: "Havola",
    open: "Ochish ↗",
    related: "Keyingi loyiha",
  },
  en: {
    back: "← Projects",
    file: "Project",
    field: "Field",
    stack: "Stack",
    year: "Year",
    link: "Link",
    open: "Open ↗",
    related: "Next project",
  },
  ru: {
    back: "← Проекты",
    file: "Проект",
    field: "Область",
    stack: "Стек",
    year: "Год",
    link: "Ссылка",
    open: "Открыть ↗",
    related: "Следующий проект",
  },
};

function shortLede(summary: string): string {
  const s = (summary || "").trim();
  if (s.length <= 160) return s;
  return `${s.slice(0, 157).trimEnd()}…`;
}

export function WorkProjectContent({
  post,
  article,
  relatedProjects,
}: WorkProjectContentProps) {
  const { locale } = useI18n();
  const t = copy[locale] || copy.en;
  const cover = post.metadata.images[0] || "";
  const year = post.metadata.publishedAt
    ? new Date(post.metadata.publishedAt).getFullYear()
    : "—";

  return (
    <article className="sec case-page" data-theme-trigger="bone">
      <div className="case__sheet">
        <a href="/work" className="case__back font-mono">
          {t.back}
        </a>

        <p className="case__file">
          {t.file}
          <span className="stamp stamp--opened" data-stamp aria-hidden="true">
            {year}
          </span>
        </p>

        <h1 className="case__title">
          <span data-redact data-redact-mode="title">
            {post.metadata.title}
          </span>
        </h1>

        <p className="case__lede">{shortLede(post.metadata.summary)}</p>

        {cover ? (
          <figure className="case__key frame" data-img-reveal data-cursor="Asosiy">
            <Image
              src={cover}
              alt={post.metadata.title}
              width={1200}
              height={675}
              priority
              sizes="(max-width: 900px) 92vw, 52rem"
            />
            <figcaption className="marginalia">
              {post.metadata.publishedAt
                ? formatDate(post.metadata.publishedAt)
                : ""}
            </figcaption>
          </figure>
        ) : null}

        <dl className="case__meta">
          <div>
            <dt>{t.field}</dt>
            <dd>{post.slug}</dd>
          </div>
          <div>
            <dt>{t.year}</dt>
            <dd>{year}</dd>
          </div>
          {post.metadata.link ? (
            <div>
              <dt>{t.link}</dt>
              <dd>
                <a href={post.metadata.link} target="_blank" rel="noreferrer">
                  {t.open}
                </a>
              </dd>
            </div>
          ) : null}
        </dl>

        {article}

        <div className="case__next">
          <p className="case__next-label">{t.related}</p>
          {relatedProjects}
        </div>
      </div>
    </article>
  );
}

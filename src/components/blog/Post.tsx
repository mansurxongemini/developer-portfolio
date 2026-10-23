"use client";

import { formatDate } from "@/utils/formatDate";

interface PostProps {
  post: {
    slug: string;
    metadata: {
      image?: string;
      title: string;
      publishedAt: string;
      summary?: string;
      tag?: string;
    };
  };
  thumbnail?: boolean;
  direction?: "row" | "column";
  index?: number;
}

export default function Post({ post, index = 0 }: PostProps) {
  const num = String(index + 1).padStart(2, "0");

  return (
    <a
      href={`/blog/${post.slug}`}
      className="brief-row"
      data-preview={post.metadata.image || undefined}
      data-cursor="O'qish"
      aria-label={post.metadata.title}
    >
      <span className="brief-row__index font-mono">{num}</span>
      <span className="brief-row__title font-display">
        {post.metadata.title}
        {post.metadata.tag ? (
          <span className="brief-row__tag font-mono"> · {post.metadata.tag}</span>
        ) : null}
      </span>
      <span className="brief-row__date font-mono">
        {formatDate(post.metadata.publishedAt, false)}
      </span>
      <span className="brief-row__arrow" aria-hidden="true">
        →
      </span>
    </a>
  );
}

"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface MarkdownRendererProps {
  content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <article className="prose prose-invert lg:prose-xl mx-auto prose-headings:text-white/90 prose-p:text-white/70 prose-a:text-cyan-400 prose-strong:text-white/90 prose-code:text-cyan-300 prose-blockquote:border-cyan-400/30 prose-blockquote:text-white/60 prose-th:text-white/80 prose-td:text-white/60 prose-li:text-white/70">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </article>
  );
}

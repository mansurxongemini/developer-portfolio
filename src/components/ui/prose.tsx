import type { HTMLAttributes, PropsWithChildren } from "react";

type ProseProps = PropsWithChildren<
  HTMLAttributes<HTMLDivElement> & {
    compact?: boolean;
  }
>;

export function Prose({ children, className = "", compact = false, ...props }: ProseProps) {
  return (
    <div
      className={[
        "prose prose-invert max-w-none",
        "prose-p:text-gray-300 prose-p:leading-relaxed",
        "prose-headings:font-semibold prose-headings:tracking-tight",
        "prose-h1:text-white prose-h2:text-gray-100 prose-h3:text-gray-200",
        "prose-h1:mb-4 prose-h2:mt-10 prose-h2:mb-3 prose-h3:mt-8 prose-h3:mb-2",
        "prose-a:text-cyan-300 hover:prose-a:text-cyan-200 prose-a:no-underline",
        "prose-strong:text-gray-100",
        "prose-code:text-cyan-200 prose-code:before:content-none prose-code:after:content-none",
        "prose-pre:bg-slate-900 prose-pre:border prose-pre:border-slate-700",
        "prose-li:text-gray-300 marker:text-slate-500",
        "prose-hr:border-slate-700",
        "prose-blockquote:my-8 prose-blockquote:border-l-4 prose-blockquote:border-cyan-500/70",
        "prose-blockquote:pl-5 prose-blockquote:italic prose-blockquote:text-gray-200",
        "prose-blockquote:bg-slate-900/40 prose-blockquote:py-2 prose-blockquote:pr-2",
        compact ? "prose-sm md:prose-base" : "prose-base md:prose-lg",
        className,
      ].join(" ")}
      {...props}
    >
      {children}
    </div>
  );
}

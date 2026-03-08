"use client";

import { Column } from "@once-ui-system/core";
import { useI18n } from "@/components/I18nProvider";
import { Mailchimp } from "@/components";

interface BlogContentProps {
  postsFirst: React.ReactNode;
  postsMiddle: React.ReactNode;
  postsLater: React.ReactNode;
}

export function BlogContent({ postsFirst, postsMiddle, postsLater }: BlogContentProps) {
  const { content } = useI18n();
  const { blog } = content;

  return (
    <Column maxWidth="m" paddingTop="24">
      {/* Page header */}
      <div className="mb-12 px-1">
        <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
          {blog.title}
        </h1>
        {blog.description && (
          <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-white/45">
            {blog.description}
          </p>
        )}
      </div>

      {/* Featured post */}
      <div className="mb-8">
        {postsFirst}
      </div>

      {/* Middle posts */}
      <div className="mb-12">
        {postsMiddle}
      </div>

      <Mailchimp marginBottom="l" />

      {/* Earlier posts */}
      <div className="mb-16">
        <h2 className="mb-6 px-1 text-xl font-semibold tracking-tight text-white/80">
          {content.ui.earlier_posts}
        </h2>
        {postsLater}
      </div>
    </Column>
  );
}

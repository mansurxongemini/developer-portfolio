"use client";

import { Column } from "@once-ui-system/core";
import { useI18n } from "@/components/I18nProvider";

interface WorkContentProps {
  projects: React.ReactNode;
}

export function WorkContent({ projects }: WorkContentProps) {
  const { content } = useI18n();
  const { work } = content;

  return (
    <Column maxWidth="m" paddingTop="24">
      <div className="mb-10 px-1">
        <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
          {work.title}
        </h1>
        {work.description && (
          <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-white/45">
            {work.description}
          </p>
        )}
      </div>
      {projects}
    </Column>
  );
}

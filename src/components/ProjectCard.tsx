"use client";

import Image from "next/image";
import Link from "next/link";
import {
  AvatarGroup,
  Column,
} from "@once-ui-system/core";
import { useI18n } from "@/components/I18nProvider";

interface ProjectCardProps {
  href: string;
  priority?: boolean;
  images: string[];
  imageUrl?: string;
  title: string;
  content: string;
  description: string;
  avatars: { src: string }[];
  link: string;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  href,
  images = [],
  imageUrl,
  title,
  content,
  description,
  avatars,
  link,
}) => {
  const { content: i18nContent } = useI18n();
  const coverImage = imageUrl || images[0] || "";

  return (
    <Column fillWidth>
      <article className="group overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] backdrop-blur-md transition-all duration-300 ease-out hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.04]">
        <div className="relative aspect-[16/9] w-full overflow-hidden border-b border-white/5 bg-zinc-950">
          {coverImage ? (
            <Image
              src={coverImage}
              alt={title}
              fill
              quality={90}
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          ) : (
            <div aria-hidden className="h-full w-full bg-zinc-950" />
          )}
        </div>

        <div className="p-5 sm:p-6">
          {title && (
            <h2 className="text-2xl font-semibold tracking-tighter leading-tight text-white">
              {title}
            </h2>
          )}

          {description?.trim() && (
            <p className="mt-4 text-sm leading-relaxed text-zinc-400">{description}</p>
          )}

          {avatars?.length > 0 && (
            <div className="mt-5">
              <AvatarGroup avatars={avatars} size="m" reverse />
            </div>
          )}

          <div className="mt-6 flex flex-wrap gap-3">
            {content?.trim() && (
              <Link
                href={href}
                className="inline-flex min-h-11 items-center rounded-xl border border-white/10 px-4 text-sm text-white transition-all duration-300 ease-out hover:border-white/20"
              >
                {i18nContent.ui.read_case_study}
              </Link>
            )}
            {link && (
              <Link
                href={link}
                className="inline-flex min-h-11 items-center rounded-xl border border-white/10 bg-white/[0.02] px-4 text-sm text-zinc-300 transition-all duration-300 ease-out hover:border-white/20 hover:text-white"
              >
                {i18nContent.ui.view_project}
              </Link>
            )}
          </div>
        </div>
      </article>
    </Column>
  );
};

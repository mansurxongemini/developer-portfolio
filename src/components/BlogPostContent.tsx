"use client";

import {
  Column,
  Heading,
  Row,
  Text,
  SmartLink,
  Avatar,
  Media,
  Line,
} from "@once-ui-system/core";
import { useI18n } from "@/components/I18nProvider";
import { baseURL } from "@/resources";
import { formatDate } from "@/utils/formatDate";
import { ShareSection } from "@/components/blog/ShareSection";

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

export function BlogPostContent({ post, article, recentPosts }: BlogPostContentProps) {
  const { content } = useI18n();
  const { person, blog } = content;

  return (
    <Column as="section" maxWidth="m" horizontal="center" gap="l" paddingTop="24">
      <Column maxWidth="s" gap="16" horizontal="center" align="center">
        <SmartLink href="/blog">
          <Text variant="label-strong-m">{content.ui.blog}</Text>
        </SmartLink>
        <Text variant="body-default-xs" onBackground="neutral-weak" marginBottom="12">
          {post.metadata.publishedAt && formatDate(post.metadata.publishedAt)}
        </Text>
        <Heading variant="display-strong-m">{post.metadata.title}</Heading>
        {post.metadata.subtitle && (
          <Text
            variant="body-default-l"
            onBackground="neutral-weak"
            align="center"
            style={{ fontStyle: "italic" }}
          >
            {post.metadata.subtitle}
          </Text>
        )}
      </Column>
      <Row marginBottom="32" horizontal="center">
        <Row gap="16" vertical="center">
          <Avatar size="s" src={person.avatar} />
          <Text variant="label-default-m" onBackground="brand-weak">
            {person.name}
          </Text>
        </Row>
      </Row>
      {post.metadata.image && (
        <Media
          src={post.metadata.image}
          alt={post.metadata.title}
          aspectRatio="16/9"
          priority
          sizes="(min-width: 768px) 100vw, 768px"
          border="neutral-alpha-weak"
          radius="l"
          marginTop="12"
          marginBottom="8"
        />
      )}
      <Column as="article" maxWidth="s">
        {article}
      </Column>

      <ShareSection
        title={post.metadata.title}
        url={`${baseURL}${blog.path}/${post.slug}`}
      />

      <Column fillWidth gap="40" horizontal="center" marginTop="40">
        <Line maxWidth="40" />
        <Text as="h2" id="recent-posts" variant="heading-strong-xl" marginBottom="24">
          {content.ui.recent_posts}
        </Text>
        {recentPosts}
      </Column>
    </Column>
  );
}

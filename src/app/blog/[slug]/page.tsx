import { notFound } from "next/navigation";
import { CustomMDX, ScrollToHash } from "@/components";
import {
  Meta,
  Schema,
  Row,
  Column,
} from "@once-ui-system/core";
import { baseURL, about, blog, person } from "@/resources";
import { getPublishedArticles, getArticleBySlug } from "@/lib/firestore-server";
import type { Article } from "@/lib/firestore-server";
import { Metadata } from "next";
import { BlogPostContent } from "@/components/BlogPostContent";
import { Posts } from "@/components/blog/Posts";

function toPostShape(article: Article) {
  return {
    slug: article.slug,
    content: article.content,
    metadata: {
      title: article.title,
      publishedAt: (article.publishedAt instanceof Date
        ? article.publishedAt
        : article.createdAt instanceof Date
          ? article.createdAt
          : new Date()
      ).toISOString(),
      summary: article.summary,
      image: article.image || "",
      tag: article.category || "",
    },
  };
}

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  try {
    const articles = await getPublishedArticles();
    return articles.map((a) => ({ slug: a.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string | string[] }>;
}): Promise<Metadata> {
  const routeParams = await params;
  const slugPath = Array.isArray(routeParams.slug)
    ? routeParams.slug.join("/")
    : routeParams.slug || "";

  try {
    const article = await getArticleBySlug(slugPath);
    if (!article || article.status !== "published") return {};

    const post = toPostShape(article);
    return Meta.generate({
      title: post.metadata.title,
      description: post.metadata.summary,
      baseURL: baseURL,
      image: post.metadata.image || `/api/og/generate?title=${post.metadata.title}`,
      path: `${blog.path}/${post.slug}`,
    });
  } catch {
    return {};
  }
}

export default async function Blog({ params }: { params: Promise<{ slug: string | string[] }> }) {
  const routeParams = await params;
  const slugPath = Array.isArray(routeParams.slug)
    ? routeParams.slug.join("/")
    : routeParams.slug || "";

  let article: Article | null = null;
  try {
    article = await getArticleBySlug(slugPath);
  } catch {
    // Firestore unavailable
  }

  if (!article || article.status !== "published") {
    notFound();
  }

  const post = toPostShape(article);

  return (
    <Row fillWidth>
      <Row maxWidth={12} m={{ hide: true }} />
      <Row fillWidth horizontal="center">
        <Schema
          as="blogPosting"
          baseURL={baseURL}
          path={`${blog.path}/${post.slug}`}
          title={post.metadata.title}
          description={post.metadata.summary}
          datePublished={post.metadata.publishedAt}
          dateModified={post.metadata.publishedAt}
          image={
            post.metadata.image ||
            `/api/og/generate?title=${encodeURIComponent(post.metadata.title)}`
          }
          author={{
            name: person.name,
            url: `${baseURL}${about.path}`,
            image: `${baseURL}${person.avatar}`,
          }}
        />
        <BlogPostContent
          post={post}
          article={<CustomMDX source={post.content} />}
          recentPosts={
            <Posts exclude={[post.slug]} range={[1, 2]} columns="2" thumbnail direction="column" />
          }
        />
        <ScrollToHash />
      </Row>
      <Column
        maxWidth={12}
        paddingLeft="40"
        fitHeight
        position="sticky"
        top="80"
        gap="16"
        m={{ hide: true }}
      >
      </Column>
    </Row>
  );
}

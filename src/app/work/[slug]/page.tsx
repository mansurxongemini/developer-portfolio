import { notFound } from "next/navigation";
import { getPublishedProjects, getProjectBySlug } from "@/lib/firestore-server";
import type { Project } from "@/lib/firestore-server";
import {
  Meta,
  Schema,
} from "@once-ui-system/core";
import { baseURL, about, person, work } from "@/resources";
import type { Metadata } from "next";
import { WorkProjectContent } from "@/components/WorkProjectContent";
import { ScrollToHash, CustomMDX } from "@/components";
import { Projects } from "@/components/work/Projects";

function toPostShape(project: Project) {
  const coverImage = project.image || project.imageUrl || "";

  return {
    slug: project.slug,
    content: project.content,
    metadata: {
      title: project.title,
      publishedAt: (project.publishedAt instanceof Date
        ? project.publishedAt
        : project.createdAt instanceof Date
          ? project.createdAt
          : new Date()
      ).toISOString(),
      summary: project.description,
      images: coverImage ? [coverImage] : [],
      team: [] as { name: string; avatar: string; linkedIn?: string }[],
      link: project.link || "",
    },
  };
}

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  try {
    const projects = await getPublishedProjects();
    return projects.map((p) => ({ slug: p.slug }));
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
    const project = await getProjectBySlug(slugPath);
    if (!project) return {};

    const post = toPostShape(project);
    return Meta.generate({
      title: post.metadata.title,
      description: post.metadata.summary,
      baseURL: baseURL,
      image: post.metadata.images[0] || `/api/og/generate?title=${post.metadata.title}`,
      path: `${work.path}/${post.slug}`,
    });
  } catch {
    return {};
  }
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string | string[] }>;
}) {
  const routeParams = await params;
  const slugPath = Array.isArray(routeParams.slug)
    ? routeParams.slug.join("/")
    : routeParams.slug || "";

  let project: Project | null = null;
  try {
    project = await getProjectBySlug(slugPath);
  } catch {
    // Firestore unavailable
  }

  if (!project || project.status !== "published") {
    notFound();
  }

  const post = toPostShape(project);

  return (
    <>
      <Schema
        as="blogPosting"
        baseURL={baseURL}
        path={`${work.path}/${post.slug}`}
        title={post.metadata.title}
        description={post.metadata.summary}
        datePublished={post.metadata.publishedAt}
        dateModified={post.metadata.publishedAt}
        image={
          post.metadata.images[0] || `/api/og/generate?title=${encodeURIComponent(post.metadata.title)}`
        }
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <WorkProjectContent
        post={post}
        article={<CustomMDX source={post.content} />}
        relatedProjects={<Projects exclude={[post.slug]} range={[2]} />}
      />
      <ScrollToHash />
    </>
  );
}

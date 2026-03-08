import { getPublishedProjects, type Project } from "@/lib/firestore-server";
import { ProjectBentoGrid } from "./ProjectBentoGrid";

interface ProjectsProps {
  range?: [number, number?];
  exclude?: string[];
}

export async function Projects({ range, exclude }: ProjectsProps) {
  let allProjectsRaw: Project[] = [];
  try {
    allProjectsRaw = await getPublishedProjects();
  } catch {
    return null;
  }

  let allProjects = allProjectsRaw.filter((p) => p.id);

  if (exclude && exclude.length > 0) {
    allProjects = allProjects.filter((p) => !exclude.includes(p.slug));
  }

  const sortedProjects = allProjects.sort((a, b) => {
    const dateA = a.publishedAt instanceof Date ? a.publishedAt : a.createdAt instanceof Date ? a.createdAt : new Date(0);
    const dateB = b.publishedAt instanceof Date ? b.publishedAt : b.createdAt instanceof Date ? b.createdAt : new Date(0);
    return dateB.getTime() - dateA.getTime();
  });

  const displayedProjects = range
    ? sortedProjects.slice(range[0] - 1, range[1] ?? sortedProjects.length)
    : sortedProjects;

  if (displayedProjects.length === 0) return null;

  return <ProjectBentoGrid projects={displayedProjects} />;
}

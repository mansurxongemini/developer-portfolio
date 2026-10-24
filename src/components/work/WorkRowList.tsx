"use client";

import type { Project } from "@/lib/firestore-server";

const shortTitles: Record<string, string> = {
  "inclusive-legal-rag": "Inclusive Legal RAG",
  "alloma-cognitive-engine": "Alloma AI",
  "multi-agent-roundtable-system": "Roundtable",
  "mahalla-management-system": "Mahalla",
  "uzbekistan-map-puzzle": "Map Puzzle",
};

function shortTitle(project: Project): string {
  if (project.slug && shortTitles[project.slug]) return shortTitles[project.slug];
  const title = project.title || project.slug || "Loyiha";
  return title.length > 26 ? `${title.slice(0, 24)}…` : title;
}

function categoryOf(project: Project): string {
  const tags = project.tags;
  if (tags && tags.length > 0) return tags.slice(0, 2).join(" / ");
  return "Portfolio";
}

function yearOf(project: Project): string {
  const d =
    project.publishedAt instanceof Date
      ? project.publishedAt
      : project.createdAt instanceof Date
        ? project.createdAt
        : null;
  return d ? String(d.getFullYear()) : "—";
}

export function WorkRowList({ projects }: { projects: Project[] }) {
  const first = projects[0];
  const firstImage = first?.image || first?.imageUrl || "";

  return (
    <div className="work__inner">
      <div className="work__list-wrap">
        <div className="work-list">
          {projects.map((project, idx) => {
            const num = String(idx + 1).padStart(2, "0");
            const hasDetail = Boolean(project.content?.trim());
            const href = hasDetail ? `/work/${project.slug}` : project.link || `/work/${project.slug}`;
            const external = !hasDetail && Boolean(project.link);
            return (
              <a
                key={project.id || project.slug}
                href={href}
                {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
                className="ex-row"
                data-cursor="Ochish"
              >
                <span className="ex-row__index font-mono">{num}</span>
                <span className="ex-row__title font-display">{shortTitle(project)}</span>
                <span className="ex-row__cat font-mono">{categoryOf(project)}</span>
                <span className="ex-row__year font-mono">{yearOf(project)}</span>
                <span className="ex-row__arrow" aria-hidden="true">
                  →
                </span>
              </a>
            );
          })}
        </div>
      </div>

      {firstImage ? (
        <aside className="viewer" aria-hidden="true">
          <div className="viewer__frame frame">
            <div className="frame__mat">
              <div className="viewer__stage">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={firstImage}
                  alt=""
                  className="is-current"
                  loading="lazy"
                />
              </div>
            </div>
            <p className="viewer__caption font-mono">
              {shortTitle(first)} · {yearOf(first)}
            </p>
          </div>
        </aside>
      ) : null}
    </div>
  );
}

"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { FolderKanban, Pencil, Plus, Trash2, X } from "lucide-react";
import Link from "next/link";
import styles from "@/app/admin/projects/page.module.scss";

type ProjectStatus = "published" | "draft";

interface ProjectItem {
  id: string;
  title: string;
  slug: string;
  stack: string;
  status: ProjectStatus;
  views: number;
  createdAt: string;
}

type ProjectForm = {
  title: string;
  slug: string;
  stack: string;
  description: string;
  status: ProjectStatus;
};

const EMPTY_FORM: ProjectForm = {
  title: "",
  slug: "",
  stack: "",
  description: "",
  status: "draft",
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export default function ProjectsManagePage() {
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [form, setForm] = useState<ProjectForm>(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);

  const fetchProjects = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch("/api/admin/projects", { cache: "no-store" });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to fetch projects");
        return;
      }
      setProjects(data.projects ?? []);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Network error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const totalViews = useMemo(
    () => projects.reduce((sum, project) => sum + (project.views ?? 0), 0).toLocaleString(),
    [projects],
  );

  function onTitleChange(value: string) {
    setForm((current) => {
      const autoSlug = slugify(current.title);
      const nextSlug = current.slug === "" || current.slug === autoSlug ? slugify(value) : current.slug;

      return {
        ...current,
        title: value,
        slug: nextSlug,
      };
    });
  }

  function openDialog() {
    setForm(EMPTY_FORM);
    setIsDialogOpen(true);
  }

  function closeDialog() {
    setIsDialogOpen(false);
  }

  async function handleCreateProject(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);

    const payload = {
      title: form.title,
      slug: form.slug,
      description: form.description,
      content: "",
      tags: form.stack.split(",").map((s) => s.trim()).filter(Boolean),
      status: form.status,
    };

    try {
      const res = await fetch("/api/admin/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to create project");
        return;
      }

      await fetchProjects();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Network error");
    } finally {
      setSubmitting(false);
      setIsDialogOpen(false);
    }
  }

  async function handleDelete(id: string) {
    setDeletingId(id);

    try {
      const res = await fetch(`/api/admin/projects/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (res.ok) {
        await fetchProjects();
      } else {
        setError(data.error || "Failed to delete project");
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Network error");
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <section className={styles.page}>
      {error && (
        <div style={{ background: "#7f1d1d", color: "#fca5a5", padding: "12px 16px", borderRadius: 8, marginBottom: 16, fontSize: 14 }}>
          <strong>Error:</strong> {error}
          <button type="button" onClick={() => setError(null)} style={{ marginLeft: 12, cursor: "pointer", color: "#fca5a5", background: "none", border: "none", textDecoration: "underline" }}>Dismiss</button>
        </div>
      )}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className={styles.headerCard}
      >
        <div>
          <p className={styles.kicker}>Portfolio Management</p>
          <h2>Projects</h2>
          <p>Manage shipping projects and keep your public portfolio always current.</p>
        </div>
        <div className={styles.headerStats}>
          <div>
            <span>Total Projects</span>
            <strong>{projects.length}</strong>
          </div>
          <div>
            <span>Total Views</span>
            <strong>{totalViews}</strong>
          </div>
        </div>
      </motion.div>

      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.08 }}
        className={styles.tableCard}
      >
        <div className={styles.tableTopbar}>
          <div className={styles.tableTitle}>
            <FolderKanban size={17} />
            <span>Project Registry</span>
          </div>
          <button type="button" className={styles.primaryButton} onClick={openDialog}>
            <Plus size={16} />
            <span>Add New Project</span>
          </button>
        </div>

        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Project</th>
                <th>Created</th>
                <th>Status</th>
                <th>Views</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr>
                  <td colSpan={5}>Loading projects...</td>
                </tr>
              )}

              {!loading && projects.length === 0 && (
                <tr>
                  <td colSpan={5}>No projects found.</td>
                </tr>
              )}

              {projects.map((project) => (
                <tr key={project.id}>
                  <td>
                    <div className={styles.projectCell}>
                      <strong>{project.title}</strong>
                      <span>/{project.slug} · {project.stack}</span>
                    </div>
                  </td>
                  <td>{new Date(project.createdAt).toLocaleDateString()}</td>
                  <td>
                    <span
                      className={`${styles.status} ${project.status === "published" ? styles.live : styles.building}`}
                    >
                      {project.status === "published" ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td>{(project.views ?? 0).toLocaleString()}</td>
                  <td>
                    <div className={styles.actions}>
                      <Link
                        href={`/admin/projects/${project.id}/edit`}
                        className={styles.iconAction}
                        aria-label="Edit project"
                      >
                        <Pencil size={15} />
                      </Link>
                      <button
                        type="button"
                        className={`${styles.iconAction} ${styles.deleteAction}`}
                        aria-label="Delete project"
                        disabled={deletingId === project.id}
                        onClick={() => handleDelete(project.id)}
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.section>

      {isDialogOpen && (
        <div
          className={styles.dialogBackdrop}
          role="presentation"
          onClick={closeDialog}
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              closeDialog();
            }
          }}
        >
          <motion.div
            className={styles.dialog}
            aria-label="Create project"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.25 }}
          >
            <div className={styles.dialogHead}>
              <div>
                <p className={styles.kicker}>Create</p>
                <h3>New Project</h3>
              </div>
              <button type="button" className={styles.iconAction} onClick={closeDialog} aria-label="Close dialog">
                <X size={16} />
              </button>
            </div>

            <form className={styles.form} onSubmit={handleCreateProject}>
              <label>
                Title
                <input
                  value={form.title}
                  onChange={(e) => onTitleChange(e.target.value)}
                  placeholder="Policy Insight Dashboard"
                  required
                />
              </label>

              <label>
                Slug
                <input
                  value={form.slug}
                  onChange={(e) => setForm((current) => ({ ...current, slug: e.target.value }))}
                  placeholder="policy-insight-dashboard"
                  required
                />
              </label>

              <label>
                Stack
                <input
                  value={form.stack}
                  onChange={(e) => setForm((current) => ({ ...current, stack: e.target.value }))}
                  placeholder="Next.js, Firestore, Recharts"
                  required
                />
              </label>

              <label>
                Description
                <textarea
                  value={form.description}
                  onChange={(e) => setForm((current) => ({ ...current, description: e.target.value }))}
                  placeholder="Describe the project goals and outcomes..."
                  rows={6}
                  required
                />
              </label>

              <label>
                Status
                <select
                  value={form.status}
                  onChange={(e) => setForm((current) => ({ ...current, status: e.target.value as ProjectStatus }))}
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </label>

              <div className={styles.formActions}>
                <button type="button" className={styles.secondaryButton} onClick={closeDialog}>
                  Cancel
                </button>
                <button type="submit" className={styles.primaryButton} disabled={submitting}>
                  {submitting ? "Saving..." : "Save Project"}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </section>
  );
}

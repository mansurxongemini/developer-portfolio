"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { FilePenLine, Pencil, Plus, Trash2, X } from "lucide-react";
import Link from "next/link";
import styles from "@/app/admin/articles/page.module.scss";

interface Article {
  id: string;
  title: string;
  slug: string;
  category: string;
  status: "published" | "draft";
  views: number;
  createdAt: string;
}

type ArticleForm = {
  title: string;
  slug: string;
  category: string;
  content: string;
};

const EMPTY_FORM: ArticleForm = {
  title: "",
  slug: "",
  category: "General",
  content: "",
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [form, setForm] = useState<ArticleForm>(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);

  const fetchArticles = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch("/api/admin/articles", { cache: "no-store" });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to fetch articles");
        return;
      }
      setArticles(data.articles ?? []);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Network error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  const totalViews = useMemo(
    () => articles.reduce((sum, article) => sum + article.views, 0).toLocaleString(),
    [articles],
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

  async function handleCreateArticle(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);

    const payload = {
      ...form,
      status: "published" as const,
      locale: "en",
    };

    try {
      const res = await fetch("/api/admin/articles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to create article");
        return;
      }

      await fetchArticles();
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
      const res = await fetch(`/api/admin/articles/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (res.ok) {
        await fetchArticles();
      } else {
        setError(data.error || "Failed to delete article");
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
          <p className={styles.kicker}>Content Management</p>
          <h2>Articles</h2>
          <p>Track content health and keep your editorial workflow moving.</p>
        </div>
        <div className={styles.headerStats}>
          <div>
            <span>Total Articles</span>
            <strong>{articles.length}</strong>
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
            <FilePenLine size={17} />
            <span>Article Registry</span>
          </div>
          <button type="button" className={styles.primaryButton} onClick={openDialog}>
            <Plus size={16} />
            <span>Add New Article</span>
          </button>
        </div>

        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Title</th>
                <th>Date</th>
                <th>Status</th>
                <th>Views</th>
                <th className={styles.actionsHead}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr>
                  <td colSpan={5}>Loading articles...</td>
                </tr>
              )}

              {!loading && articles.length === 0 && (
                <tr>
                  <td colSpan={5}>No articles found.</td>
                </tr>
              )}

              {articles.map((article) => (
                <tr key={article.id}>
                  <td>
                    <div className={styles.articleCell}>
                      <strong>{article.title}</strong>
                      <span>/{article.slug}</span>
                    </div>
                  </td>
                  <td>{new Date(article.createdAt).toLocaleDateString()}</td>
                  <td>
                    <span
                      className={`${styles.status} ${article.status === "published" ? styles.published : styles.draft}`}
                    >
                      {article.status === "published" ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td>{(article.views ?? 0).toLocaleString()}</td>
                  <td>
                    <div className={styles.actions}>
                      <Link
                        href={`/admin/articles/${article.id}/edit`}
                        className={styles.iconAction}
                        aria-label="Edit article"
                      >
                        <Pencil size={15} />
                      </Link>
                      <button
                        type="button"
                        className={`${styles.iconAction} ${styles.deleteAction}`}
                        aria-label="Delete article"
                        disabled={deletingId === article.id}
                        onClick={() => handleDelete(article.id)}
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
            aria-label="Create article"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.25 }}
          >
            <div className={styles.dialogHead}>
              <div>
                <p className={styles.kicker}>Create</p>
                <h3>New Article</h3>
              </div>
              <button type="button" className={styles.iconAction} onClick={closeDialog} aria-label="Close dialog">
                <X size={16} />
              </button>
            </div>

            <form className={styles.form} onSubmit={handleCreateArticle}>
              <label>
                Title
                <input
                  value={form.title}
                  onChange={(e) => onTitleChange(e.target.value)}
                  placeholder="A premium CMS architecture"
                  required
                />
              </label>

              <label>
                Slug
                <input
                  value={form.slug}
                  onChange={(e) => setForm((current) => ({ ...current, slug: e.target.value }))}
                  placeholder="a-premium-cms-architecture"
                  required
                />
              </label>

              <label>
                Category
                <input
                  value={form.category}
                  onChange={(e) => setForm((current) => ({ ...current, category: e.target.value }))}
                  placeholder="Engineering"
                  required
                />
              </label>

              <label>
                Markdown / Rich Text Content
                <textarea
                  value={form.content}
                  onChange={(e) => setForm((current) => ({ ...current, content: e.target.value }))}
                  placeholder="# Introduction\n\nWrite your article body here..."
                  rows={9}
                  required
                />
              </label>

              <div className={styles.formActions}>
                <button type="button" className={styles.secondaryButton} onClick={closeDialog}>
                  Cancel
                </button>
                <button type="submit" className={styles.primaryButton} disabled={submitting}>
                  {submitting ? "Saving..." : "Save Draft"}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </section>
  );
}

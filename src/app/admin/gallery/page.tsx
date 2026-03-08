"use client";

import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ImageIcon, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import styles from "@/app/admin/gallery/page.module.scss";

interface GalleryItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  ratio: string;
  date: string;
  featured?: boolean;
  createdAt: string;
}

export default function AdminGalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch("/api/admin/gallery", { cache: "no-store" });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to fetch gallery items");
        return;
      }
      setItems(data.items ?? []);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Network error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  async function handleDelete(id: string) {
    setDeletingId(id);
    try {
      const res = await fetch(`/api/admin/gallery/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (res.ok) {
        setItems((current) => current.filter((item) => item.id !== id));
      } else {
        setError(data.error || "Failed to delete item");
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
          <p className={styles.kicker}>Media Management</p>
          <h2>Gallery</h2>
          <p>Upload, organize, and manage professional gallery images.</p>
        </div>
        <div className={styles.headerStats}>
          <div>
            <span>Total Images</span>
            <strong>{items.length}</strong>
          </div>
          <div>
            <span>Featured</span>
            <strong>{items.filter((i) => i.featured).length}</strong>
          </div>
        </div>
      </motion.div>

      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.08 }}
        className={styles.gridCard}
      >
        <div className={styles.gridTopbar}>
          <div className={styles.gridTitle}>
            <ImageIcon size={17} />
            <span>Image Library</span>
          </div>
          <Link href="/admin/gallery/new" className={styles.primaryButton}>
            <Plus size={16} />
            <span>Upload New Image</span>
          </Link>
        </div>

        {loading && <p className={styles.emptyState}>Loading gallery...</p>}

        {!loading && items.length === 0 && (
          <p className={styles.emptyState}>No gallery images yet. Upload your first image.</p>
        )}

        {!loading && items.length > 0 && (
          <div className={styles.grid}>
            {items.map((item) => (
              <div key={item.id} className={styles.card}>
                <div className={styles.cardImage}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.imageUrl} alt={item.title} loading="lazy" />
                </div>
                <div className={styles.cardBody}>
                  <h4 className={styles.cardTitle}>{item.title}</h4>
                  <div className={styles.cardMeta}>
                    <span className={styles.cardCategory}>{item.category}</span>
                    {item.featured && <span className={styles.featuredBadge}>Featured</span>}
                    <span className={styles.cardDate}>{item.date}</span>
                  </div>
                  {item.description && (
                    <p className={styles.cardDesc}>{item.description}</p>
                  )}
                </div>
                <div className={styles.cardActions}>
                  <button
                    type="button"
                    className={`${styles.iconAction} ${styles.deleteAction}`}
                    aria-label="Delete image"
                    disabled={deletingId === item.id}
                    onClick={() => handleDelete(item.id)}
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </motion.section>
    </section>
  );
}

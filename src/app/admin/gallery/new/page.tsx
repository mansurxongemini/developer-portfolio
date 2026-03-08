"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, ImageIcon } from "lucide-react";
import Link from "next/link";
import styles from "@/app/admin/gallery/page.module.scss";
import { supabaseUpload } from "@/utils/supabaseUpload";

type GalleryCategory =
  | "certificate"
  | "portrait"
  | "legal-work"
  | "legal-tech-event"
  | "award";

type GalleryRatio = "landscape" | "portrait" | "square";

const CATEGORIES: { value: GalleryCategory; label: string }[] = [
  { value: "certificate", label: "Certificate" },
  { value: "portrait", label: "Portrait" },
  { value: "legal-work", label: "Legal Practice" },
  { value: "legal-tech-event", label: "Legal-Tech Event" },
  { value: "award", label: "Award" },
];

const RATIOS: { value: GalleryRatio; label: string }[] = [
  { value: "landscape", label: "Landscape (16:10)" },
  { value: "portrait", label: "Portrait (3:4)" },
  { value: "square", label: "Square (1:1)" },
];

interface FormState {
  title: string;
  description: string;
  category: GalleryCategory;
  ratio: GalleryRatio;
  date: string;
  featured: boolean;
}

const INITIAL_FORM: FormState = {
  title: "",
  description: "",
  category: "certificate",
  ratio: "landscape",
  date: new Date().getFullYear().toString(),
  featured: false,
};

export default function AdminGalleryNewPage() {
  const router = useRouter();
  const [authed, setAuthed] = useState(false);
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [imageUrl, setImageUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/admin/verify", { cache: "no-store" })
      .then((res) => {
        if (!res.ok) router.replace("/admin");
        else setAuthed(true);
      })
      .catch(() => router.replace("/admin"));
  }, [router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!imageUrl) {
      setError("Please upload an image first");
      return;
    }

    setUploading(true);
    setError(null);

    try {
      const res = await fetch("/api/admin/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: form.title,
          description: form.description,
          imageUrl,
          category: form.category,
          ratio: form.ratio,
          date: form.date,
          featured: form.featured,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to save gallery item");
        return;
      }

      router.push("/admin/gallery");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  async function handleImageFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const selected = event.target.files?.[0] || null;
    if (!selected) return;

    if (!selected.type.startsWith("image/")) {
      setError("Please select an image file");
      return;
    }

    setIsUploading(true);
    setError(null);

    try {
      const uploadedUrl = await supabaseUpload(selected);
      setImageUrl(uploadedUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Image upload failed");
    } finally {
      setIsUploading(false);
      event.target.value = "";
    }
  }

  if (!authed) return null;

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
          <h2>Upload New Image</h2>
          <p>Select an image, fill in the details, and publish to your gallery.</p>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Link href="/admin/gallery" className={styles.secondaryButton}>
            <ArrowLeft size={16} />
            <span>Back to Gallery</span>
          </Link>
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
            <span>Image Details</span>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}
        >
          <label style={{ display: "flex", flexDirection: "column", gap: "0.35rem", fontSize: "0.81rem", color: "rgba(185,198,214,0.8)" }}>
            Gallery Image Upload
            <input
              type="file"
              accept="image/*"
              onChange={handleImageFileChange}
              disabled={isUploading}
              style={{
                border: "1px solid rgba(255,255,255,0.14)",
                borderRadius: "0.65rem",
                background: "rgba(255,255,255,0.03)",
                color: "rgba(236,242,250,0.95)",
                padding: "0.55rem 0.65rem",
                fontSize: "0.88rem",
              }}
            />
          </label>

          {isUploading && (
            <p style={{ color: "rgba(185,198,214,0.7)", fontSize: "0.8rem", margin: 0 }}>
              Uploading image...
            </p>
          )}

          {imageUrl && (
            <div style={{ width: "100%", maxWidth: "420px", borderRadius: "12px", overflow: "hidden", border: "1px solid rgba(255,255,255,0.14)" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={imageUrl} alt="Gallery preview" style={{ width: "100%", display: "block", objectFit: "cover", aspectRatio: "16 / 9" }} />
            </div>
          )}

          {/* ── Title ── */}
          <label style={{ display: "flex", flexDirection: "column", gap: "0.35rem", fontSize: "0.81rem", color: "rgba(185,198,214,0.8)" }}>
            Title *
            <input
              value={form.title}
              onChange={(e) => setForm((c) => ({ ...c, title: e.target.value }))}
              placeholder="Professional Portrait"
              required
              style={{
                border: "1px solid rgba(255,255,255,0.14)",
                borderRadius: "0.65rem",
                background: "rgba(255,255,255,0.03)",
                color: "rgba(236,242,250,0.95)",
                padding: "0.55rem 0.65rem",
                fontSize: "0.88rem",
              }}
            />
          </label>

          {/* ── Description ── */}
          <label style={{ display: "flex", flexDirection: "column", gap: "0.35rem", fontSize: "0.81rem", color: "rgba(185,198,214,0.8)" }}>
            Description
            <textarea
              value={form.description}
              onChange={(e) => setForm((c) => ({ ...c, description: e.target.value }))}
              placeholder="Short description of this gallery image..."
              rows={3}
              style={{
                border: "1px solid rgba(255,255,255,0.14)",
                borderRadius: "0.65rem",
                background: "rgba(255,255,255,0.03)",
                color: "rgba(236,242,250,0.95)",
                padding: "0.55rem 0.65rem",
                fontSize: "0.88rem",
                resize: "vertical",
              }}
            />
          </label>

          {/* ── Category + Ratio row ── */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
            <label style={{ display: "flex", flexDirection: "column", gap: "0.35rem", fontSize: "0.81rem", color: "rgba(185,198,214,0.8)" }}>
              Category *
              <select
                value={form.category}
                onChange={(e) => setForm((c) => ({ ...c, category: e.target.value as GalleryCategory }))}
                style={{
                  border: "1px solid rgba(255,255,255,0.14)",
                  borderRadius: "0.65rem",
                  background: "rgba(8,12,18,0.9)",
                  color: "rgba(236,242,250,0.95)",
                  padding: "0.55rem 0.65rem",
                  fontSize: "0.88rem",
                }}
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat.value} value={cat.value}>{cat.label}</option>
                ))}
              </select>
            </label>

            <label style={{ display: "flex", flexDirection: "column", gap: "0.35rem", fontSize: "0.81rem", color: "rgba(185,198,214,0.8)" }}>
              Aspect Ratio
              <select
                value={form.ratio}
                onChange={(e) => setForm((c) => ({ ...c, ratio: e.target.value as GalleryRatio }))}
                style={{
                  border: "1px solid rgba(255,255,255,0.14)",
                  borderRadius: "0.65rem",
                  background: "rgba(8,12,18,0.9)",
                  color: "rgba(236,242,250,0.95)",
                  padding: "0.55rem 0.65rem",
                  fontSize: "0.88rem",
                }}
              >
                {RATIOS.map((r) => (
                  <option key={r.value} value={r.value}>{r.label}</option>
                ))}
              </select>
            </label>
          </div>

          {/* ── Date + Featured row ── */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
            <label style={{ display: "flex", flexDirection: "column", gap: "0.35rem", fontSize: "0.81rem", color: "rgba(185,198,214,0.8)" }}>
              Date / Year
              <input
                value={form.date}
                onChange={(e) => setForm((c) => ({ ...c, date: e.target.value }))}
                placeholder="2026"
                style={{
                  border: "1px solid rgba(255,255,255,0.14)",
                  borderRadius: "0.65rem",
                  background: "rgba(255,255,255,0.03)",
                  color: "rgba(236,242,250,0.95)",
                  padding: "0.55rem 0.65rem",
                  fontSize: "0.88rem",
                }}
              />
            </label>

            <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.81rem", color: "rgba(185,198,214,0.8)", paddingTop: "1.2rem" }}>
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(e) => setForm((c) => ({ ...c, featured: e.target.checked }))}
                style={{ width: "1rem", height: "1rem", accentColor: "#0ea5e9" }}
              />
              Featured image
            </label>
          </div>

          {/* ── Actions ── */}
          <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.55rem", marginTop: "0.5rem" }}>
            <Link href="/admin/gallery" className={styles.secondaryButton}>
              Cancel
            </Link>
            <button type="submit" className={styles.primaryButton} disabled={uploading || isUploading || !imageUrl}>
              {uploading ? "Saving..." : isUploading ? "Uploading image..." : "Upload & Save"}
            </button>
          </div>
        </form>
      </motion.section>
    </section>
  );
}

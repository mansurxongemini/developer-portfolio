"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Column,
  Heading,
  Text,
  Button,
  Input,
  Row,
  Textarea,
} from "@once-ui-system/core";
import { motion } from "framer-motion";
import { supabaseUpload } from "@/utils/supabaseUpload";

export default function NewArticlePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({
    title: "",
    slug: "",
    summary: "",
    content: "",
    category: "blog" as "blog" | "analysis" | "project",
    status: "draft" as "draft" | "published",
    tags: "",
    locale: "en",
    imageUrl: "",
  });
  const hasCover = useMemo(() => Boolean(form.imageUrl), [form.imageUrl]);

  useEffect(() => {
    // Check auth
    fetch("/api/admin/verify").then((res) => {
      if (!res.ok) router.push("/admin");
    });
  }, [router]);

  function generateSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  }

  function handleTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const title = e.target.value;
    setForm((prev) => ({
      ...prev,
      title,
      slug: prev.slug === generateSlug(prev.title) ? generateSlug(title) : prev.slug,
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/articles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          tags: form.tags
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean),
        }),
      });

      if (res.ok) {
        setSuccess(true);
        setTimeout(() => router.push("/admin/articles"), 1500);
      } else {
        const data = await res.json();
        setError(data.error || "Failed to create article");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleCoverFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const selected = event.target.files?.[0] || null;
    if (!selected) return;

    if (!selected.type.startsWith("image/")) {
      setError("Please select an image file");
      return;
    }

    setIsUploading(true);
    setError("");

    try {
      const imageUrl = await supabaseUpload(selected);
      setForm((prev) => ({ ...prev, imageUrl }));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Image upload failed");
    } finally {
      setIsUploading(false);
      event.target.value = "";
    }
  }

  return (
    <Column maxWidth="m" fillWidth paddingY="24" gap="xl">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        style={{ width: "100%" }}
      >
        <Row fillWidth vertical="center" gap="8" paddingBottom="l">
          <Button variant="tertiary" size="s" href="/admin" prefixIcon="arrowRight" style={{ transform: "rotate(180deg)" }}>
            Back
          </Button>
          <Heading variant="display-strong-m">New Article</Heading>
        </Row>
      </motion.div>

      {success && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{ width: "100%" }}
        >
          <Column
            fillWidth
            padding="l"
            background="brand-alpha-weak"
            border="brand-alpha-medium"
            radius="l"
            gap="s"
          >
            <Text variant="body-default-m" onBackground="brand-strong">
              Article created successfully! Redirecting...
            </Text>
          </Column>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        style={{ width: "100%" }}
      >
        <form onSubmit={handleSubmit}>
          <Column
            fillWidth
            gap="l"
            padding="xl"
            background="surface"
            border="neutral-alpha-weak"
            radius="l"
          >
            <Column gap="m" fillWidth>
              <Input
                id="article-title"
                label="Title"
                value={form.title}
                onChange={handleTitleChange}
                required
              />
              <Input
                id="article-slug"
                label="URL Slug"
                value={form.slug}
                onChange={(e) => setForm((prev) => ({ ...prev, slug: e.target.value }))}
                required
              />
              <Input
                id="article-summary"
                label="Summary"
                value={form.summary}
                onChange={(e) => setForm((prev) => ({ ...prev, summary: e.target.value }))}
              />
              <Textarea
                id="article-content"
                label="Content (Markdown)"
                value={form.content}
                onChange={(e) => setForm((prev) => ({ ...prev, content: e.target.value }))}
                lines={15}
                required
              />
              <Row gap="m" fillWidth s={{ direction: "column" }}>
                <Column flex={1}>
                  <Input
                    id="article-tags"
                    label="Tags (comma-separated)"
                    value={form.tags}
                    onChange={(e) => setForm((prev) => ({ ...prev, tags: e.target.value }))}
                  />
                </Column>
                <Column flex={1}>
                  <label htmlFor="article-cover-file" style={{ display: "block", marginBottom: "4px", fontSize: "0.875rem" }}>
                    Cover Image Upload
                  </label>
                  <input
                    id="article-cover-file"
                    type="file"
                    accept="image/*"
                    onChange={handleCoverFileChange}
                    disabled={isUploading}
                    style={{
                      width: "100%",
                      padding: "0.65rem",
                      borderRadius: "var(--radius-m)",
                      border: "1px solid var(--neutral-alpha-weak)",
                      background: "var(--surface-background)",
                      color: "var(--neutral-on-background-strong)",
                      fontSize: "0.875rem",
                    }}
                  />
                  {isUploading && (
                    <Text variant="body-default-s" onBackground="neutral-weak" marginTop="4">
                      Uploading image...
                    </Text>
                  )}
                </Column>
              </Row>

              {hasCover && (
                <Column gap="8">
                  <Text variant="body-default-s" onBackground="neutral-weak">Cover Preview</Text>
                  <div style={{ width: "100%", maxWidth: "420px", borderRadius: "12px", overflow: "hidden", border: "1px solid var(--neutral-alpha-weak)" }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={form.imageUrl}
                      alt="Article cover preview"
                      style={{ width: "100%", display: "block", objectFit: "cover", aspectRatio: "16 / 9" }}
                    />
                  </div>
                </Column>
              )}
              <Row gap="m" fillWidth s={{ direction: "column" }}>
                <Column flex={1}>
                  <label htmlFor="article-category" style={{ display: "block", marginBottom: "4px", fontSize: "0.875rem" }}>
                    Category
                  </label>
                  <select
                    id="article-category"
                    value={form.category}
                    onChange={(e) => setForm((prev) => ({ ...prev, category: e.target.value as typeof form.category }))}
                    style={{
                      width: "100%",
                      padding: "0.75rem",
                      borderRadius: "var(--radius-m)",
                      border: "1px solid var(--neutral-alpha-weak)",
                      background: "var(--surface-background)",
                      color: "var(--neutral-on-background-strong)",
                      fontSize: "0.875rem",
                    }}
                  >
                    <option value="blog">Blog Post</option>
                    <option value="analysis">Analysis</option>
                    <option value="project">Project Update</option>
                  </select>
                </Column>
                <Column flex={1}>
                  <label htmlFor="article-locale" style={{ display: "block", marginBottom: "4px", fontSize: "0.875rem" }}>
                    Language
                  </label>
                  <select
                    id="article-locale"
                    value={form.locale}
                    onChange={(e) => setForm((prev) => ({ ...prev, locale: e.target.value }))}
                    style={{
                      width: "100%",
                      padding: "0.75rem",
                      borderRadius: "var(--radius-m)",
                      border: "1px solid var(--neutral-alpha-weak)",
                      background: "var(--surface-background)",
                      color: "var(--neutral-on-background-strong)",
                      fontSize: "0.875rem",
                    }}
                  >
                    <option value="uz">O'zbek</option>
                    <option value="en">English</option>
                    <option value="ru">Русский</option>
                  </select>
                </Column>
                <Column flex={1}>
                  <label htmlFor="article-status" style={{ display: "block", marginBottom: "4px", fontSize: "0.875rem" }}>
                    Status
                  </label>
                  <select
                    id="article-status"
                    value={form.status}
                    onChange={(e) => setForm((prev) => ({ ...prev, status: e.target.value as typeof form.status }))}
                    style={{
                      width: "100%",
                      padding: "0.75rem",
                      borderRadius: "var(--radius-m)",
                      border: "1px solid var(--neutral-alpha-weak)",
                      background: "var(--surface-background)",
                      color: "var(--neutral-on-background-strong)",
                      fontSize: "0.875rem",
                    }}
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                </Column>
              </Row>
            </Column>

            {error && (
              <Text variant="body-default-s" onBackground="danger-weak">
                {error}
              </Text>
            )}

            <Row gap="m" horizontal="end">
              <Button variant="secondary" size="m" href="/admin">
                Cancel
              </Button>
              <Button type="submit" variant="primary" size="m" disabled={loading || isUploading}>
                {loading
                  ? "Creating..."
                  : isUploading
                    ? "Uploading image..."
                  : form.status === "published"
                    ? "Publish Article"
                    : "Save Draft"}
              </Button>
            </Row>
          </Column>
        </form>
      </motion.div>
    </Column>
  );
}

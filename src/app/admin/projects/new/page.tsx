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

export default function NewProjectPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({
    title: "",
    slug: "",
    description: "",
    content: "",
    tags: "",
    imageUrl: "",
    link: "",
    status: "draft" as "draft" | "published",
  });
  const hasCover = useMemo(() => Boolean(form.imageUrl), [form.imageUrl]);

  useEffect(() => {
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
      const res = await fetch("/api/admin/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
        }),
      });

      if (res.ok) {
        setSuccess(true);
        setTimeout(() => router.push("/admin/projects"), 1500);
      } else {
        const data = await res.json();
        setError(data.error || "Failed to create project");
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
          <Heading variant="display-strong-m">New Project</Heading>
        </Row>
      </motion.div>

      {success && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} style={{ width: "100%" }}>
          <Column fillWidth padding="l" background="brand-alpha-weak" border="brand-alpha-medium" radius="l">
            <Text variant="body-default-m" onBackground="brand-strong">
              Project created successfully! Redirecting...
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
          <Column fillWidth gap="l" padding="xl" background="surface" border="neutral-alpha-weak" radius="l">
            <Column gap="m" fillWidth>
              <Input
                id="project-title"
                label="Project Title"
                value={form.title}
                onChange={handleTitleChange}
                required
              />
              <Input
                id="project-slug"
                label="URL Slug"
                value={form.slug}
                onChange={(e) => setForm((prev) => ({ ...prev, slug: e.target.value }))}
                required
              />
              <Input
                id="project-description"
                label="Short Description"
                value={form.description}
                onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
              />
              <Textarea
                id="project-content"
                label="Content (Markdown)"
                value={form.content}
                onChange={(e) => setForm((prev) => ({ ...prev, content: e.target.value }))}
                lines={12}
                required
              />
              <Row gap="m" fillWidth s={{ direction: "column" }}>
                <Column flex={1}>
                  <Input
                    id="project-tags"
                    label="Tags (comma-separated)"
                    value={form.tags}
                    onChange={(e) => setForm((prev) => ({ ...prev, tags: e.target.value }))}
                  />
                </Column>
                <Column flex={1}>
                  <Input
                    id="project-link"
                    label="Project Link (optional)"
                    value={form.link}
                    onChange={(e) => setForm((prev) => ({ ...prev, link: e.target.value }))}
                  />
                </Column>
              </Row>
              <Column gap="8">
                <label htmlFor="project-cover-file" style={{ display: "block", marginBottom: "4px", fontSize: "0.875rem" }}>
                  Cover Image Upload
                </label>
                <input
                  id="project-cover-file"
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

                {hasCover && (
                  <div style={{ width: "100%", maxWidth: "420px", borderRadius: "12px", overflow: "hidden", border: "1px solid var(--neutral-alpha-weak)" }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={form.imageUrl}
                      alt="Project cover preview"
                      style={{ width: "100%", display: "block", objectFit: "cover", aspectRatio: "16 / 9" }}
                    />
                  </div>
                )}
              </Column>
              <Column>
                <label htmlFor="project-status" style={{ display: "block", marginBottom: "4px", fontSize: "0.875rem" }}>
                  Status
                </label>
                <select
                  id="project-status"
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
            </Column>

            {error && (
              <Text variant="body-default-s" onBackground="danger-weak">{error}</Text>
            )}

            <Row gap="m" horizontal="end">
              <Button variant="secondary" size="m" href="/admin">Cancel</Button>
              <Button type="submit" variant="primary" size="m" disabled={loading || isUploading}>
                {loading
                  ? "Creating..."
                  : isUploading
                    ? "Uploading image..."
                  : form.status === "published"
                    ? "Publish Project"
                    : "Save Draft"}
              </Button>
            </Row>
          </Column>
        </form>
      </motion.div>
    </Column>
  );
}

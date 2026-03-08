"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Button,
  Column,
  Heading,
  Input,
  Row,
  Text,
  Textarea,
} from "@once-ui-system/core";
import { motion } from "framer-motion";
import { supabaseUpload } from "@/utils/supabaseUpload";

type ProjectStatus = "draft" | "published";

type ProjectResponse = {
  id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  tags?: string[];
  status: ProjectStatus;
  image?: string;
  imageUrl?: string;
  link?: string;
};

export default function EditProjectPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const projectId = params?.id;

  const [bootLoading, setBootLoading] = useState(true);
  const [saving, setSaving] = useState(false);
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
    status: "draft" as ProjectStatus,
  });

  const hasCover = useMemo(() => Boolean(form.imageUrl), [form.imageUrl]);

  useEffect(() => {
    if (!projectId) return;

    async function load() {
      try {
        const authRes = await fetch("/api/admin/verify", { cache: "no-store" });
        if (!authRes.ok) {
          router.replace("/admin");
          return;
        }

        const res = await fetch(`/api/admin/projects/${projectId}`, { cache: "no-store" });
        const data = await res.json();

        if (!res.ok) {
          setError(data.error || "Failed to load project");
          return;
        }

        const project: ProjectResponse = data.project;
        setForm({
          title: project.title || "",
          slug: project.slug || "",
          description: project.description || "",
          content: project.content || "",
          tags: (project.tags || []).join(", "),
          imageUrl: project.imageUrl || project.image || "",
          link: project.link || "",
          status: project.status || "draft",
        });
      } catch {
        setError("Network error. Please try again.");
      } finally {
        setBootLoading(false);
      }
    }

    load();
  }, [projectId, router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!projectId) return;

    setSaving(true);
    setError("");

    try {
      const res = await fetch(`/api/admin/projects/${projectId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          tags: form.tags
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean),
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to update project");
        return;
      }

      setSuccess(true);
      setTimeout(() => router.push("/admin/projects"), 1000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Update failed");
    } finally {
      setSaving(false);
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

  if (bootLoading) {
    return (
      <Column maxWidth="m" fillWidth paddingY="24">
        <Text>Loading project...</Text>
      </Column>
    );
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
          <Button variant="tertiary" size="s" href="/admin/projects" prefixIcon="arrowRight" style={{ transform: "rotate(180deg)" }}>
            Back
          </Button>
          <Heading variant="display-strong-m">Edit Project</Heading>
        </Row>
      </motion.div>

      {success && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} style={{ width: "100%" }}>
          <Column fillWidth padding="l" background="brand-alpha-weak" border="brand-alpha-medium" radius="l">
            <Text variant="body-default-m" onBackground="brand-strong">
              Project updated successfully! Redirecting...
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
              <Input id="project-title" label="Project Title" value={form.title} onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))} required />
              <Input id="project-slug" label="URL Slug" value={form.slug} onChange={(e) => setForm((prev) => ({ ...prev, slug: e.target.value }))} required />
              <Input id="project-description" label="Short Description" value={form.description} onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))} required />
              <Textarea id="project-content" label="Content (Markdown)" value={form.content} onChange={(e) => setForm((prev) => ({ ...prev, content: e.target.value }))} lines={12} required />

              <Row gap="m" fillWidth s={{ direction: "column" }}>
                <Column flex={1}>
                  <Input id="project-tags" label="Tags (comma-separated)" value={form.tags} onChange={(e) => setForm((prev) => ({ ...prev, tags: e.target.value }))} />
                </Column>
                <Column flex={1}>
                  <Input id="project-link" label="Project Link (optional)" value={form.link} onChange={(e) => setForm((prev) => ({ ...prev, link: e.target.value }))} />
                </Column>
              </Row>

              <Column gap="8">
                <label htmlFor="project-cover-file" style={{ display: "block", marginBottom: "4px", fontSize: "0.875rem" }}>
                  Replace Cover Image
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
                  onChange={(e) => setForm((prev) => ({ ...prev, status: e.target.value as ProjectStatus }))}
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

            {error && <Text variant="body-default-s" onBackground="danger-weak">{error}</Text>}

            <Row gap="m" horizontal="end">
              <Button variant="secondary" size="m" href="/admin/projects">Cancel</Button>
              <Button type="submit" variant="primary" size="m" disabled={saving || isUploading}>
                {saving ? "Saving..." : isUploading ? "Uploading image..." : "Update Project"}
              </Button>
            </Row>
          </Column>
        </form>
      </motion.div>
    </Column>
  );
}

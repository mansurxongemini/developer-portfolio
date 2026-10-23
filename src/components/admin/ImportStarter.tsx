"use client";

import { useState } from "react";
import { Download } from "lucide-react";

/**
 * Shown when the admin list is empty: copies the projects and the article that ship with the
 * code into Firestore, so they can be edited and deleted like anything else.
 */
export function ImportStarter({ onDone, onError }: { onDone: () => void; onError: (message: string) => void }) {
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState<string | null>(null);

  async function run() {
    setBusy(true);
    try {
      const res = await fetch("/api/admin/seed", { method: "POST" });
      const data = await res.json();
      if (!res.ok) {
        onError(data.error || "Import failed");
        return;
      }
      setDone(`Imported ${data.projects} project(s) and ${data.articles} article(s).`);
      onDone();
    } catch (e) {
      onError(e instanceof Error ? e.message : "Network error");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div style={{ display: "grid", gap: 8, justifyItems: "start" }}>
      <span>Nothing is saved yet. The site is showing the content that ships with the code.</span>
      <button
        type="button"
        onClick={run}
        disabled={busy}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          padding: "8px 14px",
          borderRadius: 10,
          border: "1px solid rgba(79,195,179,0.7)",
          background: "rgba(79,195,179,0.2)",
          color: "#fff",
          fontWeight: 600,
          cursor: busy ? "wait" : "pointer",
        }}
      >
        <Download size={15} /> {busy ? "Importing…" : "Import starter content to edit it"}
      </button>
      {done ? <span>{done}</span> : null}
    </div>
  );
}

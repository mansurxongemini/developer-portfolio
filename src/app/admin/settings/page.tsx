"use client";

import { motion } from "framer-motion";

export default function AdminSettingsPage() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      style={{
        border: "1px solid rgba(255,255,255,0.12)",
        borderRadius: "1rem",
        background: "rgba(8, 12, 18, 0.62)",
        padding: "1rem",
      }}
    >
      <p
        style={{
          margin: 0,
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          fontSize: "0.72rem",
          color: "rgba(173,188,208,0.76)",
        }}
      >
        Configuration
      </p>
      <h2 style={{ margin: "0.4rem 0 0", color: "rgba(245,248,252,0.96)" }}>Settings</h2>
      <p style={{ margin: "0.55rem 0 0", color: "rgba(196,209,225,0.86)", fontSize: "0.92rem" }}>
        Theme, profile, and integrations settings can be wired here next.
      </p>
    </motion.section>
  );
}

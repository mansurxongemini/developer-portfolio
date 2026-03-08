"use client";

import { useCallback, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

function generateSessionId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

function getSessionId(): string {
  if (typeof window === "undefined") return "";
  let sessionId = sessionStorage.getItem("analytics_session_id");
  if (!sessionId) {
    sessionId = generateSessionId();
    sessionStorage.setItem("analytics_session_id", sessionId);
  }
  return sessionId;
}

export function AnalyticsTracker() {
  const pathname = usePathname();
  const sessionStart = useRef<number>(Date.now());
  const hasSentSessionEnd = useRef(false);
  const lastSessionEndSentAt = useRef<number>(0);

  const sendAnalytics = useCallback(async (payload: {
    type: "pageview" | "session_start" | "session_end";
    path?: string;
    sessionId: string;
    referrer?: string;
    duration?: number;
  }): Promise<void> => {
    await fetch("/api/analytics/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      cache: "no-store",
      keepalive: true,
    });
  }, []);

  useEffect(() => {
    const sessionId = getSessionId();
    const referrer = document.referrer || "";

    sendAnalytics({ type: "pageview", path: pathname, sessionId, referrer }).catch(() => {
      // Intentionally ignored to avoid breaking UI on telemetry failure.
    });
  }, [pathname, sendAnalytics]);

  useEffect(() => {
    sessionStart.current = Date.now();
    hasSentSessionEnd.current = false;
    lastSessionEndSentAt.current = 0;

    const handleSessionEnd = () => {
      const now = Date.now();
      if (hasSentSessionEnd.current) return;
      if (now - lastSessionEndSentAt.current < 3000) return;

      hasSentSessionEnd.current = true;
      lastSessionEndSentAt.current = now;
      const duration = Math.round((Date.now() - sessionStart.current) / 1000);
      const sessionId = getSessionId();
      sendAnalytics({ type: "session_end", sessionId, duration }).catch(() => {});
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        handleSessionEnd();
      }
    };

    window.addEventListener("beforeunload", handleSessionEnd);
    window.addEventListener("pagehide", handleSessionEnd);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("beforeunload", handleSessionEnd);
      window.removeEventListener("pagehide", handleSessionEnd);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [sendAnalytics]);

  return null;
}

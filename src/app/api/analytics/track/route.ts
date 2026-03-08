import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { createAnalyticsEvent } from "@/lib/firestore-server";

type AnalyticsTrackBody = {
  type?: "pageview" | "session_start" | "session_end";
  path?: string;
  referrer?: string;
  sessionId?: string;
  duration?: number;
};

function normalizePath(path?: string): string {
  if (!path) return "/";
  if (!path.startsWith("/")) return `/${path}`;
  return path;
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as AnalyticsTrackBody;

    if (!body.type || !body.sessionId) {
      return NextResponse.json({ error: "Invalid analytics payload" }, { status: 400 });
    }

    if (!["pageview", "session_start", "session_end"].includes(body.type)) {
      return NextResponse.json({ error: "Unsupported analytics type" }, { status: 400 });
    }

    const userAgent = request.headers.get("user-agent") || "";

    await createAnalyticsEvent({
      type: body.type,
      path: normalizePath(body.path),
      referrer: body.referrer || "",
      userAgent,
      sessionId: body.sessionId,
      duration: typeof body.duration === "number" ? Math.max(0, Math.round(body.duration)) : undefined,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Failed to track analytics" }, { status: 500 });
  }
}

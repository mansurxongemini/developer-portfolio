import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { verifyAdminRequest } from "@/lib/admin-auth";
import { getAdminAnalyticsSummary } from "@/lib/firestore-server";

function calcPercentDelta(current: number, previous: number): number {
  if (previous === 0) return current === 0 ? 0 : 100;
  return Number((((current - previous) / previous) * 100).toFixed(1));
}

export async function GET(request: NextRequest) {
  if (!(await verifyAdminRequest(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const url = new URL(request.url);
    const range = url.searchParams.get("range") || "30d";

    const rangeToDays: Record<string, number> = {
      "7d": 7,
      "30d": 30,
      "90d": 90,
    };

    const days = rangeToDays[range] ?? 30;
    const now = new Date();
    const previousEnd = new Date(now);
    previousEnd.setDate(previousEnd.getDate() - days);

    const [summary, previousSummary] = await Promise.all([
      getAdminAnalyticsSummary(days, now),
      getAdminAnalyticsSummary(days, previousEnd),
    ]);

    const deltas = {
      totalViewsPct: calcPercentDelta(summary.totalViews, previousSummary.totalViews),
      uniqueVisitorsPct: calcPercentDelta(summary.uniqueVisitors, previousSummary.uniqueVisitors),
      avgSessionDurationPct: calcPercentDelta(summary.avgSessionDurationSec, previousSummary.avgSessionDurationSec),
    };

    return NextResponse.json({ summary, previousSummary, deltas, range, days }, { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch analytics";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

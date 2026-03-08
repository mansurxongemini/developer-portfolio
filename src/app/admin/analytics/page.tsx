"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Activity, TrendingDown, TrendingUp } from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import styles from "@/app/admin/analytics/page.module.scss";

type TrendPoint = { date: string; views: number; visitors: number; duration: number };
type SourcePoint = { source: string; visitors: number };
type PagePoint = { page: string; views: number };

interface AnalyticsSummary {
  totalViews: number;
  uniqueVisitors: number;
  avgSessionDurationSec: number;
  trafficSources: SourcePoint[];
  topPages: PagePoint[];
  trend: TrendPoint[];
}

interface AnalyticsDeltas {
  totalViewsPct: number;
  uniqueVisitorsPct: number;
  avgSessionDurationPct: number;
}

type TimeRange = keyof typeof rangeScale;
const rangeScale = { "7d": 7, "30d": 30, "90d": 90 } as const;

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState<TimeRange>("30d");
  const [summary, setSummary] = useState<AnalyticsSummary | null>(null);
  const [deltas, setDeltas] = useState<AnalyticsDeltas | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchAnalytics = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/analytics?range=${timeRange}`, { cache: "no-store" });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to load analytics");
        return;
      }
      setSummary(data.summary as AnalyticsSummary);
      setDeltas((data.deltas ?? null) as AnalyticsDeltas | null);
      setLastUpdated(new Date());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Network error");
    } finally {
      setLoading(false);
    }
  }, [timeRange]);

  useEffect(() => {
    fetchAnalytics();
  }, [fetchAnalytics]);

  const chartData = useMemo(() => summary?.trend || [], [summary]);
  const trafficSources = useMemo(() => summary?.trafficSources || [], [summary]);
  const topPages = useMemo(() => summary?.topPages || [], [summary]);

  const totalViews = useMemo(
    () => summary?.totalViews ?? 0,
    [summary],
  );
  const totalVisitors = useMemo(
    () => summary?.uniqueVisitors ?? 0,
    [summary],
  );
  const avgDuration = useMemo(
    () => summary?.avgSessionDurationSec ?? 0,
    [summary],
  );

  const lastUpdatedText = useMemo(() => {
    if (!lastUpdated) return "--";
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(lastUpdated);
  }, [lastUpdated]);

  const totalViewsDelta = deltas?.totalViewsPct ?? 0;
  const visitorsDelta = deltas?.uniqueVisitorsPct ?? 0;
  const durationDelta = deltas?.avgSessionDurationPct ?? 0;

  const renderDelta = useCallback((value: number) => {
    const isPositive = value >= 0;
    const Icon = isPositive ? TrendingUp : TrendingDown;
    const sign = isPositive ? "+" : "";
    return (
      <span
        style={{
          color: isPositive ? "rgba(134, 239, 172, 0.95)" : "rgba(252, 165, 165, 0.95)",
          display: "inline-flex",
          alignItems: "center",
          gap: "0.25rem",
        }}
      >
        <Icon size={13} /> {`${sign}${value.toFixed(1)}%`}
      </span>
    );
  }, []);

  return (
    <section className={styles.page}>
      {error && (
        <div style={{ background: "#7f1d1d", color: "#fca5a5", padding: "12px 16px", borderRadius: 8, marginBottom: 16, fontSize: 14 }}>
          <strong>Error:</strong> {error}
        </div>
      )}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className={styles.headerCard}
      >
        <div>
          <p className={styles.kicker}>Performance Intelligence</p>
          <h2>Analytics</h2>
          <p>High-level traffic trends with channel and page-level insight.</p>
          <p className={styles.updatedInfo}>Last updated: {loading ? "Updating..." : lastUpdatedText}</p>
        </div>

        <div className={styles.timeRange}>
          <button
            type="button"
            className={styles.refreshButton}
            onClick={() => fetchAnalytics()}
            disabled={loading}
          >
            {loading ? "Refreshing..." : "Refresh"}
          </button>
          {(["7d", "30d", "90d"] as const).map((range) => (
            <button
              key={range}
              type="button"
              className={`${styles.rangeButton} ${timeRange === range ? styles.rangeButtonActive : ""}`}
              onClick={() => setTimeRange(range)}
            >
              {range === "7d" ? "7 Days" : range === "30d" ? "30 Days" : "90 Days"}
            </button>
          ))}
        </div>
      </motion.div>

      <div className={styles.cardGrid}>
        <motion.article
          className={styles.metricCard}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.05 }}
        >
          <p className={styles.metricLabel}>Total Views</p>
          <p className={styles.metricValue}>{loading ? "-" : totalViews.toLocaleString()}</p>
          <p className={styles.metricDelta}>{loading ? <><TrendingUp size={13} /> --</> : renderDelta(totalViewsDelta)}</p>
        </motion.article>

        <motion.article
          className={styles.metricCard}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <p className={styles.metricLabel}>Unique Visitors</p>
          <p className={styles.metricValue}>{loading ? "-" : totalVisitors.toLocaleString()}</p>
          <p className={styles.metricDelta}>{loading ? <><TrendingUp size={13} /> --</> : renderDelta(visitorsDelta)}</p>
        </motion.article>

        <motion.article
          className={styles.metricCard}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.15 }}
        >
          <p className={styles.metricLabel}>Avg Session Duration</p>
          <p className={styles.metricValue}>{loading ? "-" : `${Math.floor(avgDuration / 60)}m ${avgDuration % 60}s`}</p>
          <p className={styles.metricDelta}>{loading ? <><TrendingUp size={13} /> --</> : renderDelta(durationDelta)}</p>
        </motion.article>

        <motion.article
          className={styles.metricCard}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <p className={styles.metricLabel}>Traffic Sources</p>
          <p className={styles.metricValue}>{loading ? "-" : trafficSources.length}</p>
          <p className={styles.metricDelta}><Activity size={13} /> Multi-channel</p>
        </motion.article>
      </div>

      <div className={styles.chartGrid}>
        <motion.section
          className={styles.chartCard}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.08 }}
        >
          <h3 className={styles.cardTitle}>Views and Visitors</h3>
          <p className={styles.cardSubtitle}>Trend over selected period</p>
          <div className={styles.chartFrame}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="viewsGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#38bdf8" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="visitorsGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.28} />
                    <stop offset="95%" stopColor="#22d3ee" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.25)" />
                <XAxis dataKey="date" tick={{ fill: "#cbd5e1", fontSize: 11 }} tickLine={false} axisLine={false} />
                <YAxis tick={{ fill: "#cbd5e1", fontSize: 11 }} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{
                    background: "rgba(10,14,21,0.95)",
                    border: "1px solid rgba(255,255,255,0.14)",
                    borderRadius: "0.7rem",
                    color: "#e2e8f0",
                  }}
                />
                <Area type="monotone" dataKey="views" stroke="#38bdf8" strokeWidth={2} fill="url(#viewsGradient)" />
                <Area type="monotone" dataKey="visitors" stroke="#22d3ee" strokeWidth={2} fill="url(#visitorsGradient)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.section>

        <motion.section
          className={styles.chartCard}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.12 }}
        >
          <h3 className={styles.cardTitle}>Traffic Sources</h3>
          <p className={styles.cardSubtitle}>Channel distribution</p>
          <div className={styles.chartFrame}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={trafficSources}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.25)" />
                <XAxis dataKey="source" tick={{ fill: "#cbd5e1", fontSize: 11 }} tickLine={false} axisLine={false} />
                <YAxis tick={{ fill: "#cbd5e1", fontSize: 11 }} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{
                    background: "rgba(10,14,21,0.95)",
                    border: "1px solid rgba(255,255,255,0.14)",
                    borderRadius: "0.7rem",
                    color: "#e2e8f0",
                  }}
                />
                <Bar dataKey="visitors" fill="#6366f1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.section>
      </div>

      <motion.section
        className={styles.tableCard}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.16 }}
      >
        <h3 className={styles.cardTitle}>Top Pages</h3>
        <p className={styles.cardSubtitle}>Most visited routes in current time range</p>

        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Path</th>
                <th>Views</th>
              </tr>
            </thead>
            <tbody>
              {topPages.map((item) => (
                <tr key={item.page}>
                  <td>{item.page}</td>
                  <td>{(item.views ?? 0).toLocaleString()}</td>
                </tr>
              ))}
              {!loading && topPages.length === 0 && (
                <tr>
                  <td colSpan={2}>No analytics data yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.section>
    </section>
  );
}

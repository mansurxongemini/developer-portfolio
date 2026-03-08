"use client";

import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Eye,
  FileText,
  FolderKanban,
  Sparkles,
} from "lucide-react";
import styles from "@/app/admin/dashboard/page.module.scss";

interface DashboardStats {
  totalViews: number;
  articleCount: number;
  projectCount: number;
}

type StatsArticle = { views?: number };
type StatsProject = { views?: number };

interface ArticlesResponse {
  articles?: StatsArticle[];
}

interface ProjectsResponse {
  projects?: StatsProject[];
}

function formatCount(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return n.toString();
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    totalViews: 0,
    articleCount: 0,
    projectCount: 0,
  });
  const [loading, setLoading] = useState(true);

  const fetchStats = useCallback(async () => {
    setLoading(true);

    try {
      const [articlesRes, projectsRes] = await Promise.all([
        fetch("/api/admin/articles", { cache: "no-store" }),
        fetch("/api/admin/projects", { cache: "no-store" }),
      ]);

      const articlesData: ArticlesResponse = articlesRes.ok
        ? await articlesRes.json()
        : { articles: [] };
      const projectsData: ProjectsResponse = projectsRes.ok
        ? await projectsRes.json()
        : { projects: [] };

      const articles = articlesData.articles ?? [];
      const projects = projectsData.projects ?? [];

      const articleViews = articles.reduce(
        (sum, a) => sum + (a.views ?? 0),
        0,
      );
      const projectViews = projects.reduce(
        (sum, p) => sum + (p.views ?? 0),
        0,
      );

      setStats({
        totalViews: articleViews + projectViews,
        articleCount: articles.length,
        projectCount: projects.length,
      });
    } catch {
      // keep default zeros on error
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  const cards = [
    {
      label: "Total Views",
      value: loading ? "—" : formatCount(stats.totalViews),
      icon: Eye,
    },
    {
      label: "Articles",
      value: loading ? "—" : String(stats.articleCount),
      icon: FileText,
    },
    {
      label: "Projects",
      value: loading ? "—" : String(stats.projectCount),
      icon: FolderKanban,
    },
  ];

  return (
    <section className={styles.page}>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className={styles.hero}
      >
        <p className={styles.kicker}>Premium Command Center</p>
        <h2 className={styles.title}>Your content pulse at a glance</h2>
        <p className={styles.copy}>
          Track performance, monitor publishing velocity, and keep your portfolio engine in sync.
        </p>
      </motion.div>

      <div className={styles.cardGrid}>
        {cards.map((card, index) => {
          const Icon = card.icon;

          return (
            <motion.article
              key={card.label}
              className={styles.card}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.08 * index }}
            >
              <div className={styles.cardHead}>
                <div className={styles.iconWrap}>
                  <Icon size={18} />
                </div>
                <span className={styles.label}>{card.label}</span>
              </div>
              <p className={styles.value}>{card.value}</p>
            </motion.article>
          );
        })}
      </div>

      <motion.section
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.25 }}
        className={styles.ctaPanel}
      >
        <div>
          <p className={styles.ctaKicker}>Workflow</p>
          <h3>Ready to publish another winning post?</h3>
          <p>
            Jump into Articles to draft the next piece or open Analytics for deeper trends.
          </p>
        </div>
        <div className={styles.sparkWrap}>
          <Sparkles size={22} />
        </div>
      </motion.section>
    </section>
  );
}

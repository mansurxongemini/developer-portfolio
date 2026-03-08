"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  BriefcaseBusiness,
  ChevronLeft,
  ChevronRight,
  FileText,
  ImageIcon,
  LayoutDashboard,
  Settings,
  X,
} from "lucide-react";
import styles from "@/components/admin/AdminSidebar.module.scss";

export type AdminNavItem = {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
};

const NAV_ITEMS: AdminNavItem[] = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Articles", href: "/admin/articles", icon: FileText },
  { label: "Projects", href: "/admin/projects", icon: BriefcaseBusiness },
  { label: "Gallery", href: "/admin/gallery", icon: ImageIcon },
  { label: "Analytics", href: "/admin/analytics", icon: BarChart3 },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

type AdminSidebarProps = {
  collapsed: boolean;
  mobileOpen: boolean;
  onToggleCollapsed: () => void;
  onCloseMobile: () => void;
};

export function AdminSidebar({
  collapsed,
  mobileOpen,
  onToggleCollapsed,
  onCloseMobile,
}: AdminSidebarProps) {
  const pathname = usePathname();

  return (
    <>
      <aside className={`${styles.sidebar} ${collapsed ? styles.collapsed : ""}`}>
        <div className={styles.brandRow}>
          <div className={styles.brandDot} />
          <div className={styles.brandLabel}>CMS Control</div>
          <button
            type="button"
            className={styles.iconButton}
            onClick={onToggleCollapsed}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        </div>

        <nav className={styles.nav} aria-label="Admin navigation">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`${styles.navLink} ${active ? styles.navLinkActive : ""}`}
                title={collapsed ? item.label : undefined}
              >
                <Icon className={styles.navIcon} size={18} />
                <span className={styles.navLabel}>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      <div className={`${styles.mobileBackdrop} ${mobileOpen ? styles.mobileBackdropOpen : ""}`} onClick={onCloseMobile} />

      <aside className={`${styles.mobileSidebar} ${mobileOpen ? styles.mobileSidebarOpen : ""}`}>
        <div className={styles.brandRow}>
          <div className={styles.brandDot} />
          <div className={styles.brandLabel}>CMS Control</div>
          <button type="button" className={styles.iconButton} onClick={onCloseMobile} aria-label="Close menu">
            <X size={16} />
          </button>
        </div>

        <nav className={styles.nav} aria-label="Mobile admin navigation">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`${styles.navLink} ${active ? styles.navLinkActive : ""}`}
                onClick={onCloseMobile}
              >
                <Icon className={styles.navIcon} size={18} />
                <span className={styles.navLabel}>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}

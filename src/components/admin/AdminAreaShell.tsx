"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { LogOut, Menu } from "lucide-react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import styles from "@/components/admin/AdminAreaShell.module.scss";

type AdminAreaShellProps = {
  children: React.ReactNode;
};

const PAGE_TITLES: Record<string, string> = {
  "/admin/dashboard": "Dashboard",
  "/admin/articles": "Articles",
  "/admin/projects": "Projects",
  "/admin/gallery": "Gallery",
  "/admin/analytics": "Analytics",
  "/admin/settings": "Settings",
};

export function AdminAreaShell({ children }: AdminAreaShellProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  const isLoginPage = pathname === "/admin";

  useEffect(() => {
    let cancelled = false;

    async function verifyAdmin() {
      if (isLoginPage) {
        setCheckingAuth(false);
        return;
      }

      try {
        const res = await fetch("/api/admin/verify", { cache: "no-store" });
        if (cancelled) return;

        if (!res.ok) {
          setAuthorized(false);
          setCheckingAuth(false);
          router.replace("/admin");
          return;
        }

        setAuthorized(true);
      } catch {
        if (!cancelled) {
          setAuthorized(false);
          router.replace("/admin");
        }
      } finally {
        if (!cancelled) {
          setCheckingAuth(false);
        }
      }
    }

    verifyAdmin();
    return () => {
      cancelled = true;
    };
  }, [isLoginPage, pathname, router]);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const pageTitle = useMemo(() => {
    if (!pathname) return "Admin";

    if (PAGE_TITLES[pathname]) {
      return PAGE_TITLES[pathname];
    }

    const segments = pathname.split("/").filter(Boolean);
    const lastSegment = segments[segments.length - 1] ?? "Admin";
    return lastSegment
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }, [pathname]);

  async function handleSignOut() {
    await fetch("/api/admin/auth", { method: "DELETE" });
    router.replace("/admin");
  }

  if (isLoginPage) {
    return <>{children}</>;
  }

  if (checkingAuth || !authorized) {
    return (
      <section className={styles.authLoading} data-theme="dark">
        <p>Preparing your workspace...</p>
      </section>
    );
  }

  return (
    <section className={styles.shell} data-theme="dark">
      <AdminSidebar
        collapsed={collapsed}
        mobileOpen={mobileOpen}
        onToggleCollapsed={() => setCollapsed((current) => !current)}
        onCloseMobile={() => setMobileOpen(false)}
      />

      <div className={styles.mainArea}>
        <header className={styles.topbar}>
          <div className={styles.topbarLeft}>
            <button
              type="button"
              className={styles.mobileMenuButton}
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={18} />
            </button>
            <div>
              <p className={styles.kicker}>Portfolio CMS</p>
              <h1 className={styles.title}>{pageTitle}</h1>
            </div>
          </div>

          <button type="button" className={styles.logoutButton} onClick={handleSignOut}>
            <LogOut size={16} />
            <span>Sign Out</span>
          </button>
        </header>

        <main className={styles.content}>{children}</main>
      </div>
    </section>
  );
}

"use client";

import { Fragment, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useI18n } from "@/components/I18nProvider";
import { MotionEngine } from "@/components/dossier/MotionEngine";
import { PageMotion } from "@/components/dossier/PageMotion";
import { DossierCursor } from "@/components/dossier/DossierCursor";
import { DossierHeader } from "@/components/dossier/DossierHeader";
import { DossierMenu } from "@/components/dossier/DossierMenu";
import { DossierFooter } from "@/components/dossier/DossierFooter";
import { RowPreview } from "@/components/dossier/RowPreview";

const HOME_RE = /^\/(uz|en|ru)?\/?$/;

const REVEAL_SEL = "[data-redact], [data-clip], [data-img-reveal], .stamp[data-stamp]";
const PENDING_SEL =
  "main [data-redact]:not(.is-ready), main [data-clip]:not(.is-ready), main [data-img-reveal]:not(.is-ready)";

/**
 * RouteGuard shows a spinner until its client check settles, so the home sections are not in
 * the DOM yet when the shell first mounts. The home engine waits for the hero before it starts.
 */
function MotionEngineHost() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let tries = 0;
    let t: ReturnType<typeof setTimeout> | undefined;
    const check = () => {
      if (document.getElementById("hero") || tries++ > 100) {
        setReady(true);
        return;
      }
      t = setTimeout(check, 40);
    };
    check();
    return () => {
      if (t) clearTimeout(t);
    };
  }, []);

  return ready ? <MotionEngine /> : null;
}

/**
 * Inner pages render their content after hydration (locale, data fetches), so the
 * motion layer waits for the first reveal targets and re-initialises when late ones
 * appear. Without this the targets stay hidden until the CSS safety net fires.
 */
function PageMotionHost({ pathname }: { pathname: string }) {
  const [rev, setRev] = useState<number | null>(null);

  useEffect(() => {
    setRev(null);
    let tries = 0;
    let t: ReturnType<typeof setTimeout> | undefined;
    const waitForContent = () => {
      if (document.querySelector("main " + REVEAL_SEL.split(", ").join(", main ")) || tries++ > 40) {
        setRev(0);
        return;
      }
      t = setTimeout(waitForContent, 50);
    };
    waitForContent();
    return () => {
      if (t) clearTimeout(t);
    };
  }, [pathname]);

  useEffect(() => {
    if (rev === null) return;
    let debounce: ReturnType<typeof setTimeout> | undefined;
    let remounts = 0;
    const main = document.querySelector("main");
    if (!main) return;
    const mo = new MutationObserver(() => {
      if (debounce) clearTimeout(debounce);
      debounce = setTimeout(() => {
        if (remounts < 6 && document.querySelector(PENDING_SEL)) {
          remounts++;
          setRev((r) => (r ?? 0) + 1);
        }
      }, 160);
    });
    mo.observe(main, { childList: true, subtree: true });
    return () => {
      mo.disconnect();
      if (debounce) clearTimeout(debounce);
    };
  }, [rev === null, pathname]);

  return rev === null ? null : <PageMotion key={pathname + ":" + rev} />;
}

/**
 * SiteShell — single dossier chrome for the whole public site.
 * /admin/* renders untouched (admin keeps its own design).
 * Home routes keep MotionEngine; every other page gets PageMotion,
 * the same header / fullscreen menu / cursor / footer.
 */
export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() ?? "/";

  const isAdmin = pathname === "/admin" || pathname.startsWith("/admin/");
  const isHome = HOME_RE.test(pathname);
  const { locale } = useI18n();

  useEffect(() => {
    if (isAdmin) return;
    const body = document.body;
    // Keep body theme in sync after client-side navigation.
    body.dataset.theme = isHome ? "ink-deep" : "bone";
    if (isHome) return;
    // Inner pages are paper-only: if a stale scroll handler from the home page ever repaints
    // the ground dark, put it back at once so dark text never lands on a dark page.
    const mo = new MutationObserver(() => {
      if (body.dataset.theme !== "bone") body.dataset.theme = "bone";
    });
    mo.observe(body, { attributes: true, attributeFilter: ["data-theme"] });
    return () => mo.disconnect();
  }, [isAdmin, isHome, pathname]);

  if (isAdmin) return <>{children}</>;

  return (
    <div id="top" className={isHome ? "shell shell--home" : "shell shell--page"}>
      {isHome ? <MotionEngineHost key={"m-" + locale} /> : <PageMotionHost key={"p-" + locale} pathname={pathname} />}
      <DossierCursor />
      <RowPreview />
      <DossierHeader />
      <DossierMenu />
      {isHome ? (
        <Fragment key={"c-" + locale}>{children}</Fragment>
      ) : (
        <main className="page-shell" id="main" key={"c-" + locale}>
          {children}
        </main>
      )}
      {/* Home renders its own closed-stamp .site-foot inside DossierContact. */}
      {isHome ? null : <DossierFooter />}
    </div>
  );
}

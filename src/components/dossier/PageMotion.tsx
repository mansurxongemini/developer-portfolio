"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

/**
 * PageMotion — lightweight motion engine for inner pages (/work, /blog, /about…).
 * Safe subset of MotionEngine: Lenis + ScrollTrigger sync, header hide/show,
 * fullscreen menu, Tashkent clock, cursor, magnetic, clip/redaction reveals.
 * Every block guards missing elements, so pages without dossier sections
 * never throw. Respects prefers-reduced-motion and touch fallbacks.
 */
export function PageMotion() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const doc = document;
    const root = doc.documentElement;
    const body = doc.body;

    // Every global listener goes through here so it can be removed when the engine unmounts;
    // otherwise a left-over handler keeps repainting the next page (e.g. the old theme sync).
    const disposers: Array<() => void> = [];
    const listen = (
      target: EventTarget,
      type: string,
      fn: (e: any) => void,
      opts?: boolean | AddEventListenerOptions,
    ) => {
      target.addEventListener(type, fn, opts);
      disposers.push(() => target.removeEventListener(type, fn, opts));
    };
    const listenST = (ev: string, fn: () => void) => {
      ScrollTrigger.addEventListener(ev as any, fn);
      disposers.push(() => ScrollTrigger.removeEventListener(ev as any, fn));
    };

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    const $ = (sel: string, ctx?: HTMLElement | Document) =>
      (ctx || doc).querySelector(sel) as HTMLElement | null;
    const $$ = (sel: string, ctx?: HTMLElement | Document): HTMLElement[] =>
      Array.prototype.slice.call((ctx || doc).querySelectorAll(sel));

    // Inner pages always sit on the bone paper ground.
    body.setAttribute("data-theme", "bone");
    $$("[data-year]").forEach((el) => {
      el.textContent = String(new Date().getFullYear());
    });

    // Tashkent clock
    const clockEls = $$("[data-clock]");
    let clockInterval: ReturnType<typeof setInterval> | undefined;
    if (clockEls.length) {
      const tick = () => {
        const t = new Date().toLocaleTimeString("en-GB", {
          timeZone: "Asia/Tashkent",
          hour12: false,
        });
        clockEls.forEach((el) => {
          el.textContent = t;
        });
      };
      tick();
      clockInterval = setInterval(tick, 1000);
    }

    // Reduced motion: reveal everything instantly, no smoothing.
    if (prefersReduced) {
      root.classList.add("no-motion");
      $$(".bar").forEach((b) => {
        b.style.transform = "scaleX(0)";
      });
      $$("[data-clip], [data-img-reveal]").forEach((el) => {
        el.style.clipPath = "none";
        el.classList.add("is-ready", "is-revealed");
      });
      $$("[data-img-reveal] img").forEach((im) => {
        (im as HTMLElement).style.transform = "none";
      });
      $$("[data-redact]").forEach((el) => el.classList.add("is-ready", "is-revealed"));
      $$(".stamp").forEach((el) => {
        (el as HTMLElement).style.opacity = "1";
        (el as HTMLElement).style.visibility = "visible";
        el.classList.add("is-ready", "is-stamped");
      });
      root.classList.add("js-ok");
      return () => {
        if (clockInterval) clearInterval(clockInterval);
      };
    }

    let ctx: gsap.Context | undefined;
    let lenis: Lenis | null = null;

    try {
      gsap.registerPlugin(ScrollTrigger);
      gsap.config({ nullTargetWarn: false });
      ScrollTrigger.config({ ignoreMobileResize: true });

      ctx = gsap.context(() => {
        // Splitter for redaction labels
        function splitRedact(el: HTMLElement): HTMLElement[] {
          if (el.classList.contains("is-ready")) return $$(".bar", el);
          const words = (el.textContent || "").trim().split(/\s+/);
          el.textContent = "";
          const frag = doc.createDocumentFragment();
          const bars: HTMLElement[] = [];
          words.forEach((w, i) => {
            const span = doc.createElement("span");
            span.className = "word";
            span.appendChild(doc.createTextNode(w));
            const bar = doc.createElement("i");
            bar.className = "bar";
            bar.setAttribute("aria-hidden", "true");
            span.appendChild(bar);
            bars.push(bar);
            frag.appendChild(span);
            if (i < words.length - 1) frag.appendChild(doc.createTextNode(" "));
          });
          el.appendChild(frag);
          el.classList.add("is-ready");
          return bars;
        }

        // Lenis smooth scroll
        try {
          lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
          lenis.on("scroll", ScrollTrigger.update);
          gsap.ticker.add((time) => {
            lenis?.raf(time * 1000);
          });
          gsap.ticker.lagSmoothing(0);
        } catch {
          lenis = null;
        }

        function scrollToTarget(target: HTMLElement) {
          if (lenis) {
            lenis.scrollTo(target as unknown as string, {
              offset: 0,
              duration: 1.2,
              easing: (t: number) => 1 - Math.pow(1 - t, 4),
            } as never);
          } else {
            target.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }

        // Same-page anchors (incl. footer back-to-top)
        const toTop = $("[data-to-top]");
        if (toTop) {
          toTop.addEventListener("click", (e) => {
            e.preventDefault();
            if (lenis) lenis.scrollTo(0, { duration: 1.2 } as never);
            else window.scrollTo({ top: 0, behavior: "smooth" });
          });
        }
        $$('a[href^="#"]').forEach((a) => {
          if (a.hasAttribute("data-to-top")) return;
          a.addEventListener("click", (e) => {
            const id = a.getAttribute("href");
            if (!id || id.length <= 1) return;
            const target = $(id);
            if (!target) return;
            e.preventDefault();
            closeMenu();
            scrollToTarget(target);
            if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
            target.focus({ preventScroll: true });
          });
        });

        // Header hide / show on scroll
        const header = $("[data-header]");
        let lastY = 0;
        const onScrollY = (y: number) => {
          if (!header) return;
          if (y > 140 && y > lastY + 4) header.classList.add("is-hidden");
          else if (y < lastY - 4) header.classList.remove("is-hidden");
          lastY = y;
        };
        if (header && lenis) {
          lenis.on("scroll", (e: { scroll: number }) => onScrollY(e.scroll));
          header.addEventListener("focusin", () => {
            header.classList.remove("is-hidden");
          });
        } else if (header) {
          listen(window, "scroll", () => onScrollY(window.scrollY), {
            passive: true,
          });
        }

        // Menu open / close
        const menu = $("[data-menu]");
        const menuToggle = $("[data-menu-toggle]");
        let menuOpen = !!menu && menu.classList.contains("is-open");
        function lockScroll() {
          root.classList.add("is-locked");
          lenis?.stop();
        }
        function unlockScroll() {
          root.classList.remove("is-locked");
          lenis?.start();
        }
        function openMenu() {
          if (!menu || menuOpen) return;
          menuOpen = true;
          menu.classList.add("is-open");
          menu.setAttribute("aria-hidden", "false");
          menuToggle?.setAttribute("aria-expanded", "true");
          lockScroll();
          const closeBtn = $("[data-menu-close]", menu);
          if (closeBtn) closeBtn.focus();
          gsap.fromTo(
            "[data-menu-link]",
            { clipPath: "inset(0 0 100% 0)", y: 10 },
            {
              clipPath: "inset(0 0 0% 0)",
              y: 0,
              duration: 0.6,
              stagger: 0.05,
              ease: "expo.out",
              delay: 0.15,
              clearProps: "clipPath",
            },
          );
        }
        function closeMenu() {
          if (!menu || !menuOpen) return;
          menuOpen = false;
          menu.classList.remove("is-open");
          menu.setAttribute("aria-hidden", "true");
          menuToggle?.setAttribute("aria-expanded", "false");
          unlockScroll();
          if (menuToggle) menuToggle.focus();
        }
        if (menu && menuToggle) {
          menuToggle.onclick = () => {
            if (menuOpen) closeMenu();
            else openMenu();
          };
          $$("[data-menu-close]", menu).forEach((b) => {
            b.onclick = () => closeMenu();
          });
          $$("[data-menu-link]", menu).forEach((a) => {
            a.onclick = () => closeMenu();
          });
          listen(doc, "keydown", (e) => {
            if (e.key === "Escape" && menuOpen) closeMenu();
          });
        }

        // Redaction reveals (labels + scrub paragraphs)
        $$("[data-redact]").forEach((el) => {
          const bars = splitRedact(el);
          if (el.getAttribute("data-redact-mode") === "scrub") {
            gsap.to(bars, {
              scaleX: 0,
              stagger: 0.045,
              ease: "none",
              scrollTrigger: {
                trigger: el,
                start: "top 80%",
                end: "bottom 45%",
                scrub: 0.6,
              },
              onComplete: () => el.classList.add("is-revealed"),
            });
            return;
          }
          const head = el.closest(".sec-head");
          const headStamp = head
            ? ($("[data-stamp]", head as HTMLElement) as HTMLElement | null)
            : null;
          gsap.to(bars, {
            scaleX: 0,
            duration: 0.6,
            stagger: 0.05,
            ease: "expo.out",
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
            onComplete: () => {
              el.classList.add("is-revealed");
              if (headStamp && !headStamp.classList.contains("is-stamped")) {
                gsap.fromTo(
                  headStamp,
                  { scale: 1.6, autoAlpha: 0 },
                  { scale: 1, autoAlpha: 1, duration: 0.3, ease: "power4.in" },
                );
                headStamp.classList.add("is-stamped");
              }
            },
          });
        });

        // Clip reveals
        const clipEls = $$("[data-clip]");
        clipEls.forEach((el) => {
          gsap.set(el, { clipPath: "inset(0 0 100% 0)" });
          el.classList.add("is-ready");
        });
        if (clipEls.length) {
          ScrollTrigger.batch(clipEls, {
            start: "top 90%",
            once: true,
            onEnter: (batch) => {
              gsap.to(batch as HTMLElement[], {
                clipPath: "inset(0% 0% 0% 0%)",
                duration: 0.75,
                ease: "expo.out",
                stagger: 0.06,
                onComplete: () =>
                  (batch as HTMLElement[]).forEach((el) =>
                    el.classList.add("is-revealed"),
                  ),
              });
            },
          });
        }

        // Image curtain reveals
        $$("[data-img-reveal]").forEach((fig) => {
          const img = $("img", fig);
          gsap.set(fig, { clipPath: "inset(100% 0 0 0)" });
          if (img) gsap.set(img, { scale: 1.15 });
          fig.classList.add("is-ready");
          const tl = gsap.timeline({
            scrollTrigger: { trigger: fig, start: "top 88%", once: true },
          });
          tl.to(fig, {
            clipPath: "inset(0% 0% 0% 0)",
            duration: 1.1,
            ease: "expo.out",
          }, 0);
          if (img) tl.to(img, { scale: 1, duration: 1.4, ease: "expo.out" }, 0);
          tl.add(() => fig.classList.add("is-revealed"), 0.7);
        });

        // Hung frames: tilt, straighten on hover (fine pointer)
        if (finePointer) {
          $$("[data-frame]").forEach((frame) => {
            const tilt = parseFloat(frame.getAttribute("data-tilt") || "0");
            gsap.set(frame, { rotation: tilt });
            frame.addEventListener("pointerenter", () => {
              gsap.to(frame, {
                rotation: 0,
                duration: 1.1,
                ease: "elastic.out(1, 0.55)",
                overwrite: "auto",
              });
            });
            frame.addEventListener("pointerleave", () => {
              gsap.to(frame, {
                rotation: tilt,
                duration: 0.8,
                ease: "expo.out",
                overwrite: "auto",
              });
            });
          });
        }

        // Custom cursor (dot + tag), fine pointer only
        if (finePointer) {
          const cursor = $(".cursor");
          if (cursor) {
            const dot = $(".cursor__dot", cursor);
            const bar = $(".cursor__bar", cursor);
            const tag = $(".cursor__tag", cursor) as HTMLElement | null;
            const cx = gsap.quickTo(cursor, "x", { duration: 0.18, ease: "power3.out" });
            const cy = gsap.quickTo(cursor, "y", { duration: 0.18, ease: "power3.out" });
            listen(window, "pointermove", (e) => {
              cx(e.clientX);
              cy(e.clientY);
            });
            const tagFor = (el: Element | null): string | null => {
              if (!el || !(el instanceof HTMLElement)) return null;
              if (el.hasAttribute("data-cursor")) return el.getAttribute("data-cursor");
              const link = el.closest("a, button");
              if (link && link instanceof HTMLElement && link.hasAttribute("data-cursor"))
                return link.getAttribute("data-cursor");
              return null;
            };
            listen(doc, "pointerover", (e) => {
              const t = e.target as Element;
              const label = tagFor(t);
              if (label && tag) {
                tag.textContent = label;
                cursor.classList.add("is-tag");
              } else {
                cursor.classList.remove("is-tag");
              }
              const interactive = (t as HTMLElement).closest?.("a, button");
              if (dot) dot.style.transform = interactive ? "scale(0.6)" : "";
              if (bar)
                bar.style.transform =
                  (t as HTMLElement).closest?.("p, li, h1, h2, h3") && !interactive
                    ? "scaleY(1)"
                    : "";
            });
            listen(doc, "pointerdown", () =>
              cursor.classList.add("is-press"),
            );
            listen(doc, "pointerup", () =>
              cursor.classList.remove("is-press"),
            );
          }

          // Magnetic pull
          $$("[data-magnetic]").forEach((el) => {
            const xTo = gsap.quickTo(el, "x", { duration: 0.4, ease: "power3.out" });
            const yTo = gsap.quickTo(el, "y", { duration: 0.4, ease: "power3.out" });
            el.addEventListener("pointermove", (e: PointerEvent) => {
              const r = el.getBoundingClientRect();
              xTo((e.clientX - (r.left + r.width / 2)) * 0.25);
              yTo((e.clientY - (r.top + r.height / 2)) * 0.25);
            });
            el.addEventListener("pointerleave", () => {
              xTo(0);
              yTo(0);
            });
          });
        }

        ScrollTrigger.refresh();
      });
      root.classList.add("js-ok");
    } catch (err) {
      if (window.console && console.error) console.error("PageMotion fallback:", err);
      root.classList.add("no-motion");
      $$("[data-clip], [data-img-reveal]").forEach((el) => {
        el.style.clipPath = "none";
        el.classList.add("is-ready", "is-revealed");
      });
      $$(".bar").forEach((b) => {
        (b as HTMLElement).style.transform = "scaleX(0)";
      });
      root.classList.add("js-ok");
    }

    return () => {
      disposers.forEach((d) => d());
      if (clockInterval) clearInterval(clockInterval);
      if (ctx) ctx.revert();
      if (lenis) lenis.destroy();
      gsap.ticker.lagSmoothing(1);
    };
  }, []);

  return null;
}

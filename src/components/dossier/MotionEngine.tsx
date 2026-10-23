"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

export function MotionEngine() {
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

    // Helper functions
    const $ = (sel: string, ctx?: HTMLElement | Document) => (ctx || doc).querySelector(sel);
    const $$ = (sel: string, ctx?: HTMLElement | Document): HTMLElement[] =>
      Array.prototype.slice.call((ctx || doc).querySelectorAll(sel));
    const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));
    const pad2 = (n: number) => (n < 10 ? "0" : "") + n;
    const debounce = (fn: (...args: any[]) => void, wait: number) => {
      let t: NodeJS.Timeout;
      return (...args: any[]) => {
        clearTimeout(t);
        t = setTimeout(() => fn(...args), wait);
      };
    };
    const inViewport = (el: HTMLElement, margin = 0) => {
      const r = el.getBoundingClientRect();
      return (
        r.bottom > -margin &&
        r.top < window.innerHeight + margin &&
        r.right > 0 &&
        r.left < window.innerWidth
      );
    };
    const jitter = (i: number) => {
      const x = Math.sin(i * 12.9898 + 78.233) * 43758.5453;
      return (x - Math.floor(x)) * 2 - 1;
    };

    // Redaction splitter
    function splitRedact(el: HTMLElement): HTMLElement[] {
      if (el.classList.contains("is-ready")) return $$(".bar", el);
      const mode = el.getAttribute("data-redact-mode") || "label";
      const words = (el.textContent || "").trim().split(/\s+/);
      const joiner = mode === "hero" ? "\u00A0" : " ";
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
        if (i < words.length - 1) frag.appendChild(doc.createTextNode(joiner));
      });

      el.appendChild(frag);
      el.classList.add("is-ready");
      return bars;
    }

    // Split text into characters for repulsion
    function splitChars(el: HTMLElement): HTMLElement[] {
      const chars: HTMLElement[] = [];
      function walk(node: Node) {
        Array.prototype.slice.call(node.childNodes).forEach((n: Node) => {
          if (n.nodeType === 3) {
            const text = n.textContent || "";
            if (!text.trim()) return;
            const frag = doc.createDocumentFragment();
            for (let i = 0; i < text.length; i++) {
              const s = doc.createElement("span");
              s.className = "char";
              s.textContent = text[i];
              frag.appendChild(s);
              chars.push(s);
            }
            node.replaceChild(frag, n);
          } else if (
            n.nodeType === 1 &&
            !(n as HTMLElement).classList.contains("bar") &&
            !(n as HTMLElement).classList.contains("char")
          ) {
            walk(n);
          }
        });
      }
      walk(el);
      return chars;
    }

    // Tashkent Clock
    let clockInterval: NodeJS.Timeout;
    function startClock() {
      const els = $$("[data-clock]");
      if (!els.length) return;
      function tick() {
        const t = new Date().toLocaleTimeString("en-GB", {
          timeZone: "Asia/Tashkent",
          hour12: false,
        });
        els.forEach((el) => {
          el.textContent = t;
        });
      }
      tick();
      clockInterval = setInterval(tick, 1000);
    }
    $$("[data-year]").forEach((el) => {
      el.textContent = String(new Date().getFullYear());
    });

    // Scroll locking
    let lenis: Lenis | null = null;
    let lockCount = 0;
    function lockScroll() {
      lockCount++;
      if (lockCount === 1) {
        root.classList.add("is-locked");
        if (lenis) lenis.stop();
      }
    }
    function unlockScroll() {
      lockCount = Math.max(0, lockCount - 1);
      if (lockCount === 0) {
        root.classList.remove("is-locked");
        if (lenis) lenis.start();
      }
    }

    const FOCUSABLE =
      'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';
    function trapFocus(container: HTMLElement, e: KeyboardEvent) {
      if (e.key !== "Tab") return;
      const items = $$(FOCUSABLE, container).filter((el) => el.offsetParent !== null);
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && doc.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && doc.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    // Emergency reveal
    function emergencyReveal(err?: any) {
      if (err && window.console && console.error) {
        console.error("Motion fallback activated:", err);
      }
      root.classList.add("no-motion");
      $$(".bar").forEach((b) => {
        b.style.transform = "scaleX(0)";
      });
      $$("[data-clip], [data-img-reveal]").forEach((el) => {
        el.style.clipPath = "none";
        el.classList.add("is-ready", "is-revealed");
      });
      $$("[data-img-reveal] img").forEach((im) => {
        im.style.transform = "none";
      });
      $$(".stamp, [data-award], .viewer__frame").forEach((el) => {
        el.style.opacity = "1";
        el.style.visibility = "visible";
        el.classList.add("is-ready");
      });
      $$(".hero, .contact").forEach((el) => {
        el.style.setProperty("--lit", "1");
      });
      $$(".vault__leaf").forEach((l) => {
        l.style.transform = "scaleX(0)";
      });
      const seam = $("[data-door-seam]") as HTMLElement;
      if (seam) seam.style.opacity = "0";
      const glow = $(".vault__glow") as HTMLElement;
      if (glow) glow.style.opacity = "1";
      root.classList.remove("is-locked");
      root.classList.add("js-ok");
    }

    // REDUCED MOTION PATH
    if (prefersReduced) {
      emergencyReveal();
      startClock();
      return () => {
        clearInterval(clockInterval);
      };
    }

    // FULL MOTION GSAP CONTEXT
    let ctx: gsap.Context;
    try {
      gsap.registerPlugin(ScrollTrigger);
      gsap.config({ nullTargetWarn: false });
      ScrollTrigger.config({ ignoreMobileResize: true });

      ctx = gsap.context(() => {
        // 1. Initial DOM preparation
        $$("[data-redact]").forEach(splitRedact);

        // Odometers
        const odometers = $$(".odo").map((el) => {
          const target = parseInt(el.getAttribute("data-odo") || "0", 10);
          const padN = parseInt(el.getAttribute("data-odo-pad") || "0", 10);
          let str = String(target);
          while (str.length < padN) str = "0" + str;
          el.textContent = "";

          const sr = doc.createElement("span");
          sr.className = "sr-only";
          sr.textContent = str;
          el.appendChild(sr);

          const cols: { col: HTMLElement; d: number }[] = [];
          str.split("").forEach((d) => {
            const wrap = doc.createElement("span");
            wrap.className = "odo__d";
            wrap.setAttribute("aria-hidden", "true");
            const col = doc.createElement("span");
            col.className = "odo__col";
            for (let k = 0; k <= 9; k++) {
              const sp = doc.createElement("span");
              sp.textContent = String(k);
              col.appendChild(sp);
            }
            wrap.appendChild(col);
            el.appendChild(wrap);
            cols.push({ col, d: parseInt(d, 10) });
          });

          el.setAttribute("role", "img");
          el.setAttribute("aria-label", str);
          return { el, cols };
        });

        function sizeOdometers() {
          odometers.forEach((o) => {
            o.cols.forEach((c) => {
              const range = doc.createRange();
              const digitSpan = c.col.children[c.d];
              if (digitSpan) {
                range.selectNodeContents(digitSpan);
                const w = range.getBoundingClientRect().width;
                if (w && c.col.parentNode) {
                  (c.col.parentNode as HTMLElement).style.width = Math.ceil(w) + "px";
                }
              }
            });
          });
        }
        sizeOdometers();
        if (doc.fonts && doc.fonts.ready) doc.fonts.ready.then(sizeOdometers);
        listen(window, "resize", debounce(sizeOdometers, 200));

        // 2. Lenis Smooth Scroll
        lenis = new Lenis({ lerp: 0.08, smoothWheel: true });
        lenis.on("scroll", ScrollTrigger.update);
        gsap.ticker.add((time) => {
          lenis?.raf(time * 1000);
        });
        gsap.ticker.lagSmoothing(0);

        function scrollTo(targetId: string, opts?: any) {
          if (!lenis) return;
          lenis.scrollTo(
            targetId,
            Object.assign(
              {
                offset: 0,
                duration: 1.3,
                easing: (t: number) => 1 - Math.pow(1 - t, 4),
              },
              opts || {},
            ),
          );
        }

        $$('a[href^="#"]').forEach((a) => {
          a.addEventListener("click", (e) => {
            const id = a.getAttribute("href");
            if (!id || id.length <= 1) return;
            const target = $(id) as HTMLElement;
            if (!target) return;
            e.preventDefault();
            closeMenu();
            scrollTo(id);
            if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
            target.focus({ preventScroll: true });
          });
        });

        // 3. Theme Section Switching & Folder Tabs
        const themeSections = $$("[data-theme-trigger]");
        const tabLinks = $$("[data-tabs] .tabs__tab");

        function applyTheme(sec: HTMLElement) {
          const themeName = sec.getAttribute("data-theme-trigger") || "ink-deep";
          body.setAttribute("data-theme", themeName);
          const target = sec.getAttribute("data-tab-target");
          tabLinks.forEach((a) => {
            if (a.getAttribute("data-tab") === target) {
              a.setAttribute("aria-current", "true");
            } else {
              a.removeAttribute("aria-current");
            }
          });
        }

        function syncTheme() {
          const line = window.innerHeight * 0.55;
          let chosen: HTMLElement | null = null;
          themeSections.forEach((sec) => {
            const r = sec.getBoundingClientRect();
            if (r.top <= line && r.bottom >= line) chosen = sec;
          });
          if (!chosen && window.scrollY <= 0) chosen = themeSections[0];
          if (chosen) applyTheme(chosen);
        }

        themeSections.forEach((sec) => {
          ScrollTrigger.create({
            trigger: sec,
            start: "top 55%",
            end: "bottom 55%",
            onEnter: () => applyTheme(sec),
            onEnterBack: () => applyTheme(sec),
          });
        });
        syncTheme();
        listenST("refresh", syncTheme);

        // 4. Header Hide / Show on Scroll
        const header = $("[data-header]") as HTMLElement;
        let lastY = 0;
        if (header && lenis) {
          lenis.on("scroll", (e: any) => {
            const y = e.scroll;
            if (y > 140 && y > lastY + 4) header.classList.add("is-hidden");
            else if (y < lastY - 4) header.classList.remove("is-hidden");
            lastY = y;
          });
          header.addEventListener("focusin", () => {
            header.classList.remove("is-hidden");
            lastY = lenis?.scroll || window.scrollY;
          });
        }

        // 5. Menu Open / Close
        const menu = $("[data-menu]") as HTMLElement;
        const menuToggle = $("[data-menu-toggle]") as HTMLElement;
        // The header and menu live outside the keyed page content, so a re-initialised engine
        // must pick the state up from the DOM and replace (not stack) the old handlers.
        let menuOpen = !!menu && menu.classList.contains("is-open");

        function openMenu() {
          if (!menu || menuOpen) return;
          menuOpen = true;
          menu.classList.add("is-open");
          menu.setAttribute("aria-hidden", "false");
          menuToggle?.setAttribute("aria-expanded", "true");
          lockScroll();
          const closeBtn = $("[data-menu-close]", menu) as HTMLElement;
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
              delay: 0.2,
              clearProps: "clipPath",
            },
          );
          gsap.fromTo(".menu__foot", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.5, delay: 0.45 });
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
            menuOpen ? closeMenu() : openMenu();
          };
          $$("[data-menu-close]", menu).forEach((b) => {
            b.onclick = () => closeMenu();
          });
          menu.addEventListener("keydown", (e) => {
            if (menuOpen) trapFocus(menu, e);
          });
          $$("[data-menu-link]", menu).forEach((a) => {
            a.onclick = () => closeMenu();
          });
        }

        // 6. Stamps Stamp-In Logic
        function prepStamp(s: HTMLElement, i: number, baseRot?: number) {
          const rot = typeof baseRot === "number" ? baseRot : Math.round(jitter(i) * 70) / 10;
          s.setAttribute("data-rot", String(rot));
          gsap.set(s, { rotation: rot, scale: 1.6, autoAlpha: 0 });
          s.classList.add("is-ready");
        }

        function stampIn(els: HTMLElement | HTMLElement[], stagger?: number) {
          const list = [].concat(els as any).filter(Boolean) as HTMLElement[];
          list.forEach((s, i) => {
            if (s.classList.contains("is-stamped")) return;
            s.classList.add("is-stamped");
            gsap
              .timeline({ delay: i * (stagger || 0) })
              .fromTo(
                s,
                { scale: 1.6, autoAlpha: 0 },
                { scale: 1, autoAlpha: 1, duration: 0.16, ease: "power4.in" },
              )
              .to(s, { scale: 0.97, duration: 0.08, yoyo: true, repeat: 1 });
          });
        }

        $$(".stamp[data-stamp]").forEach((s, i) => {
          prepStamp(s, i, -2.5 + jitter(i) * 1.5);
          if (!s.closest(".sec-head")) {
            ScrollTrigger.create({
              trigger: s,
              start: "top 82%",
              once: true,
              onEnter: () => stampIn(s),
            });
          }
        });

        const exhibitStamp = $("[data-stamp-exhibit]") as HTMLElement;
        if (exhibitStamp) prepStamp(exhibitStamp, 99, -4);
        const closedStamp = $("[data-stamp-closed]") as HTMLElement;
        if (closedStamp) {
          prepStamp(closedStamp, 77, -3);
          ScrollTrigger.create({
            trigger: ".site-foot",
            start: "top 95%",
            once: true,
            onEnter: () => stampIn(closedStamp),
          });
        }

        // 7. Redaction Reveals
        const heroBars: { base: HTMLElement[]; lit: HTMLElement[] } = { base: [], lit: [] };
        const contactBars: HTMLElement[] = [];
        const contactEls: HTMLElement[] = [];

        $$("[data-redact]").forEach((el) => {
          const mode = el.getAttribute("data-redact-mode") || "label";
          const bars = splitRedact(el);
          if (el.closest(".hero")) {
            const group = el.closest(".hero__layer--lit") ? "lit" : "base";
            heroBars[group] = heroBars[group].concat(bars);
            return;
          }
          if (mode === "scrub") {
            gsap.to(bars, {
              scaleX: 0,
              stagger: 0.045,
              ease: "none",
              scrollTrigger: { trigger: el, start: "top 78%", end: "bottom 42%", scrub: 0.6 },
              onComplete: () => {
                el.classList.add("is-revealed");
              },
            });
            if (finePointer) {
              el.addEventListener("pointerover", (e: MouseEvent) => {
                const target = e.target as HTMLElement;
                const w = target.closest(".word");
                if (!w) return;
                const b = $(".bar", w as HTMLElement) as HTMLElement;
                if (b && (gsap.getProperty(b, "scaleX") as number) > 0.05) {
                  gsap.to(b, { scaleX: 0, duration: 0.35, ease: "power3.out" });
                }
              });
            }
            return;
          }
          if (el.closest(".contact")) {
            contactBars.push(...bars);
            contactEls.push(el);
            return;
          }
          const isTitle = mode === "title";
          const head = el.closest(".sec-head");
          const headStamp = head ? ($("[data-stamp]", head as HTMLElement) as HTMLElement) : null;
          gsap.to(bars, {
            scaleX: 0,
            duration: isTitle ? 0.7 : 0.6,
            stagger: isTitle ? 0.12 : 0.045,
            ease: "expo.out",
            scrollTrigger: { trigger: el, start: "top 85%", once: true },
            onComplete: () => {
              el.classList.add("is-revealed");
              if (headStamp) stampIn(headStamp);
            },
          });
        });

        if (contactBars.length) {
          gsap.to(contactBars, {
            scaleX: 0,
            duration: 0.7,
            stagger: 0.12,
            ease: "expo.out",
            scrollTrigger: { trigger: ".contact__title", start: "top 78%", once: true },
            onComplete: () => {
              contactEls.forEach((el) => el.classList.add("is-revealed"));
            },
          });
        }

        // 8. Clip Reveals
        const clipEls = $$("[data-clip]");
        const heroClips: HTMLElement[] = [];
        clipEls.forEach((el) => {
          const fromVal = el.matches(".cap, .entry, .field")
            ? "inset(0 100% 0 0)"
            : "inset(0 0 100% 0)";
          gsap.set(el, { clipPath: fromVal });
          el.classList.add("is-ready");
          if (el.closest(".hero")) heroClips.push(el);
        });

        const bodyClips = clipEls.filter((el) => heroClips.indexOf(el) === -1);
        function revealClips(batch: HTMLElement[]) {
          gsap.to(batch, {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 0.75,
            ease: "expo.out",
            stagger: 0.06,
            onStart: () => {
              batch.forEach((el) => {
                el.style.willChange = "clip-path";
              });
            },
            onComplete: () => {
              batch.forEach((el) => {
                el.classList.add("is-revealed");
                el.style.willChange = "";
              });
            },
          });
        }
        ScrollTrigger.batch(bodyClips, {
          start: "top 88%",
          once: true,
          onEnter: revealClips as any,
        });

        // 9. Image Curtain Reveals
        const revealFigures = $$("[data-img-reveal]");
        revealFigures.forEach((fig) => {
          const img = $("img", fig) as HTMLElement;
          gsap.set(fig, { clipPath: "inset(100% 0 0 0)" });
          if (img) gsap.set(img, { scale: 1.15 });
          fig.classList.add("is-ready");
          const tl = gsap.timeline({
            scrollTrigger: { trigger: fig, start: "top 85%", once: true },
          });
          tl.to(fig, { clipPath: "inset(0% 0 0 0)", duration: 1.1, ease: "expo.out" }, 0);
          if (img) tl.to(img, { scale: 1, duration: 1.4, ease: "expo.out" }, 0);
          tl.add(() => {
            fig.classList.add("is-revealed");
            if (fig.closest(".about__media") && exhibitStamp) stampIn(exhibitStamp);
          }, 0.7);
        });

        // 10. Hung Frames Tilt & Straighten
        function initFrame(frame: HTMLElement) {
          const tilt = parseFloat(frame.getAttribute("data-tilt") || "0");
          (frame as any).__tilt = tilt;
          gsap.set(frame, { rotation: tilt });

          if (finePointer) {
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
          } else {
            ScrollTrigger.create({
              trigger: frame,
              start: "top 60%",
              end: "bottom 40%",
              onEnter: () =>
                gsap.to(frame, {
                  rotation: 0,
                  duration: 1.1,
                  ease: "elastic.out(1, 0.55)",
                  overwrite: "auto",
                }),
              onLeave: () =>
                gsap.to(frame, {
                  rotation: tilt,
                  duration: 0.8,
                  ease: "expo.out",
                  overwrite: "auto",
                }),
              onEnterBack: () =>
                gsap.to(frame, {
                  rotation: 0,
                  duration: 1.1,
                  ease: "elastic.out(1, 0.55)",
                  overwrite: "auto",
                }),
              onLeaveBack: () =>
                gsap.to(frame, {
                  rotation: tilt,
                  duration: 0.8,
                  ease: "expo.out",
                  overwrite: "auto",
                }),
            });
          }
        }
        $$("[data-frame]").forEach(initFrame);

        // 11. Odometers Trigger
        odometers.forEach((o) => {
          ScrollTrigger.create({
            trigger: o.el,
            start: "top 88%",
            once: true,
            onEnter: () => {
              o.cols.forEach((c, i) => {
                gsap.to(c.col, {
                  yPercent: -c.d * 10,
                  duration: 1.2,
                  ease: "power2.out",
                  delay: i * 0.08,
                });
              });
            },
          });
        });

        // 12. Hero Intro: Lights On & Torch
        let introDone = false;
        const hero = $(".hero") as HTMLElement;
        const brand = $(".site-head__brand") as HTMLElement;
        if (brand) gsap.set(brand, { "--wght": 200 });

        const torch = $("[data-torch]") as HTMLElement;
        const torchInner = $("[data-torch-inner]") as HTMLElement;
        const torchState = {
          on: false,
          drifting: true,
          inView: true,
          W: 0,
          H: 0,
          R: 320,
          cx: 0,
          cy: 0,
        };
        const torchPos = { x: 0, y: 0 };
        let setTorch: any, setInner: any, torchToX: any, torchToY: any;

        function sizeTorch() {
          if (!torch || !hero) return;
          torchState.W = hero.clientWidth;
          torchState.H = hero.clientHeight;
          torchState.R = torch.offsetWidth / 2;
          torchState.cx = torchState.W * 0.66;
          torchState.cy = torchState.H * 0.42;
          if (torchInner) {
            torchInner.style.width = torchState.W + "px";
            torchInner.style.height = torchState.H + "px";
          }
          if (!torchState.on) {
            torchPos.x = torchState.cx;
            torchPos.y = torchState.cy;
            renderTorch();
          }
        }

        function renderTorch() {
          if (!setTorch || !setInner) return;
          const tx = torchPos.x - torchState.R;
          const ty = torchPos.y - torchState.R;
          setTorch({ x: tx, y: ty });
          setInner({ x: -tx, y: -ty });
        }

        function drift(time: number) {
          if (!torchState.drifting || !torchState.inView || !torchToX || !torchToY) return;
          torchToX(torchState.cx + 0.11 * torchState.W * Math.sin(time * 0.37));
          torchToY(torchState.cy + 0.08 * torchState.H * Math.sin(time * 0.53 + 1));
        }

        function torchOn() {
          if (!torch) return;
          torch.classList.add("is-on");
          torchState.on = true;
          gsap.fromTo(
            torch,
            { scale: 0.6 },
            { scale: 1, duration: 0.55, ease: "expo.out", onComplete: renderTorch },
          );
        }

        if (torch && hero) {
          setTorch = gsap.quickSetter(torch, "css");
          setInner = gsap.quickSetter(torchInner, "css");
          torchToX = gsap.quickTo(torchPos, "x", {
            duration: 0.35,
            ease: "power3.out",
            onUpdate: renderTorch,
          });
          torchToY = gsap.quickTo(torchPos, "y", {
            duration: 0.35,
            ease: "power3.out",
            onUpdate: renderTorch,
          });
          sizeTorch();

          if (typeof ResizeObserver !== "undefined") {
            new ResizeObserver(debounce(sizeTorch, 60)).observe(hero);
          } else {
            (window as any).addEventListener("resize", debounce(sizeTorch, 120));
          }

          gsap.ticker.add(drift);

          hero.addEventListener("pointermove", (e: PointerEvent) => {
            torchState.drifting = false;
            const r = hero.getBoundingClientRect();
            torchToX(e.clientX - r.left);
            torchToY(e.clientY - r.top);
          });

          const resumeDrift = () => {
            torchState.drifting = true;
          };
          hero.addEventListener("pointerleave", resumeDrift);
          hero.addEventListener("pointerup", (e: PointerEvent) => {
            if (e.pointerType !== "mouse") resumeDrift();
          });
          hero.addEventListener("pointercancel", resumeDrift);

          ScrollTrigger.create({
            trigger: hero,
            start: "top bottom",
            end: "bottom top",
            onToggle: (self) => {
              torchState.inView = self.isActive;
            },
          });
        }

        function lightsOn() {
          const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
          if (brand) tl.to(brand, { "--wght": 600, duration: 0.9, ease: "power2.inOut" }, 0);
          const n = Math.max(heroBars.base.length, heroBars.lit.length);
          for (let i = 0; i < n; i++) {
            const pair = [heroBars.base[i], heroBars.lit[i]].filter(Boolean);
            tl.to(pair, { scaleX: 0, duration: 0.7 }, 0.15 + i * 0.12);
          }
          tl.add(() => torchOn(), 0.75);
          if (heroClips.length) {
            tl.to(
              heroClips,
              { clipPath: "inset(0% 0% 0% 0%)", duration: 0.6, stagger: 0.08 },
              0.8,
            );
          }
          tl.add(() => {
            introDone = true;
            heroClips.forEach((el) => el.classList.add("is-revealed"));
          });
        }

        const ready = Promise.race([
          doc.fonts ? doc.fonts.ready : Promise.resolve(),
          new Promise((r) => setTimeout(r, 900)),
        ]);
        ready.then(() => requestAnimationFrame(lightsOn));

        // Hero Scroll: --lit 0 -> 1 scrub
        if (hero) {
          gsap.to(hero, {
            "--lit": 1,
            ease: "none",
            scrollTrigger: {
              trigger: hero,
              start: "top top",
              end: "bottom 35%",
              scrub: 0.6,
            },
          });
        }

        // 13. Letters Repel Cursor (Hero & Contact)
        function initScatter(
          zone: HTMLElement,
          baseEls: HTMLElement[],
          mirrorSets: (HTMLElement | null)[][],
        ) {
          if (!zone || !baseEls.length) return;
          const groups: {
            el: HTMLElement;
            ox: number;
            oy: number;
            x: (v: number) => void;
            y: (v: number) => void;
          }[] = [];

          baseEls.forEach((el, i) => {
            const chars = splitChars(el);
            const mirrors = (mirrorSets[i] || []).filter(Boolean).map((m) => splitChars(m!));
            chars.forEach((ch, k) => {
              const targets = [ch].concat(mirrors.map((m) => m[k]).filter(Boolean));
              groups.push({
                el: ch,
                ox: 0,
                oy: 0,
                x: gsap.quickTo(targets, "x", { duration: 0.7, ease: "power3.out" }),
                y: gsap.quickTo(targets, "y", { duration: 0.7, ease: "power3.out" }),
              });
            });
          });

          let measured = false;
          let displaced = false;
          let restAt = 0;
          let raf: number | null = null;
          let mx = 0;
          let my = 0;

          function measure() {
            const zr = zone.getBoundingClientRect();
            groups.forEach((g) => {
              const r = g.el.getBoundingClientRect();
              g.ox = r.left + r.width / 2 - zr.left;
              g.oy = r.top + r.height / 2 - zr.top;
            });
            measured = true;
          }

          function apply() {
            raf = null;
            const zr = zone.getBoundingClientRect();
            const R = 170;
            groups.forEach((g) => {
              const dx = zr.left + g.ox - mx;
              const dy = zr.top + g.oy - my;
              const dist = Math.hypot(dx, dy);
              if (dist < R && dist > 0.01) {
                const f = (1 - dist / R) * 46;
                g.x((dx / dist) * f);
                g.y((dy / dist) * f);
              } else {
                g.x(0);
                g.y(0);
              }
            });
          }

          zone.addEventListener("pointerenter", () => {
            if (!displaced && (!measured || performance.now() - restAt > 800)) measure();
          });

          zone.addEventListener("pointermove", (e: PointerEvent) => {
            if (e.pointerType && e.pointerType !== "mouse") return;
            if (!measured && !displaced) measure();
            displaced = true;
            mx = e.clientX;
            my = e.clientY;
            if (!raf) raf = requestAnimationFrame(apply);
          });

          zone.addEventListener("pointerleave", () => {
            groups.forEach((g) => {
              g.x(0);
              g.y(0);
            });
            restAt = performance.now();
            setTimeout(() => {
              displaced = false;
            }, 750);
          });

          listen(window, 
            "resize",
            debounce(() => {
              if (!displaced) measured = false;
            }, 200),
          );
          listenST("refresh", () => {
            if (!displaced) measured = false;
          });
        }

        if (finePointer) {
          const heroBaseWords = $$(".hero__layer--base .hero__word[data-redact]");
          const heroLitWords = $$(".hero__layer--lit .hero__word[data-redact]");
          const heroFill = $("[data-hero-fill]") as HTMLElement;
          initScatter(
            hero,
            heroBaseWords,
            heroBaseWords.map((w, i) => {
              const m: (HTMLElement | null)[] = [heroLitWords[i]];
              if (w.classList.contains("hero__word--outline")) m.push(heroFill);
              return m;
            }),
          );

          const contactZone = $(".contact") as HTMLElement;
          const contactWords = $$(".contact .hero__word[data-redact]");
          if (contactZone && contactWords.length) {
            initScatter(
              contactZone,
              contactWords,
              contactWords.map((w) =>
                w.classList.contains("hero__word--outline") ? [$("[data-contact-fill]") as HTMLElement] : [],
              ),
            );
          }
        }

        // 14. Weight Lens (Capabilities)
        function initLens(section: HTMLElement) {
          const items = $$("[data-lens-item]", section);
          if (!items.length) return;
          const state = items.map((el) => {
            const prox = { w: 450 };
            let last = 450;
            return {
              el,
              prox,
              cy: 0,
              to: gsap.quickTo(prox, "w", {
                duration: 0.4,
                ease: "power3.out",
                onUpdate: () => {
                  const w = Math.round(prox.w);
                  if (w !== last) {
                    last = w;
                    el.style.setProperty("--w", String(w));
                  }
                },
              }),
            };
          });

          const restFor = (s: any) => (s.el.closest(".cap.is-open") ? 700 : 450);

          if (finePointer) {
            let measured = false;
            let raf: number | null = null;
            let my = 0;

            function measure() {
              const sy = window.scrollY;
              state.forEach((s) => {
                const r = s.el.getBoundingClientRect();
                s.cy = r.top + r.height / 2 + sy;
              });
              measured = true;
            }

            function apply() {
              raf = null;
              const vy = my + window.scrollY;
              state.forEach((s) => {
                const d = Math.abs(s.cy - vy);
                const w = d < 260 ? 450 + 250 * Math.pow(1 - d / 260, 1.6) : 450;
                s.to(Math.max(w, restFor(s)));
              });
            }

            section.addEventListener("pointermove", (e: PointerEvent) => {
              if (!measured) measure();
              my = e.clientY;
              if (!raf) raf = requestAnimationFrame(apply);
            });

            section.addEventListener("pointerleave", () => {
              state.forEach((s) => s.to(restFor(s)));
            });

            listen(window, 
              "resize",
              debounce(() => {
                measured = false;
              }, 200),
            );
            listenST("refresh", () => {
              measured = false;
            });
          } else {
            ScrollTrigger.create({
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              onUpdate: () => {
                const vc = window.innerHeight / 2;
                const span = window.innerHeight * 0.3;
                state.forEach((s) => {
                  const r = s.el.getBoundingClientRect();
                  const d = Math.abs(r.top + r.height / 2 - vc);
                  s.to(Math.max(d < span ? 450 + 200 * (1 - d / span) : 450, restFor(s)));
                });
              },
            });
          }
        }
        $$("[data-lens]").forEach(initLens);

        // Capabilities Accordion
        $$("[data-cap]").forEach((cap) => {
          const head = $(".cap__head", cap) as HTMLElement;
          if (!head) return;
          // onclick (not addEventListener): the engine can initialise twice (Strict Mode, locale
          // remounts) and two listeners would toggle the row open and straight back shut.
          head.onclick = () => {
            const isOpen = cap.classList.contains("is-open");
            $$("[data-cap].is-open").forEach((other) => {
              other.classList.remove("is-open");
              $(".cap__head", other)?.setAttribute("aria-expanded", "false");
            });
            if (!isOpen) {
              cap.classList.add("is-open");
              head.setAttribute("aria-expanded", "true");
            }
            setTimeout(() => {
              ScrollTrigger.refresh();
            }, 620);
          };
        });

        // 15. Dalil Ko'rgichi (Work Evidence Viewer)
        const viewer = $("[data-viewer]") as HTMLElement;
        const vFrame = $("[data-viewer-frame]") as HTMLElement;
        const vStage = $("[data-viewer-stage]") as HTMLElement;
        const vCaption = $("[data-viewer-caption]") as HTMLElement;
        const exposure = $("[data-exposure]") as HTMLElement;
        const workRows = $$(".ex-row");

        const viewerLive = !!(viewer && finePointer && window.getComputedStyle(viewer).display !== "none");
        const vImgs: Record<string, HTMLImageElement> = {};
        let vCurrent = -1;
        const arProxy = { ar: 1.4 };
        let lastExposure = 0;
        let hoveringRow = false;

        function ensureViewerImg(row: HTMLElement): HTMLImageElement {
          const key = row.getAttribute("data-key") || "default";
          if (vImgs[key]) return vImgs[key];
          const imgSrc = row.getAttribute("data-img") || "/images/avatar.jpg";
          const img = doc.createElement("img");
          img.alt = "";
          img.decoding = "async";
          img.loading = "lazy";
          img.src = imgSrc;
          vStage.appendChild(img);
          vImgs[key] = img;
          return img;
        }

        function setExhibit(i: number, immediate = false) {
          if (!viewerLive || i === vCurrent || !workRows[i]) return;
          const row = workRows[i];
          vCurrent = i;
          workRows.forEach((r, k) => r.classList.toggle("is-active", k === i));
          const img = ensureViewerImg(row);
          const prev = $(".is-current", vStage) as HTMLElement;

          if (prev && prev !== img) {
            prev.classList.remove("is-current");
            prev.classList.add("is-prev");
            gsap.to(prev, {
              opacity: 0,
              duration: 0.3,
              delay: 0.3,
              onComplete: () => {
                prev.classList.remove("is-prev");
                gsap.set(prev, { clearProps: "opacity,clipPath" });
              },
            });
          }

          gsap.killTweensOf(img);
          img.classList.remove("is-prev");
          img.classList.add("is-current");

          if (immediate) {
            gsap.set(img, { clipPath: "inset(0 0 0 0%)", opacity: 1 });
          } else {
            gsap.fromTo(
              img,
              { clipPath: "inset(0 0 0 100%)", opacity: 1 },
              { clipPath: "inset(0 0 0 0%)", duration: 0.55, ease: "expo.out", overwrite: true },
            );
          }

          const ar = parseFloat(row.getAttribute("data-ar") || "1.4") || 1.4;
          if (immediate) {
            arProxy.ar = ar;
            vFrame.style.setProperty("--ar", String(ar));
          } else {
            gsap.to(arProxy, {
              ar,
              duration: 0.6,
              ease: "expo.inOut",
              overwrite: true,
              onUpdate: () => {
                vFrame.style.setProperty("--ar", arProxy.ar.toFixed(4));
              },
            });
          }

          const tilt = parseFloat(row.getAttribute("data-tilt") || "0") || 0;
          (vFrame as any).__tilt = tilt;
          if (!hoveringRow) {
            gsap.to(vFrame, { rotation: tilt, duration: 0.8, ease: "expo.out", overwrite: "auto" });
          }

          const now = performance.now();
          if (!immediate && exposure && now - lastExposure > 400) {
            lastExposure = now;
            gsap.fromTo(exposure, { opacity: 0.3 }, { opacity: 0, duration: 0.24, ease: "steps(3)" });
          }

          if (vCaption) {
            vCaption.textContent =
              ($(".ex-row__title", row)?.textContent?.trim() || "") +
              " · " +
              ($(".ex-row__year", row)?.textContent?.trim() || "");
            if (!immediate) {
              gsap.fromTo(
                vCaption,
                { clipPath: "inset(0 0 0 100%)" },
                { clipPath: "inset(0 0 0 0%)", duration: 0.35, ease: "expo.out", clearProps: "clipPath" },
              );
            }
          }
        }

        if (viewerLive) {
          gsap.set(vFrame, { clipPath: "inset(100% 0 0 0)" });
          ScrollTrigger.create({
            trigger: ".work-list",
            start: "top 120%",
            once: true,
            onEnter: () => {
              if (vCurrent < 0) setExhibit(0, true);
              workRows.forEach(ensureViewerImg);
            },
          });

          vFrame.addEventListener("pointerenter", () => {
            gsap.to(vFrame, { rotation: 0, duration: 1.1, ease: "elastic.out(1, 0.55)" });
          });
          vFrame.addEventListener("pointerleave", () => {
            gsap.to(vFrame, {
              rotation: (vFrame as any).__tilt || 0,
              duration: 0.8,
              ease: "expo.out",
            });
          });

          ScrollTrigger.create({
            trigger: ".work-list",
            start: "top 85%",
            once: true,
            onEnter: () => {
              gsap.to(vFrame, {
                clipPath: "inset(0% 0 0 0)",
                duration: 0.9,
                ease: "expo.out",
                clearProps: "clipPath",
              });
            },
          });

          workRows.forEach((row, i) => {
            row.addEventListener("pointerenter", () => {
              hoveringRow = true;
              setExhibit(i);
              gsap.to(vFrame, { rotation: 0, duration: 1.1, ease: "elastic.out(1, 0.55)" });
            });
            row.addEventListener("pointerleave", () => {
              hoveringRow = false;
              gsap.to(vFrame, {
                rotation: (vFrame as any).__tilt || 0,
                duration: 0.8,
                ease: "expo.out",
              });
            });
            row.addEventListener("focus", () => setExhibit(i));

            ScrollTrigger.create({
              trigger: row,
              start: "top 55%",
              end: "bottom 45%",
              onToggle: (self) => {
                if (self.isActive && !hoveringRow) setExhibit(i);
              },
            });
          });
        }

        // 16. Case File Dialog with FLIP Animation
        const caseOverlay = $("[data-case-overlay]") as HTMLElement;
        const casePanel = $("[data-case-panel]") as HTMLElement;
        let caseOpen = false;
        let flipClone: HTMLImageElement | null = null;

        function dropClone() {
          if (flipClone) {
            flipClone.remove();
            flipClone = null;
          }
        }

        function openCase(row: HTMLElement) {
          if (!caseOverlay || !casePanel || caseOpen) return;
          caseOpen = true;
          body.classList.add("is-modal");
          lockScroll();

          // Dispatch event to render modal data
          const slug = row.getAttribute("data-slug");
          window.dispatchEvent(new CustomEvent("open-case-modal", { detail: { slug } }));

          caseOverlay.classList.add("is-open");
          caseOverlay.setAttribute("aria-hidden", "false");
          casePanel.scrollTop = 0;

          // FLIP image animation
          const thumb = ($(".ex-row__thumb img", row) ||
            $(".is-current", vStage) ||
            $("img", row)) as HTMLImageElement;
          const targetKey = $("[data-case-key] img", caseOverlay) as HTMLImageElement;

          if (thumb) {
            const A = thumb.getBoundingClientRect();
            dropClone();
            flipClone = doc.createElement("img");
            flipClone.className = "flip-clone";
            flipClone.alt = "";
            flipClone.src = thumb.currentSrc || thumb.src;
            gsap.set(flipClone, { left: A.left, top: A.top, width: A.width, height: A.height });
            body.appendChild(flipClone);

            gsap.set(casePanel, { y: 0, yPercent: 100 });
            gsap
              .timeline({ defaults: { duration: 0.7, ease: "expo.inOut" } })
              .to(casePanel, { yPercent: 0 }, 0)
              .to(
                flipClone,
                {
                  left: window.innerWidth * 0.15,
                  top: 100,
                  width: window.innerWidth * 0.7,
                  height: 340,
                },
                0,
              )
              .add(() => {
                dropClone();
              }, 0.7);
          } else {
            gsap.fromTo(
              casePanel,
              { y: 0, yPercent: 100 },
              { y: 0, yPercent: 0, duration: 0.7, ease: "expo.inOut" },
            );
          }

          const openedStamp = $("[data-stamp-opened]", caseOverlay) as HTMLElement;
          if (openedStamp) {
            prepStamp(openedStamp, 5, -3);
            gsap.delayedCall(0.75, () => stampIn(openedStamp));
          }
        }

        function closeCase() {
          if (!caseOverlay || !casePanel || !caseOpen) return;
          caseOpen = false;
          dropClone();
          gsap.to(casePanel, {
            y: 0,
            yPercent: 100,
            duration: 0.55,
            ease: "expo.inOut",
            onComplete: () => {
              caseOverlay.classList.remove("is-open");
              caseOverlay.setAttribute("aria-hidden", "true");
              body.classList.remove("is-modal");
              unlockScroll();
            },
          });
        }

        workRows.forEach((row) => {
          row.addEventListener("click", () => openCase(row));
        });
        $$("[data-case-close]").forEach((el) => el.addEventListener("click", closeCase));
        listen(doc, "keydown", (e) => {
          if (e.key === "Escape") {
            closeMenu();
            closeCase();
          }
        });

        // 17. Timeline ("The Record")
        const alibi = $("[data-alibi]") as HTMLElement;
        const alibiLine = $("[data-alibi-line]") as HTMLElement;
        if (alibi && alibiLine) {
          gsap.fromTo(
            alibiLine,
            { scaleY: 0 },
            {
              scaleY: 1,
              ease: "none",
              scrollTrigger: { trigger: alibi, start: "top 70%", end: "bottom 60%", scrub: 1 },
            },
          );
          $$("[data-alibi-year]", alibi).forEach((y) => {
            const drop = $(".alibi__drop", y) as HTMLElement;
            if (drop) {
              ScrollTrigger.create({
                trigger: y,
                start: "top 66%",
                once: true,
                onEnter: () => gsap.to(drop, { scale: 1, duration: 0.4, ease: "back.out(3)" }),
              });
            }
          });
        }

        // 18. Contact: Vault Doors of Light
        const contact = $(".contact") as HTMLElement;
        const vault = $("[data-vault]") as HTMLElement;
        const doorL = $("[data-door-l]") as HTMLElement;
        const doorR = $("[data-door-r]") as HTMLElement;
        const seam = $("[data-door-seam]") as HTMLElement;
        const vaultGlow = $(".vault__glow") as HTMLElement;
        const contactFill = $("[data-contact-fill]") as HTMLElement;

        if (vault && doorL && doorR) {
          const vaultTl = gsap.timeline({
            scrollTrigger: {
              trigger: vault,
              start: "top 88%",
              endTrigger: ".site-foot",
              end: "bottom bottom",
              scrub: 1,
            },
          });
          vaultTl
            .fromTo([doorL, doorR], { scaleX: 1 }, { scaleX: 0, ease: "none", duration: 1 }, 0)
            .fromTo(seam, { opacity: 1 }, { opacity: 0, duration: 0.25 }, 0.05)
            .to(vaultGlow, { opacity: 1, duration: 0.5 }, 0.5);
          if (contactFill) vaultTl.to(contactFill, { opacity: 1, duration: 0.5 }, 0.4);
          vault.classList.add("vault--armed");
        }

        // 19. Scramble Button Effect
        const GLYPHS = "█▌0123456789№";
        $$("[data-scramble-to]").forEach((el) => {
          const original = el.textContent || "";
          const target = el.getAttribute("data-scramble-to") || original;
          let frame: number | null = null;
          (el as any).__original = original;
          el.style.display = "inline-block";
          el.style.textAlign = "center";

          const lockWidth = () => {
            el.style.minWidth = "0px";
            el.style.minWidth = Math.ceil(el.getBoundingClientRect().width) + "px";
          };
          lockWidth();
          if (doc.fonts && doc.fonts.ready) doc.fonts.ready.then(lockWidth);

          if (!finePointer) return;
          const host = (el.closest("a, button") || el) as HTMLElement;

          host.addEventListener("pointerenter", () => {
            const t0 = performance.now();
            const dur = 500;
            const to = el.getAttribute("data-scramble-to") || target;
            if (frame) cancelAnimationFrame(frame);

            function step(now: number) {
              const p = clamp((now - t0) / dur, 0, 1);
              const n = Math.max(original.length, to.length);
              let out = "";
              for (let i = 0; i < to.length; i++) {
                out += i / n < p ? to[i] : GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
              }
              el.textContent = out;
              if (p < 1) frame = requestAnimationFrame(step);
              else el.textContent = to;
            }
            frame = requestAnimationFrame(step);
          });

          host.addEventListener("pointerleave", () => {
            if (frame) cancelAnimationFrame(frame);
            el.textContent = (el as any).__original;
          });
        });

        // 20. Custom Cursor
        const cursor = finePointer ? ($(".cursor") as HTMLElement) : null;
        if (cursor) {
          const tag = $(".cursor__tag", cursor) as HTMLElement;
          const cx = gsap.quickTo(cursor, "x", { duration: 0.12, ease: "power2.out" });
          const cy = gsap.quickTo(cursor, "y", { duration: 0.12, ease: "power2.out" });

          listen(window, "pointermove", (e: PointerEvent) => {
            cx(e.clientX);
            cy(e.clientY);
          });

          function setCursorState(target: HTMLElement) {
            const tagged = target.closest("[data-cursor]") as HTMLElement;
            const inHero =
              hero &&
              target.closest(".hero") &&
              torchState.on &&
              (parseFloat(getComputedStyle(hero).getPropertyValue("--lit")) || 0) < 0.6;
            const onText =
              !tagged &&
              target.closest(
                "p, dd, dt, figcaption, .manifesto, .entry, .cap__text, .field",
              ) &&
              !target.closest("a, button");

            cursor?.classList.toggle("is-tag", !!tagged);
            cursor?.classList.toggle("is-torch", !!inHero && !tagged);
            cursor?.classList.toggle("is-bar", !!onText && !inHero);

            if (tagged && tag) {
              tag.textContent = tagged.getAttribute("data-cursor") || "";
            }
          }

          listen(doc, "pointerover", (e: PointerEvent) => {
            setCursorState(e.target as HTMLElement);
          });
          listen(doc, "pointerdown", () => cursor.classList.add("is-press"));
          listen(doc, "pointerup", () => cursor.classList.remove("is-press"));
          root.addEventListener("mouseleave", () => body.classList.add("has-cursor-hidden"));
          root.addEventListener("mouseenter", () => body.classList.remove("has-cursor-hidden"));
        }

        // 21. Magnetic Buttons
        if (finePointer) {
          $$("[data-magnetic]").forEach((el) => {
            const strength = 0.25;
            const xTo = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3.out" });
            const yTo = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3.out" });
            el.addEventListener("pointermove", (e: PointerEvent) => {
              const r = el.getBoundingClientRect();
              xTo(clamp((e.clientX - (r.left + r.width / 2)) * strength, -10, 10));
              yTo(clamp((e.clientY - (r.top + r.height / 2)) * strength, -10, 10));
            });
            el.addEventListener("pointerleave", () => {
              xTo(0);
              yTo(0);
            });
          });
        }

        // 22. Rescue Reveals Safety Function
        function rescueReveals() {
          revealFigures.forEach((fig) => {
            if (fig.classList.contains("is-revealed") || !inViewport(fig, -20)) return;
            gsap.set(fig, { clipPath: "inset(0% 0 0 0)" });
            const im = $("img", fig);
            if (im) gsap.set(im, { scale: 1 });
            fig.classList.add("is-revealed");
          });
          clipEls.forEach((el) => {
            if (el.classList.contains("is-revealed") || !inViewport(el, -20)) return;
            if (heroClips.indexOf(el) > -1 && !introDone) return;
            gsap.set(el, { clipPath: "inset(0% 0% 0% 0%)" });
            el.classList.add("is-revealed");
          });
          $$(".bar").forEach((b) => {
            if (!inViewport(b, -20)) return;
            if (b.closest(".hero") && !introDone) return;
            const sx = gsap.getProperty(b, "scaleX") as number;
            if (sx > 0.02 && !gsap.isTweening(b) && !b.closest("[data-redact-mode='scrub']")) {
              gsap.set(b, { scaleX: 0 });
            }
          });
        }

        listen(window, "load", () => setTimeout(rescueReveals, 1800));
        listen(window, "scroll", debounce(rescueReveals, 500), { passive: true });

        // Start clock
        startClock();
        root.classList.add("js-ok");
      });
    } catch (err) {
      emergencyReveal(err);
    }

    // Cleanup on component unmount
    return () => {
      disposers.forEach((d) => d());
      clearInterval(clockInterval);
      if (ctx) ctx.revert();
      if (lenis) lenis.destroy();
    };
  }, []);

  return null;
}

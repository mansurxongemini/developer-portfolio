"use client";

import { useEffect, useRef } from "react";

/**
 * RowPreview — a small hung photograph that follows the cursor while it sits on any
 * element carrying data-preview="<image url>" (blog rows). Pointer devices only.
 */
export function RowPreview() {
  const box = useRef<HTMLDivElement>(null);
  const img = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const el = box.current;
    const image = img.current;
    if (!el || !image) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const W = 300;
    const H = 190;
    let tx = 0;
    let ty = 0;
    let x = 0;
    let y = 0;
    let raf = 0;
    let active: Element | null = null;
    let seeded = false;

    const place = () => {
      x += (tx - x) * 0.16;
      y += (ty - y) * 0.16;
      const tilt = Math.max(-6, Math.min(6, (tx - x) * 0.06));
      el.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${-3 + tilt}deg)`;
      raf = requestAnimationFrame(place);
    };

    const aim = (e: PointerEvent) => {
      tx = Math.min(window.innerWidth - W - 24, e.clientX + 28);
      ty = Math.max(16, Math.min(window.innerHeight - H - 24, e.clientY - H / 2));
      if (!seeded) {
        x = tx;
        y = ty;
        seeded = true;
      }
    };

    const over = (e: PointerEvent) => {
      const row = (e.target as Element | null)?.closest?.("[data-preview]");
      if (!row || row === active) return;
      const src = row.getAttribute("data-preview");
      if (!src) return;
      active = row;
      aim(e);
      image.src = src;
      el.classList.add("is-on");
      if (!raf) raf = requestAnimationFrame(place);
    };

    const out = (e: PointerEvent) => {
      if (!active) return;
      const next = (e.relatedTarget as Element | null)?.closest?.("[data-preview]");
      if (next === active) return;
      active = null;
      seeded = false;
      el.classList.remove("is-on");
      cancelAnimationFrame(raf);
      raf = 0;
    };

    const move = (e: PointerEvent) => {
      if (active) aim(e);
    };

    document.addEventListener("pointerover", over);
    document.addEventListener("pointerout", out);
    document.addEventListener("pointermove", move);
    return () => {
      document.removeEventListener("pointerover", over);
      document.removeEventListener("pointerout", out);
      document.removeEventListener("pointermove", move);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="row-preview" ref={box} aria-hidden="true">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img ref={img} alt="" width={300} height={190} decoding="async" />
    </div>
  );
}

"use client";

import { useEffect, useRef } from "react";

// Faint contour lines — like stacked paper cuts or a topo map — drifting slowly behind the page.
// Colours come from the theme's CSS variables, so light and dark mode just work.
// ~30 fps, paused when the tab is hidden, and drawn once (still) for reduced-motion users.
export function Backdrop() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let colors = { ink: "#111", accent: "#c1653f" };
    let w = 0;
    let h = 0;
    let raf = 0;
    let last = 0;
    let t = Math.random() * 100;

    const readColors = () => {
      const css = getComputedStyle(document.documentElement);
      colors = { ink: css.getPropertyValue("--ink").trim(), accent: css.getPropertyValue("--accent").trim() };
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const lines = w < 640 ? 9 : 14;
      const gap = h / (lines - 1);
      // Lines drift slightly against the scroll for a sense of depth.
      const parallax = (window.scrollY * 0.04) % gap;
      const step = w < 640 ? 14 : 10;

      for (let i = -1; i <= lines; i++) {
        const base = i * gap - parallax;
        const accent = i === Math.floor(lines * 0.62);
        ctx.beginPath();
        for (let x = -step; x <= w + step; x += step) {
          const u = x / w;
          const y =
            base +
            Math.sin(u * 3.1 + t * 0.21 + i * 0.55) * 26 +
            Math.sin(u * 7.3 - t * 0.13 + i * 1.3) * 9 +
            Math.sin(u * 1.4 + t * 0.07 + i * 0.2) * 18;
          if (x === -step) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = accent ? colors.accent : colors.ink;
        ctx.globalAlpha = accent ? 0.28 : 0.06;
        ctx.lineWidth = accent ? 1.2 : 1;
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
    };

    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      if (now - last < 33) return; // ~30 fps is plenty for something this slow
      t += (now - last) / 1000;
      last = now;
      draw();
    };

    readColors();
    resize();
    draw();

    const themeObserver = new MutationObserver(() => {
      readColors();
      draw();
    });
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    const onResize = () => {
      resize();
      draw();
    };
    const onScroll = () => reduced && draw();
    const onVisibility = () => {
      cancelAnimationFrame(raf);
      if (!document.hidden && !reduced) {
        last = performance.now();
        raf = requestAnimationFrame(loop);
      }
    };

    window.addEventListener("resize", onResize);
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    if (!reduced) {
      last = performance.now();
      raf = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(raf);
      themeObserver.disconnect();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return <canvas ref={ref} aria-hidden className="pointer-events-none fixed inset-0 -z-10 size-full" />;
}

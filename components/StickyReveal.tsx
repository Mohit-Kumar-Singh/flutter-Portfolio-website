"use client";

import { useEffect, useRef } from "react";

// Pins the page above the contact section once its bottom edge reaches the bottom of the screen,
// so the contact section slides up over it like a curtain. While it slides, the page underneath
// darkens toward the contact colour, so the change of background is gradual instead of a hard cut.
export function StickyReveal({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const shade = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const overlay = shade.current;
    const contact = document.getElementById("contact");
    if (!el || !overlay || !contact) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;
    const update = () => {
      frame = 0;
      const vh = window.innerHeight;
      // 0 when the contact section's top edge is at the bottom of the screen, 1 when it reaches the top.
      const p = Math.min(1, Math.max(0, 1 - contact.getBoundingClientRect().top / vh));
      const eased = p * p * (3 - 2 * p);
      overlay.style.opacity = reduce ? "0" : String(eased * 0.9);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const pin = () => {
      // Negative top = the amount the block is taller than the screen; short blocks pin at 0.
      el.style.top = `${Math.min(0, window.innerHeight - el.offsetHeight)}px`;
      update();
    };

    pin();
    const ro = new ResizeObserver(pin);
    ro.observe(el);
    window.addEventListener("resize", pin);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", pin);
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={ref} className="sticky z-0">
      {children}
      <div ref={shade} aria-hidden className="pointer-events-none absolute inset-0 z-20 bg-ink opacity-0" />
    </div>
  );
}

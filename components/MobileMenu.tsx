"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef } from "react";
import { site } from "@/lib/content";
import { EASE_IN_OUT, EASE_OUT } from "@/lib/motion";
import { feedback } from "@/lib/feedback";
import { useScrollControls } from "./Experience";

export type NavLink = { label: string; href: string };

// Full-screen menu for phones: a circle wipes in from the Menu button, links rise in one by one.
export function MobileMenu({ open, onClose, links }: { open: boolean; onClose: () => void; links: NavLink[] }) {
  const { setLocked, scrollTo } = useScrollControls();
  const firstLink = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!open) return;
    setLocked(true);
    firstLink.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      setLocked(false);
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose, setLocked]);

  const go = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    feedback("tap");
    onClose();
    // Wait a frame so scrolling is unlocked before we move.
    requestAnimationFrame(() => scrollTo(href));
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className="fixed inset-0 z-[55] flex flex-col bg-ink px-5 pb-8 pt-24 text-paper"
          initial={{ clipPath: "circle(0% at calc(100% - 3rem) 2.25rem)" }}
          animate={{ clipPath: "circle(150% at calc(100% - 3rem) 2.25rem)" }}
          exit={{ clipPath: "circle(0% at calc(100% - 3rem) 2.25rem)" }}
          transition={{ duration: 0.8, ease: EASE_IN_OUT }}
        >
          <button
            type="button"
            onClick={() => {
              feedback("close");
              onClose();
            }}
            className="absolute right-5 top-5 -m-3 p-3 text-sm"
            aria-label="Close menu"
          >
            Close
          </button>

          <span className="mb-6 text-xs text-paper/40">Navigation</span>
          <nav className="flex flex-col">
            {links.map((l, i) => (
              <motion.a
                key={l.href}
                ref={i === 0 ? firstLink : undefined}
                href={l.href}
                onClick={(e) => go(e, l.href)}
                className="flex items-baseline gap-4 border-b border-paper/10 py-3 text-5xl tracking-tight"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20, transition: { duration: 0.2 } }}
                transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.25 + i * 0.06 }}
              >
                <span className="text-xs text-paper/40">{String(i + 1).padStart(2, "0")}</span>
                <span className={i % 2 ? "font-serif italic" : ""}>{l.label}</span>
              </motion.a>
            ))}
          </nav>

          <motion.div
            className="mt-auto flex flex-col gap-4 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
          >
            <a href={`mailto:${site.email}`} className="-my-2 py-2 text-lg">
              {site.email}
            </a>
            <div className="flex gap-6 text-paper/60">
              {site.socials.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="-my-3 py-3">
                  {s.label}
                </a>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

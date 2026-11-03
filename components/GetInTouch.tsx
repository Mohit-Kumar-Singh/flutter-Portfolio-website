"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { site } from "@/lib/content";
import { feedback } from "@/lib/feedback";
import { SPRING_SNAPPY } from "@/lib/motion";
import { Magnetic } from "./ui";

const greeting = encodeURIComponent("Hi Mohit, I saw your portfolio and would love to connect.");

const OPTIONS = [
  { emoji: "📞", label: "Call", sub: site.phone.display, href: `tel:${site.phone.e164}` },
  { emoji: "💬", label: "WhatsApp", sub: "Message me", href: `https://wa.me/${site.phone.e164.slice(1)}?text=${greeting}` },
  { emoji: "📸", label: "Instagram", sub: "DM @mohit_kumar_singh", href: "https://ig.me/m/mohit_kumar_singh" },
  { emoji: "✉️", label: "Email", sub: site.email, href: `mailto:${site.email}` },
];

// The orange circle opens a small stack of ways to reach me — springs out like an iOS context menu.
export function GetInTouch() {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => !root.current?.contains(e.target as Node) && setOpen(false);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={root} className="relative">
      <AnimatePresence>
        {open && (
          <motion.ul
            id="contact-options"
            className="absolute bottom-full left-0 z-20 mb-4 w-64 origin-bottom-left overflow-hidden rounded-2xl bg-paper p-1.5 text-ink shadow-2xl shadow-black/40 md:left-auto md:right-0 md:origin-bottom-right"
            initial={{ opacity: 0, scale: 0.85, y: 12, filter: "blur(8px)" }}
            animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.92, y: 8, filter: "blur(6px)", transition: { duration: 0.18 } }}
            transition={SPRING_SNAPPY}
          >
            {OPTIONS.map((o, i) => (
              <motion.li
                key={o.label}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...SPRING_SNAPPY, delay: 0.03 + i * 0.035 }}
              >
                <a
                  href={o.href}
                  target={o.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  onClick={() => {
                    feedback("tap");
                    setOpen(false);
                  }}
                  className="flex items-center gap-3 rounded-xl px-3 py-2.5 transition-[background-color,scale] duration-200 hover:bg-ink/5 active:scale-[0.97]"
                >
                  <span className="emoji text-xl" aria-hidden>
                    {o.emoji}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-medium">{o.label}</span>
                    <span className="block truncate text-xs text-muted">{o.sub}</span>
                  </span>
                </a>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>

      <Magnetic strength={0.5}>
        <button
          type="button"
          aria-expanded={open}
          aria-controls="contact-options"
          onClick={() => {
            feedback(open ? "close" : "open");
            setOpen((v) => !v);
          }}
          className="flex size-40 items-center justify-center rounded-full bg-accent text-lg text-[#111] transition-[scale] duration-300 ease-out-expo hover:scale-105 active:scale-95 md:size-52"
        >
          <span className="inline-flex items-center gap-2">
            Get in touch
            <motion.span animate={{ rotate: open ? 45 : 0 }} transition={SPRING_SNAPPY} className="inline-block">
              +
            </motion.span>
          </span>
        </button>
      </Magnetic>
    </div>
  );
}

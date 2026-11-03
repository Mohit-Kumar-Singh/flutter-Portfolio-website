"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { site } from "@/lib/content";
import { feedback } from "@/lib/feedback";
import { SPRING_GENTLE } from "@/lib/motion";
import { Icon, type IconName } from "./Icons";

const greeting = encodeURIComponent("Hi Mohit, I saw your portfolio and would love to connect.");

const CHANNELS: { icon: IconName; label: string; detail: string; href: string }[] = [
  {
    icon: "chat",
    label: "WhatsApp",
    detail: "Quick chat",
    href: `https://wa.me/${site.phone.e164.slice(1)}?text=${greeting}`,
  },
  { icon: "phone", label: "Call", detail: site.phone.display, href: `tel:${site.phone.e164}` },
  { icon: "instagram", label: "Instagram", detail: "@mohit_kumar_singh", href: "https://ig.me/m/mohit_kumar_singh" },
  { icon: "mail", label: "Email", detail: site.email, href: `mailto:${site.email}` },
];

// Like iOS's Dynamic Island: the orange circle physically grows into a card listing the ways to reach me.
const MORPH = { type: "spring", stiffness: 260, damping: 30, mass: 0.9 } as const;

export function GetInTouch() {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const firstLink = useRef<HTMLAnchorElement>(null);

  const toggle = (next: boolean) => {
    feedback(next ? "open" : "close");
    setOpen(next);
  };

  useEffect(() => {
    if (!open) return;
    firstLink.current?.focus({ preventScroll: true });
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
    // The wrapper keeps the circle's footprint so the page never jumps when the card opens.
    <div ref={root} className="relative size-40 md:size-52">
      <motion.div
        layout
        transition={{ layout: MORPH }}
        style={{ borderRadius: open ? 32 : 999 }}
        className={`absolute bottom-0 left-0 z-20 overflow-hidden bg-accent text-[#111] md:left-auto md:right-0 ${
          open ? "w-[min(26rem,calc(100vw-2.5rem))] shadow-2xl shadow-black/40" : "size-40 md:size-52"
        }`}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {open ? (
            <motion.div
              key="card"
              id="contact-options"
              className="p-6 md:p-7"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.12, duration: 0.25 } }}
              exit={{ opacity: 0, transition: { duration: 0.1 } }}
            >
              <div className="mb-4 flex items-center justify-between text-sm">
                <span className="opacity-60">Say hello</span>
                <button
                  type="button"
                  onClick={() => toggle(false)}
                  aria-label="Close"
                  className="press -m-2 flex size-9 items-center justify-center rounded-full transition-colors hover:bg-black/10"
                >
                  <span className="text-xl leading-none">×</span>
                </button>
              </div>
              <ul>
                {CHANNELS.map((c, i) => (
                  <motion.li
                    key={c.label}
                    className="border-t border-black/15"
                    initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ ...SPRING_GENTLE, delay: 0.16 + i * 0.05 }}
                  >
                    <a
                      ref={i === 0 ? firstLink : undefined}
                      href={c.href}
                      target={c.href.startsWith("http") ? "_blank" : undefined}
                      rel="noreferrer"
                      onClick={() => {
                        feedback("tap");
                        setOpen(false);
                      }}
                      className="group grid grid-cols-[1.25rem_1fr_auto] items-center gap-x-4 py-3.5"
                    >
                      <Icon name={c.icon} className="text-lg opacity-70" />
                      <span className="min-w-0">
                        <span
                          className={`block text-3xl leading-tight tracking-tight transition-transform duration-500 ease-out-expo group-hover:translate-x-1.5 ${i % 2 ? "font-serif italic" : ""}`}
                        >
                          {c.label}
                        </span>
                        <span className="block truncate text-xs opacity-60">{c.detail}</span>
                      </span>
                      <Icon
                        name="arrow"
                        className="text-lg opacity-50 transition-[translate,opacity] duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100"
                      />
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ) : (
            <motion.button
              key="pill"
              type="button"
              aria-expanded={false}
              aria-controls="contact-options"
              onClick={() => toggle(true)}
              className="press flex size-40 items-center justify-center text-lg md:size-52"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.15 } }}
              exit={{ opacity: 0, transition: { duration: 0.08 } }}
            >
              Get in touch
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

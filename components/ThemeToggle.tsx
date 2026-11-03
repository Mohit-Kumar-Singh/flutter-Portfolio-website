"use client";

import { motion } from "motion/react";
import { useSyncExternalStore } from "react";
import { EASE_IN_OUT } from "@/lib/motion";
import { feedback } from "@/lib/feedback";

type Theme = "light" | "dark";

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
}

function useTheme() {
  return useSyncExternalStore<Theme>(
    subscribe,
    () => (document.documentElement.dataset.theme === "dark" ? "dark" : "light"),
    () => "light",
  );
}

export function ThemeToggle() {
  const theme = useTheme();
  const dark = theme === "dark";

  const toggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    feedback("toggle");
    const next: Theme = dark ? "light" : "dark";
    const apply = () => {
      document.documentElement.dataset.theme = next;
      try {
        localStorage.setItem("theme", next);
      } catch {}
    };

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!document.startViewTransition || reduced) return apply();

    // Reveal the new theme as a circle growing out of the button.
    const r = e.currentTarget.getBoundingClientRect();
    const x = r.left + r.width / 2;
    const y = r.top + r.height / 2;
    const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    document.startViewTransition(apply).ready.then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        { duration: 800, easing: `cubic-bezier(${EASE_IN_OUT.join(",")})`, pseudoElement: "::view-transition-new(root)" },
      );
    });
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
      className="press -m-3 flex size-11 items-center justify-center"
    >
      {/* Sun that morphs into a crescent moon */}
      <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden>
        <mask id="theme-moon-mask">
          <rect width="24" height="24" fill="white" />
          <motion.circle
            r="7"
            fill="black"
            initial={false}
            animate={{ cx: dark ? 17 : 32, cy: dark ? 7 : -4 }}
            transition={{ duration: 0.6, ease: EASE_IN_OUT }}
          />
        </mask>
        <motion.circle
          cx="12"
          cy="12"
          fill="currentColor"
          mask="url(#theme-moon-mask)"
          initial={false}
          animate={{ r: dark ? 9 : 5 }}
          transition={{ duration: 0.6, ease: EASE_IN_OUT }}
        />
        <motion.g
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          style={{ originX: "12px", originY: "12px" }}
          initial={false}
          animate={{ opacity: dark ? 0 : 1, rotate: dark ? -90 : 0, scale: dark ? 0.4 : 1 }}
          transition={{ duration: 0.6, ease: EASE_IN_OUT }}
        >
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
            <line key={deg} x1="12" y1="2" x2="12" y2="3.5" transform={`rotate(${deg} 12 12)`} />
          ))}
        </motion.g>
      </svg>
    </button>
  );
}

"use client";

import { motion } from "motion/react";

// A tiny, consistent line-icon set in the site's own stroke — replaces colour emoji.
// With `draw`, the strokes trace themselves in the first time the icon scrolls into view.
export type IconName = "gear" | "loop" | "brush" | "cup" | "phone" | "chat" | "instagram" | "mail" | "arrow" | "car";

const PATHS: Record<IconName, { d?: string[]; circles?: [number, number, number][]; rects?: [number, number, number, number, number][] }> = {
  gear: {
    circles: [
      [12, 12, 3],
      [12, 12, 7],
    ],
    d: ["M12 2.5v2.5", "M12 19v2.5", "M2.5 12H5", "M19 12h2.5", "M5.3 5.3l1.8 1.8", "M16.9 16.9l1.8 1.8", "M5.3 18.7l1.8-1.8", "M16.9 7.1l1.8-1.8"],
  },
  loop: { d: ["M4 12a8 8 0 0 1 13.7-5.6", "M18 2.5V7h-4.5", "M20 12a8 8 0 0 1-13.7 5.6", "M6 21.5V17h4.5"] },
  brush: {
    d: [
      "M20.5 3.5l-9 9",
      "M11.5 12.5c-1.8-.4-3.6.4-4.3 2.2-.6 1.5-.6 3.3-3.2 3.8 2 1.9 5.4 2.1 7.3.4 1.4-1.2 1.6-3.4.2-6.4z",
    ],
  },
  cup: { d: ["M5 8h11v5.5a5.5 5.5 0 0 1-5.5 5.5v0A5.5 5.5 0 0 1 5 13.5z", "M16 10h1.5a2.5 2.5 0 0 1 0 5H16", "M8.5 2.5c-.8 1 .8 2 0 3", "M12 2.5c-.8 1 .8 2 0 3"] },
  phone: { d: ["M5 3.5h3.2l1.8 4.6-2.3 1.4a11 11 0 0 0 6.8 6.8l1.4-2.3 4.6 1.8V19a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 3 5.7a2 2 0 0 1 2-2.2z"] },
  chat: { d: ["M4 20.5l1.4-4.2A8.5 8.5 0 1 1 8.2 19z"] },
  instagram: { rects: [[3.5, 3.5, 17, 17, 5]], circles: [[12, 12, 4]], d: ["M17.2 6.8h.01"] },
  mail: { rects: [[3, 5, 18, 14, 2.5]], d: ["M3.5 7l8.5 6 8.5-6"] },
  arrow: { d: ["M7 17L17 7", "M9 7h8v8"] },
  car: {
    d: ["M2.5 15.5v-2.8c0-.6.4-1.1 1-1.2l2.6-.5 2.4-3.2c.4-.5 1-.8 1.6-.8h4.6c.6 0 1.2.3 1.6.8l2.2 3 2.5.6c.6.1 1 .7 1 1.3v2.8", "M2.5 15.5h2.6", "M9 15.5h6", "M19 15.5h2.5", "M8 11h10"],
    circles: [
      [7, 15.8, 1.9],
      [17, 15.8, 1.9],
    ],
  },
};

export function Icon({
  name,
  draw = false,
  className = "",
  strokeWidth = 1.5,
}: {
  name: IconName;
  draw?: boolean;
  className?: string;
  strokeWidth?: number;
}) {
  const p = PATHS[name];
  const anim = draw
    ? {
        initial: { pathLength: 0 },
        whileInView: { pathLength: 1 },
        viewport: { once: true },
        transition: { duration: 1.2, ease: [0.65, 0, 0.35, 1] as const },
      }
    : {};
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={`inline-block size-[1em] shrink-0 ${className}`}
    >
      {p.circles?.map(([cx, cy, r]) => <motion.circle key={`c${cx}${cy}${r}`} cx={cx} cy={cy} r={r} {...anim} />)}
      {p.rects?.map(([x, y, w, h, rx]) => (
        <motion.rect key={`r${x}${y}`} x={x} y={y} width={w} height={h} rx={rx} {...anim} />
      ))}
      {p.d?.map((d) => <motion.path key={d} d={d} {...anim} />)}
    </svg>
  );
}

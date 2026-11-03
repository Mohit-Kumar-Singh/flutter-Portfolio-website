"use client";

import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import { useState } from "react";
import { projects } from "@/lib/content";
import { EASE_OUT } from "@/lib/motion";
import { RevealText } from "./ui";

// Placeholder artwork — swap for <img> once real project shots exist.
function Artwork({ title, colors }: { title: string; colors: [string, string] }) {
  return (
    <div
      className="relative flex size-full items-end overflow-hidden p-6"
      style={{ background: `radial-gradient(120% 90% at 80% 10%, ${colors[1]} 0%, ${colors[0]} 65%)` }}
    >
      <span className="font-serif text-5xl italic text-white/90">{title}</span>
    </div>
  );
}

export function Work() {
  const [active, setActive] = useState<number | null>(null);
  const [last, setLast] = useState(0);
  const x = useSpring(useMotionValue(0), { stiffness: 180, damping: 22, mass: 0.6 });
  const y = useSpring(useMotionValue(0), { stiffness: 180, damping: 22, mass: 0.6 });

  return (
    <section
      id="work"
      className="relative px-5 py-32 md:px-10 md:py-48"
      onPointerMove={(e) => {
        x.set(e.clientX);
        y.set(e.clientY);
      }}
    >
      <div className="mb-16 flex items-end justify-between md:mb-24">
        <h2 className="text-5xl tracking-tight md:text-8xl">
          <RevealText text="Selected" />{" "}
          <span className="font-serif italic">
            <RevealText text="work" delay={0.1} />
          </span>
        </h2>
        <span className="text-sm text-muted">({String(projects.length).padStart(2, "0")})</span>
      </div>

      <ul onPointerLeave={() => setActive(null)}>
        {projects.map((p, i) => (
          <li key={p.title} className="relative">
            <motion.span
              className="absolute inset-x-0 top-0 h-px origin-left bg-line"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, ease: EASE_OUT, delay: i * 0.08 }}
            />
            <a
              href={p.href}
              target="_blank"
              rel="noreferrer"
              data-cursor="View"
              onPointerEnter={(e) => {
                // Hover-only effect: a tap on a phone would otherwise leave the other rows dimmed.
                if (e.pointerType !== "mouse") return;
                setActive(i);
                setLast(i);
              }}
              className="grid grid-cols-[2.5rem_1fr] items-center gap-y-2 py-8 transition-opacity duration-500 md:grid-cols-[4rem_1fr_18rem_5rem] md:py-11"
              style={{ opacity: active === null || active === i ? 1 : 0.3 }}
            >
              <span className="text-sm text-muted">{String(i + 1).padStart(2, "0")}</span>
              <span
                className={`text-4xl tracking-tight transition-transform duration-700 ease-out-expo md:text-7xl ${active === i ? "translate-x-4 font-serif italic md:translate-x-8" : ""}`}
              >
                {p.title}
              </span>
              <span className="col-start-2 text-sm md:col-start-auto">
                {p.category}
                <span className="mt-1 block max-w-xs text-muted">{p.description}</span>
              </span>
              <span className="hidden text-right text-sm text-muted md:block">{p.year}</span>
            </a>
            {/* mobile: show the artwork inline */}
            <div className="mb-8 aspect-[4/3] overflow-hidden rounded-sm md:hidden">
              <Artwork title={p.title} colors={p.colors} />
            </div>
          </li>
        ))}
        <li className="h-px bg-line" />
      </ul>

      {/* floating preview that follows the pointer; the strip slides to the hovered project */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-40 hidden md:block"
        style={{ x, y }}
      >
        <AnimatePresence>
          {active !== null && (
            <motion.div
              className="h-[300px] w-[400px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-sm"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.45, ease: EASE_OUT }}
            >
              <motion.div
                className="h-full"
                animate={{ y: `${-last * 100}%` }}
                transition={{ duration: 0.6, ease: EASE_OUT }}
              >
                {projects.map((p) => (
                  <div key={p.title} className="h-full">
                    <Artwork title={p.title} colors={p.colors} />
                  </div>
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}

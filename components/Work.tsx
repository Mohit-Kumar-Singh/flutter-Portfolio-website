"use client";

import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react";
import { useState } from "react";
import { projects, type Project } from "@/lib/content";
import { EASE_IN_OUT, EASE_OUT } from "@/lib/motion";
import { RevealText, RollLink } from "./ui";

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

const primaryLink = (p: Project) => p.live ?? p.code ?? "#";

export function Work() {
  const [active, setActive] = useState<number | null>(null);
  const [last, setLast] = useState(0);
  const x = useSpring(useMotionValue(0), { stiffness: 180, damping: 22, mass: 0.6 });
  const y = useSpring(useMotionValue(0), { stiffness: 180, damping: 22, mass: 0.6 });
  // The floating preview leans into the direction the pointer travels, like a card being dragged.
  const tilt = useSpring(useTransform(useVelocity(x), [-1500, 1500], [-10, 10], { clamp: true }), {
    stiffness: 200,
    damping: 20,
  });

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

      {/* Phones: one column of cards · tablets: two columns · laptops+: typographic rows with a hover preview */}
      <ul className="grid gap-x-8 gap-y-14 md:grid-cols-2 lg:block" onPointerLeave={() => setActive(null)}>
        {projects.map((p, i) => (
          <li key={p.title} className="relative flex flex-col">
            <motion.span
              className="absolute inset-x-0 top-0 hidden h-px origin-left bg-line lg:block"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, ease: EASE_OUT, delay: i * 0.08 }}
            />

            <div
              data-cursor="View"
              onPointerEnter={(e) => {
                // Hover-only effect: a tap on a touch screen would otherwise leave the other rows dimmed.
                if (e.pointerType !== "mouse") return;
                setActive(i);
                setLast(i);
              }}
              className="relative grid grid-cols-[2.5rem_1fr] items-start gap-y-3 pt-6 transition-opacity duration-500 lg:grid-cols-[4rem_1fr_20rem_5rem] lg:items-center lg:py-11"
              style={{ opacity: active === null || active === i ? 1 : 0.3 }}
            >
              <span className="pt-2 text-sm text-muted lg:pt-0">{String(i + 1).padStart(2, "0")}</span>
              {/* The title's link stretches over the whole row; the Live/Code links sit above it. */}
              <a
                href={primaryLink(p)}
                target="_blank"
                rel="noreferrer"
                className="text-4xl tracking-tight after:absolute after:inset-0 lg:text-7xl"
              >
                {/* Only the inner text shifts — transforming the link would shrink its stretched click area. */}
                <span
                  className={`inline-block transition-transform duration-700 ease-out-expo ${active === i ? "translate-x-4 font-serif italic lg:translate-x-8" : ""}`}
                >
                  {p.title}
                </span>
              </a>
              <div className="col-start-2 text-sm lg:col-start-auto">
                {p.category}
                <p className="mt-1 max-w-xs text-muted">{p.description}</p>
                <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="Tech stack">
                  {p.stack.map((s) => (
                    <li key={s} className="rounded-full border border-line px-2.5 py-0.5 text-xs text-muted">
                      {s}
                    </li>
                  ))}
                </ul>
                <div className="relative z-10 mt-3 flex gap-5">
                  {p.live && (
                    <RollLink href={p.live} external>
                      Live ↗
                    </RollLink>
                  )}
                  {p.code && (
                    <RollLink href={p.code} external>
                      Code ↗
                    </RollLink>
                  )}
                </div>
              </div>
              <span className="hidden text-right text-sm text-muted lg:block">{p.year}</span>
            </div>

            {/* Below laptop size there's no hover, so the artwork sits in the card itself. */}
            <motion.a
              href={primaryLink(p)}
              target="_blank"
              rel="noreferrer"
              tabIndex={-1}
              aria-hidden
              className="order-first block aspect-[4/3] overflow-hidden rounded-sm lg:hidden"
              initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
              whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
              viewport={{ once: true, margin: "0px 0px -10% 0px" }}
              transition={{ duration: 1.1, ease: EASE_IN_OUT }}
            >
              <motion.div
                className="size-full"
                initial={{ scale: 1.15 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, margin: "0px 0px -10% 0px" }}
                transition={{ duration: 1.4, ease: EASE_OUT }}
              >
                <Artwork title={p.title} colors={p.colors} />
              </motion.div>
            </motion.a>
          </li>
        ))}
        <li className="hidden h-px bg-line lg:block" />
      </ul>

      {/* Floating preview that follows the pointer; the strip slides to the hovered project. */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-40 hidden lg:block"
        style={{ x, y }}
      >
        <AnimatePresence>
          {active !== null && (
            <motion.div
              className="h-[300px] w-[400px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-sm shadow-2xl shadow-black/30"
              style={{ rotate: tilt }}
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

"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { projects, type Project } from "@/lib/content";
import { EASE_OUT } from "@/lib/motion";
import { RevealText, RollLink } from "./ui";

const primaryLink = (p: Project) => p.live ?? p.code;

// A quiet, typographic list: number, title, details, year — no imagery.
export function Work() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section id="work" className="px-5 py-32 md:px-10 md:py-48">
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
        {projects.map((p, i) => {
          const href = primaryLink(p);
          // Only the inner text shifts — transforming the link would shrink its stretched click area.
          const title = (
            <span
              className={`inline-block transition-transform duration-700 ease-out-expo ${active === i ? "translate-x-4 font-serif italic lg:translate-x-8" : ""}`}
            >
              {p.title}
            </span>
          );
          return (
            <li key={p.title} className="relative">
              <motion.span
                className="absolute inset-x-0 top-0 h-px origin-left bg-line"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.4, ease: EASE_OUT, delay: i * 0.08 }}
              />
              <div
                data-cursor={href ? "View" : undefined}
                onPointerEnter={(e) => {
                  // Hover-only effect: a tap on a touch screen would otherwise leave the other rows dimmed.
                  if (e.pointerType === "mouse") setActive(i);
                }}
                className="group relative grid grid-cols-[2.5rem_1fr] items-start gap-y-3 py-8 transition-opacity duration-500 lg:grid-cols-[4rem_1fr_20rem_6rem] lg:items-center lg:py-11"
                style={{ opacity: active === null || active === i ? 1 : 0.3 }}
              >
                <span className="pt-2 text-sm text-muted lg:pt-0">{String(i + 1).padStart(2, "0")}</span>
                {href ? (
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-4xl tracking-tight after:absolute after:inset-0 lg:text-7xl"
                  >
                    {title}
                  </a>
                ) : (
                  <h3 className="text-4xl font-normal tracking-tight lg:text-7xl">{title}</h3>
                )}
                <div className="col-start-2 text-sm lg:col-start-auto">
                  <span className="emoji emoji-wiggle mr-2" aria-hidden>
                    {p.emoji}
                  </span>
                  {p.category}
                  <p className="mt-1 max-w-xs text-muted">{p.description}</p>
                  <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="Tags">
                    {p.stack.map((s) => (
                      <li key={s} className="rounded-full border border-line px-2.5 py-0.5 text-xs text-muted">
                        {s}
                      </li>
                    ))}
                  </ul>
                  {(p.live || p.code) && (
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
                  )}
                </div>
                <span className="hidden text-right text-sm text-muted lg:block">{p.year}</span>
              </div>
            </li>
          );
        })}
        <li className="h-px bg-line" />
      </ul>
    </section>
  );
}

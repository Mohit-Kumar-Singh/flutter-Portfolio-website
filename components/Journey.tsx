"use client";

import { motion, useScroll, useSpring } from "motion/react";
import { useRef } from "react";
import { timeline } from "@/lib/content";
import { FADE_UP, SPRING_GENTLE } from "@/lib/motion";
import { RevealText } from "./ui";
import { CompanyName } from "./CompanyName";

// Year-by-year timeline; the vertical rule draws itself as you scroll through it.
export function Journey() {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.8", "end 0.6"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <section id="journey" className="px-5 pb-[45svh] pt-20 md:px-10 md:pb-[45svh] md:pt-40">
      <div className="mb-14 flex items-end justify-between md:mb-20">
        <h2 className="text-5xl tracking-tight md:text-8xl">
          <RevealText text="Experience" />
        </h2>
      </div>

      {/* The rule lives beside the list, not inside it — an <ol> may only contain <li>s. */}
      <div className="relative md:ml-[calc(25%+1rem)]">
        <span aria-hidden className="absolute bottom-0 left-[5px] top-2 w-px bg-line" />
        <motion.span
          aria-hidden
          className="absolute bottom-0 left-[5px] top-2 w-px origin-top bg-ink"
          style={{ scaleY: progress }}
        />
        <ol ref={ref}>
          {timeline.map((entry) => (
            <li key={entry.year} className="relative pb-14 pl-10 last:pb-0 md:pb-20">
              <motion.span
                className="absolute left-0 top-2 size-[11px] rounded-full border border-ink bg-paper"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, margin: "0px 0px -20% 0px" }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              />
              <span className="mb-5 block font-serif text-4xl italic md:text-5xl">
                <RevealText text={entry.year} />
              </span>
              <div className="grid gap-8 md:grid-cols-2">
                {entry.items.map((item, i) => (
                  <motion.div
                    key={item.title}
                    {...FADE_UP}
                    transition={{ ...SPRING_GENTLE, delay: 0.08 + i * 0.08 }}
                  >
                    <h3 className="mb-2 text-xl tracking-tight">
                      {item.href ? (
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noreferrer"
                          className="underline decoration-current/30 decoration-1 underline-offset-[0.18em] transition-[text-decoration-color] hover:decoration-current"
                        >
                          {item.title} ↗
                        </a>
                      ) : (
                        item.title
                      )}
                      {item.company && (
                        <>
                          {" · "}
                          <CompanyName />
                        </>
                      )}
                    </h3>
                    <p className="max-w-sm leading-snug text-muted">{item.detail}</p>
                  </motion.div>
                ))}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

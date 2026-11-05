"use client";

import { motion } from "motion/react";
import { skills } from "@/lib/content";
import { EASE_OUT, SPRING_GENTLE } from "@/lib/motion";
import { RevealText } from "./ui";

export function Skills() {
  return (
    <section id="skills" className="px-5 py-20 md:px-10 md:py-40">
      <div className="mb-14 flex items-end justify-between md:mb-20">
        <h2 className="text-5xl tracking-tight md:text-8xl">
          <RevealText text="Skills" />
        </h2>
      </div>

      <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        {skills.map((g, gi) => (
          <div key={g.group} className="relative pt-6">
            <motion.span
              className="absolute inset-x-0 top-0 h-px origin-left bg-line"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: EASE_OUT, delay: gi * 0.1 }}
            />
            <h3 className="mb-5 text-sm text-muted">{g.group}</h3>
            <p className="text-lg leading-snug sm:hidden">{g.items.join(" · ")}</p>
            <motion.ul
              className="hidden flex-wrap gap-2 sm:flex"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "0px 0px -10% 0px" }}
              transition={{ staggerChildren: 0.05, delayChildren: gi * 0.1 }}
            >
              {g.items.map((s) => (
                <motion.li
                  key={s}
                  variants={{
                    hidden: { opacity: 0, y: 14, filter: "blur(6px)" },
                    show: { opacity: 1, y: 0, filter: "blur(0px)" },
                  }}
                  transition={SPRING_GENTLE}
                  className="rounded-full border border-ink/15 px-4 py-2 text-sm transition-colors duration-300 hover:border-ink hover:bg-ink hover:text-paper"
                >
                  {s}
                </motion.li>
              ))}
            </motion.ul>
          </div>
        ))}
      </div>
    </section>
  );
}

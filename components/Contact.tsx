"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { site } from "@/lib/content";
import { LocalTime, Magnetic, RevealText, RollLink } from "./ui";

export function Contact() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-30%", "0%"]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-90, 0]);

  return (
    <section id="contact" ref={ref} className="relative overflow-hidden bg-ink text-paper">
      <motion.div style={{ y }} className="flex min-h-svh flex-col justify-between px-5 pb-8 pt-32 md:px-10 md:pb-10 md:pt-40">
        <div>
          <span className="mb-10 block text-sm text-paper/50">(Contact)</span>
          <h2 className="text-[13vw] leading-[0.9] tracking-[-0.04em] md:text-[9vw]">
            <RevealText text="Let's make" />
            <br />
            <span className="font-serif italic">
              <RevealText text="something" delay={0.1} />
            </span>{" "}
            <RevealText text="rare." delay={0.2} />
          </h2>
        </div>

        <div className="relative my-16 flex flex-col items-start gap-10 md:flex-row md:items-center md:justify-between">
          <div className="absolute inset-x-0 top-1/2 hidden h-px bg-paper/15 md:block" />
          <Magnetic strength={0.4} className="relative">
            <a
              href={`mailto:${site.email}`}
              className="group relative block overflow-hidden rounded-full border border-paper/20 bg-ink px-8 py-5 text-lg md:text-2xl"
            >
              <span className="absolute inset-0 translate-y-full rounded-full bg-accent transition-transform duration-700 ease-out-expo group-hover:translate-y-0" />
              <span className="relative">{site.email}</span>
            </a>
          </Magnetic>
          <Magnetic strength={0.5} className="relative">
            <a
              href={`mailto:${site.email}`}
              className="flex size-40 items-center justify-center rounded-full bg-accent text-lg text-[#111] transition-transform duration-500 ease-out-expo hover:scale-105 md:size-52"
            >
              <motion.span style={{ rotate }} className="inline-flex items-center gap-2">
                Get in touch ↗
              </motion.span>
            </a>
          </Magnetic>
        </div>

        <footer className="flex flex-col gap-8 text-sm md:flex-row md:items-end md:justify-between">
          <div className="flex gap-10">
            <div>
              <span className="mb-2 block text-xs text-paper/40">Version</span>
              {site.year} © Edition
            </div>
            <div>
              <span className="mb-2 block text-xs text-paper/40">Local time</span>
              <LocalTime timeZone={site.timeZone} />
            </div>
          </div>
          <div>
            <span className="mb-2 block text-xs text-paper/40">Socials</span>
            <div className="flex flex-wrap gap-6">
              {site.socials.map((s) => (
                <Magnetic key={s.label} strength={0.3}>
                  <RollLink href={s.href} external>
                    {s.label}
                  </RollLink>
                </Magnetic>
              ))}
            </div>
          </div>
        </footer>
      </motion.div>
    </section>
  );
}

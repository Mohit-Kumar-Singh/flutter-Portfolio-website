"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { site } from "@/lib/content";
import { EASE_OUT } from "@/lib/motion";
import { useLoaded } from "./Experience";
import { LocalTime, RevealText } from "./ui";

function Letters({ text, play, delay, className }: { text: string; play: boolean; delay: number; className?: string }) {
  return (
    <span className={`flex overflow-hidden pb-[0.06em] ${className ?? ""}`} aria-label={text}>
      {[...text].map((ch, i) => (
        <motion.span
          key={i}
          aria-hidden
          className="inline-block whitespace-pre"
          initial={{ y: "110%", rotate: 6 }}
          animate={play ? { y: "0%", rotate: 0 } : {}}
          transition={{ duration: 1.1, ease: EASE_OUT, delay: delay + i * 0.045 }}
        >
          {ch}
        </motion.span>
      ))}
    </span>
  );
}

export function Hero() {
  const loaded = useLoaded();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);

  return (
    <section id="top" ref={ref} className="relative flex min-h-svh flex-col justify-end overflow-hidden px-5 pb-8 pt-28 md:px-10 md:pb-10">
      <motion.div style={{ y, opacity, scale }} className="origin-bottom">
        <div className="mb-10 flex items-start justify-between gap-6 text-sm md:mb-14">
          <motion.div
            className="max-w-xs text-muted"
            initial={{ opacity: 0 }}
            animate={loaded ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 1 }}
          >
            <span className="mb-2 flex items-center gap-2 text-ink">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60" />
                <span className="relative inline-flex size-2 rounded-full bg-accent" />
              </span>
              Available for new projects
            </span>
            {site.role}
          </motion.div>
          <motion.div
            className="text-right text-muted"
            initial={{ opacity: 0 }}
            animate={loaded ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 1.1 }}
          >
            <span className="block text-ink">Based in {site.location}</span>
            <LocalTime timeZone={site.timeZone} />
          </motion.div>
        </div>

        <h1 className="leading-[0.85] tracking-[-0.05em]">
          <Letters text={site.firstName} play={loaded} delay={0.2} className="text-[24vw] font-semibold md:text-[17vw]" />
          <Letters
            text={site.lastName}
            play={loaded}
            delay={0.45}
            className="justify-end font-serif text-[17vw] italic tracking-[-0.03em] md:text-[13vw]"
          />
        </h1>

        <div className="mt-8 flex flex-col justify-between gap-8 md:mt-12 md:flex-row md:items-end">
          <p className="max-w-md text-lg leading-snug md:text-xl">
            <RevealText text={site.intro} play={loaded} delay={0.9} stagger={0.02} />
          </p>
          <motion.a
            href="#work"
            className="flex items-center gap-3 text-sm text-muted"
            initial={{ opacity: 0 }}
            animate={loaded ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 1.4 }}
          >
            Scroll
            <span className="relative h-10 w-px overflow-hidden bg-line">
              <motion.span
                className="absolute inset-x-0 top-0 h-1/2 bg-ink"
                animate={{ y: ["-100%", "200%"] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              />
            </span>
          </motion.a>
        </div>
      </motion.div>
    </section>
  );
}

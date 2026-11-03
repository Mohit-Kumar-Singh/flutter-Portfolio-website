"use client";

import { motion } from "motion/react";
import { site } from "@/lib/content";
import { feedback } from "@/lib/feedback";
import { EASE_OUT } from "@/lib/motion";
import { useLoaded } from "./Experience";
import { Icon } from "./Icons";
import { LocalTime, Magnetic, RevealText, RollLink } from "./ui";

function Letters({ text, play, delay, className }: { text: string; play: boolean; delay: number; className?: string }) {
  return (
    // The mask needs room for descenders (the "g" in Singh) and italic overhang; negative margins keep the layout unchanged.
    <span className={`-mx-[0.08em] -mb-[0.22em] flex overflow-hidden px-[0.08em] pb-[0.22em] ${className ?? ""}`}>
      <span className="sr-only">{text}</span>
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

  return (
    <section id="top" className="relative flex min-h-svh flex-col justify-end px-5 pb-8 pt-28 md:px-10 md:pb-10">
      {/* Phones & tablets: status row pinned to the top, name at the bottom — no empty gap above.
          No scroll-linked motion here: it used to slide and fade the buttons out of view. */}
      <div className="flex flex-1 flex-col justify-between lg:flex-none lg:justify-end">
        <div className="mb-10 flex items-start justify-between gap-6 text-sm md:mb-14">
          <motion.div
            className="max-w-xs text-muted"
            initial={{ opacity: 0 }}
            animate={loaded ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 1 }}
          >
            <span className="mb-2 flex items-center gap-2 text-ink">
              <span className="size-2 rounded-full bg-accent" />
              {site.status}
            </span>
            <span className="flex flex-wrap gap-x-3">
              <span>
                <Icon name="gear" draw className="icon-spin mr-1 -mt-0.5 align-middle" /> DevOps
              </span>
              <span>
                <Icon name="loop" draw className="icon-spin mr-1 -mt-0.5 align-middle" /> Automation
              </span>
              <span>
                <Icon name="brush" draw className="icon-wiggle mr-1 -mt-0.5 align-middle" /> Artist
              </span>
            </span>
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

        <div>
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
            <div className="max-w-md">
              <p className="text-lg leading-snug md:text-xl">
                <RevealText text={site.intro} play={loaded} delay={0.6} stagger={0.02} />
              </p>
              <motion.div
                className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-4"
                initial={{ opacity: 0, y: 12 }}
                animate={loaded ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.9, ease: EASE_OUT, delay: 1.2 }}
              >
                <Magnetic strength={0.3}>
                  <a
                    href="#contact"
                    onClick={() => feedback("tap")}
                    className="press group relative block overflow-hidden rounded-full bg-ink px-6 py-3 text-sm text-paper"
                  >
                    <span className="absolute inset-0 translate-y-full rounded-full bg-accent transition-transform duration-500 ease-out-expo group-hover:translate-y-0" />
                    <span className="relative">Let&apos;s talk</span>
                  </a>
                </Magnetic>
                {site.resume && (
                  <Magnetic strength={0.3}>
                    <a
                      href={site.resume}
                      target="_blank"
                      rel="noreferrer"
                      className="block rounded-full border border-ink/20 px-6 py-3 text-sm transition-colors duration-300 hover:border-ink"
                    >
                      Resume ↗
                    </a>
                  </Magnetic>
                )}
                <div className="flex gap-5 text-sm text-muted">
                  {site.socials.map((s) => (
                    <RollLink key={s.label} href={s.href} external>
                      {s.label}
                    </RollLink>
                  ))}
                </div>
              </motion.div>
            </div>
            <motion.a
              href="#work"
              className="hidden items-center gap-3 text-sm text-muted md:flex"
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
        </div>
      </div>
    </section>
  );
}

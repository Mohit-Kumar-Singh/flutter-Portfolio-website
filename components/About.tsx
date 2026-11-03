"use client";

import Image from "next/image";
import { animate, motion, MotionValue, useInView, useMotionValue, useScroll, useTransform } from "motion/react";
import { useEffect, useRef } from "react";
import { site } from "@/lib/content";
import { EASE_IN_OUT, EASE_OUT } from "@/lib/motion";
import { RevealText } from "./ui";

function Word({ word, progress, range }: { word: string; progress: MotionValue<number>; range: [number, number] }) {
  // Starts dim but still legible, then lights up as you read.
  const opacity = useTransform(progress, range, [0.28, 1]);
  return (
    <motion.span style={{ opacity }} className="inline-block">
      {word}&nbsp;
    </motion.span>
  );
}

// A key fact whose number counts up the first time it scrolls into view.
function Stat({ value, suffix, label }: { value: number; suffix?: string; label: string }) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const count = useMotionValue(0);
  const shown = useTransform(count, (v) => Math.round(v));

  useEffect(() => {
    if (!inView) return;
    const controls = animate(count, value, { duration: 1.6, ease: EASE_OUT });
    return () => controls.stop();
  }, [inView, count, value]);

  return (
    // dt comes first for screen readers; flex-col-reverse puts the number on top visually.
    <div className="flex flex-col-reverse justify-end gap-2">
      <dt className="text-xs text-muted md:text-sm">{label}</dt>
      <dd ref={ref} className="font-serif text-5xl italic leading-none md:text-7xl">
        <span className="sr-only">
          {value}
          {suffix}
        </span>
        <span aria-hidden>
          <motion.span>{shown}</motion.span>
          {suffix}
        </span>
      </dd>
    </div>
  );
}

// Portrait unveils with a clip-path wipe, drifts on scroll, and gains colour on hover.
function Portrait() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <motion.div
      ref={ref}
      data-cursor="Hi!"
      className="group relative aspect-[87/105] w-full max-w-xs overflow-hidden rounded-sm"
      initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
      viewport={{ once: true, margin: "0px 0px -15% 0px" }}
      transition={{ duration: 1.4, ease: EASE_IN_OUT }}
    >
      <motion.div style={{ y }} className="absolute -inset-y-[10%] inset-x-0">
        <Image
          src={site.portrait}
          alt={`${site.firstName} ${site.lastName}`}
          fill
          sizes="(min-width: 768px) 20rem, 100vw"
          className="object-cover grayscale transition-[filter,transform] duration-700 ease-out-expo group-hover:scale-105 group-hover:grayscale-0"
        />
      </motion.div>
    </motion.div>
  );
}

export function About() {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.5"] });
  const words = site.about.split(" ");

  return (
    <section id="about" className="px-5 py-20 md:px-10 md:py-48">
      <div className="grid gap-10 md:grid-cols-[1fr_3fr] md:gap-16">
        <div className="flex flex-col gap-6">
          <span className="text-sm text-muted">(About)</span>
          <Portrait />
        </div>
        <div>
          <p ref={ref} className="text-2xl leading-[1.2] tracking-tight sm:text-3xl md:text-[3.4vw]">
            {words.map((w, i) => (
              <Word key={i} word={w} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} />
            ))}
          </p>

          <dl className="mt-20 grid grid-cols-3 gap-6 border-y border-line py-8 md:gap-10">
            {site.stats.map((st) => (
              <Stat key={st.label} {...st} />
            ))}
          </dl>

          <div className="mt-16 grid gap-12 md:grid-cols-2">
            <div>
              <h3 className="mb-6 text-sm text-muted">Education</h3>
              {site.education.map((e, i) => (
                <div key={e.title} className="mb-5">
                  <span className="block text-xl">
                    <RevealText text={e.title} delay={i * 0.1} />
                  </span>
                  <span className="block text-sm text-muted">
                    <RevealText text={e.place} delay={0.1 + i * 0.1} stagger={0.02} />
                  </span>
                </div>
              ))}
            </div>
            <div>
              <h3 className="mb-6 text-sm text-muted">Off-screen</h3>
              <p className="font-serif text-2xl italic leading-snug">
                <RevealText text={site.offScreen} stagger={0.02} />
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

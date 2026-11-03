"use client";

import Image from "next/image";
import { motion, MotionValue, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { site } from "@/lib/content";
import { EASE_IN_OUT, EASE_OUT } from "@/lib/motion";
import { RevealText } from "./ui";

function Word({ word, progress, range }: { word: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.12, 1]);
  return (
    <motion.span style={{ opacity }} className="inline-block">
      {word}&nbsp;
    </motion.span>
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
    <section id="about" className="px-5 py-32 md:px-10 md:py-48">
      <div className="grid gap-10 md:grid-cols-[1fr_3fr] md:gap-16">
        <div className="flex flex-col gap-6">
          <span className="text-sm text-muted">(About)</span>
          <Portrait />
        </div>
        <div>
          <p ref={ref} className="text-3xl leading-[1.15] tracking-tight md:text-[3.4vw]">
            {words.map((w, i) => (
              <Word key={i} word={w} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} />
            ))}
          </p>

          <div className="mt-24 grid gap-12 md:grid-cols-2">
            <div>
              <h3 className="mb-6 text-sm text-muted">What I do</h3>
              <ul>
                {site.services.map((s, i) => (
                  <li key={s} className="relative py-4 text-xl">
                    <motion.span
                      className="absolute inset-x-0 bottom-0 h-px origin-left bg-line"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, ease: EASE_OUT, delay: i * 0.1 }}
                    />
                    <RevealText text={s} delay={i * 0.1} />
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col gap-12">
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
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import { motion, MotionValue, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { site } from "@/lib/content";
import { EASE_IN_OUT } from "@/lib/motion";
import { Term, termFor } from "./Term";
import { RevealText } from "./ui";

function Word({ word, progress, range }: { word: string; progress: MotionValue<number>; range: [number, number] }) {
  // Starts dim but still legible, then lights up as you read.
  const opacity = useTransform(progress, range, [0.28, 1]);
  return (
    <motion.span style={{ opacity }} className="inline-block">
      {termFor(word) ? <Term word={termFor(word)!}>{word}</Term> : word}&nbsp;
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
          <h2 className="text-sm text-muted">About</h2>
          <Portrait />
        </div>
        <div>
          <p ref={ref} className="text-2xl leading-[1.2] tracking-tight sm:text-3xl md:text-[3.4vw]">
            {words.map((w, i) => (
              <Word key={i} word={w} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} />
            ))}
          </p>

          <div className="mt-20 grid gap-12 md:grid-cols-2">
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

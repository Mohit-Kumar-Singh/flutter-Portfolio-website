"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { art, artworks } from "@/lib/content";
import { EASE_IN_OUT, EASE_OUT } from "@/lib/motion";
import { RevealText } from "./ui";

// The artist side: murals, the café, the fine-art society — plus a gallery once photos are added.
export function Art() {
  return (
    <section id="art" className="px-5 py-24 md:px-10 md:py-40">
      <div className="mb-14 flex items-end justify-between md:mb-20">
        <h2 className="text-5xl tracking-tight md:text-8xl">
          <RevealText text="The other" />{" "}
          <span className="font-serif italic">
            <RevealText text="canvas" delay={0.1} />
          </span>
        </h2>
        <span className="text-sm text-muted">(Art)</span>
      </div>

      <div className="grid gap-12 md:grid-cols-[1fr_3fr] md:gap-16">
        <p className="max-w-xs font-serif text-2xl italic leading-snug">
          <RevealText text={art.intro} stagger={0.015} />
        </p>

        <ol className="grid gap-x-10 sm:grid-cols-2">
          {art.highlights.map((h, i) => (
            <motion.li
              key={h.title}
              className="relative border-t border-line py-7"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -10% 0px" }}
              transition={{ duration: 0.8, ease: EASE_OUT, delay: (i % 2) * 0.1 }}
            >
              <span className="mb-4 block text-xs text-muted">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mb-2 text-2xl tracking-tight md:text-3xl">{h.title}</h3>
              <p className="max-w-sm leading-snug text-muted">{h.detail}</p>
            </motion.li>
          ))}
        </ol>
      </div>

      {artworks.length > 0 && (
        <ul className="mt-20 grid grid-cols-2 gap-4 md:mt-28 md:grid-cols-3 md:gap-6">
          {artworks.map((a, i) => (
            <motion.li
              key={a.src}
              className={`group relative overflow-hidden rounded-sm ${i % 3 === 0 ? "row-span-2 aspect-[3/4]" : "aspect-square"}`}
              initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
              whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
              viewport={{ once: true, margin: "0px 0px -10% 0px" }}
              transition={{ duration: 1.1, ease: EASE_IN_OUT, delay: (i % 3) * 0.08 }}
            >
              <Image
                src={a.src}
                alt={a.title}
                fill
                sizes="(min-width: 768px) 33vw, 50vw"
                className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-105"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-white opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <span className="block text-sm">{a.title}</span>
                {a.detail && <span className="block text-xs text-white/70">{a.detail}</span>}
              </div>
            </motion.li>
          ))}
        </ul>
      )}
    </section>
  );
}

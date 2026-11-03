"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { art, artworks } from "@/lib/content";
import { EASE_OUT, FADE_UP, SPRING_GENTLE } from "@/lib/motion";
import { Icon } from "./Icons";
import { Magnetic, RevealText } from "./ui";

// The artist side: murals, the café, the fine-art society — plus a gallery once photos are added.
export function Art() {
  return (
    <section id="art" className="px-5 py-20 md:px-10 md:py-40">
      <div className="mb-14 flex items-end justify-between md:mb-20">
        <h2 className="text-5xl tracking-tight md:text-8xl">
          <RevealText text="The other" />{" "}
          <span className="font-serif italic">
            <RevealText text="canvas" delay={0.1} />
          </span>{" "}
          <Icon name="brush" draw strokeWidth={1} className="icon-wiggle align-top text-5xl md:text-7xl" />
        </h2>
        <span className="text-sm text-muted">(Art)</span>
      </div>

      <div className="grid gap-12 md:grid-cols-[1fr_3fr] md:gap-16">
        <div>
          <p className="max-w-xs font-serif text-2xl italic leading-snug">
            <RevealText text={art.intro} stagger={0.015} />
          </p>
          <Magnetic strength={0.3} className="mt-8">
            <a
              href={art.instagram.href}
              target="_blank"
              rel="noreferrer"
              className="press group relative block overflow-hidden rounded-full border border-ink/20 px-5 py-3 text-sm"
            >
              <span className="absolute inset-0 translate-y-full rounded-full bg-accent transition-transform duration-500 ease-out-expo group-hover:translate-y-0" />
              <span className="relative">Follow {art.instagram.handle} ↗</span>
            </a>
          </Magnetic>
        </div>

        <ol className="grid gap-x-10 sm:grid-cols-2">
          {art.highlights.map((h, i) => (
            <motion.li
              key={h.title}
              className="relative border-t border-line py-7"
              {...FADE_UP}
              transition={{ ...SPRING_GENTLE, delay: (i % 2) * 0.08 }}
            >
              <span className="mb-4 block text-xs text-muted">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mb-2 text-2xl tracking-tight md:text-3xl">{h.title}</h3>
              <p className="max-w-sm leading-snug text-muted">{h.detail}</p>
            </motion.li>
          ))}
        </ol>
      </div>

      {artworks.length > 0 && (
        // One drifting row instead of a tall grid. The list is rendered twice so the loop is seamless;
        // hovering or holding pauses it, and with reduced motion it becomes a normal swipeable row.
        <motion.div
          className="art-marquee -mx-5 mt-16 overflow-hidden md:-mx-10 md:mt-24"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          transition={{ duration: 1, ease: EASE_OUT }}
        >
          <div className="art-marquee-track flex w-max gap-4 md:gap-6">
            {[0, 1].map((copy) => (
              <ul key={copy} className="flex shrink-0 gap-4 md:gap-6" aria-hidden={copy === 1 || undefined}>
                {artworks.map((a) => (
                  <li key={a.src} className="w-44 shrink-0 md:w-64">
                    <a
                      href={art.instagram.href}
                      target="_blank"
                      rel="noreferrer"
                      tabIndex={copy === 1 ? -1 : undefined}
                      data-cursor="View"
                      className="group block"
                    >
                      <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
                        <Image
                          src={a.src}
                          alt={copy === 1 ? "" : `${a.title} — artwork by Mohit Kumar Singh`}
                          fill
                          sizes="(min-width: 768px) 16rem, 11rem"
                          className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-105"
                        />
                      </div>
                      <span className="mt-3 block truncate text-sm leading-tight">{a.title}</span>
                      {a.detail && <span className="mt-1 block truncate text-xs text-muted">{a.detail}</span>}
                    </a>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </motion.div>
      )}
    </section>
  );
}

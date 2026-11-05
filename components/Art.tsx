"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { art, artworks, site } from "@/lib/content";
import { EASE_OUT, FADE_UP, SPRING_GENTLE } from "@/lib/motion";
import { feedback } from "@/lib/feedback";
import { TermText } from "./Term";
import { Magnetic, RevealText } from "./ui";

// The artist side: murals, the café, the fine-art society — plus a gallery once photos are added.
export function Art() {
  return (
    <section id="art" className="px-5 py-20 md:px-10 md:py-40">
      <div className="mb-14 flex items-end justify-between md:mb-20">
        <h2 className="text-5xl tracking-tight md:text-8xl">
          <RevealText text="Art" />
        </h2>
      </div>

      <div className="grid gap-12 md:grid-cols-[1fr_3fr] md:gap-16">
        <div>
          <p className="max-w-xs font-serif text-2xl italic leading-snug">
            <RevealText text={art.intro} stagger={0.015} />
          </p>
          <Magnetic strength={0.3} className="mt-8">
            <a
              href={art.instagram.href}
              onClick={() => feedback("tap")}
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
              <h3 className="mb-2 text-2xl tracking-tight md:text-3xl">
                {"href" in h && h.href ? (
                  <a href={h.href} target="_blank" rel="noreferrer" className="group inline-flex items-baseline gap-2">
                    <span className="underline decoration-current/30 decoration-1 underline-offset-[0.18em] transition-[text-decoration-color] group-hover:decoration-current">
                      {h.title}
                    </span>
                    <span className="text-base text-muted transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                      ↗
                    </span>
                  </a>
                ) : (
                  <TermText text={h.title} />
                )}
              </h3>
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
                  // Landscape pieces (the murals) keep the same height as portrait ones, so the row stays even.
                  <li key={a.src} className={`shrink-0 ${a.landscape ? "w-[18.33rem] md:w-[26.67rem]" : "w-44 md:w-64"}`}>
                    <a
                      href={art.instagram.href}
                      target="_blank"
                      rel="noreferrer"
                      tabIndex={copy === 1 ? -1 : undefined}
                      className="group block"
                    >
                      <div className={`relative overflow-hidden rounded-sm ${a.landscape ? "aspect-[4/3]" : "aspect-[4/5]"}`}>
                        <Image
                          src={a.src}
                          alt={copy === 1 ? "" : `${a.title}, artwork by ${site.firstName} ${site.lastName}`}
                          fill
                          sizes={a.landscape ? "(min-width: 768px) 27rem, 19rem" : "(min-width: 768px) 16rem, 11rem"}
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

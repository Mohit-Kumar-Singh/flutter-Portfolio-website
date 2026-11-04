"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { certifications, hasLearning, sideProjects } from "@/lib/content";
import { EASE_OUT, FADE_UP, SPRING_GENTLE } from "@/lib/motion";
import { RevealText, RollLink } from "./ui";

// Certificates (e.g. Udemy) and side projects. Renders nothing until lib/content.ts has an entry.
export function Learning() {
  if (!hasLearning) return null;

  return (
    <section id="learning" className="px-5 py-20 md:px-10 md:py-40">
      <div className="mb-14 md:mb-20">
        <h2 className="text-5xl tracking-tight md:text-8xl">
          <RevealText text="Learning" />
        </h2>
      </div>

      {certifications.length > 0 && (
        <div className="mb-20">
          <h3 className="mb-6 text-sm text-muted">Certifications</h3>
          <ul>
            {certifications.map((c, i) => (
              <motion.li
                key={c.title}
                className="relative grid grid-cols-1 items-center gap-4 border-t border-line py-6 sm:grid-cols-[1fr_auto] lg:grid-cols-[6rem_1fr_12rem_8rem]"
                {...FADE_UP}
                transition={{ ...SPRING_GENTLE, delay: i * 0.06 }}
              >
                {c.image ? (
                  <div className="relative hidden aspect-[4/3] overflow-hidden rounded-sm border border-line lg:block">
                    <Image src={c.image} alt={`${c.title} certificate`} fill sizes="6rem" className="object-cover" />
                  </div>
                ) : (
                  <span className="hidden lg:block" />
                )}
                <span className="text-2xl tracking-tight md:text-3xl">{c.title}</span>
                <span className="text-sm text-muted">
                  {c.issuer} · {c.date}
                </span>
                {c.url ? (
                  <span className="text-sm lg:text-right">
                    <RollLink href={c.url} external>
                      View certificate ↗
                    </RollLink>
                  </span>
                ) : (
                  <span />
                )}
              </motion.li>
            ))}
            <li className="h-px bg-line" />
          </ul>
        </div>
      )}

      {sideProjects.length > 0 && (
        <div>
          <h3 className="mb-6 text-sm text-muted">Projects</h3>
          <ul className="grid gap-x-10 sm:grid-cols-2">
            {sideProjects.map((p, i) => (
              <motion.li
                key={p.title}
                className="border-t border-line py-7"
                {...FADE_UP}
                transition={{ ...SPRING_GENTLE, delay: (i % 2) * 0.08 }}
              >
                <h4 className="mb-2 text-2xl tracking-tight md:text-3xl">{p.title}</h4>
                <p className="max-w-sm leading-snug text-muted">{p.description}</p>
                <motion.ul
                  className="mt-3 flex flex-wrap gap-1.5"
                  aria-label="Tags"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.2 }}
                >
                  {p.tags.map((t) => (
                    <li key={t} className="rounded-full border border-line px-2.5 py-0.5 text-xs text-muted">
                      {t}
                    </li>
                  ))}
                </motion.ul>
                {(p.live || p.code) && (
                  <div className="mt-3 flex gap-5 text-sm">
                    {p.live && (
                      <RollLink href={p.live} external>
                        Live ↗
                      </RollLink>
                    )}
                    {p.code && (
                      <RollLink href={p.code} external>
                        Code ↗
                      </RollLink>
                    )}
                  </div>
                )}
              </motion.li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}

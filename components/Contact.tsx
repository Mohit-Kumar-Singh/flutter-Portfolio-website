"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { site } from "@/lib/content";
import { feedback } from "@/lib/feedback";
import { useScrollControls } from "./Experience";
import { GetInTouch } from "./GetInTouch";
import { Icon } from "./Icons";
import { LocalTime, Magnetic, RevealText, RollLink } from "./ui";

export function Contact() {
  const { scrollTo } = useScrollControls();
  const [copied, setCopied] = useState(false);
  const copiedTimer = useRef<number | undefined>(undefined);
  useEffect(() => () => window.clearTimeout(copiedTimer.current), []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
    } catch {
      window.location.href = `mailto:${site.email}`;
      return;
    }
    feedback("success");
    setCopied(true);
    // Restart the timer on every copy, so a second click doesn't get cut short by the first one's timeout.
    window.clearTimeout(copiedTimer.current);
    copiedTimer.current = window.setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="relative bg-ink text-paper">
      <div className="flex min-h-svh flex-col justify-between px-5 pb-8 pt-32 md:px-10 md:pb-10 md:pt-40">
        <div>
          <h2 className="text-[13vw] leading-[0.9] tracking-[-0.04em] md:text-[9vw]">
            <RevealText text="Say hello." />
          </h2>
        </div>

        <div className="relative my-16 flex flex-col items-start gap-10 md:flex-row md:items-center md:justify-between">
          <div className="absolute inset-x-0 top-1/2 hidden h-px bg-paper/15 md:block" />
          {/* Copies the address — mailto alone does nothing on machines without a mail app. */}
          <Magnetic strength={0.4} className="relative">
            <button
              type="button"
              onClick={copyEmail}
              aria-label={`Copy email address ${site.email}`}
              className="press group relative block overflow-hidden rounded-full border border-paper/20 bg-ink px-8 py-5 text-left text-lg md:text-2xl"
            >
              <span className="absolute inset-0 translate-y-full rounded-full bg-accent transition-transform duration-700 ease-out-expo group-hover:translate-y-0" />
              <span className="relative flex items-center gap-4">
                {site.email}
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={copied ? "done" : "copy"}
                    className="text-sm opacity-60"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 0.6, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25 }}
                  >
                    {copied ? "Copied ✓" : "Copy"}
                  </motion.span>
                </AnimatePresence>
              </span>
            </button>
          </Magnetic>
          <span role="status" className="sr-only">
            {copied ? "Email address copied" : ""}
          </span>
          <GetInTouch />
        </div>

        <footer className="flex flex-col gap-8 text-sm md:flex-row md:items-end md:justify-between">
          <div className="flex gap-10">
            <div>
              <span className="mb-2 block text-xs text-paper/40">Last updated</span>
              {site.updated}
            </div>
            <div>
              <span className="mb-2 block text-xs text-paper/40">Local time</span>
              <LocalTime timeZone={site.timeZone} />
            </div>
            <div className="hidden sm:block">
              <span className="mb-2 block text-xs text-paper/40">Built with</span>
              <span className="group inline-flex items-center gap-1.5">
                <Icon name="cup" className="icon-wiggle" /> &amp; <Icon name="gear" className="icon-spin" /> in Delhi
              </span>
            </div>
          </div>
          <div>
            <button
              type="button"
              onClick={() => {
                feedback("tap");
                scrollTo("#top");
              }}
              className="press mb-6 block text-xs text-paper/60 transition-colors hover:text-paper"
            >
              Back to top ↑
            </button>
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
      </div>
    </section>
  );
}

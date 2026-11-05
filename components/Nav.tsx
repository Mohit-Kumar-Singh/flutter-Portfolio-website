"use client";

import { motion } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import { hasLearning, site } from "@/lib/content";
import { feedback } from "@/lib/feedback";
import { EASE_OUT } from "@/lib/motion";
import { useLoaded } from "./Experience";
import { MobileMenu, type NavLink } from "./MobileMenu";
import { SoundToggle } from "./SoundToggle";
import { ThemeToggle } from "./ThemeToggle";
import { RollLink } from "./ui";

// "Learning" only appears once there's a certificate or project to show.
const LINKS: NavLink[] = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Art", href: "#art" },
  ...(hasLearning ? [{ label: "Learning", href: "#learning" }] : []),
  { label: "Experience", href: "#journey" },
  { label: "Contact", href: "#contact" },
];

export function Nav() {
  const loaded = useLoaded();
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const [current, setCurrent] = useState<string | null>(null);

  // Underline the link for whichever section sits in the middle of the screen.
  useEffect(() => {
    const sections = LINKS.map((l) => document.querySelector<HTMLElement>(l.href)).filter((s): s is HTMLElement => s !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setCurrent(`#${e.target.id}`);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-5 py-5 text-white mix-blend-difference md:px-10 md:py-7"
        initial={{ y: -30, opacity: 0 }}
        animate={loaded ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 1, ease: EASE_OUT, delay: 0.9 }}
      >
        <a href="#top" className="-my-3 py-3 text-sm font-medium">
          {site.firstName} {site.lastName}
        </a>
        <nav aria-label="Primary" className="flex items-center gap-5 text-sm md:gap-10">
          <div className="hidden items-center gap-8 sm:flex md:gap-10">
            {LINKS.map((l) => (
              <RollLink key={l.href} href={l.href} active={current === l.href}>
                {l.label}
              </RollLink>
            ))}
          </div>
          {/* On phones the sound switch lives in the menu to keep the bar light. */}
          <span className="hidden sm:contents">
            <SoundToggle />
          </span>
          <ThemeToggle />
          <button
            type="button"
            onClick={() => {
              feedback("open");
              setMenuOpen(true);
            }}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className="press -m-3 flex items-center gap-2 p-3 sm:hidden"
          >
            <span className="flex w-4 flex-col gap-[3px]" aria-hidden>
              <span className="h-px w-full bg-current" />
              <span className="h-px w-2/3 bg-current" />
            </span>
            Menu
          </button>
        </nav>
      </motion.header>
      <MobileMenu open={menuOpen} onClose={closeMenu} links={LINKS} />
    </>
  );
}

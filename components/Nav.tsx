"use client";

import { motion } from "motion/react";
import { site } from "@/lib/content";
import { EASE_OUT } from "@/lib/motion";
import { useLoaded } from "./Experience";
import { ThemeToggle } from "./ThemeToggle";
import { Magnetic, RollLink } from "./ui";

const LINKS = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export function Nav() {
  const loaded = useLoaded();
  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-5 py-5 text-white mix-blend-difference md:px-10 md:py-7"
      initial={{ y: -30, opacity: 0 }}
      animate={loaded ? { y: 0, opacity: 1 } : {}}
      transition={{ duration: 1, ease: EASE_OUT, delay: 0.9 }}
    >
      <Magnetic strength={0.25}>
        <a href="#top" className="group -my-3 flex items-center gap-1 py-3 text-sm font-medium">
          <span className="inline-block transition-transform duration-700 ease-out-expo group-hover:rotate-[360deg]">©</span>
          <span className="relative overflow-hidden">
            <span className="block transition-transform duration-500 ease-out-expo group-hover:-translate-x-full">
              Code by {site.firstName}
            </span>
            <span className="absolute inset-0 translate-x-full transition-transform duration-500 ease-out-expo group-hover:translate-x-0">
              {site.firstName} {site.lastName}
            </span>
          </span>
        </a>
      </Magnetic>
      <nav className="flex items-center gap-5 text-sm md:gap-10">
        {LINKS.map((l) => (
          <Magnetic key={l.href} strength={0.3}>
            <RollLink href={l.href}>{l.label}</RollLink>
          </Magnetic>
        ))}
        <Magnetic strength={0.4}>
          <ThemeToggle />
        </Magnetic>
      </nav>
    </motion.header>
  );
}

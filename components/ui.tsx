"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { terms } from "@/lib/content";
import { EASE_OUT, SPRING } from "@/lib/motion";
import { Term, termFor } from "./Term";

// Words slide up from behind a mask. Plays on scroll, or when `play` becomes true.
export function RevealText({
  text,
  className,
  delay = 0,
  stagger = 0.035,
  play,
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  play?: boolean;
}) {
  const words = text.split(" ");
  // Glossary words (e.g. "Sanjhi") get a hover definition; screen readers hear it after the sentence.
  const defined = [...new Set(words.map(termFor).filter((t): t is string => !!t))];
  // The trigger sits on the visible wrapper: the masked words themselves start fully clipped,
  // so an IntersectionObserver on them would never fire.
  const trigger =
    play === undefined
      ? { whileInView: "show", viewport: { once: true, margin: "0px 0px -10% 0px" } }
      : { animate: play ? "show" : "hidden" };

  return (
    <motion.span className={className} initial="hidden" {...trigger}>
      {/* Screen readers get the plain sentence; the split, animated words are hidden from them. */}
      <span className="sr-only">
        {text}
        {defined.map((t) => ` (${t}: ${terms[t]})`).join("")}
      </span>
      {words.map((word, i) => (
        <span key={i} aria-hidden>
          {/* Padding (cancelled by negative margins) keeps descenders and italic overhang inside the mask. */}
          <span className="-mx-[0.08em] -mb-[0.25em] inline-block overflow-hidden px-[0.08em] pb-[0.25em] align-top">
            <motion.span
              className="inline-block"
              variants={{ hidden: { y: "110%" }, show: { y: "0%" } }}
              transition={{ duration: 0.9, ease: EASE_OUT, delay: delay + i * stagger }}
            >
              {termFor(word) ? (
                <Term word={termFor(word)!} decorative>
                  {word}
                </Term>
              ) : (
                word
              )}
            </motion.span>
          </span>
          {i < words.length - 1 && " "}
        </span>
      ))}
    </motion.span>
  );
}

// Pulls its child toward the pointer, springs back on leave.
export function Magnetic({
  children,
  strength = 0.35,
  className,
}: {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useSpring(useMotionValue(0), SPRING);
  const y = useSpring(useMotionValue(0), SPRING);

  return (
    <motion.div
      ref={ref}
      className={`inline-block ${className ?? ""}`}
      style={{ x, y }}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        const r = ref.current!.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * strength);
        y.set((e.clientY - (r.top + r.height / 2)) * strength);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

// A plain text link with an underline that draws in on hover.
export function RollLink({
  href,
  children,
  className,
  external,
  active,
  onClick,
}: {
  href: string;
  children: string;
  className?: string;
  external?: boolean;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    // Vertical padding (cancelled by negative margin) gives a ~44px tap target without changing layout.
    <a
      href={href}
      className={`group -my-3 inline-flex py-3 ${className ?? ""}`}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      aria-current={active ? "true" : undefined}
      onClick={onClick}
    >
      <span className={`bg-[linear-gradient(currentColor,currentColor)] ${active ? "bg-[length:100%_1px]" : "bg-[length:0%_1px]"} bg-left-bottom bg-no-repeat pb-0.5 transition-[background-size] duration-300 ease-out group-hover:bg-[length:100%_1px]`}>
        {children}
      </span>
    </a>
  );
}

export function LocalTime({ timeZone }: { timeZone: string }) {
  const [now, setNow] = useState<string | null>(null);
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit", timeZone });
    const tick = () => setNow(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [timeZone]);
  return <span className="tabular-nums">{now ?? "--:--:--"}</span>;
}

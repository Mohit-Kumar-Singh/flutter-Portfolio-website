"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { EASE_OUT, SPRING } from "@/lib/motion";

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
  // The trigger sits on the visible wrapper: the masked words themselves start fully clipped,
  // so an IntersectionObserver on them would never fire.
  const trigger =
    play === undefined
      ? { whileInView: "show", viewport: { once: true, margin: "0px 0px -10% 0px" } }
      : { animate: play ? "show" : "hidden" };

  return (
    <motion.span className={className} aria-label={text} initial="hidden" {...trigger}>
      {words.map((word, i) => (
        <span key={i} aria-hidden>
          <span className="-mb-[0.12em] inline-block overflow-hidden pb-[0.12em] align-top">
            <motion.span
              className="inline-block"
              variants={{ hidden: { y: "110%" }, show: { y: "0%" } }}
              transition={{ duration: 0.9, ease: EASE_OUT, delay: delay + i * stagger }}
            >
              {word}
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

// Text that rolls up to a duplicate of itself on hover.
export function RollLink({
  href,
  children,
  className,
  external,
}: {
  href: string;
  children: string;
  className?: string;
  external?: boolean;
}) {
  return (
    // Vertical padding (cancelled by negative margin) gives a ~44px tap target without changing layout.
    <a
      href={href}
      className={`group -my-3 inline-flex py-3 ${className ?? ""}`}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
    >
      <span className="relative inline-flex overflow-hidden">
        <span className="block transition-transform duration-500 ease-out-expo group-hover:-translate-y-full">
          {children}
        </span>
        <span
          aria-hidden
          className="absolute inset-0 translate-y-full font-serif italic transition-transform duration-500 ease-out-expo group-hover:translate-y-0"
        >
          {children}
        </span>
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

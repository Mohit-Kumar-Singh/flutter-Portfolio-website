"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { employer, type Motif } from "@/lib/employer";
import { haptic } from "@/lib/feedback";
import { EASE_OUT } from "@/lib/motion";
import { Icon } from "./Icons";

type MotifProps = { name: string; delay: number };

// "drive" — for a car company. The name rolls in from the left with a slight forward lean and a
// touch of motion blur, a thin road stripe sweeps underneath once, and on hover it gives a tiny "rev".
// Hovering or tapping also sends a little line-drawn car along the stripe (with a haptic tick on phones).
function Drive({ name, delay }: MotifProps) {
  const [drives, setDrives] = useState(0);
  const drive = () => setDrives((n) => n + 1);

  return (
    <span
      className="relative inline-block whitespace-nowrap"
      onPointerEnter={(e) => e.pointerType === "mouse" && drive()}
      onPointerDown={(e) => {
        if (e.pointerType === "mouse") return;
        haptic("tap");
        drive();
      }}
    >
      <motion.span
        className="inline-block"
        initial={{ x: -18, skewX: -12, opacity: 0, filter: "blur(3px)" }}
        whileInView={{ x: 0, skewX: 0, opacity: 1, filter: "blur(0px)" }}
        whileHover={{ x: [0, 3, -1, 0], skewX: [0, -6, 2, 0], transition: { duration: 0.45 } }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 220, damping: 22, delay }}
      >
        {name}
      </motion.span>
      <motion.span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -bottom-0.5 h-px origin-left bg-accent"
        initial={{ scaleX: 0, opacity: 1 }}
        whileInView={{ scaleX: [0, 1, 1], opacity: [1, 1, 0], originX: [0, 0, 1] }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, times: [0, 0.55, 1], ease: EASE_OUT, delay: delay + 0.15 }}
      />
      {drives > 0 && (
        <motion.span
          key={drives}
          aria-hidden
          className="pointer-events-none absolute -bottom-[0.55em] text-[max(0.5em,11px)] text-accent"
          initial={{ left: "-0.8em", opacity: 0 }}
          animate={{ left: "100%", opacity: [0, 1, 1, 0] }}
          transition={{ duration: 1.1, ease: [0.45, 0, 0.2, 1], opacity: { times: [0, 0.15, 0.8, 1], duration: 1.1 } }}
        >
          <Icon name="car" />
        </motion.span>
      )}
    </span>
  );
}

// "none" — the plain name, for a company with no special treatment yet.
function Plain({ name }: MotifProps) {
  return <>{name}</>;
}

const MOTIFS: Record<Motif, (props: MotifProps) => React.ReactElement> = {
  drive: Drive,
  none: Plain,
};

// The current employer's name, animated with that company's motif.
export function CompanyName({ delay = 0 }: { delay?: number }) {
  const Motif = MOTIFS[employer.motif];
  return <Motif name={employer.name} delay={delay} />;
}

"use client";

import { animate, motion } from "motion/react";
import { useEffect, useState } from "react";
import { site } from "@/lib/content";
import { EASE_IN_OUT, EASE_OUT } from "@/lib/motion";

const GREETINGS = ["Hello", "नमस्ते", "Bonjour", "Hola", "Ciao", "こんにちは", "Hallo"];

// Counter + cycling greetings, then the curtain lifts with a curved trailing edge.
export function Preloader({ onDone }: { onDone: () => void }) {
  const [count, setCount] = useState(0);
  const [greeting, setGreeting] = useState(0);

  useEffect(() => {
    const controls = animate(0, 100, {
      duration: 2.2,
      ease: [0.65, 0, 0.35, 1],
      onUpdate: (v) => setCount(Math.round(v)),
      onComplete: () => setTimeout(onDone, 250),
    });
    const id = setInterval(() => setGreeting((g) => (g + 1) % GREETINGS.length), 300);
    return () => {
      controls.stop();
      clearInterval(id);
    };
  }, [onDone]);

  return (
    <motion.div
      className="fixed inset-0 z-[80] bg-ink text-paper"
      exit={{ y: "-100%", transition: { duration: 1.1, ease: EASE_IN_OUT } }}
    >
      <div className="flex h-full flex-col justify-between p-6 md:p-10">
        <motion.div
          className="flex justify-between text-sm text-paper/60"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <span>
            {site.firstName} {site.lastName}
          </span>
          <span>Portfolio ©{site.year}</span>
        </motion.div>

        <div className="flex items-center gap-3 self-center text-3xl md:text-5xl">
          <span className="size-2 rounded-full bg-accent" />
          <motion.span
            key={greeting}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, ease: EASE_OUT }}
          >
            {GREETINGS[greeting]}
          </motion.span>
        </div>

        <div className="flex items-end justify-between">
          <div className="h-px w-1/3 bg-paper/20">
            <div className="h-px bg-paper" style={{ width: `${count}%` }} />
          </div>
          <span className="font-serif text-[22vw] leading-[0.8] tabular-nums md:text-[14vw]">{count}</span>
        </div>
      </div>
      {/* curved trailing edge visible while the curtain lifts */}
      <div className="absolute left-[-25%] top-[calc(100%-1px)] h-[12vh] w-[150%] rounded-b-[50%] bg-ink" />
    </motion.div>
  );
}

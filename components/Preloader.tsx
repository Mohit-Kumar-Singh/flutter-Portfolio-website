"use client";

import { animate, motion, useMotionValue, useTransform } from "motion/react";
import { useEffect, useState, useSyncExternalStore } from "react";
import { site } from "@/lib/content";
import { EASE_IN_OUT, EASE_OUT } from "@/lib/motion";

const GREETINGS = ["Hello", "नमस्ते", "Bonjour", "Hola", "Ciao", "こんにちは", "Hallo"];
const SEEN_KEY = "preloader-seen";

// True when the intro already played in this tab, so repeat visits get a near-instant curtain.
function useSeenBefore() {
  return useSyncExternalStore(
    () => () => {},
    () => {
      try {
        return sessionStorage.getItem(SEEN_KEY) === "1";
      } catch {
        return false;
      }
    },
    () => false,
  );
}

// Counter + cycling greetings, then the curtain lifts with a curved trailing edge.
// The counter and progress bar are driven by motion values, so React doesn't re-render every frame.
export function Preloader({ onDone }: { onDone: () => void }) {
  const seen = useSeenBefore();
  const [greeting, setGreeting] = useState(0);
  const progress = useMotionValue(0);
  const count = useTransform(progress, (v) => Math.round(v));
  const bar = useTransform(progress, (v) => v / 100);

  useEffect(() => {
    const finish = () => {
      try {
        sessionStorage.setItem(SEEN_KEY, "1");
      } catch {}
      onDone();
    };
    let controls = animate(progress, 100, {
      duration: seen ? 0.4 : 1.6,
      ease: [0.65, 0, 0.35, 1],
      onComplete: finish,
    });
    // Any click, tap or key press fast-forwards the intro.
    const skip = () => {
      controls.stop();
      controls = animate(progress, 100, { duration: 0.25, ease: "easeOut", onComplete: finish });
      window.removeEventListener("pointerdown", skip);
      window.removeEventListener("keydown", skip);
    };
    window.addEventListener("pointerdown", skip);
    window.addEventListener("keydown", skip);
    const id = setInterval(() => setGreeting((g) => (g + 1) % GREETINGS.length), 230);
    return () => {
      controls.stop();
      clearInterval(id);
      window.removeEventListener("pointerdown", skip);
      window.removeEventListener("keydown", skip);
    };
  }, [onDone, progress, seen]);

  return (
    <motion.div
      className="fixed inset-0 z-[80] bg-ink text-paper"
      exit={{ y: "-100%", transition: { duration: seen ? 0.8 : 1.1, ease: EASE_IN_OUT } }}
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
            transition={{ duration: 0.2, ease: EASE_OUT }}
          >
            {GREETINGS[greeting]}
          </motion.span>
        </div>

        <div className="flex items-end justify-between">
          <div className="w-1/3">
            <span className="mb-3 block text-xs text-paper/40">Tap anywhere to skip</span>
            <div className="h-px bg-paper/20">
              <motion.div className="h-px origin-left bg-paper" style={{ scaleX: bar }} />
            </div>
          </div>
          <motion.span className="font-serif text-[22vw] leading-[0.8] tabular-nums md:text-[14vw]">{count}</motion.span>
        </div>
      </div>
      {/* curved trailing edge visible while the curtain lifts */}
      <div className="absolute left-[-25%] top-[calc(100%-1px)] h-[12vh] w-[150%] rounded-b-[50%] bg-ink" />
    </motion.div>
  );
}

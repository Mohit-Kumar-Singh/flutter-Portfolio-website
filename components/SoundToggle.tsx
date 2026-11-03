"use client";

import { motion } from "motion/react";
import { useSyncExternalStore } from "react";
import { feedback, isSoundOn, setSoundOn, subscribeSound } from "@/lib/feedback";

// Three little bars: they bounce while sound is on and lie flat when muted.
export function SoundToggle() {
  const on = useSyncExternalStore(subscribeSound, isSoundOn, () => true);

  return (
    <button
      type="button"
      aria-pressed={on}
      aria-label={on ? "Mute interface sounds" : "Turn interface sounds on"}
      onClick={() => {
        setSoundOn(!on);
        if (!on) feedback("toggle");
      }}
      className="-m-3 flex size-11 items-center justify-center"
    >
      <span className="flex h-3.5 items-end gap-[3px]" aria-hidden>
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="w-[2px] rounded-full bg-current"
            animate={on ? { height: ["30%", "100%", "50%", "80%", "30%"] } : { height: "20%" }}
            transition={on ? { duration: 1.1, repeat: Infinity, delay: i * 0.18, ease: "easeInOut" } : { duration: 0.3 }}
          />
        ))}
      </span>
    </button>
  );
}

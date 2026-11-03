"use client";

import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useState, useSyncExternalStore } from "react";

type Mode = { kind: "default" } | { kind: "link" } | { kind: "label"; text: string };

// A dot that trails the pointer, grows over links and shows a label over [data-cursor] elements.
export function Cursor() {
  const enabled = useSyncExternalStore(
    () => () => {},
    () => window.matchMedia("(pointer: fine)").matches,
    () => false,
  );
  const [visible, setVisible] = useState(false);
  const [mode, setMode] = useState<Mode>({ kind: "default" });
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 600, damping: 45, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 600, damping: 45, mass: 0.4 });

  useEffect(() => {
    if (!enabled) return;
    document.documentElement.classList.add("has-cursor");

    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
    };
    // Keep the previous object when nothing changed so React skips the re-render.
    const update = (next: Mode) =>
      setMode((prev) =>
        prev.kind === next.kind && (prev.kind !== "label" || prev.text === (next as typeof prev).text) ? prev : next,
      );
    const over = (e: PointerEvent) => {
      const el = e.target as HTMLElement;
      const labelled = el.closest<HTMLElement>("[data-cursor]");
      if (labelled) return update({ kind: "label", text: labelled.dataset.cursor ?? "" });
      if (el.closest("a, button")) return update({ kind: "link" });
      update({ kind: "default" });
    };
    const leave = () => setVisible(false);

    window.addEventListener("pointermove", move);
    window.addEventListener("pointerover", over);
    document.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
      document.removeEventListener("pointerleave", leave);
      document.documentElement.classList.remove("has-cursor");
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  const size = mode.kind === "label" ? 92 : mode.kind === "link" ? 56 : 12;
  const isLabel = mode.kind === "label";

  return (
    <motion.div
      aria-hidden
      className={`pointer-events-none fixed left-0 top-0 z-[70] ${isLabel ? "" : "mix-blend-difference"}`}
      style={{ x: sx, y: sy }}
    >
      <motion.div
        className={`-translate-x-1/2 -translate-y-1/2 flex items-center justify-center rounded-full ${isLabel ? "bg-accent" : "bg-white"}`}
        animate={{ width: size, height: size, opacity: visible ? 1 : 0 }}
        transition={{ type: "spring", stiffness: 400, damping: 28 }}
      >
        <AnimatePresence>
          {isLabel && (
            <motion.span
              key={mode.text}
              className="text-xs font-medium tracking-wide text-paper"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
            >
              {mode.text}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

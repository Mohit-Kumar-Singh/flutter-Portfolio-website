"use client";

import Lenis from "lenis";
import { MotionConfig } from "motion/react";
import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { initAmbient } from "@/lib/ambient";
import { Backdrop } from "./Backdrop";

const LoadedContext = createContext(false);
export const useLoaded = () => useContext(LoadedContext);

// Lets overlays (the mobile menu) pause page scrolling and jump to a section, with or without Lenis.
type ScrollControls = { setLocked: (locked: boolean) => void; scrollTo: (selector: string) => void };
const ScrollContext = createContext<ScrollControls>({ setLocked: () => {}, scrollTo: () => {} });
export const useScrollControls = () => useContext(ScrollContext);

// Wraps the page: smooth scroll, and a "loaded" flag the hero uses to start its entrance.
export function Experience({ children }: { children: React.ReactNode }) {
  const [loaded, setLoaded] = useState(false);
  const lenis = useRef<Lenis | null>(null);

  const setScrollLocked = useCallback((locked: boolean) => {
    if (lenis.current) {
      if (locked) lenis.current.stop();
      else lenis.current.start();
    } else {
      document.documentElement.style.overflow = locked ? "hidden" : "";
    }
  }, []);

  const scrollTo = useCallback((selector: string) => {
    const el = document.querySelector<HTMLElement>(selector);
    if (!el) return;
    if (lenis.current) lenis.current.scrollTo(el, { force: true });
    else el.scrollIntoView();
  }, []);

  const [controls] = useState<ScrollControls>(() => ({ setLocked: setScrollLocked, scrollTo }));

  useEffect(() => {
    window.history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
    // Smooth scrolling is motion too — skip it for people who ask for reduced motion.
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      lenis.current = new Lenis({ lerp: 0.085, autoRaf: true, anchors: true });
    }
    // Start the hero entrance on the next frame, once the page has painted.
    const id = requestAnimationFrame(() => setLoaded(true));
    // Calm, quiet background music (starts on load, or on the first click/tap if the browser blocks it).
    const stopAmbient = initAmbient();
    return () => {
      stopAmbient();
      cancelAnimationFrame(id);
      lenis.current?.destroy();
      lenis.current = null;
      document.documentElement.style.overflow = "";
    };
  }, [setScrollLocked]);

  return (
    <MotionConfig reducedMotion="user">
      <LoadedContext.Provider value={loaded}>
        <ScrollContext.Provider value={controls}>
          <Backdrop />
          {children}
        </ScrollContext.Provider>
      </LoadedContext.Provider>
    </MotionConfig>
  );
}

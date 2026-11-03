"use client";

import Lenis from "lenis";
import { AnimatePresence, MotionConfig, motion, useScroll, useSpring } from "motion/react";
import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { Cursor } from "./Cursor";
import { Preloader } from "./Preloader";

const LoadedContext = createContext(false);
export const useLoaded = () => useContext(LoadedContext);

// Lets overlays (the mobile menu) pause page scrolling and jump to a section, with or without Lenis.
type ScrollControls = { setLocked: (locked: boolean) => void; scrollTo: (selector: string) => void };
const ScrollContext = createContext<ScrollControls>({ setLocked: () => {}, scrollTo: () => {} });
export const useScrollControls = () => useContext(ScrollContext);

// Thin accent line at the top that tracks reading progress.
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 40, restDelta: 0.001 });
  return (
    <motion.div
      aria-hidden
      className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-accent"
      style={{ scaleX }}
    />
  );
}

// Wraps the page: smooth scroll, preloader, cursor, grain and scroll progress.
export function Experience({ children }: { children: React.ReactNode }) {
  const [loaded, setLoaded] = useState(false);
  const lenis = useRef<Lenis | null>(null);
  // Stable so the preloader's effect doesn't restart its animation on re-render.
  const handleDone = useCallback(() => setLoaded(true), []);

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
    setScrollLocked(true);
    return () => {
      lenis.current?.destroy();
      lenis.current = null;
      document.documentElement.style.overflow = "";
    };
  }, [setScrollLocked]);

  useEffect(() => {
    if (loaded) setScrollLocked(false);
  }, [loaded, setScrollLocked]);

  return (
    <MotionConfig reducedMotion="user">
      <LoadedContext.Provider value={loaded}>
        <ScrollContext.Provider value={controls}>
          <AnimatePresence>{!loaded && <Preloader key="preloader" onDone={handleDone} />}</AnimatePresence>
          <ScrollProgress />
          {children}
          <Cursor />
          <div className="grain" aria-hidden />
        </ScrollContext.Provider>
      </LoadedContext.Provider>
    </MotionConfig>
  );
}

"use client";

import Lenis from "lenis";
import { AnimatePresence, MotionConfig } from "motion/react";
import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { Cursor } from "./Cursor";
import { Preloader } from "./Preloader";

const LoadedContext = createContext(false);
export const useLoaded = () => useContext(LoadedContext);

// Wraps the page: smooth scroll, preloader, cursor and grain.
export function Experience({ children }: { children: React.ReactNode }) {
  const [loaded, setLoaded] = useState(false);
  const lenis = useRef<Lenis | null>(null);
  // Stable so the preloader's effect doesn't restart its animation on re-render.
  const handleDone = useCallback(() => setLoaded(true), []);

  useEffect(() => {
    window.history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
    const instance = new Lenis({ lerp: 0.085, autoRaf: true, anchors: true });
    instance.stop();
    lenis.current = instance;
    return () => instance.destroy();
  }, []);

  useEffect(() => {
    if (loaded) lenis.current?.start();
  }, [loaded]);

  return (
    <MotionConfig reducedMotion="user">
      <LoadedContext.Provider value={loaded}>
        <AnimatePresence>{!loaded && <Preloader key="preloader" onDone={handleDone} />}</AnimatePresence>
        {children}
        <Cursor />
        <div className="grain" aria-hidden />
      </LoadedContext.Provider>
    </MotionConfig>
  );
}

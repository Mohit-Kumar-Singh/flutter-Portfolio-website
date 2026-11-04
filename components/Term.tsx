"use client";

import { AnimatePresence, motion } from "motion/react";
import { Fragment, useEffect, useId, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { terms } from "@/lib/content";
import { SPRING_SNAPPY } from "@/lib/motion";

const useIsClient = () =>
  useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

// A word with a dotted underline that explains itself: hover or focus shows a definition, tap toggles it.
// The card is portalled to <body> so text-reveal masks can't clip it.
export function Term({ word, children, decorative = false }: { word: string; children: React.ReactNode; decorative?: boolean }) {
  const definition = terms[word];
  const isClient = useIsClient();
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0, above: true });
  const ref = useRef<HTMLButtonElement>(null);
  const id = useId();

  const show = () => {
    const r = ref.current!.getBoundingClientRect();
    const half = Math.min(144, (window.innerWidth - 32) / 2);
    const x = Math.min(Math.max(r.left + r.width / 2, 16 + half), window.innerWidth - 16 - half);
    const above = r.top > 200;
    setPos({ x, y: above ? r.top - 10 : r.bottom + 10, above });
    setOpen(true);
  };

  useEffect(() => {
    if (!open) return;
    const close = () => setOpen(false);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    const onDown = (e: PointerEvent) => !ref.current?.contains(e.target as Node) && close();
    window.addEventListener("scroll", close, { passive: true });
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onDown);
    return () => {
      window.removeEventListener("scroll", close);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onDown);
    };
  }, [open]);

  if (!definition) return <>{children}</>;

  return (
    <>
      <button
        ref={ref}
        type="button"
        // Inside animated text the words are aria-hidden, so the button there is mouse/touch only;
        // the definition is read out with the plain-text version instead.
        tabIndex={decorative ? -1 : undefined}
        aria-describedby={open ? id : undefined}
        onMouseEnter={(e) => e.nativeEvent instanceof MouseEvent && show()}
        onMouseLeave={() => setOpen(false)}
        onFocus={show}
        onBlur={() => setOpen(false)}
        onClick={() => (open ? setOpen(false) : show())}
        className="cursor-help underline decoration-current/40 decoration-dotted decoration-1 underline-offset-[0.18em] transition-[text-decoration-color] hover:decoration-current"
      >
        {children}
      </button>
      {isClient &&
        createPortal(
          <AnimatePresence>
            {open && (
              <div
                className="pointer-events-none fixed z-[80]"
                style={{ left: pos.x, top: pos.y, transform: `translate(-50%, ${pos.above ? "-100%" : "0"})` }}
              >
                <motion.span
                  id={id}
                  role="tooltip"
                  className="block w-[min(18rem,calc(100vw-2rem))] rounded-2xl bg-ink px-4 py-3 text-left text-sm font-normal not-italic leading-snug tracking-normal text-paper shadow-2xl shadow-black/30"
                  style={{ transformOrigin: pos.above ? "bottom center" : "top center" }}
                  initial={{ opacity: 0, scale: 0.92, y: pos.above ? 6 : -6, filter: "blur(4px)" }}
                  animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.12 } }}
                  transition={SPRING_SNAPPY}
                >
                  <span className="mb-1 block font-serif text-lg italic">{word}</span>
                  {definition}
                </motion.span>
              </div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
}

// Plain text with any glossary words turned into <Term>s.
export function TermText({ text }: { text: string }) {
  const pattern = new RegExp(`\\b(${Object.keys(terms).join("|")})\\b`, "g");
  return (
    <>
      {text.split(pattern).map((part, i) =>
        terms[part] ? (
          <Term key={i} word={part}>
            {part}
          </Term>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  );
}

// The glossary word a single token belongs to, ignoring punctuation ("Sanjhi," → "Sanjhi").
export const termFor = (token: string) => {
  const bare = token.replace(/[^\p{L}]/gu, "");
  return terms[bare] ? bare : null;
};

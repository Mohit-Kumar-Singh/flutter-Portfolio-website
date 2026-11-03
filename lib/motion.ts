// Shared motion tokens — keep every animation on the same curves.
export const EASE_OUT = [0.22, 1, 0.36, 1] as const;
export const EASE_IN_OUT = [0.76, 0, 0.24, 1] as const;
export const SPRING = { stiffness: 350, damping: 30, mass: 0.6 };

// Apple-style springs: physical, no overshoot you can see, settle quickly.
export const SPRING_SNAPPY = { type: "spring", stiffness: 420, damping: 32, mass: 0.8 } as const;
export const SPRING_GENTLE = { type: "spring", stiffness: 110, damping: 22, mass: 1 } as const;

// Content arriving on scroll: a short rise that comes into focus (blur → sharp), like apple.com.
export const FADE_UP = {
  initial: { opacity: 0, y: 24, filter: "blur(8px)" },
  whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
  viewport: { once: true, margin: "0px 0px -10% 0px" },
} as const;

"use client";

import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react";
import { useRef } from "react";

const wrap = (min: number, max: number, v: number) => {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
};

// An endless text band; scroll speed pushes it faster and scroll direction flips it.
export function Marquee({ text, baseVelocity = -2 }: { text: string; baseVelocity?: number }) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 });
  const factor = useTransform(velocity, [0, 1000], [0, 5], { clamp: false });
  const direction = useRef(1);
  const x = useTransform(baseX, (v) => `${wrap(-25, -50, v)}%`);

  useAnimationFrame((_, delta) => {
    let move = direction.current * baseVelocity * (delta / 1000);
    if (factor.get() < 0) direction.current = -1;
    else if (factor.get() > 0) direction.current = 1;
    move += direction.current * move * factor.get();
    baseX.set(baseX.get() + move);
  });

  return (
    <div className="overflow-hidden whitespace-nowrap py-10" aria-hidden>
      <motion.div className="flex whitespace-nowrap" style={{ x }}>
        {Array.from({ length: 4 }).map((_, i) => (
          <span key={i} className="mr-[4vw] block font-serif text-[16vw] italic leading-none tracking-tight md:text-[11vw]">
            {text}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

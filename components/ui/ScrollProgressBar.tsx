"use client";

import { useScroll, useSpring, motion, useReducedMotion } from "framer-motion";

export default function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  const shouldReduce = useReducedMotion();

  if (shouldReduce) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[60] h-[2px] origin-left pointer-events-none"
      style={{
        scaleX,
        background: "linear-gradient(to right, #C8875A, #D4956B)",
      }}
    />
  );
}

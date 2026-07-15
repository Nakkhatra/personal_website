"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

export default function CursorGlow() {
  const shouldReduce = useReducedMotion();
  const mouseX = useMotionValue(-300);
  const mouseY = useMotionValue(-300);
  const springX = useSpring(mouseX, { stiffness: 80, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 80, damping: 25 });

  useEffect(() => {
    if (shouldReduce) return;
    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX - 150);
      mouseY.set(e.clientY - 150);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [mouseX, mouseY, shouldReduce]);

  if (shouldReduce) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 w-[300px] h-[300px] rounded-full pointer-events-none z-0 [@media(pointer:coarse)]:hidden"
      style={{
        x: springX,
        y: springY,
        background:
          "radial-gradient(circle, rgba(200,135,90,0.10) 0%, transparent 70%)",
      }}
      aria-hidden
    />
  );
}

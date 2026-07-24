"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

export default function CustomCursor() {
  const shouldReduce = useReducedMotion();
  const [hovered, setHovered] = useState(false);
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const x = useSpring(mouseX, { stiffness: 500, damping: 30 });
  const y = useSpring(mouseY, { stiffness: 500, damping: 30 });

  useEffect(() => {
    if (shouldReduce) return;

    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const over = (e: MouseEvent) => {
      const target = e.target as Element;
      if (target.closest("a, button, [role=button]")) setHovered(true);
    };
    const out = (e: MouseEvent) => {
      const target = e.target as Element;
      if (target.closest("a, button, [role=button]")) setHovered(false);
    };

    window.addEventListener("mousemove", move);
    document.addEventListener("mouseover", over);
    document.addEventListener("mouseout", out);
    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", over);
      document.removeEventListener("mouseout", out);
    };
  }, [mouseX, mouseY, shouldReduce]);

  if (shouldReduce) return null;

  return (
    <>
      {/* dot */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none rounded-full [@media(pointer:coarse)]:hidden"
        style={{
          x,
          y,
          translateX: "-50%",
          translateY: "-50%",
          width: hovered ? 40 : 8,
          height: hovered ? 40 : 8,
          background: hovered ? "transparent" : "rgba(var(--accent-ch) / 0.9)",
          border: hovered ? "1px solid rgba(var(--accent-ch) / 0.5)" : "none",
          transition: "width 0.2s ease, height 0.2s ease, background 0.2s ease, border 0.2s ease",
        }}
        aria-hidden
      />
    </>
  );
}

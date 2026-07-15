"use client";

import { motion, useReducedMotion } from "framer-motion";

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  className?: string;
}

const directionOffset = {
  up:    { y: 40 },
  down:  { y: -40 },
  left:  { x: 40 },
  right: { x: -40 },
  none:  {},
};

export default function FadeIn({
  children,
  delay = 0,
  direction = "up",
  className = "",
}: FadeInProps) {
  const shouldReduce = useReducedMotion();

  return (
    <motion.div
      initial={
        shouldReduce
          ? { opacity: 0 }
          : { opacity: 0, ...directionOffset[direction] }
      }
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={
        shouldReduce
          ? { duration: 0.01, delay: 0 }
          : { duration: 0.7, delay, ease: "easeOut" }
      }
      className={className}
    >
      {children}
    </motion.div>
  );
}

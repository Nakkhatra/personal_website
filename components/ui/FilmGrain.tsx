"use client";

import { useReducedMotion } from "framer-motion";

export default function FilmGrain() {
  const shouldReduce = useReducedMotion();
  if (shouldReduce) return null;

  return (
    <div
      aria-hidden
      className="fixed inset-0 pointer-events-none select-none z-[1] opacity-[0.035] [@media(pointer:coarse)]:opacity-[0.02]"
      style={{
        mixBlendMode: "overlay",
        backgroundImage: "url(/noise.png)",
        backgroundRepeat: "repeat",
        backgroundSize: "128px 128px",
      }}
    />
  );
}

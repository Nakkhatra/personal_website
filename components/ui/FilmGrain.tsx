"use client";

import { useReducedMotion } from "framer-motion";

export default function FilmGrain() {
  const shouldReduce = useReducedMotion();
  if (shouldReduce) return null;

  return (
    <div
      aria-hidden
      className="fixed inset-0 pointer-events-none select-none z-[1]"
      style={{ mixBlendMode: "overlay" }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full opacity-[0.03] [@media(pointer:coarse)]:opacity-[0.015]"
      >
        <filter id="film-grain-filter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#film-grain-filter)" />
      </svg>
    </div>
  );
}

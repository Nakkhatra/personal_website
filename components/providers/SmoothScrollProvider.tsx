"use client";

import { useEffect, useRef } from "react";
import { useAnimationFrame, useReducedMotion } from "framer-motion";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);
  const shouldReduce = useReducedMotion();

  useEffect(() => {
    if (shouldReduce) return;
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisRef.current = lenis;
    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [shouldReduce]);

  useAnimationFrame((time) => {
    lenisRef.current?.raf(time);
  });

  return <>{children}</>;
}

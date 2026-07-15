"use client";

import { useRef } from "react";
import Link from "next/link";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";

type Variant = "primary" | "secondary" | "ghost";

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: Variant;
  external?: boolean;
  className?: string;
  onClick?: () => void;
}

const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-background hover:bg-accent-hover",
  secondary:
    "bg-surface border border-border text-text-primary hover:bg-surface-hover hover:border-accent/20",
  ghost:
    "text-text-secondary hover:text-accent",
};

const MotionLink = motion.create(Link);

function useMagnetic(shouldReduce: boolean | null) {
  const ref = useRef<HTMLElement | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 20 });
  const springY = useSpring(y, { stiffness: 200, damping: 20 });

  function onMouseMove(e: React.MouseEvent<HTMLElement>) {
    if (shouldReduce) return;
    if (typeof window !== "undefined" && !window.matchMedia("(pointer: fine)").matches) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * 0.25);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.25);
  }

  function onMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return { ref, springX, springY, onMouseMove, onMouseLeave };
}

export default function Button({
  children,
  href,
  variant = "primary",
  external = false,
  className = "",
  onClick,
}: ButtonProps) {
  const shouldReduce = useReducedMotion();
  const { ref, springX, springY, onMouseMove, onMouseLeave } = useMagnetic(shouldReduce);

  const isPrimary = variant === "primary";
  const base = `inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-colors ${variants[variant]}${isPrimary ? " btn-shine" : ""} ${className}`;

  const motionProps = {
    style: { x: springX, y: springY },
    whileHover: shouldReduce
      ? {}
      : {
          y: -3,
          scale: 1.02,
          boxShadow: isPrimary
            ? "0 8px 25px rgba(200,135,90,0.30)"
            : "0 6px 20px rgba(0,0,0,0.20)",
        },
    whileTap: shouldReduce ? {} : { scale: 0.97 },
    transition: { type: "spring" as const, stiffness: 400, damping: 25 },
    onMouseMove,
    onMouseLeave,
  };

  if (href && external) {
    return (
      <motion.a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={base}
        {...motionProps}
      >
        {children}
      </motion.a>
    );
  }

  if (href) {
    return (
      <MotionLink
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        className={base}
        {...motionProps}
      >
        {children}
      </MotionLink>
    );
  }

  return (
    <motion.button
      ref={ref as React.Ref<HTMLButtonElement>}
      className={base}
      onClick={onClick}
      {...motionProps}
    >
      {children}
    </motion.button>
  );
}

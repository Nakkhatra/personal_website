"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  link?: { label: string; href: string };
}

export default function SectionHeading({
  title,
  subtitle,
  link,
}: SectionHeadingProps) {
  const shouldReduce = useReducedMotion();

  const base = {
    initial: shouldReduce ? false : ({ opacity: 0, y: 20 } as const),
    whileInView: { opacity: 1, y: 0 } as const,
    viewport: { once: true, margin: "-50px" as const },
  };

  return (
    <div className="flex items-end justify-between mb-10">
      <div>
        <motion.h2
          {...base}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-3xl font-bold tracking-tight"
        >
          {title}
        </motion.h2>
        {subtitle && (
          <motion.p
            {...base}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.12 }}
            className="mt-2 text-text-secondary"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
      {link && (
        <motion.div
          {...base}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        >
          <Link
            href={link.href}
            className="hidden sm:inline-flex items-center gap-1 text-sm text-accent hover:text-accent-hover transition-colors"
          >
            {link.label}
            <ArrowRight size={14} />
          </Link>
        </motion.div>
      )}
    </div>
  );
}

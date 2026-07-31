"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  index?: string;
  link?: { label: string; href: string };
}

export default function SectionHeading({
  title,
  subtitle,
  index,
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
        {index && (
          <motion.p
            {...base}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="font-mono text-caption text-accent mb-3 tracking-widest uppercase"
          >
            {index}
          </motion.p>
        )}
        <motion.h2
          {...base}
          transition={{ duration: 0.6, ease: "easeOut", delay: index ? 0.06 : 0 }}
          className="text-display font-heading"
        >
          {title}
        </motion.h2>
        <motion.div
          {...base}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          className="mt-3 h-px w-12 bg-accent/50"
          aria-hidden
        />
        {subtitle && (
          <motion.p
            {...base}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.12 }}
            className="mt-3 text-text-secondary"
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

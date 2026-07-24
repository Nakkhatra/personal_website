"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

export default function ScrollHighlightText({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const shouldReduce = useReducedMotion();
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "start 0.2"],
  });

  const words = text.split(" ");

  if (shouldReduce) {
    return (
      <p ref={ref} className={className}>
        {text}
      </p>
    );
  }

  return (
    <p ref={ref} className={className}>
      {words.map((word, i) => {
        const start = i / words.length;
        const end = (i + 1) / words.length;
        return (
          <WordSpan key={i} word={word} progress={scrollYProgress} start={start} end={end} />
        );
      })}
    </p>
  );
}

function WordSpan({
  word,
  progress,
  start,
  end,
}: {
  word: string;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  start: number;
  end: number;
}) {
  const color = useTransform(progress, [start, end], ["var(--text-muted)", "var(--text-primary)"]);
  return (
    <motion.span style={{ color }} className="mr-[0.25em]">
      {word}
    </motion.span>
  );
}

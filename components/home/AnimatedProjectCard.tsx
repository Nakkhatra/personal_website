"use client";

import Link from "next/link";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import Badge from "@/components/ui/Badge";

interface Project {
  name: string;
  description: string;
  company: string;
  topics: string[];
  blogUrl?: string;
}

export default function AnimatedProjectCard({ project }: { project: Project }) {
  const shouldReduce = useReducedMotion();

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springRotateX = useSpring(rotateX, { stiffness: 300, damping: 30 });
  const springRotateY = useSpring(rotateY, { stiffness: 300, damping: 30 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (shouldReduce) return;
    if (typeof window !== "undefined" &&
        !window.matchMedia("(pointer: fine)").matches) return;
    const rect = e.currentTarget.getBoundingClientRect();
    rotateX.set(((e.clientY - rect.top - rect.height / 2) / rect.height) * -10);
    rotateY.set(((e.clientX - rect.left - rect.width / 2) / rect.width) * 10);
  }

  function handleMouseLeave() {
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <motion.div
      className="flex flex-col h-full rounded-xl bg-surface border border-border p-6 cursor-default"
      style={
        shouldReduce
          ? { boxShadow: "0 0 0 0 rgba(var(--accent-rgb), 0)" }
          : {
              rotateX: springRotateX,
              rotateY: springRotateY,
              transformPerspective: 800,
              willChange: "transform",
              boxShadow: "0 0 0 0 rgba(var(--accent-rgb), 0)",
            }
      }
      whileHover={
        shouldReduce
          ? {}
          : {
              y: -8,
              scale: 1.015,
              boxShadow:
                "0 20px 40px rgba(var(--accent-rgb), 0.15), 0 0 0 1px rgba(var(--accent-rgb), 0.20)",
            }
      }
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="flex-1">
        <h3 className="font-heading font-semibold text-lg text-text-primary mb-2">
          {project.name}
        </h3>
        <p className="text-xs text-accent mb-3">{project.company}</p>
        <p className="text-text-secondary text-sm leading-relaxed mb-4">
          {project.description}
        </p>
      </div>
      <div className="space-y-3">
        <div className="flex flex-wrap gap-2">
          {project.topics.map((topic) => (
            <motion.span
              key={topic}
              whileHover={shouldReduce ? {} : { scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              <Badge>{topic}</Badge>
            </motion.span>
          ))}
        </div>
        {project.blogUrl && (
          <Link
            href={project.blogUrl}
            className="inline-block text-sm font-medium text-accent hover:text-accent-hover transition-colors"
          >
            Read full journey →
          </Link>
        )}
      </div>
    </motion.div>
  );
}

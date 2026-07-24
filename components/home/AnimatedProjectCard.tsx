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

function hashHue(str: string): number {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) & 0xffff;
  return h % 360;
}

export default function AnimatedProjectCard({
  project,
  featured = false,
}: {
  project: Project;
  featured?: boolean;
}) {
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

  const hue = hashHue(project.name);
  const thumbnailStyle = {
    background: `linear-gradient(135deg, hsla(${hue}, 60%, 30%, 0.18) 0%, hsla(${(hue + 40) % 360}, 50%, 20%, 0.10) 100%)`,
  };

  return (
    <motion.div
      className="flex flex-col h-full rounded-xl bg-surface border border-border cursor-default overflow-hidden"
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
      {/* Generative thumbnail */}
      {featured && (
        <div
          className="w-full h-24 flex-shrink-0"
          style={{ ...thumbnailStyle, filter: "blur(0px)" }}
        />
      )}
      <div className="flex flex-col flex-1 p-6">
        <div className="flex-1">
          <h3 className={`font-heading font-semibold text-text-primary mb-2 ${featured ? "text-xl" : "text-lg"}`}>
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
          <div className="flex items-center gap-4">
            {project.blogUrl && (
              <Link
                href={project.blogUrl}
                className="inline-block text-sm font-medium text-accent hover:text-accent-hover transition-colors"
              >
                Read full journey →
              </Link>
            )}
            <motion.span
              className="ml-auto text-sm font-medium text-text-muted opacity-0 group-hover:opacity-100"
              initial={{ x: -6, opacity: 0 }}
              whileHover={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              View →
            </motion.span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

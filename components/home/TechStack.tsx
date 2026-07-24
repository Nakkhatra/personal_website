"use client";

import { motion, useReducedMotion } from "framer-motion";
import { techStack } from "@/lib/data/techStack";
import SectionHeading from "@/components/ui/SectionHeading";
import Container from "@/components/layout/Container";

const bentoSizes: Record<string, string> = {
  Languages: "md:col-span-2 md:row-span-2",
  "ML/DL Frameworks": "md:col-span-2",
  "MLOps & Cloud": "md:col-span-2",
  "Data Science": "md:col-span-1",
  Visualization: "md:col-span-2",
  "Version Control": "md:col-span-1",
  API: "md:col-span-1",
};

export default function TechStack() {
  const shouldReduce = useReducedMotion();

  return (
    <section className="py-20">
      <Container>
        <SectionHeading
          title="Tech Stack"
          subtitle="Tools and technologies I work with"
        />
        <div className="grid gap-4 grid-cols-2 md:grid-cols-4 auto-rows-[minmax(120px,auto)]">
          {techStack.map((category) => {
            const sizeClass = bentoSizes[category.category] ?? "md:col-span-1";
            const isLarge = sizeClass.includes("row-span-2");
            return (
              <motion.div
                key={category.category}
                className={`col-span-1 ${sizeClass} rounded-2xl p-5 border transition-colors`}
                style={{
                  background: "var(--bg-surface)",
                  borderColor: "var(--border)",
                }}
                whileHover={
                  shouldReduce
                    ? {}
                    : {
                        borderColor: "rgba(var(--accent-ch) / 0.4)",
                        boxShadow: "0 0 20px rgba(var(--accent-rgb), 0.10)",
                      }
                }
                transition={{ duration: 0.2 }}
              >
                <h3 className="text-xs font-medium uppercase tracking-wider mb-4" style={{ color: "var(--accent)" }}>
                  {category.category}
                </h3>
                <ul className={`space-y-2 ${isLarge ? "columns-2 gap-x-4 space-y-0" : ""}`}>
                  {category.items.map((item) => (
                    <motion.li
                      key={item.name}
                      className="text-text-secondary text-sm flex items-center gap-2 break-inside-avoid"
                      whileHover={shouldReduce ? {} : { color: "var(--text-primary)", x: 2 }}
                      transition={{ duration: 0.15 }}
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ background: "rgba(var(--accent-ch) / 0.4)" }}
                      />
                      {item.name}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

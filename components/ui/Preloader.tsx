"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { siteConfig } from "@/lib/data/siteConfig";

export default function Preloader() {
  const shouldReduce = useReducedMotion();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (shouldReduce) {
      setVisible(false);
      return;
    }
    const id = setTimeout(() => setVisible(false), 1200);
    return () => clearTimeout(id);
  }, [shouldReduce]);

  if (shouldReduce) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          style={{ background: "var(--bg-base)" }}
          aria-hidden
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1, transition: { duration: 0.4, ease: "easeOut" } }}
            className="flex flex-col items-center gap-4"
          >
            <span
              className="text-4xl font-bold font-heading"
              style={{ color: "var(--accent)" }}
            >
              {siteConfig.initials}
            </span>
            <motion.div
              className="w-8 h-8"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
              style={{ color: "var(--accent-2)" }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                <path d="M12 2a10 10 0 1 0 10 10" strokeLinecap="round" />
              </svg>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

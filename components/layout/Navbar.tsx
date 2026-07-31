"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { siteConfig } from "@/lib/data/siteConfig";
import Container from "./Container";
import ThemeToggle from "@/components/ui/ThemeToggle";

const MotionLink = motion.create(Link);

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const shouldReduce = useReducedMotion();
  const { scrollY } = useScroll();

  const blurNum = useTransform(scrollY, [0, 80], [8, 28]);
  const backdropBlur = useTransform(blurNum, (v) => `blur(${v}px)`);
  const navPaddingY = useTransform(scrollY, [0, 80], [16, 8]);

  return (
    <motion.header
      className="sticky top-0 z-50 bg-background/60 border-b border-border"
      style={{
        backdropFilter: shouldReduce ? "blur(12px)" : backdropBlur,
      }}
    >
      <Container>
        <motion.nav
          className="flex items-center justify-between"
          style={
            shouldReduce
              ? { paddingTop: 16, paddingBottom: 16 }
              : { paddingTop: navPaddingY, paddingBottom: navPaddingY }
          }
        >
          {/* Logo */}
          <Link
            href="/"
            className="group flex items-baseline gap-1.5"
          >
            <span className="text-lg font-heading font-bold text-accent tracking-tight">
              {siteConfig.initials}
            </span>
            <span className="hidden sm:inline text-sm font-medium text-text-muted group-hover:text-text-secondary transition-colors">
              {siteConfig.shortName.split(" ")[0]}
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {siteConfig.navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);

              return (
                <MotionLink
                  key={link.href}
                  href={link.href}
                  whileHover={shouldReduce ? {} : { y: -2 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    isActive
                      ? "text-accent"
                      : "text-text-secondary hover:text-text-primary hover:bg-surface"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="activeTab"
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-accent rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </MotionLink>
              );
            })}
          </div>

          {/* CTA + theme toggle + mobile toggle */}
          <div className="flex items-center gap-2">
            <div className="hidden md:block">
              <ThemeToggle />
            </div>
            <a
              href={`mailto:${siteConfig.email}`}
              className="hidden md:inline-flex px-5 py-2 text-sm font-medium rounded-xl bg-accent text-background hover:bg-accent-hover transition-colors animate-contact-glow"
            >
              Contact Me
            </a>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 text-text-secondary hover:text-text-primary"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </motion.nav>
      </Container>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="md:hidden border-t border-border bg-background overflow-hidden"
          >
            <Container>
              <div className="flex flex-col py-4 gap-1">
                {siteConfig.navLinks.map((link, i) => {
                  const isActive =
                    link.href === "/"
                      ? pathname === "/"
                      : pathname.startsWith(link.href);

                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                          isActive
                            ? "text-accent bg-accent-muted"
                            : "text-text-secondary hover:text-text-primary hover:bg-surface"
                        }`}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  );
                })}
                <motion.div
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: siteConfig.navLinks.length * 0.05 }}
                >
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="block mt-2 px-4 py-3 text-sm font-medium rounded-lg bg-accent text-background text-center"
                  >
                    Contact Me
                  </a>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: (siteConfig.navLinks.length + 1) * 0.05 }}
                >
                  <ThemeToggle inline />
                </motion.div>
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

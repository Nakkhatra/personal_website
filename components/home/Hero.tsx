"use client";

import { Mail } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { siteConfig } from "@/lib/data/siteConfig";
import Button from "@/components/ui/Button";
import Container from "@/components/layout/Container";

function GitHubIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function LinkedInIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function ScholarIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M5.242 13.769L0 9.5 12 0l12 9.5-5.242 4.269C17.548 11.249 14.978 9.5 12 9.5c-2.977 0-5.548 1.748-6.758 4.269zM12 10a7 7 0 100 14 7 7 0 000-14z" />
    </svg>
  );
}

const socialIcons = [
  { icon: GitHubIcon, href: siteConfig.links.github, label: "GitHub" },
  { icon: LinkedInIcon, href: siteConfig.links.linkedin, label: "LinkedIn" },
  { icon: ScholarIcon, href: siteConfig.links.scholar, label: "Google Scholar" },
  { icon: Mail, href: `mailto:${siteConfig.email}`, label: "Email" },
];

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

export default function Hero() {
  return (
    <section className="py-24 sm:py-32">
      <Container>
        <div className="grid lg:grid-cols-[1fr,auto] gap-12 lg:gap-16 items-center">
          {/* Text content */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
          >
            <motion.p variants={fadeUp} className="text-accent font-medium mb-4">
              Hey, I&apos;m
            </motion.p>
            <motion.h1
              variants={fadeUp}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-tight font-heading text-text-primary"
            >
              {siteConfig.shortName}
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="mt-4 text-xl sm:text-2xl text-text-secondary"
            >
              {siteConfig.role}
            </motion.p>
            <motion.p
              variants={fadeUp}
              className="mt-6 text-text-secondary leading-relaxed max-w-2xl"
            >
              {siteConfig.bio}
            </motion.p>

            {/* Social icons */}
            <motion.div variants={fadeUp} className="flex items-center gap-4 mt-6">
              {socialIcons.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.label !== "Email" ? "_blank" : undefined}
                  rel={link.label !== "Email" ? "noopener noreferrer" : undefined}
                  className="text-text-muted hover:text-accent transition-colors"
                  aria-label={link.label}
                >
                  <link.icon size={20} />
                </a>
              ))}
            </motion.div>

            {/* CTA buttons */}
            <motion.div variants={fadeUp} className="flex flex-wrap gap-4 mt-8">
              <Button href="/projects">View Projects</Button>
              <Button href="/blogs" variant="secondary">
                Read Blog
              </Button>
            </motion.div>
          </motion.div>

          {/* Portrait */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative mx-auto lg:mx-0 order-first lg:order-last"
          >
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80">
              {/* Accent border ring */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-accent to-accent-hover opacity-20 blur-2xl" />
              <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-accent shadow-2xl shadow-accent/20">
                <Image
                  src="/portrait.jpg"
                  alt={siteConfig.shortName}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 640px) 256px, (max-width: 1024px) 288px, 320px"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

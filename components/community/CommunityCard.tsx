"use client";

import Image from "next/image";
import { Play } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import LinkedInIcon from "@/components/ui/LinkedInIcon";
import Badge from "@/components/ui/Badge";
import type { CommunityPost } from "@/lib/data/community";

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: "easeOut" as const },
  }),
};

export default function CommunityCard({
  post,
  index,
}: {
  post: CommunityPost;
  index: number;
}) {
  const shouldReduce = useReducedMotion();

  return (
    <motion.article
      custom={index}
      variants={shouldReduce ? {} : cardVariants}
      initial={shouldReduce ? false : "hidden"}
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      whileHover={
        shouldReduce
          ? {}
          : {
              y: -6,
              scale: 1.02,
              boxShadow:
                "0 20px 40px rgba(0,0,0,0.4), 0 0 0 1px rgba(var(--accent-rgb), 0.25)",
            }
      }
      transition={{ type: "spring", stiffness: 300, damping: 28 }}
      className="group relative rounded-xl overflow-hidden bg-surface border border-border flex flex-col"
      style={{ boxShadow: "0 4px 16px rgba(0,0,0,0.2)" }}
    >
      {/* Media */}
      {post.type === "video" ? (
        <div className="aspect-[16/9] relative overflow-hidden bg-background/50">
          <video
            src={post.thumbnail as string}
            muted
            playsInline
            preload="metadata"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-14 h-14 rounded-full bg-background/70 backdrop-blur-sm border border-accent/40 flex items-center justify-center">
              <Play size={22} className="text-accent ml-1" fill="currentColor" />
            </div>
          </div>
        </div>
      ) : Array.isArray(post.thumbnail) ? (
        <div className="flex flex-col gap-0.5 overflow-hidden bg-background/50">
          {post.thumbnail.map((src, i) => (
            <div key={src} className="relative w-full aspect-[4/3] overflow-hidden">
              <Image
                src={src}
                alt={`${post.title} — image ${i + 1}`}
                fill
                loading="lazy"
                unoptimized
                className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="aspect-[16/9] relative overflow-hidden bg-background/50">
          <Image
            src={post.thumbnail}
            alt={post.title}
            fill
            loading="lazy"
            unoptimized
            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
      )}

      {/* Meta */}
      <div className="p-5 flex flex-col gap-3 flex-1">
        {/* Category badges */}
        <div className="flex flex-wrap gap-1.5">
          {post.categories.map((c) => (
            <Badge key={c}>{c}</Badge>
          ))}
        </div>

        <h3 className="font-heading font-semibold text-lg text-text-primary leading-snug">
          {post.title}
        </h3>

        <p className="text-text-secondary text-sm line-clamp-3 leading-relaxed flex-1">
          {post.description}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-1">
          <span className="text-xs text-text-muted">{post.date}</span>
          <a
            href={post.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:text-accent-hover transition-colors"
          >
            <LinkedInIcon size={14} />
            View on LinkedIn →
          </a>
        </div>
      </div>
    </motion.article>
  );
}

"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
} from "framer-motion";
import { artworks, type Artwork, type ArtCategory } from "@/lib/data/artworks";

function InstagramIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

type FilterOption = { label: string; value: ArtCategory | "all" };

const FILTERS: FilterOption[] = [
  { label: "All", value: "all" },
  { label: "Digital", value: "digital" },
  { label: "Sketches", value: "sketch" },
  { label: "Acrylic", value: "acrylic" },
  { label: "Portraits", value: "portrait" },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: "easeOut" as const },
  }),
};

function ArtCard({
  artwork,
  index,
  onClick,
  shouldReduce,
}: {
  artwork: Artwork;
  index: number;
  onClick: () => void;
  shouldReduce: boolean | null;
}) {
  return (
    <motion.div
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
      onClick={onClick}
      className="group relative rounded-xl overflow-hidden bg-surface border border-border cursor-pointer"
      style={{ boxShadow: "0 4px 16px rgba(0,0,0,0.2)" }}
    >
      {/* Image */}
      <div className="aspect-[4/3] relative overflow-hidden">
        <Image
          src={artwork.src}
          alt={artwork.title}
          fill
          loading="lazy"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {/* Hover overlay */}
        <motion.div
          className="absolute inset-0 bg-background/75 flex flex-col items-center justify-center gap-3"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          <span className="text-text-primary text-sm font-medium px-4 py-2 rounded-full border border-accent/50 bg-background/60 backdrop-blur-sm">
            View artwork
          </span>
        </motion.div>
      </div>

      {/* Meta */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="font-heading font-semibold text-text-primary truncate">
              {artwork.title}
            </h3>
            <p className="text-text-muted text-sm mt-0.5">
              {artwork.medium}
              {artwork.year && (
                <span className="ml-2 text-text-muted/60">{artwork.year}</span>
              )}
              {artwork.timeSpent && (
                <span className="ml-2 text-text-muted/60">
                  · {artwork.timeSpent}
                </span>
              )}
            </p>
          </div>
          {artwork.instagramUrl && (
            <a
              href={artwork.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex-shrink-0 text-text-muted hover:text-accent transition-colors p-1"
              aria-label="View on Instagram"
            >
              <InstagramIcon size={15} />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function Lightbox({
  artworks: list,
  index,
  onClose,
  onPrev,
  onNext,
  shouldReduce,
}: {
  artworks: Artwork[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  shouldReduce: boolean | null;
}) {
  const artwork = list[index];
  const hasPrev = index > 0;
  const hasNext = index < list.length - 1;

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
      initial={shouldReduce ? {} : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={shouldReduce ? {} : { opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-background/85 backdrop-blur-md" />

      {/* Panel */}
      <motion.div
        className="relative z-10 w-full max-w-4xl bg-surface border border-border rounded-2xl overflow-hidden shadow-2xl"
        initial={shouldReduce ? {} : { scale: 0.94, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={shouldReduce ? {} : { scale: 0.94, opacity: 0 }}
        transition={{ type: "spring", stiffness: 320, damping: 32 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col md:flex-row" style={{ maxHeight: "90vh" }}>
          {/* Image */}
          <div className="relative flex-1 min-h-[260px] md:min-h-0 bg-background/50">
            <AnimatePresence mode="wait">
              <motion.div
                key={artwork.src}
                className="absolute inset-0"
                initial={shouldReduce ? {} : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={shouldReduce ? {} : { opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Image
                  src={artwork.src}
                  alt={artwork.title}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 60vw"
                  priority
                />
              </motion.div>
            </AnimatePresence>

            <button
              onClick={onPrev}
              disabled={!hasPrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-background/70 backdrop-blur-sm border border-border flex items-center justify-center text-text-secondary hover:text-text-primary hover:border-accent/40 transition-colors disabled:opacity-30 disabled:pointer-events-none"
              aria-label="Previous artwork"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={onNext}
              disabled={!hasNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-background/70 backdrop-blur-sm border border-border flex items-center justify-center text-text-secondary hover:text-text-primary hover:border-accent/40 transition-colors disabled:opacity-30 disabled:pointer-events-none"
              aria-label="Next artwork"
            >
              <ChevronRight size={18} />
            </button>
          </div>

          {/* Info */}
          <div className="md:w-72 lg:w-80 flex flex-col p-6 border-t md:border-t-0 md:border-l border-border overflow-y-auto">
            <button
              onClick={onClose}
              className="self-end mb-4 w-8 h-8 rounded-full border border-border flex items-center justify-center text-text-muted hover:text-text-primary hover:border-accent/40 transition-colors"
              aria-label="Close"
            >
              <X size={15} />
            </button>

            <AnimatePresence mode="wait">
              <motion.div
                key={artwork.title}
                initial={shouldReduce ? {} : { opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={shouldReduce ? {} : { opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
              >
                <h2 className="font-heading font-bold text-xl text-text-primary">
                  {artwork.title}
                </h2>
                <p className="text-accent text-sm mt-1">{artwork.medium}</p>
                {(artwork.year || artwork.timeSpent) && (
                  <p className="text-text-muted text-xs mt-1">
                    {[artwork.year, artwork.timeSpent].filter(Boolean).join(" · ")}
                  </p>
                )}
                {artwork.description && (
                  <p className="text-text-secondary text-sm leading-relaxed mt-4">
                    {artwork.description}
                  </p>
                )}
                <p className="text-text-muted text-xs mt-6">
                  {index + 1} / {list.length}
                </p>
                {artwork.instagramUrl && (
                  <a
                    href={artwork.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-full text-sm font-medium border border-border text-text-secondary hover:text-accent hover:border-accent/40 transition-colors"
                  >
                    <InstagramIcon size={14} />
                    View on Instagram
                    <ExternalLink size={12} className="opacity-60" />
                  </a>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function ArtGallery() {
  const shouldReduce = useReducedMotion();
  const [activeFilter, setActiveFilter] = useState<ArtCategory | "all">("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered =
    activeFilter === "all"
      ? artworks
      : artworks.filter((a) => a.category === activeFilter);

  const openLightbox = useCallback((index: number) => setLightboxIndex(index), []);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const prevArtwork = useCallback(
    () => setLightboxIndex((i) => (i !== null && i > 0 ? i - 1 : i)),
    []
  );
  const nextArtwork = useCallback(
    () =>
      setLightboxIndex((i) =>
        i !== null && i < filtered.length - 1 ? i + 1 : i
      ),
    [filtered.length]
  );

  return (
    <>
      {/* Filter chips */}
      <div className="flex flex-wrap gap-2 mb-10">
        {FILTERS.map((f) => {
          const isActive = activeFilter === f.value;
          return (
            <motion.button
              key={f.value}
              onClick={() => setActiveFilter(f.value)}
              whileHover={shouldReduce ? {} : { y: -1 }}
              whileTap={shouldReduce ? {} : { scale: 0.96 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors border ${
                isActive
                  ? "bg-accent text-background border-accent"
                  : "bg-surface border-border text-text-secondary hover:border-accent/40 hover:text-text-primary"
              }`}
            >
              {f.label}
              {isActive && f.value !== "all" && (
                <span className="ml-1.5 opacity-70 text-xs">
                  {filtered.length}
                </span>
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeFilter}
          initial={shouldReduce ? {} : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={shouldReduce ? {} : { opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {filtered.map((artwork, i) => (
            <ArtCard
              key={artwork.src}
              artwork={artwork}
              index={i}
              onClick={() => openLightbox(i)}
              shouldReduce={shouldReduce}
            />
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Instagram attribution */}
      <p className="mt-10 text-center text-text-muted text-sm">
        View the full collection on{" "}
        <a
          href="https://www.instagram.com/n_artholic/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent hover:text-accent-hover transition-colors inline-flex items-center gap-1"
        >
          <InstagramIcon size={13} />
          @n_artholic
        </a>
      </p>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            artworks={filtered}
            index={lightboxIndex}
            onClose={closeLightbox}
            onPrev={prevArtwork}
            onNext={nextArtwork}
            shouldReduce={shouldReduce}
          />
        )}
      </AnimatePresence>
    </>
  );
}

"use client";

import Image from "next/image";
import { useState } from "react";
import { artworks, type Artwork } from "@/lib/data/artworks";

function ArtImage({ artwork }: { artwork: Artwork }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative rounded-xl overflow-hidden bg-surface border border-border group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="aspect-[4/3] relative">
        <Image
          src={artwork.src}
          alt={artwork.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>
      {/* Hover overlay */}
      <div
        className={`absolute inset-0 bg-background/70 flex flex-col justify-end p-4 transition-opacity duration-300 ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
      >
        <h3 className="font-heading font-semibold text-text-primary">
          {artwork.title}
        </h3>
        {(artwork.medium || artwork.year) && (
          <p className="text-text-muted text-sm mt-1">
            {[artwork.medium, artwork.year].filter(Boolean).join(" · ")}
          </p>
        )}
      </div>
    </div>
  );
}

export default function ArtGallery() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {artworks.map((artwork) => (
        <ArtImage key={artwork.src} artwork={artwork} />
      ))}
    </div>
  );
}

export type ArtCategory = "digital" | "sketch" | "acrylic" | "portrait";

export interface Artwork {
  src: string;
  title: string;
  medium: string;
  year?: number;
  timeSpent?: string;
  description?: string;
  instagramUrl?: string;
  category: ArtCategory;
}

export const artworks: Artwork[] = [
  {
    src: "/art/placeholder-1.svg",
    title: "Quiet Storm",
    medium: "Graphite",
    year: 2024,
    description:
      "A study in contrast — heavy shadows built up with layers of graphite, leaving the highlights untouched. Exploring stillness within intensity.",
    instagramUrl: "https://www.instagram.com/p/B-zd9_8p86g/",
    category: "sketch",
  },
  {
    src: "/art/placeholder-2.svg",
    title: "Neon Solitude",
    medium: "Digital Painting",
    year: 2023,
    description:
      "Created entirely in Procreate, this piece explores the tension between the warmth of artificial light and the cold emptiness of city nights.",
    instagramUrl: "https://www.instagram.com/p/B_FJ5kBH6O5/",
    category: "digital",
  },
  {
    src: "/art/placeholder-3.svg",
    title: "Terracotta Dreams",
    medium: "Acrylic on Canvas",
    year: 2023,
    timeSpent: "~12 hours",
    description:
      "Warm earth tones layered over a dark ground. The texture was built using palette knives and dry-brushing techniques.",
    instagramUrl: "https://www.instagram.com/p/B-4k_zfHNch/",
    category: "acrylic",
  },
  {
    src: "/art/placeholder-4.svg",
    title: "Facets",
    medium: "Color Pencil",
    year: 2022,
    description:
      "A portrait fragmented into geometric planes, each shaded with a different pressure to suggest dimension without blending.",
    instagramUrl: "https://www.instagram.com/p/Cfo6g7hB-81/",
    category: "portrait",
  },
  {
    src: "/art/placeholder-5.svg",
    title: "Urban Fragment",
    medium: "Graphite",
    year: 2022,
    timeSpent: "~8 hours",
    description:
      "Architectural detail from memory — a corner of a building reduced to its essential geometry through hatching and cross-hatching.",
    instagramUrl: "https://www.instagram.com/p/CcbIuIVhA16/",
    category: "sketch",
  },
  {
    src: "/art/placeholder-6.svg",
    title: "Synthesis",
    medium: "Digital Painting",
    year: 2024,
    description:
      "A meditation on the intersection of organic and geometric forms. Built layer by layer, erasing as much as painting.",
    instagramUrl: "https://www.instagram.com/p/Cfo6oGfBp6n/",
    category: "digital",
  },
];

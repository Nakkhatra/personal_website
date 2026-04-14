export interface Artwork {
  src: string;
  title: string;
  medium?: string;
  year?: number;
}

export const artworks: Artwork[] = [
  {
    src: "/art/placeholder-1.svg",
    title: "Abstract Composition I",
    medium: "Digital",
    year: 2024,
  },
  {
    src: "/art/placeholder-2.svg",
    title: "Geometric Study",
    medium: "Digital",
    year: 2024,
  },
  {
    src: "/art/placeholder-3.svg",
    title: "Neural Patterns",
    medium: "Digital",
    year: 2023,
  },
  {
    src: "/art/placeholder-4.svg",
    title: "Urban Sketch",
    medium: "Pen & Ink",
    year: 2023,
  },
];

export const instagramPosts = [
  "https://www.instagram.com/p/B-zd9_8p86g/",
  "https://www.instagram.com/p/B_FJ5kBH6O5/",
  "https://www.instagram.com/p/B-4k_zfHNch/",
  "https://www.instagram.com/p/Cfo6g7hB-81/",
  "https://www.instagram.com/p/CcbIuIVhA16/",
  "https://www.instagram.com/p/Cfo6oGfBp6n/",
];

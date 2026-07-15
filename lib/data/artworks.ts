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
    src: "/art/1_witcher_digital.png",
    title: "Geralt of Rivia",
    medium: "Digital",
    year: 2024,
    timeSpent: "~20 hours",
    description:
      "A digital painting inspired by Geralt of Rivia from The Witcher 3. I focused on capturing his resilience through dramatic lighting, atmospheric effects, and textured brushwork while balancing realism with a painterly style.",
    instagramUrl: "https://www.instagram.com/p/B-zd9_8p86g/",
    category: "digital",
  },
  {
    src: "/art/2_Heisenberg_graphiteandpen.png",
    title: "Heisenberg",
    medium: "Graphite & Pen",
    year: 2023,
    description:
      "A graphite and pen portrait of Walter White from Breaking Bad, paired with his iconic 'I am the one who knocks' quote. The piece emphasizes strong contrasts, facial detail, and expressive line work.",
    instagramUrl: "https://www.instagram.com/p/B_FJ5kBH6O5/",
    category: "sketch",
  },
  {
    src: "/art/3_fightclub_digital.png",
    title: "Tyler Durden - Fight Club",
    medium: "Digital",
    year: 2023,
    timeSpent: "~12 hours",
    description:
      "A stylized digital portrait of Tyler Durden inspired by Fight Club. Bold colors, textured brush strokes, and expressive lighting were used to reflect the film's rebellious and chaotic energy.",
    instagramUrl: "https://www.instagram.com/p/B-4k_zfHNch/",
    category: "digital",
  },
  {
    src: "/art/4_icedragon_acrylic.png",
    title: "Ice Dragon - GOT",
    medium: "Acrylic",
    year: 2022,
    description:
      "An acrylic painting of the Night King's undead dragon from Game of Thrones. Built with layered blues and cool tones, the piece explores dramatic contrast and the imposing scale of the creature.",
    instagramUrl: "https://www.instagram.com/p/Cfo6g7hB-81/",
    category: "acrylic",
  },
  {
    src: "/art/5_shire.png",
    title: "The Shire - LOTR",
    medium: "Acrylic",
    year: 2022,
    timeSpent: "~8 hours",
    description:
      "An acrylic landscape inspired by the peaceful countryside of the Shire from The Lord of the Rings. Soft lighting, warm greens, and layered textures were used to recreate its calm and timeless atmosphere.",
    instagramUrl: "https://www.instagram.com/p/CcbIuIVhA16/",
    category: "acrylic",
  },
  {
    src: "/art/6_rooftopview_acrylic.png",
    title: "My Rooftop View",
    medium: "Acrylic",
    year: 2024,
    description:
      "An acrylic painting capturing the everyday view from my rooftop. The composition focuses on light, perspective, and subtle color transitions to transform a familiar scene into a quiet moment of reflection.",
    instagramUrl: "https://www.instagram.com/p/Cfo6oGfBp6n/",
    category: "acrylic",
  },
];

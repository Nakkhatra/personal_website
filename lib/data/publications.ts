export interface Publication {
  title: string;
  authors: string;
  venue: string;
  year: number;
  url?: string;
  dataset?: string;
}

export const publications: Publication[] = [
  {
    title: "Bengali Common Voice Speech Dataset for Automatic Speech Recognition",
    authors: "Samiul Alam, Asif Sushmit, Zaowad Abdullah, Shahrin Nakkhatra, MD. Nazmuddoha Ansary, Syed Mobassir Hossen, Sazia Morshed Mehnaz, Tahsin Reasat, Ahmed Imtiaz Humayun",
    venue: "arXiv preprint arXiv:2206.14053",
    year: 2022,
    url: "https://arxiv.org/abs/2206.14053",
    dataset: "https://github.com/BengaliAI/commonvoice-bangla",
  },
];

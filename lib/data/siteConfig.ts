export const siteConfig = {
  name: "Md. Shahrin Nakkhatra",
  shortName: "Shahrin Nakkhatra",
  initials: "SN",
  role: "Data Scientist, Robi Axiata Ltd.",
  bio: "Data Scientist and AI Engineer focused on building practical, end-to-end AI systems, including RAG and agentic workflows. I combine strong engineering with data-driven thinking, and explore art as a creative counterbalance.",
  email: "msnakkhatra@gmail.com",

  links: {
    github: "https://github.com/Nakkhatra",
    linkedin: "https://www.linkedin.com/in/nakkhatra/",
    scholar:
      "https://scholar.google.com/citations?user=nbixMUMAAAAJ&hl=en&authuser=1",
  },

  githubUsername: "Nakkhatra",
  projectWhitelist: [
    "claude_code",
    "personal_website",
    "ubuntu_customization",
    "sentiment_analysis",
    "video-compressor-ffmpeg",
    "BPE_tokenization",
    "XLS-R_bn",
  ],

  navLinks: [
    { label: "Home", href: "/" },
    { label: "Projects", href: "/projects" },
    { label: "Blog", href: "/blogs" },
    { label: "Art", href: "/art" },
    { label: "Research", href: "/research" },
    { label: "Resume", href: "/resume" },
  ],
} as const;

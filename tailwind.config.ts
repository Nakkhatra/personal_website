import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0B1D26",
        surface: {
          DEFAULT: "#112B38",
          hover: "#153545",
        },
        border: "#1A3A4A",
        "text-primary": "#EDEDED",
        "text-secondary": "#94A3B8",
        "text-muted": "#64748B",
        accent: {
          DEFAULT: "#C8875A",
          hover: "#D4956B",
          muted: "rgba(200, 135, 90, 0.125)",
        },
      },
      fontFamily: {
        heading: ["var(--font-sora)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;

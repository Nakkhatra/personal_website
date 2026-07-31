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
        background: "rgb(var(--bg-base-ch) / <alpha-value>)",
        surface: {
          DEFAULT: "var(--bg-surface)",
          hover: "var(--bg-surface-hover)",
        },
        border: "var(--border)",
        "text-primary": "var(--text-primary)",
        "text-secondary": "var(--text-secondary)",
        "text-muted": "var(--text-muted)",
        accent: {
          DEFAULT: "rgb(var(--accent-ch) / <alpha-value>)",
          hover: "var(--accent-hover)",
          muted: "var(--accent-muted)",
        },
      },
      fontFamily: {
        heading: ["var(--font-sora)", "sans-serif"],
        body: ["var(--font-instrument)", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
      },
      fontSize: {
        hero: ["clamp(2.75rem, 6vw, 4.5rem)", { lineHeight: "1.05", letterSpacing: "-0.03em", fontWeight: "700" }],
        display: ["clamp(1.75rem, 3vw, 2.25rem)", { lineHeight: "1.15", letterSpacing: "-0.02em", fontWeight: "700" }],
        body: ["1.0625rem", { lineHeight: "1.7" }],
        caption: ["0.8125rem", { lineHeight: "1.4", letterSpacing: "0.02em" }],
      },
    },
  },
  plugins: [],
};

export default config;

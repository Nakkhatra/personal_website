"use client";

import { useState } from "react";
import { themes } from "@/lib/theme";
import { useTheme } from "@/components/providers/ThemeProvider";

type ThemeName = keyof typeof themes;

const THEME_LABELS: Record<ThemeName, { label: string; swatch: string }> = {
  midnightObservatory: { label: "Midnight Observatory", swatch: "#CFA06F" },
  emeraldAurora: { label: "Emerald Aurora", swatch: "#2DD4BF" },
  royalAmethyst: { label: "Royal Amethyst", swatch: "#9B72CF" },
  crimsonEclipse: { label: "Crimson Eclipse", swatch: "#C04A4A" },
  nordicFrost: { label: "Nordic Frost", swatch: "#8ABFD8" },
  forestObservatory: { label: "Forest Observatory", swatch: "#C9A55A" },
};

const isDev = process.env.NODE_ENV === "development";

export default function ThemePlayground() {
  const [open, setOpen] = useState(false);
  const { themeName, setTheme } = useTheme();

  if (!isDev) return null;

  return (
    <div className="fixed bottom-4 right-4 z-[200] flex flex-col items-end gap-2">
      {open && (
        <div
          className="rounded-xl border border-[var(--border)] bg-[var(--bg-surface)] shadow-lg overflow-hidden"
          style={{ minWidth: 220 }}
        >
          <div className="px-4 py-2.5 border-b border-[var(--border)]">
            <span className="text-xs font-mono font-semibold text-[var(--text-muted)] uppercase tracking-wider">
              Theme
            </span>
          </div>
          <div className="py-1">
            {(Object.keys(THEME_LABELS) as ThemeName[]).map((name) => {
              const { label, swatch } = THEME_LABELS[name];
              const active = name === themeName;
              return (
                <button
                  key={name}
                  onClick={() => setTheme(name)}
                  className="flex items-center gap-3 w-full px-4 py-2 text-sm transition-colors hover:bg-[var(--bg-surface-hover)]"
                  style={{
                    color: active ? "var(--accent)" : "var(--text-secondary)",
                    fontWeight: active ? 600 : 400,
                  }}
                >
                  <span
                    className="w-3 h-3 rounded-full flex-shrink-0"
                    style={{ background: swatch }}
                  />
                  {label}
                  {active && (
                    <span className="ml-auto text-xs text-[var(--accent)] opacity-70">✓</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen((o) => !o)}
        className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-mono font-bold shadow-lg transition-all hover:scale-110"
        style={{
          background: "var(--accent)",
          color: "var(--bg-base)",
        }}
        title="Theme Playground (dev only)"
        aria-label="Toggle theme switcher"
      >
        {open ? "×" : "◐"}
      </button>
    </div>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { themes } from "@/lib/theme";
import { useTheme } from "@/components/providers/ThemeProvider";

type ThemeName = keyof typeof themes;

const THEME_META: Record<ThemeName, { label: string; swatch: string }> = {
  midnightObservatory: { label: "Midnight Observatory", swatch: "#CFA06F" },
  emeraldAurora: { label: "Emerald Aurora", swatch: "#2DD4BF" },
  royalAmethyst: { label: "Royal Amethyst", swatch: "#9B72CF" },
  crimsonEclipse: { label: "Crimson Eclipse", swatch: "#C04A4A" },
  nordicFrost: { label: "Nordic Frost", swatch: "#8ABFD8" },
  forestObservatory: { label: "Forest Observatory", swatch: "#C9A55A" },
};

function PaletteIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="13.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
      <circle cx="17.5" cy="10.5" r="0.5" fill="currentColor" stroke="none" />
      <circle cx="8.5" cy="7.5" r="0.5" fill="currentColor" stroke="none" />
      <circle cx="6.5" cy="12.5" r="0.5" fill="currentColor" stroke="none" />
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.667 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.042a1.667 1.667 0 0 1 1.667-1.666h1.979c3.033 0 5.581-2.548 5.581-5.581C22 6.099 17.5 2 12 2z" />
    </svg>
  );
}

interface ThemeToggleProps {
  /** When true, renders as an inline list row (for mobile drawer) */
  inline?: boolean;
}

export default function ThemeToggle({ inline = false }: ThemeToggleProps) {
  const { themeName, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    function handleClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("keydown", handleKey);
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.removeEventListener("mousedown", handleClick);
    };
  }, [open]);

  const themeList = (Object.keys(THEME_META) as ThemeName[]).map((name) => {
    const { label, swatch } = THEME_META[name];
    const active = name === themeName;
    return (
      <button
        key={name}
        role="menuitem"
        onClick={() => {
          setTheme(name);
          setOpen(false);
        }}
        className="flex items-center gap-3 w-full px-4 py-2.5 text-sm transition-colors hover:bg-[var(--bg-surface-hover)] focus-visible:bg-[var(--bg-surface-hover)] outline-none"
        style={{
          color: active ? "var(--accent)" : "var(--text-secondary)",
          fontWeight: active ? 600 : 400,
        }}
      >
        <span
          className="w-2.5 h-2.5 rounded-full flex-shrink-0 ring-1 ring-white/10"
          style={{ background: swatch }}
        />
        <span className="flex-1 text-left">{label}</span>
        {active && (
          <svg width={12} height={12} viewBox="0 0 12 12" fill="none" aria-hidden>
            <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </button>
    );
  });

  // ── Inline variant (mobile drawer) ──────────────────────────────────────────
  if (inline) {
    return (
      <div className="mt-2 border-t border-[var(--border)] pt-3 pb-1">
        <p className="px-4 pb-1.5 text-xs font-mono font-semibold text-[var(--text-muted)] uppercase tracking-wider">
          Appearance
        </p>
        <div role="menu">{themeList}</div>
      </div>
    );
  }

  // ── Desktop popover variant ──────────────────────────────────────────────────
  return (
    <div ref={containerRef} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="true"
        aria-expanded={open}
        aria-label="Switch theme"
        className={`p-2 rounded-full transition-colors ${
          open
            ? "text-accent bg-accent-muted"
            : "text-text-muted hover:text-text-primary hover:bg-surface"
        }`}
      >
        <PaletteIcon size={16} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -4 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute right-0 top-full mt-2 z-[300] rounded-xl overflow-hidden"
            style={{
              minWidth: 220,
              border: "1px solid var(--border)",
              background: "var(--bg-surface)",
              boxShadow: "var(--shadow-medium)",
            }}
            role="menu"
            aria-label="Theme options"
          >
            <div
              className="px-4 py-2.5 border-b"
              style={{ borderColor: "var(--border)" }}
            >
              <span className="text-xs font-mono font-semibold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
                Appearance
              </span>
            </div>
            <div className="py-1">{themeList}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

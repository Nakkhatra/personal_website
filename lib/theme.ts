// ─── Helpers (exported for canvas components) ────────────────────────────────

export function hexToChannels(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r} ${g} ${b}`;
}

export function hexToRgb(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r}, ${g}, ${b}`;
}

// Derived RGB strings — avoids duplicate sources of truth in theme objects
export function accentRgb(theme: Theme): string {
  return hexToRgb(theme.colors.accent.primary);
}
export function starColorRgb(theme: Theme): string {
  return hexToRgb(theme.colors.text.primary);
}

// ─── Theme type ───────────────────────────────────────────────────────────────

export interface Theme {
  colors: {
    background: {
      base: string;
      elevated: string;
      surface: string;
      surfaceHover: string;
      card: string;
    };
    text: {
      primary: string;
      secondary: string;
      muted: string;
    };
    accent: {
      primary: string;
      secondary: string;
      glow: string;
    };
    border: {
      default: string;
      hover: string;
    };
  };
  shadows: {
    soft: string;
    medium: string;
  };
  effects: {
    nebula1: string;
    nebula2: string;
  };
  motion: {
    fast: string;
    normal: string;
    slow: string;
    easing: string;
  };
}

// ─── Themes ───────────────────────────────────────────────────────────────────

const midnightObservatory: Theme = {
  colors: {
    background: {
      base: "#07141E",
      elevated: "#0A1A26",
      surface: "#0F2331",
      surfaceHover: "#153545",
      card: "#112B38",
    },
    text: {
      primary: "#EDEDED",
      secondary: "#94A3B8",
      muted: "#64748B",
    },
    accent: {
      primary: "#CFA06F",
      secondary: "#D4B080",
      glow: "#CFA06F",
    },
    border: {
      default: "#1A3A4A",
      hover: "#2A5A6A",
    },
  },
  shadows: {
    soft: "0 4px 16px rgba(0,0,0,0.2)",
    medium: "0 8px 25px rgba(0,0,0,0.3)",
  },
  effects: {
    nebula1: "#C8875A",
    nebula2: "#1A6B8A",
  },
  motion: {
    fast: "0.15s",
    normal: "0.3s",
    slow: "0.6s",
    easing: "cubic-bezier(0.4, 0, 0.2, 1)",
  },
};

const emeraldAurora: Theme = {
  colors: {
    background: {
      base: "#0A1A20",
      elevated: "#0D2028",
      surface: "#102830",
      surfaceHover: "#143540",
      card: "#102830",
    },
    text: {
      primary: "#E8F0F4",
      secondary: "#8FAFC0",
      muted: "#5A7A8A",
    },
    accent: {
      primary: "#2DD4BF",
      secondary: "#34D9C4",
      glow: "#2DD4BF",
    },
    border: {
      default: "#163545",
      hover: "#2A5A6A",
    },
  },
  shadows: {
    soft: "0 4px 16px rgba(0,0,0,0.2)",
    medium: "0 8px 25px rgba(0,0,0,0.3)",
  },
  effects: {
    nebula1: "#2DD4BF",
    nebula2: "#1A4B8A",
  },
  motion: {
    fast: "0.15s",
    normal: "0.3s",
    slow: "0.6s",
    easing: "cubic-bezier(0.4, 0, 0.2, 1)",
  },
};

const royalAmethyst: Theme = {
  colors: {
    background: {
      base: "#120D1E",
      elevated: "#16102A",
      surface: "#1A1330",
      surfaceHover: "#21183C",
      card: "#1A1330",
    },
    text: {
      primary: "#F0EBE3",
      secondary: "#9C94B8",
      muted: "#6B6080",
    },
    accent: {
      primary: "#9B72CF",
      secondary: "#A97FDC",
      glow: "#9B72CF",
    },
    border: {
      default: "#2A1F40",
      hover: "#4A356A",
    },
  },
  shadows: {
    soft: "0 4px 16px rgba(0,0,0,0.25)",
    medium: "0 8px 25px rgba(0,0,0,0.35)",
  },
  effects: {
    nebula1: "#9B72CF",
    nebula2: "#4A2E8A",
  },
  motion: {
    fast: "0.15s",
    normal: "0.3s",
    slow: "0.6s",
    easing: "cubic-bezier(0.4, 0, 0.2, 1)",
  },
};

const crimsonEclipse: Theme = {
  colors: {
    background: {
      base: "#141414",
      elevated: "#1A1A1A",
      surface: "#1E1E1E",
      surfaceHover: "#252525",
      card: "#1E1E1E",
    },
    text: {
      primary: "#E8E8E8",
      secondary: "#9A9A9A",
      muted: "#666666",
    },
    accent: {
      primary: "#C04A4A",
      secondary: "#CC5555",
      glow: "#C04A4A",
    },
    border: {
      default: "#2A2A2A",
      hover: "#4A2A2A",
    },
  },
  shadows: {
    soft: "0 4px 16px rgba(0,0,0,0.3)",
    medium: "0 8px 25px rgba(0,0,0,0.4)",
  },
  effects: {
    nebula1: "#C04A4A",
    nebula2: "#4A1A1A",
  },
  motion: {
    fast: "0.15s",
    normal: "0.3s",
    slow: "0.6s",
    easing: "cubic-bezier(0.4, 0, 0.2, 1)",
  },
};

const nordicFrost: Theme = {
  colors: {
    background: {
      base: "#08131C",
      elevated: "#0B1A26",
      surface: "#102231",
      surfaceHover: "#1C2A3A",
      card: "#172230",
    },
    text: {
      primary: "#E2E8F0",
      secondary: "#94A3B8",
      muted: "#64748B",
    },
    accent: {
      primary: "#8ABFD8",
      secondary: "#8FD4ED",
      glow: "#7EC8E3",
    },
    border: {
      default: "#1E3040",
      hover: "#2E5070",
    },
  },
  shadows: {
    soft: "0 4px 16px rgba(0,0,0,0.2)",
    medium: "0 8px 25px rgba(0,0,0,0.3)",
  },
  effects: {
    nebula1: "#7EC8E3",
    nebula2: "#1A4A6A",
  },
  motion: {
    fast: "0.15s",
    normal: "0.3s",
    slow: "0.6s",
    easing: "cubic-bezier(0.4, 0, 0.2, 1)",
  },
};

const forestObservatory: Theme = {
  colors: {
    background: {
      base: "#08140C",
      elevated: "#0D2015",
      surface: "#102818",
      surfaceHover: "#14321E",
      card: "#102818",
    },
    text: {
      primary: "#EEE8DC",
      secondary: "#9AAF90",
      muted: "#627A58",
    },
    accent: {
      primary: "#C9A55A",
      secondary: "#D4B45C",
      glow: "#C8A84B",
    },
    border: {
      default: "#1A3A22",
      hover: "#2A5A32",
    },
  },
  shadows: {
    soft: "0 4px 16px rgba(0,0,0,0.2)",
    medium: "0 8px 25px rgba(0,0,0,0.3)",
  },
  effects: {
    nebula1: "#C8A84B",
    nebula2: "#1A4A1A",
  },
  motion: {
    fast: "0.15s",
    normal: "0.3s",
    slow: "0.6s",
    easing: "cubic-bezier(0.4, 0, 0.2, 1)",
  },
};

export const themes = {
  midnightObservatory,
  emeraldAurora,
  royalAmethyst,
  crimsonEclipse,
  nordicFrost,
  forestObservatory,
} as const;

export const activeTheme: Theme = themes.nordicFrost;

// ─── CSS variable generation ──────────────────────────────────────────────────

function buildVarsRecord(theme: Theme): Record<string, string> {
  const { colors, effects } = theme;
  const accentRgbStr = hexToRgb(colors.accent.primary);
  const accentChStr = hexToChannels(colors.accent.primary);
  const bgBaseChStr = hexToChannels(colors.background.base);
  const starColStr = hexToRgb(colors.text.primary);

  return {
    "--bg-base": colors.background.base,
    "--bg-base-ch": bgBaseChStr,
    "--bg-elevated": colors.background.elevated,
    "--bg-surface": colors.background.surface,
    "--bg-surface-hover": colors.background.surfaceHover,
    "--bg-card": colors.background.card,
    "--border": colors.border.default,
    "--border-hover": colors.border.hover,
    "--text-primary": colors.text.primary,
    "--text-secondary": colors.text.secondary,
    "--text-muted": colors.text.muted,
    "--accent": colors.accent.primary,
    "--accent-ch": accentChStr,
    "--accent-rgb": accentRgbStr,
    "--accent-hover": colors.accent.secondary,
    "--accent-muted": `rgba(${accentRgbStr}, 0.125)`,
    "--nebula1": effects.nebula1,
    "--nebula2": effects.nebula2,
    "--star-color": starColStr,
    "--shadow-soft": theme.shadows.soft,
    "--shadow-medium": theme.shadows.medium,
    "--shadow-glow": `0 8px 25px rgba(${accentRgbStr}, 0.30)`,
  };
}

export function buildCssVars(theme: Theme): string {
  const record = buildVarsRecord(theme);
  const vars = Object.entries(record)
    .map(([k, v]) => `  ${k}: ${v};`)
    .join("\n");
  return `:root {\n${vars}\n}`;
}

export function applyThemeVars(theme: Theme): void {
  const record = buildVarsRecord(theme);
  const root = document.documentElement;
  for (const [key, value] of Object.entries(record)) {
    root.style.setProperty(key, value);
  }
}

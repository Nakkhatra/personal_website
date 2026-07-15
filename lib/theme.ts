function hexToChannels(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r} ${g} ${b}`;
}

function hexToRgb(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r}, ${g}, ${b}`;
}

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
      primaryRgb: string;
    };
    border: {
      default: string;
      hover: string;
    };
  };
  gradients: {
    background: string;
    hero: string;
    section: string;
    card: string;
  };
  shadows: {
    soft: string;
    medium: string;
    glow: string;
  };
  effects: {
    starColorRgb: string;
    nebula1: string;
    nebula2: string;
    cursorGlow: string;
  };
  motion: {
    fast: string;
    normal: string;
    slow: string;
    easing: string;
  };
}

const midnightObservatory: Theme = {
  colors: {
    background: {
      base: "#0B1D26",
      elevated: "#0F2330",
      surface: "#112B38",
      surfaceHover: "#153545",
      card: "#112B38",
    },
    text: {
      primary: "#EDEDED",
      secondary: "#94A3B8",
      muted: "#64748B",
    },
    accent: {
      primary: "#C8875A",
      secondary: "#D4956B",
      glow: "#C8875A",
      primaryRgb: "200, 135, 90",
    },
    border: {
      default: "#1A3A4A",
      hover: "#2A5A6A",
    },
  },
  gradients: {
    background: "radial-gradient(ellipse at 20% 50%, #112B38 0%, #0B1D26 60%)",
    hero: "radial-gradient(ellipse 800px 600px at 60% 40%, rgba(200,135,90,0.04) 0%, transparent 70%)",
    section: "radial-gradient(ellipse 800px 500px at 50% 30%, rgba(200,135,90,0.04) 0%, transparent 70%)",
    card: "none",
  },
  shadows: {
    soft: "0 4px 16px rgba(0,0,0,0.2)",
    medium: "0 8px 25px rgba(0,0,0,0.3)",
    glow: "0 8px 25px rgba(200,135,90,0.30)",
  },
  effects: {
    starColorRgb: "237, 237, 237",
    nebula1: "#C8875A",
    nebula2: "#1A6B8A",
    cursorGlow: "rgba(200,135,90,0.10)",
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
      primaryRgb: "45, 212, 191",
    },
    border: {
      default: "#163545",
      hover: "#2A5A6A",
    },
  },
  gradients: {
    background: "radial-gradient(ellipse at 20% 50%, #102830 0%, #0A1A20 60%)",
    hero: "radial-gradient(ellipse 800px 600px at 60% 40%, rgba(45,212,191,0.04) 0%, transparent 70%)",
    section: "radial-gradient(ellipse 800px 500px at 50% 30%, rgba(45,212,191,0.04) 0%, transparent 70%)",
    card: "none",
  },
  shadows: {
    soft: "0 4px 16px rgba(0,0,0,0.2)",
    medium: "0 8px 25px rgba(0,0,0,0.3)",
    glow: "0 8px 25px rgba(45,212,191,0.30)",
  },
  effects: {
    starColorRgb: "232, 240, 244",
    nebula1: "#2DD4BF",
    nebula2: "#1A4B8A",
    cursorGlow: "rgba(45,212,191,0.10)",
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
      primaryRgb: "155, 114, 207",
    },
    border: {
      default: "#2A1F40",
      hover: "#4A356A",
    },
  },
  gradients: {
    background: "radial-gradient(ellipse at 20% 50%, #1A1330 0%, #120D1E 60%)",
    hero: "radial-gradient(ellipse 800px 600px at 60% 40%, rgba(155,114,207,0.05) 0%, transparent 70%)",
    section: "radial-gradient(ellipse 800px 500px at 50% 30%, rgba(155,114,207,0.04) 0%, transparent 70%)",
    card: "none",
  },
  shadows: {
    soft: "0 4px 16px rgba(0,0,0,0.25)",
    medium: "0 8px 25px rgba(0,0,0,0.35)",
    glow: "0 8px 25px rgba(155,114,207,0.30)",
  },
  effects: {
    starColorRgb: "240, 235, 227",
    nebula1: "#9B72CF",
    nebula2: "#4A2E8A",
    cursorGlow: "rgba(155,114,207,0.10)",
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
      primaryRgb: "192, 74, 74",
    },
    border: {
      default: "#2A2A2A",
      hover: "#4A2A2A",
    },
  },
  gradients: {
    background: "radial-gradient(ellipse at 20% 50%, #1E1E1E 0%, #141414 60%)",
    hero: "radial-gradient(ellipse 800px 600px at 60% 40%, rgba(192,74,74,0.04) 0%, transparent 70%)",
    section: "radial-gradient(ellipse 800px 500px at 50% 30%, rgba(192,74,74,0.04) 0%, transparent 70%)",
    card: "none",
  },
  shadows: {
    soft: "0 4px 16px rgba(0,0,0,0.3)",
    medium: "0 8px 25px rgba(0,0,0,0.4)",
    glow: "0 8px 25px rgba(192,74,74,0.30)",
  },
  effects: {
    starColorRgb: "232, 232, 232",
    nebula1: "#C04A4A",
    nebula2: "#4A1A1A",
    cursorGlow: "rgba(192,74,74,0.10)",
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
      base: "#0F1620",
      elevated: "#131C28",
      surface: "#172230",
      surfaceHover: "#1C2A3A",
      card: "#172230",
    },
    text: {
      primary: "#E2E8F0",
      secondary: "#94A3B8",
      muted: "#64748B",
    },
    accent: {
      primary: "#7EC8E3",
      secondary: "#8FD4ED",
      glow: "#7EC8E3",
      primaryRgb: "126, 200, 227",
    },
    border: {
      default: "#1E3040",
      hover: "#2E5070",
    },
  },
  gradients: {
    background: "radial-gradient(ellipse at 20% 50%, #172230 0%, #0F1620 60%)",
    hero: "radial-gradient(ellipse 800px 600px at 60% 40%, rgba(126,200,227,0.04) 0%, transparent 70%)",
    section: "radial-gradient(ellipse 800px 500px at 50% 30%, rgba(126,200,227,0.04) 0%, transparent 70%)",
    card: "none",
  },
  shadows: {
    soft: "0 4px 16px rgba(0,0,0,0.2)",
    medium: "0 8px 25px rgba(0,0,0,0.3)",
    glow: "0 8px 25px rgba(126,200,227,0.30)",
  },
  effects: {
    starColorRgb: "226, 232, 240",
    nebula1: "#7EC8E3",
    nebula2: "#1A4A6A",
    cursorGlow: "rgba(126,200,227,0.10)",
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
      base: "#0A1A10",
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
      primary: "#C8A84B",
      secondary: "#D4B45C",
      glow: "#C8A84B",
      primaryRgb: "200, 168, 75",
    },
    border: {
      default: "#1A3A22",
      hover: "#2A5A32",
    },
  },
  gradients: {
    background: "radial-gradient(ellipse at 20% 50%, #102818 0%, #0A1A10 60%)",
    hero: "radial-gradient(ellipse 800px 600px at 60% 40%, rgba(200,168,75,0.04) 0%, transparent 70%)",
    section: "radial-gradient(ellipse 800px 500px at 50% 30%, rgba(200,168,75,0.04) 0%, transparent 70%)",
    card: "none",
  },
  shadows: {
    soft: "0 4px 16px rgba(0,0,0,0.2)",
    medium: "0 8px 25px rgba(0,0,0,0.3)",
    glow: "0 8px 25px rgba(200,168,75,0.30)",
  },
  effects: {
    starColorRgb: "238, 232, 220",
    nebula1: "#C8A84B",
    nebula2: "#1A4A1A",
    cursorGlow: "rgba(200,168,75,0.10)",
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

export const activeTheme: Theme = themes.midnightObservatory;

export function buildCssVars(theme: Theme): string {
  const { colors, effects } = theme;
  const bgBaseCh = hexToChannels(colors.background.base);
  const accentCh = hexToChannels(colors.accent.primary);

  return `:root {
  --bg-base: ${colors.background.base};
  --bg-base-ch: ${bgBaseCh};
  --bg-elevated: ${colors.background.elevated};
  --bg-surface: ${colors.background.surface};
  --bg-surface-hover: ${colors.background.surfaceHover};
  --bg-card: ${colors.background.card};
  --border: ${colors.border.default};
  --border-hover: ${colors.border.hover};
  --text-primary: ${colors.text.primary};
  --text-secondary: ${colors.text.secondary};
  --text-muted: ${colors.text.muted};
  --accent: ${colors.accent.primary};
  --accent-ch: ${accentCh};
  --accent-rgb: ${colors.accent.primaryRgb};
  --accent-hover: ${colors.accent.secondary};
  --accent-muted: rgba(${colors.accent.primaryRgb}, 0.125);
  --nebula1: ${effects.nebula1};
  --nebula2: ${effects.nebula2};
  --star-color: ${effects.starColorRgb};
  --shadow-soft: ${theme.shadows.soft};
  --shadow-medium: ${theme.shadows.medium};
  --shadow-glow: ${theme.shadows.glow};
}`;
}

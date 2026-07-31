"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from "react";
import { themes, activeTheme, applyThemeVars, type Theme } from "@/lib/theme";

type ThemeName = keyof typeof themes;

const STORAGE_KEY = "preferred-theme";
const DEFAULT_THEME: ThemeName = "nordic";

function resolveInitialTheme(): ThemeName {
  if (typeof window === "undefined") return DEFAULT_THEME;
  const stored = localStorage.getItem(STORAGE_KEY) as ThemeName | null;
  return stored && stored in themes ? stored : DEFAULT_THEME;
}

interface ThemeContextValue {
  theme: Theme;
  themeName: ThemeName;
  setTheme: (name: ThemeName) => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: activeTheme,
  themeName: DEFAULT_THEME,
  setTheme: () => {},
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [themeName, setThemeName] = useState<ThemeName>(DEFAULT_THEME);
  const [theme, setThemeObj] = useState<Theme>(activeTheme);

  useEffect(() => {
    const saved = resolveInitialTheme();
    const t = themes[saved];
    setThemeName(saved);
    setThemeObj(t);
    applyThemeVars(t);
  }, []);

  const setTheme = useCallback((name: ThemeName) => {
    const root = document.documentElement;
    root.classList.add("theme-transition");
    const t = themes[name];
    setThemeName(name);
    setThemeObj(t);
    applyThemeVars(t);
    localStorage.setItem(STORAGE_KEY, name);
    window.setTimeout(() => root.classList.remove("theme-transition"), 400);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, themeName, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  return useContext(ThemeContext);
}

"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import { themes, activeTheme, applyThemeVars, type Theme } from "@/lib/theme";

type ThemeName = keyof typeof themes;

interface ThemeContextValue {
  theme: Theme;
  themeName: ThemeName;
  setTheme: (name: ThemeName) => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: activeTheme,
  themeName: "midnightObservatory",
  setTheme: () => {},
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [themeName, setThemeName] = useState<ThemeName>("midnightObservatory");
  const [theme, setThemeObj] = useState<Theme>(activeTheme);

  const setTheme = useCallback((name: ThemeName) => {
    const t = themes[name];
    setThemeName(name);
    setThemeObj(t);
    applyThemeVars(t);
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

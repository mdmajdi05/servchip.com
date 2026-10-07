"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useSyncExternalStore,
} from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggle: () => void;
  setTheme: (t: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  toggle: () => {},
  setTheme: () => {},
});

const THEME_KEY = "servchip-theme";
const SYSTEM_DARK_QUERY = "(prefers-color-scheme: dark)";

/*
 * The theme lives in localStorage, i.e. an *external* store that can change
 * outside React (another browser tab, or the system preference on a first
 * visit). useSyncExternalStore is the hydration-safe way to read it: the
 * server and the first client render both use getServerSnapshot(), then
 * React re-renders with the real value. We therefore get the stored theme as
 * early as possible without a setState() inside an effect (which forces a
 * cascading render) and without a flash of the wrong theme.
 *
 * There is intentionally no pre-hydration inline script: React 19 rejects
 * scripts rendered inside components - "Encountered a script tag while
 * rendering React component".
 */

const listeners = new Set<() => void>();

function notifyListeners() {
  for (const listener of listeners) listener();
}

function readTheme(): Theme {
  const stored = localStorage.getItem(THEME_KEY);
  if (stored === "light" || stored === "dark") return stored;
  return window.matchMedia(SYSTEM_DARK_QUERY).matches ? "dark" : "light";
}

function subscribe(onStoreChange: () => void): () => void {
  listeners.add(onStoreChange);
  // Keep other browser tabs in sync.
  const onStorage = (event: StorageEvent) => {
    if (event.key === null || event.key === THEME_KEY) onStoreChange();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(onStoreChange);
    window.removeEventListener("storage", onStorage);
  };
}

function getSnapshot(): Theme {
  return typeof window === "undefined" ? "light" : readTheme();
}

function getServerSnapshot(): Theme {
  return "light";
}

function writeTheme(theme: Theme) {
  localStorage.setItem(THEME_KEY, theme);
  notifyListeners();
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  // Toggling the class on <html> is a DOM side effect, so it belongs in an
  // effect; it re-runs whenever the resolved theme changes.
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  const toggle = useCallback(() => {
    writeTheme(getSnapshot() === "dark" ? "light" : "dark");
  }, []);

  const setTheme = useCallback((t: Theme) => {
    writeTheme(t);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggle, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);

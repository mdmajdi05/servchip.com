"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useRef,
} from "react";

interface ColorTheme {
  id: string;
  name: string;
  primary: string;
  primaryDark: string;
  primaryGlow: string;
  primarySubtle: string;
  primarySubtle2: string;
  secondary: string;
  accent: string;
  chipLabel: string;
}

const colorThemes: ColorTheme[] = [
  {
    id: "green",
    name: "NVIDIA Green",
    primary: "#5AD000",
    primaryDark: "#4AB800",
    primaryGlow: "rgba(90, 208, 0, 0.25)",
    primarySubtle: "rgba(90, 208, 0, 0.08)",
    primarySubtle2: "rgba(90, 208, 0, 0.15)",
    secondary: "#0088B0",
    accent: "#7B2FBE",
    chipLabel: "NVIDIA",
  },
  {
    id: "blue",
    name: "Intel Blue",
    primary: "#1A73E8",
    primaryDark: "#1557B0",
    primaryGlow: "rgba(26,115,232,0.35)",
    primarySubtle: "rgba(26,115,232,0.10)",
    primarySubtle2: "rgba(26,115,232,0.20)",
    secondary: "#00BCD4",
    accent: "#FF6F00",
    chipLabel: "INTEL",
  },
  {
    id: "red",
    name: "AMD Red",
    primary: "#D32F2F",
    primaryDark: "#B71C1C",
    primaryGlow: "rgba(211,47,47,0.35)",
    primarySubtle: "rgba(211,47,47,0.10)",
    primarySubtle2: "rgba(211,47,47,0.20)",
    secondary: "#FF6D00",
    accent: "#7B1FA2",
    chipLabel: "AMD",
  },
  {
    id: "gold",
    name: "Premium Gold",
    primary: "#F9A825",
    primaryDark: "#F57F17",
    primaryGlow: "rgba(249,168,37,0.35)",
    primarySubtle: "rgba(249,168,37,0.10)",
    primarySubtle2: "rgba(249,168,37,0.20)",
    secondary: "#00BCD4",
    accent: "#8D6E63",
    chipLabel: "GOLD",
  },
  {
    id: "cyan",
    name: "Cyber Cyan",
    primary: "#00BCD4",
    primaryDark: "#00838F",
    primaryGlow: "rgba(0,188,212,0.35)",
    primarySubtle: "rgba(0,188,212,0.10)",
    primarySubtle2: "rgba(0,188,212,0.20)",
    secondary: "#4CAF50",
    accent: "#7B2FBE",
    chipLabel: "CYBER",
  },
  {
    id: "purple",
    name: "Deep Purple",
    primary: "#7B2FBE",
    primaryDark: "#6A1B9A",
    primaryGlow: "rgba(123,47,190,0.35)",
    primarySubtle: "rgba(123,47,190,0.10)",
    primarySubtle2: "rgba(123,47,190,0.20)",
    secondary: "#00BCD4",
    accent: "#FF6D00",
    chipLabel: "PURPLE",
  },
  {
    id: "orange",
    name: "Energy Orange",
    primary: "#E65100",
    primaryDark: "#BF360C",
    primaryGlow: "rgba(230,81,0,0.35)",
    primarySubtle: "rgba(230,81,0,0.10)",
    primarySubtle2: "rgba(230,81,0,0.20)",
    secondary: "#00BCD4",
    accent: "#7B2FBE",
    chipLabel: "ORANGE",
  },
  {
    id: "teal",
    name: "Cool Teal",
    primary: "#00897B",
    primaryDark: "#00695C",
    primaryGlow: "rgba(0,137,123,0.35)",
    primarySubtle: "rgba(0,137,123,0.10)",
    primarySubtle2: "rgba(0,137,123,0.20)",
    secondary: "#00BCD4",
    accent: "#F9A825",
    chipLabel: "TEAL",
  },
];

interface ColorContextType {
  color: string;
  setColor: (id: string) => void;
  colorThemes: ColorTheme[];
  getCurrentTheme: () => ColorTheme | undefined;
}

const ColorContext = createContext<ColorContextType>({
  color: "green",
  setColor: () => {},
  colorThemes,
  getCurrentTheme: () => undefined,
});

export function ColorProvider({ children }: { children: React.ReactNode }) {
  const [color, setColorState] = useState<string>("green");
  const initialized = useRef(false);

  const applyColor = useCallback((colorId: string) => {
    const theme = colorThemes.find((t) => t.id === colorId);
    if (!theme) return;

    const root = document.documentElement.style;
    root.setProperty("--primary", theme.primary);
    root.setProperty("--primary-dark", theme.primaryDark);
    root.setProperty("--primary-glow", theme.primaryGlow);
    root.setProperty("--primary-subtle", theme.primarySubtle);
    root.setProperty("--primary-subtle-2", theme.primarySubtle2);
    root.setProperty("--secondary", theme.secondary);
    root.setProperty("--accent", theme.accent);
    root.setProperty("--hero-primary", theme.primary);
    root.setProperty("--hero-secondary", theme.secondary);
    root.setProperty(
      "--gradient-cta",
      `linear-gradient(135deg, ${theme.primary} 0%, ${theme.secondary} 100%)`,
    );

    document.documentElement.setAttribute("data-color", colorId);
    localStorage.setItem("servchip-color", colorId);
  }, []);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    const stored = localStorage.getItem("servchip-color");
    if (stored && colorThemes.some((t) => t.id === stored)) {
      const id = setTimeout(() => {
        applyColor(stored);
        setColorState(stored);
      }, 0);
      return () => clearTimeout(id);
    }
  }, [applyColor]);

  const setColor = useCallback(
    (colorId: string) => {
      applyColor(colorId);
      setColorState(colorId);
    },
    [applyColor],
  );

  const getCurrentTheme = useCallback(() => {
    return colorThemes.find((t) => t.id === color);
  }, [color]);

  return (
    <ColorContext.Provider
      value={{ color, setColor, colorThemes, getCurrentTheme }}
    >
      {children}
    </ColorContext.Provider>
  );
}

export const useColor = () => useContext(ColorContext);

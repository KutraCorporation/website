"use client";

import * as React from "react";
import Script from "next/script";

type Theme = "dark" | "light";

type ThemeContextValue = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const ThemeContext = React.createContext<ThemeContextValue | null>(null);

export function useTheme() {
  const ctx = React.useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
  attribute?: string;
  disableTransitionOnChange?: boolean;
};

export function ThemeProvider({
  children,
  defaultTheme = "dark",
  storageKey = "theme",
  attribute = "class",
  disableTransitionOnChange = false,
}: ThemeProviderProps) {
  const [theme, setThemeState] = React.useState<Theme>(defaultTheme);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    const stored = localStorage.getItem(storageKey) as Theme | null;
    if (stored === "dark" || stored === "light") {
      setThemeState(stored);
    }
    setMounted(true);
  }, [storageKey]);

  React.useEffect(() => {
    if (!mounted) return;

    const root = document.documentElement;

    if (disableTransitionOnChange) {
      const css = document.createElement("style");
      css.appendChild(
        document.createTextNode(
          "*,*::before,*::after{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}"
        )
      );
      document.head.appendChild(css);

      const _reflow = root.offsetHeight;
      void _reflow;

      requestAnimationFrame(() => {
        document.head.removeChild(css);
      });
    }

    if (attribute === "class") {
      root.classList.remove("dark", "light");
      root.classList.add(theme);
    } else {
      root.setAttribute(attribute, theme);
    }

    localStorage.setItem(storageKey, theme);
  }, [theme, mounted, attribute, storageKey, disableTransitionOnChange]);

  const setTheme = React.useCallback((next: Theme) => {
    setThemeState(next);
  }, []);

  return (
    <>
      <Script id="theme-init" strategy="afterInteractive">
        {`(function(){var t=localStorage.getItem("${storageKey}")||"${defaultTheme}";document.documentElement.classList.add(t)})()`}
      </Script>
      <ThemeContext.Provider value={{ theme, setTheme }}>
        {children}
      </ThemeContext.Provider>
    </>
  );
}
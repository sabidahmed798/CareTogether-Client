"use client";

import * as React from "react";

export type Theme = "light" | "dark";

export const THEME_STORAGE_KEY = "caretogether-theme";

function readStoredTheme(): Theme | null {
  try {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
    return stored === "dark" || stored === "light" ? stored : null;
  } catch {
    return null;
  }
}

function resolveInitialTheme(): Theme {
  return (
    readStoredTheme() ??
    (window.matchMedia?.("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light")
  );
}

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.toggle("dark", theme === "dark");
  root.style.colorScheme = theme;
}

/**
 * Light / dark mode state backed by `localStorage`.
 *
 * The `<html>` class itself is set before the first paint by the inline script
 * in the root layout, so the page never flashes the wrong theme. This hook only
 * has to inform React of the current value — which `useLayoutEffect` does
 * before paint, keeping hydration mismatch-free (server and first client render
 * both start as "light").
 *
 * The re-apply also covers React's dev Strict Mode remount, which resets
 * attributes on `<html>` that React itself did not set.
 *
 * @see https://nextjs.org/docs/app/guides/preventing-flash-before-hydration
 */
export function useTheme() {
  const [theme, setThemeState] = React.useState<Theme>("light");

  React.useLayoutEffect(() => {
    const current = resolveInitialTheme();
    applyTheme(current);
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time, pre-paint sync with the theme the inline script applied to <html>
    setThemeState(current);
  }, []);

  const setTheme = React.useCallback((next: Theme) => {
    applyTheme(next);
    setThemeState(next);
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // Storage can be unavailable (private mode) — the choice still applies for this session.
    }
  }, []);

  const toggleTheme = React.useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark");
  }, [setTheme, theme]);

  return { theme, setTheme, toggleTheme };
}

"use client";

import * as React from "react";

export type AuthUser = {
  name: string;
  email: string;
  role: string;
  initials: string;
};

type AuthContextValue = {
  /** `null` while signed out. */
  user: AuthUser | null;
  login: () => void;
  logout: () => void;
};

/** Demo account used until a real auth provider is wired up. */
const DEMO_USER: AuthUser = {
  name: "Aarav Sharma",
  email: "aarav.sharma@caretogether.org",
  role: "Community Volunteer",
  initials: "AS",
};

const AuthContext = React.createContext<AuthContextValue | null>(null);

/**
 * Minimal client-side auth state so the navbar can render a Login button when
 * signed out and a profile dropdown when signed in.
 *
 * Swap `login`/`logout` for your real session logic (server session, OAuth,
 * `useSession`, server action, …) — the navbar only consumes this contract.
 *
 * State is intentionally in-memory: the server and the first client render both
 * start signed out, which keeps hydration mismatch-free.
 */
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<AuthUser | null>(null);

  const login = React.useCallback(() => setUser(DEMO_USER), []);
  const logout = React.useCallback(() => setUser(null), []);

  const value = React.useMemo(
    () => ({ user, login, logout }),
    [user, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

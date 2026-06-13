import { useMemo, useState, type ReactNode } from "react";
import type { LoginInput, User } from "../models";
import {
  AUTH_TOKEN_KEY,
  AUTH_USER_KEY,
} from "../services/api";
import * as authService from "../services/auth.service";
import { AuthContext } from "./auth-context";

function readStoredUser(): User | null {
  const storedUser = localStorage.getItem(AUTH_USER_KEY);
  const token = localStorage.getItem(AUTH_TOKEN_KEY);

  if (!storedUser || !token) return null;

  try {
    return JSON.parse(storedUser) as User;
  } catch {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(AUTH_USER_KEY);
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(readStoredUser);

  const saveSession = (token: string, authenticatedUser: User) => {
    localStorage.setItem(AUTH_TOKEN_KEY, token);
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(authenticatedUser));
    setUser(authenticatedUser);
  };

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      login: async (input: LoginInput) => {
        const session = await authService.login(input);
        saveSession(session.token, session.user);
      },
      logout: () => {
        localStorage.removeItem(AUTH_TOKEN_KEY);
        localStorage.removeItem(AUTH_USER_KEY);
        setUser(null);
      },
    }),
    [user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

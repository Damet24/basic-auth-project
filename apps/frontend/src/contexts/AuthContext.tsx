import { createContext, useState, useCallback, useContext } from "react";
import type { AuthContextType, Session } from "../types";
import { API_URL, SESSION_KEY } from "../constants";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(() => {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw);

    if (Date.now() > parsed.expires_at) {
      localStorage.removeItem(SESSION_KEY);
      return null;
    }

    return parsed;
  });

  const login = async (email: string, password: string) => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error("Login failed");
    }

    const data = await response.json();

    const newSession: Session = {
      access_token: data.access_token,
      expires_in: data.expires_in,
      expires_at: Date.now() + data.expires_in * 1000,
    };

    setSession(newSession);
    localStorage.setItem(SESSION_KEY, JSON.stringify(newSession));
  };

  const logout = useCallback(() => {
    setSession(null);
    localStorage.removeItem(SESSION_KEY);
  }, []);

  const isAuthenticated = !!session && Date.now() < session.expires_at;

  return (
    <AuthContext.Provider
      value={{
        session,
        login,
        logout,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
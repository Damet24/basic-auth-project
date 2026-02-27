import { createContext, useState, useCallback } from "react";
import type { AuthContextType, Session } from "../types";
import { API_URL, SESSION_KEY } from "../constants";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);

  const login = async (email: string, password: string, clientId: string) => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
        client_id: clientId,
      }),
    });

    if (!response.ok) {
      throw new Error("Login failed");
    }

    const data = await response.json();

    const newSession: Session = {
      access_token: data.access_token,
      expires_in: data.expires_in,
    };

    setSession(newSession);
    localStorage.setItem(SESSION_KEY, JSON.stringify(newSession));
  };

  const logout = useCallback(() => {
    setSession(null);
    localStorage.removeItem(SESSION_KEY);
  }, []);

  const isAuthenticated = !!session?.access_token;

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

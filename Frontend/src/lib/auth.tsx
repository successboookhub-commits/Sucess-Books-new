import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { api } from "./api";

export type AdminUser = {
  email: string;
  role: string;
  name: string;
};

interface AuthContextType {
  token: string | null;
  adminUser: AdminUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (token: string, user: AdminUser) => void;
  logout: () => void;
  sendOtp: (email: string) => Promise<{ success: boolean; message: string; email?: string }>;
  verifyOtp: (email: string, otp: string) => Promise<{ success: boolean; token: string; user: AdminUser; message?: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const TOKEN_KEY = "sbh_admin_token";
const USER_KEY = "sbh_admin_user";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Initialize session from localStorage on mount
  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        const storedToken = localStorage.getItem(TOKEN_KEY);
        const storedUser = localStorage.getItem(USER_KEY);

        if (storedToken && storedUser) {
          setIsLoading(true);
          setToken(storedToken);
          setAdminUser(JSON.parse(storedUser));
          // Verify with backend silently in background
          api.getAdminMe(storedToken)
            .then((res) => {
              if (res?.user) {
                setAdminUser(res.user);
              }
            })
            .catch(() => {
              // If expired or invalid, clear
              logout();
            })
            .finally(() => {
              setIsLoading(false);
            });
          return;
        }
      }
    } catch {
      // ignore JSON parse error
    }
    setIsLoading(false);
  }, []);

  const login = (newToken: string, newUser: AdminUser) => {
    setToken(newToken);
    setAdminUser(newUser);
    if (typeof window !== "undefined") {
      localStorage.setItem(TOKEN_KEY, newToken);
      localStorage.setItem(USER_KEY, JSON.stringify(newUser));
    }
  };

  const logout = () => {
    setToken(null);
    setAdminUser(null);
    if (typeof window !== "undefined") {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
    }
  };

  const sendOtp = async (email: string) => {
    return await api.sendAdminOtp(email);
  };

  const verifyOtp = async (email: string, otp: string) => {
    const res = await api.verifyAdminOtp(email, otp);
    if (res.success && res.token && res.user) {
      login(res.token, res.user);
    }
    return res;
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        adminUser,
        isAuthenticated: Boolean(token),
        isLoading,
        login,
        logout,
        sendOtp,
        verifyOtp,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAdminAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAdminAuth must be used within an AuthProvider");
  }
  return context;
}

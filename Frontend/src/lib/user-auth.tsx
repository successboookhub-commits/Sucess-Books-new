import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { api, type UserProfile } from "./api";
import { toast } from "sonner";

const USER_TOKEN_KEY = "sbh_user_token";
const USER_DATA_KEY = "sbh_user_data";

interface UserAuthContextType {
  user: UserProfile | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  loginModalOpen: boolean;
  openLoginModal: () => void;
  closeLoginModal: () => void;
  sendOtp: (email: string) => Promise<{ success: boolean; message: string; isExistingUser?: boolean }>;
  verifyOtp: (email: string, otp: string, name?: string, phone?: string) => Promise<void>;
  updateProfile: (data: { name?: string; phone?: string; avatar?: string }) => Promise<void>;
  refreshProfile: () => Promise<void>;
  logout: () => void;
}

const UserAuthContext = createContext<UserAuthContextType | null>(null);

export function UserAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  // Initialize session from localStorage
  useEffect(() => {
    try {
      const storedToken = localStorage.getItem(USER_TOKEN_KEY);
      const storedUser = localStorage.getItem(USER_DATA_KEY);

      if (storedToken) {
        setToken(storedToken);
        if (storedUser) {
          try {
            setUser(JSON.parse(storedUser));
          } catch {
            // invalid json
          }
        }
        // Verify with backend silently
        api.getUserProfile(storedToken)
          .then(res => {
            if (res.user) {
              setUser(res.user);
              localStorage.setItem(USER_DATA_KEY, JSON.stringify(res.user));
            }
          })
          .catch(() => {
            // token expired
            localStorage.removeItem(USER_TOKEN_KEY);
            localStorage.removeItem(USER_DATA_KEY);
            setToken(null);
            setUser(null);
          })
          .finally(() => setIsLoading(false));
      } else {
        setIsLoading(false);
      }
    } catch {
      setIsLoading(false);
    }
  }, []);

  const openLoginModal = () => setLoginModalOpen(true);
  const closeLoginModal = () => setLoginModalOpen(false);

  const sendOtp = async (email: string) => {
    return await api.sendUserOtp(email);
  };

  const verifyOtp = async (email: string, otp: string, name?: string, phone?: string) => {
    const res = await api.verifyUserOtp(email, otp, name, phone);
    if (res.success && res.token) {
      setToken(res.token);
      setUser(res.user);
      localStorage.setItem(USER_TOKEN_KEY, res.token);
      localStorage.setItem(USER_DATA_KEY, JSON.stringify(res.user));
      closeLoginModal();
      toast.success(res.message || `Welcome back, ${res.user.name || "Book Lover"}!`);
    }
  };

  const refreshProfile = async () => {
    if (!token) return;
    try {
      const res = await api.getUserProfile(token);
      if (res.user) {
        setUser(res.user);
        localStorage.setItem(USER_DATA_KEY, JSON.stringify(res.user));
      }
    } catch {
      // keep existing
    }
  };

  const updateProfile = async (data: { name?: string; phone?: string; avatar?: string }) => {
    if (!token) throw new Error("Please login first");
    const res = await api.updateUserProfile(token, data);
    if (res.success && res.user) {
      setUser(res.user);
      localStorage.setItem(USER_DATA_KEY, JSON.stringify(res.user));
      toast.success("Profile updated successfully!");
    }
  };

  const logout = () => {
    localStorage.removeItem(USER_TOKEN_KEY);
    localStorage.removeItem(USER_DATA_KEY);
    setToken(null);
    setUser(null);
    toast.info("You have signed out.");
  };

  return (
    <UserAuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: Boolean(token && user),
        isLoading,
        loginModalOpen,
        openLoginModal,
        closeLoginModal,
        sendOtp,
        verifyOtp,
        updateProfile,
        refreshProfile,
        logout
      }}
    >
      {children}
    </UserAuthContext.Provider>
  );
}

export function useUserAuth() {
  const context = useContext(UserAuthContext);
  if (!context) {
    throw new Error("useUserAuth must be used within a UserAuthProvider");
  }
  return context;
}

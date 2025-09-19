import { createContext, useContext, useState, useEffect } from "react";
import { login as apiLogin } from "@/lib/api/auth";
import { apiGet } from "@/lib/api/restClient";
import type { UserType } from "@/types/UserType";

type AuthContextType = {
  isAuthenticated: boolean;
  user: UserType | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Load user on mount and if access token changes
  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem("accessToken");
      console.log("Found token in storage:", !!token);

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        console.log("Attempting to restore session with token");
        // Get user ID from localStorage
        const userId = localStorage.getItem("userId");
        if (userId) {
          const profile = await apiGet<UserType>(`/users/${userId}`);
          console.log("Profile loaded from /users/{id}:", profile);
          setUser(profile);
          setIsAuthenticated(true);
        } else {
          throw new Error("No user ID available");
        }
      } catch (error) {
        console.error("Failed to load user profile:", error);
        // Only clear tokens if it's an authentication error
        if (error.response?.status === 401) {
          console.log("Got 401, clearing tokens");
          localStorage.removeItem("accessToken");
          localStorage.removeItem("userId");
        }
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      console.log("Attempting login with:", { email });
      const response = await apiLogin(email, password);
      console.log("Login response:", response);

      // Store ALL relevant fields from login response
      const { token, userId } = response;
      localStorage.setItem("accessToken", token);
      localStorage.setItem("userId", userId); // Store userId for session restore

      console.log("Stored token and userId:", { userId });

      if (!userId) {
        throw new Error("User ID not found in login response");
      }

      const profile = await apiGet<UserType>(`/users/${userId}`);
      console.log("Profile data after login:", profile);

      setUser(profile);
      setIsAuthenticated(true);
      return profile;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userId");
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        login,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

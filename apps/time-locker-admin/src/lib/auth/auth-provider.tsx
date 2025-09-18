import { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
} from "firebase/auth";
import type { User } from "firebase/auth";
import { auth } from "@/lib/auth/firebaseConfig";
import { useQuery } from "@tanstack/react-query";
import { apiGet } from "@/lib/api/restClient";
import type { FetchUserType } from "@/types/UserType";

type AuthContextType = {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
  userProfileData: FetchUserType | undefined;
  userProfileLoading: boolean;
  userProfileError: Error | null;
};

const AuthContext = createContext<AuthContextType | null>(null);

// Move this inside the provider component to avoid circular dependencies
const getUser = async (endpoint: string) => apiGet<FetchUserType>(endpoint);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setIsAuthenticated(!!firebaseUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const {
    data: userProfileData,
    isLoading: userProfileLoading,
    error: userProfileError,
  } = useQuery({
    queryKey: ["user", user?.uid],
    queryFn: () => getUser(`/users/${user?.uid}`),
    enabled: !!user, // Only run when user exists
    staleTime: 5 * 60 * 1000,
  });

  const login = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        login,
        logout,
        loading,
        userProfileData,
        userProfileLoading,
        userProfileError: userProfileError as Error | null,
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

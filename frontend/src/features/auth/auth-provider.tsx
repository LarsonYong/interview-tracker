import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import { AuthContext } from "./auth-context";
import { getCurrentUser, loginUser } from "./api";
import { clearToken, getToken, setToken } from "./auth-storage";
import type { CurrentUser, LoginInput } from "./types";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<CurrentUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshMe = useCallback(async () => {
    const token = getToken();

    if (!token) {
      setUser(null);
      return;
    }

    const response = await getCurrentUser();
    setUser(response.user);
  }, []);

  useEffect(() => {
    async function init() {
      try {
        await refreshMe();
      } catch {
        clearToken();
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    }

    init();
  }, [refreshMe]);

  const login = useCallback(async (input: LoginInput) => {
    const response = await loginUser(input);
    setToken(response.token);
    setUser(response.user);
  }, []);

  const logout = useCallback(() => {
    clearToken();
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({
      user,
      isLoading,
      isAuthenticated: Boolean(user),
      login,
      logout,
      refreshMe,
    }),
    [user, isLoading, login, logout, refreshMe]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
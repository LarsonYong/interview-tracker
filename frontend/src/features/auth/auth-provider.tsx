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
import { logger } from "../../lib/logger";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<CurrentUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshMe = useCallback(async () => {
    logger.debug("Auth", "refreshMe started");
    const token = getToken();

    if (!token) {
      logger.debug("Auth", "refreshMe skipped: no token found");
      setUser(null);
      return;
    }

    const response = await getCurrentUser();
    setUser(response.user);
    logger.info("Auth", "refreshMe succeeded", {
      userId: response.user.id,
    });
  }, []);

  useEffect(() => {
    async function init() {
      logger.debug("Auth", "init started");

      try {
        await refreshMe();
      } catch(error) {
        logger.warn("Auth", "init failed, clearing token", error)
        clearToken();
        setUser(null);
      } finally {
        setIsLoading(false);
        logger.debug("Auth", "init finished");
      }
    }

    init();
  }, [refreshMe]);

  const login = useCallback(async (input: LoginInput) => {
    logger.info("Auth", "login started")
    try {
      const response = await loginUser(input);
      setToken(response.token);

      await refreshMe();

      logger.info("Auth", "login succeeded")
    }catch(error) {
      logger.error("Auth", "login failed", error)
      throw error;
    }

  }, [refreshMe]);

  const logout = useCallback(() => {
    logger.info("Auth", "logout", {
      userId: user?.id,
    })
    clearToken();
    setUser(null);

  }, [user]);

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
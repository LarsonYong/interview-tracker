import { getToken } from "../features/auth/auth-storage";
import { logger } from "../lib/logger";

const API_BASE_URL = "http://localhost:3000";

export async function apiFetch<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getToken();
  const method = options.method ?? "GET";

  const headers = new Headers(options.headers);

  if (options.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  logger.debug("API", `${method} ${path} request started`);
  const startedAt = Date.now();

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
  });

  const contentType = response.headers.get("content-type");
  const isJson = contentType?.includes("application/json");
  const data = isJson ? await response.json() : null;

  if (!response.ok) {
    const duration = Date.now() - startedAt;
    const message =
      data?.message || data?.error || "Something went wrong";

    logger.error("API", `${method} ${path} request failed`, {
      duration,
      status: response.status,
      message,
      data,
    });

    throw new Error(message);
  }

  const duration = Date.now() - startedAt;

  logger.info("API", `${method} ${path} request succeeded`, {
    duration,
    status: response.status,
  });

  return data as T;
}
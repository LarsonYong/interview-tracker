import { getToken } from "../features/auth/auth-storage";
import { logger } from "../lib/logger";

const API_BASE_URL = "http://localhost:3000";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function getStringField(
  obj: Record<string, unknown>,
  key: string
): string | null {
  const value = obj[key];
  return typeof value === "string" ? value : null;
}

function extractValidationMessage(data: Record<string, unknown>): string | null {
  const details = data.details;
  if (!isRecord(details)) return null;

  const fieldErrors = details.fieldErrors;
  if (!isRecord(fieldErrors)) return null;

  for (const value of Object.values(fieldErrors)) {
    if (Array.isArray(value) && typeof value[0] === "string") {
      return value[0];
    }
  }

  return null;
}

function extractErrorMessage(data: unknown): string {
  if (!isRecord(data)) {
    return "Something went wrong";
  }

  const directMessage = getStringField(data, "message");
  if (directMessage) {
    return directMessage;
  }

  const messageValue = data.message;
  if (isRecord(messageValue)) {
    const nestedMessage = getStringField(messageValue, "message");
    if (nestedMessage) {
      return nestedMessage;
    }
  }

  const directError = getStringField(data, "error");
  if (directError) {
    return directError;
  }

  const errorValue = data.error;
  if (isRecord(errorValue)) {
    const nestedErrorMessage = getStringField(errorValue, "message");
    if (nestedErrorMessage) {
      return nestedErrorMessage;
    }
  }

  const validationMessage = extractValidationMessage(data);
  if (validationMessage) {
    return validationMessage;
  }

  return "Something went wrong";
}

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
    const message = extractErrorMessage(data);

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
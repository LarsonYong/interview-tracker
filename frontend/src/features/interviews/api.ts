import { getToken } from "../auth/auth-storage";
import type { Interview } from "./types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function getMyInterviews(): Promise<Interview[]> {
  const token = getToken();

  const response = await fetch(`${API_BASE_URL}/interviews`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch interviews");
  }

  return response.json();
}
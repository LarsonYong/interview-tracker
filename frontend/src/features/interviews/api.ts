import { apiFetch } from "../../lib/api";
import type { Interview } from "./types";

export async function getMyInterviews(): Promise<Interview[]> {
  return apiFetch<Interview[]>("/api/interviews", {
    method: "GET",
  });
}
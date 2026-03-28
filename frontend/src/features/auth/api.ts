import { apiFetch } from "../../lib/api";
import type {
  CurrentUserResponse,
  LoginInput,
  LoginResponse,
} from "./types";

export async function loginUser(input: LoginInput) {
  return apiFetch<LoginResponse>("/api/users/login", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export async function getCurrentUser() {
  return apiFetch<CurrentUserResponse>("/api/users/me", {
    method: "GET",
  });
}
import { z } from "zod";

export const createInterviewSchema = z.object({
  company: z.string().trim().min(1, "company is required"),
  role: z.string().trim().min(1, "role is required"),
  location: z.string().trim().optional(),
  notes: z.string().trim().optional(),
});

export const updateInterviewSchema = z.object({
  company: z.string().trim().min(1).optional(),
  role: z.string().trim().min(1).optional(),
  location: z.string().trim().optional(),
  notes: z.string().trim().optional(),
  status: z
    .enum([
      "APPLIED",
      "PHONE_SCREEN",
      "TECH_SCREEN",
      "ONSITE",
      "OFFER",
      "REJECTED",
    ])
    .optional(),
});
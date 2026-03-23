import { z } from "zod";
import { InterviewStatus } from "@prisma/client";


export const createInterviewSchema = z.object({
  company: z.string().trim().min(1, "company is required"),
  role: z.string().trim().min(1, "role is required"),
  stage: z.string().trim().optional(),
  status: z.nativeEnum(InterviewStatus).optional(),
  jobUrl: z.url("jobUrl must be a valid URL").optional(),
  salary: z.number().int().positive().optional(),
  notes: z.string().optional(),
  interviewDate: z.string().datetime().optional(),
});

export type CreateInterviewInput = z.infer<typeof createInterviewSchema>;

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
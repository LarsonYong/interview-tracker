import { z } from "zod";
import { InterviewStatus, InterviewStage } from "@prisma/client";


export const createInterviewSchema = z.object({
  company: z.string().trim().min(1, "company is required"),
  role: z.string().trim().min(1, "role is required"),
  stage: z.nativeEnum(InterviewStage).optional(),
  status: z.nativeEnum(InterviewStatus).optional(),
  jobUrl: z.url("jobUrl must be a valid URL").nullable().optional(),
  salary: z.number().int().positive().optional(),
  notes: z.string().optional(),
  interviewDate: z.string().datetime().optional(),
});

export type CreateInterviewInput = z.infer<typeof createInterviewSchema>;

export const updateInterviewParamsSchema = z.object({
  id: z.string().min(1, "interview id is required"),
});

export const updateInterviewBodySchema = z
  .object({
    company: z.string().trim().min(1, "company is required").optional(),
    role: z.string().trim().min(1, "role is required").optional(),
    stage: z.nativeEnum(InterviewStage).optional(),
    status: z.nativeEnum(InterviewStatus).optional(),
    jobUrl: z.string().trim().url("jobUrl must be a valid url").optional(),
    salary: z.number().int().nonnegative().optional(),
    notes: z.string().trim().optional(),
    interviewDate: z.string().datetime().nullable().optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided",
  });


export type UpdateInterviewBodyInput = z.infer<typeof updateInterviewBodySchema>;
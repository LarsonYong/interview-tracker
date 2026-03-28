export type InterviewStage =
  | "APPLIED"
  | "PHONE"
  | "TECH_SCREEN"
  | "ONSITE"
  | "FINAL"
  | "HR"
  | "OFFER"
  | "REJECTED";

export type InterviewStatus =
  | "active"
  | "passed"
  | "rejected"
  | "offer";

export interface Interview {
  id: string;
  userId: number;
  company: string;
  role: string;
  stage?: InterviewStage | null;
  status: InterviewStatus;
  jobUrl?: string | null;
  salary?: number | null;
  notes?: string | null;
  interviewDate?: string | null;
  createdAt: string;
  updatedAt: string;
}
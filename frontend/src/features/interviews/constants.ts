import type { InterviewStage, InterviewStatus } from "./types.tsx";

export const stageLabelMap: Record<InterviewStage, string> = {
  APPLIED: "Applied",
  PHONE: "Phone",
  TECH_SCREEN: "Tech Screen",
  ONSITE: "Onsite",
  FINAL: "Final",
  HR: "HR",
  OFFER: "Offer",
  REJECTED: "Rejected",
};

export const statusLabelMap: Record<InterviewStatus, string> = {
  active: "Active",
  passed: "Passed",
  rejected: "Rejected",
  offer: "Offer",
};
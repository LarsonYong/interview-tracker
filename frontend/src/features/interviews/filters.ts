import type { InterviewStage, InterviewStatus } from "./types";

export type StageFilter = "ALL" | InterviewStage;
export type StatusFilter = "ALL" | InterviewStatus;

export const stageOptions: { label: string; value: StageFilter }[] = [
  { label: "All", value: "ALL" },
  { label: "Applied", value: "APPLIED" },
  { label: "Phone", value: "PHONE" },
  { label: "Tech Screen", value: "TECH_SCREEN" },
  { label: "Onsite", value: "ONSITE" },
  { label: "Final", value: "FINAL" },
  { label: "HR", value: "HR" },
  { label: "Offer", value: "OFFER" },
  { label: "Rejected", value: "REJECTED" },
];

export const statusOptions: { label: string; value: StatusFilter }[] = [
  { label: "All", value: "ALL" },
  { label: "Active", value: "active" },
  { label: "Passed", value: "passed" },
  { label: "Rejected", value: "rejected" },
  { label: "Offer", value: "offer" },
];
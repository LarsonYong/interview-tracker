import type { Interview } from "./types";

export function getInterviewStats(interviews: Interview[]) {
  const total = interviews.length;
  const active = interviews.filter((i) => i.status === "active").length;
  const offers = interviews.filter((i) => i.status === "offer").length;
  const rejected = interviews.filter((i) => i.status === "rejected").length;

  return { total, active, offers, rejected };
}
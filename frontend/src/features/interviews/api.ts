import { apiFetch } from "../../lib/api";
import type { Interview } from "./types";
import type { InterviewFormValues } from "../../components/interviews/InterviewForm";

export async function getMyInterviews(): Promise<Interview[]> {
  return apiFetch<Interview[]>("/api/interviews", {
    method: "GET",
  });
}

function emptyToUndefined(value?: string) {
  if (value == null) return undefined;

  const trimmed = value.trim();
  return trimmed === "" ? undefined : trimmed;
}

function toOptionalNumber(value?: string | number) {
  if (value === "" || value == null) return undefined;

  const parsed = Number(value);
  return Number.isNaN(parsed) ? undefined : parsed;
}

function dateToOptionalIso(value?: string) {
  if (value == null) return undefined;

  const trimmed = value.trim();
  if (trimmed === "") return undefined;

  // 前端 <input type="date" /> 一般会给 "YYYY-MM-DD"
  // 这里补一个中午时间，再转成 ISO，避免时区更容易把日期顶到前一天
  const parsed = new Date(`${trimmed}T12:00:00`);

  if (Number.isNaN(parsed.getTime())) {
    return undefined;
  }

  return parsed.toISOString();
}

export function buildInterviewPayload(values: InterviewFormValues) {
  return {
    company: values.company.trim(),
    role: values.role.trim(),
    stage: emptyToUndefined(values.stage),
    status: values.status.trim(),
    jobUrl: emptyToUndefined(values.jobUrl),
    notes: emptyToUndefined(values.notes),
    interviewDate: dateToOptionalIso(values.interviewDate),
    salary: toOptionalNumber(values.salary),
  };
}

export async function updateInterview(
  id: string,
  values: InterviewFormValues
): Promise<Interview> {
  return apiFetch<Interview>(`/api/interviews/${id}`, {
    method: "PATCH",
    body: JSON.stringify(buildInterviewPayload(values)),
  });
}

export async function createInterview(
  values: InterviewFormValues
): Promise<Interview> {
  return apiFetch<Interview>("/api/interviews", {
    method: "POST",
    body: JSON.stringify(buildInterviewPayload(values)),
  });
}

export async function deleteInterview(
    id:string
): Promise<void> {
  await apiFetch<void>(`/api/interviews/${id}`, {
    method: "DELETE",
  })
}
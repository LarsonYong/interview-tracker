import { apiFetch } from "../../lib/api";
import type { Interview } from "./types";
import type { InterviewFormValues } from "../../components/interviews/InterviewForm";

export async function getMyInterviews(): Promise<Interview[]> {
  return apiFetch<Interview[]>("/api/interviews", {
    method: "GET",
  });
}

function buildInterviewPayload(values: InterviewFormValues) {
    return {
        company: values.company,
        role: values.role,
        stage: values.stage,
        status: values.status,
        interviewDate: values.interviewDate
        ? new Date(values.interviewDate).toISOString()
        : null,
        salary: values.salary ? Number(values.salary) : null,
        jobUrl: values.jobUrl || null,
        notes: values.notes || null,
    }
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
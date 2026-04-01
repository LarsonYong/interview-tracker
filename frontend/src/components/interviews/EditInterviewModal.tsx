import type { Interview } from "../../features/interviews/types";
import InterviewForm, { type InterviewFormValues } from "./InterviewForm";
import BaseModal from "../ui/BaseModal";
import ModalHeader from "../ui/ModalHeader";
import ModalBody from "../ui/ModalBody";

type EditInterviewModalProps = {
  interview: Interview | null;
  open: boolean;
  onClose: () => void;
  onSubmit?: (values: InterviewFormValues) => Promise<void> | void;
  isSubmitting?: boolean;
  errorMessage?: string | null;
};

function isoToDateInput(value?: string | null) {
  if (!value) return "";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "";

  return date.toISOString().slice(0, 10);
}

function toFormValues(interview: Interview): InterviewFormValues {
  return {
    company: interview.company ?? "",
    role: interview.role ?? "",
    stage: interview.stage ?? "APPLIED",
    status: interview.status ?? "active",
    interviewDate: isoToDateInput(interview.interviewDate),
    salary: interview.salary != null ? String(interview.salary) : "",
    jobUrl: interview.jobUrl ?? "",
    notes: interview.notes ?? "",
  };
}

export default function EditInterviewModal({
  interview,
  open,
  onClose,
  onSubmit,
  isSubmitting = false,
  errorMessage = null,
}: EditInterviewModalProps) {
  if (!interview) return null;

  async function handleSubmit(values: InterviewFormValues) {
    await onSubmit?.(values);
  }

  return (
    <BaseModal open={open} onClose={onClose} maxWidthClassName="max-w-6xl">
      <ModalHeader title="Edit Interview" />

      <ModalBody>
        <InterviewForm
          initialValues={toFormValues(interview)}
          submitLabel={isSubmitting ? "Saving..." : "Save Changes"}
          onCancel={onClose}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          errorMessage={errorMessage}
        />
      </ModalBody>
    </BaseModal>
  );
}
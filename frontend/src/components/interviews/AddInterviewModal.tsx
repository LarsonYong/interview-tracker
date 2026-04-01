import InterviewForm, { type InterviewFormValues } from "./InterviewForm";
import BaseModal from "../ui/BaseModal";
import ModalHeader from "../ui/ModalHeader";
import ModalBody from "../ui/ModalBody";

type AddInterviewModalProps = {
  open: boolean;
  onClose: () => void;
  onSubmit?: (values: InterviewFormValues) => Promise<void> | void;
  isSubmitting?: boolean;
  errorMessage?: string | null;
};

const emptyValues: InterviewFormValues = {
  company: "",
  role: "",
  stage: "APPLIED",
  status: "active",
  interviewDate: "",
  salary: "",
  jobUrl: "",
  notes: "",
};

export default function AddInterviewModal({
  open,
  onClose,
  onSubmit,
  isSubmitting = false,
  errorMessage = null,
}: AddInterviewModalProps) {
  async function handleSubmit(values: InterviewFormValues) {
    await onSubmit?.(values);
  }

  return (
    <BaseModal open={open} onClose={onClose} maxWidthClassName="max-w-6xl">
      <ModalHeader title="Add Interview" />

      <ModalBody>
        <InterviewForm
          initialValues={emptyValues}
          submitLabel={isSubmitting ? "Creating..." : "Create Interview"}
          onCancel={onClose}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          errorMessage={errorMessage}
        />
      </ModalBody>
    </BaseModal>
  );
}
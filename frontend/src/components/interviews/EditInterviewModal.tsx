import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";

import type { Interview } from "../../features/interviews/types";
import InterviewForm, { type InterviewFormValues } from "./InterviewForm";

type EditInterviewModalProps = {
  interview: Interview | null;
  open: boolean;
  onClose: () => void;
  onSubmit?: (values: InterviewFormValues) => void;
};

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

function toFormValues(interview: Interview): InterviewFormValues {
  return {
    company: interview.company ?? "",
    role: interview.role ?? "",
    stage: interview.stage ?? "APPLIED",
    status: interview.status ?? "active",
    interviewDate: interview.interviewDate
      ? toDateTimeLocal(interview.interviewDate)
      : "",
    salary: interview.salary != null ? String(interview.salary) : "",
    jobUrl: interview.jobUrl ?? "",
    notes: interview.notes ?? "",
  };
}

function toDateTimeLocal(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";

  const pad = (n: number) => String(n).padStart(2, "0");

  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());

  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

export default function EditInterviewModal({
  interview,
  open,
  onClose,
  onSubmit,
}: EditInterviewModalProps) {
  if (typeof document === "undefined") return null;
  if (!interview) return null;

  function handleSubmit(values: InterviewFormValues) {
    onSubmit?.(values);
  }

  

  return createPortal(
    <AnimatePresence mode="wait">
      {open ? (
        <div className="fixed inset-0 z-999">
          <motion.button
            type="button"
            aria-label="Close modal overlay"
            onClick={onClose}
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(8px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.18, ease: "linear" }}
            className="absolute inset-0 bg-black/6"
          />

          <div className="pointer-events-none absolute inset-0 flex items-center justify-center p-6">
            <div className="pointer-events-auto w-full max-w-6xl origin-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.97, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98, y: 4 }}
                transition={{ duration: 0.22, ease }}
                className="rounded-[28px] border border-white/70 bg-white/88 p-8 text-left shadow-[0_16px_48px_rgba(15,23,42,0.08)] md:p-10"
              >
                <div className="flex items-center justify-center border-b border-white/55 pb-6">
                  <motion.h2
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-2xl font-semibold tracking-tight text-slate-900"
                  >
                    Edit Interview
                  </motion.h2>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.985 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 4, scale: 0.995 }}
                  transition={{
                    duration: 0.2,
                    delay: 0.14,
                    ease,
                  }}
                  className="origin-top"
                >
                  <div className="pt-7">
                    <InterviewForm
                      initialValues={toFormValues(interview)}
                      submitLabel="Save Changes"
                      onCancel={onClose}
                      onSubmit={handleSubmit}
                    />
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      ) : null}
    </AnimatePresence>,
    document.body
  );
}
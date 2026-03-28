import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";

import InterviewForm, { type InterviewFormValues } from "./InterviewForm";

type AddInterviewModalProps = {
  open: boolean;
  onClose: () => void;
  onSubmit?: (values: InterviewFormValues) => void;
};

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

const initialValues: InterviewFormValues = {
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
}: AddInterviewModalProps) {
  if (typeof document === "undefined") return null;

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
                <div className="flex items-start justify-between gap-6 border-b border-white/55 pb-6">
                  <div className="min-w-0 space-y-2">
                    <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-slate-400">
                      New Interview
                    </p>

                    <div className="space-y-1">
                      <h2 className="truncate text-2xl font-semibold tracking-tight text-slate-900">
                        Add Interview
                      </h2>

                      <p className="text-sm text-slate-600">
                        Create a new interview entry.
                      </p>
                    </div>
                  </div>

                  <div className="shrink-0">
                    <button
                      type="button"
                      onClick={onClose}
                      className="inline-flex h-11 items-center justify-center rounded-2xl border border-white/55 bg-white/72 px-4 text-sm font-medium text-slate-700 transition hover:bg-white hover:text-slate-900"
                    >
                      Close
                    </button>
                  </div>
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
                      initialValues={initialValues}
                      submitLabel="Save Interview"
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
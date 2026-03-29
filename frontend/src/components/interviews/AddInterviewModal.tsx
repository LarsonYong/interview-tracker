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
          {/* Overlay */}
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
              {/* Modal */}
              <motion.div
                initial={{ opacity: 0, scale: 0.97, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98, y: 4 }}
                transition={{ duration: 0.22, ease }}
                className="rounded-[28px] border border-white/70 bg-white/88 p-8 text-left shadow-[0_16px_48px_rgba(15,23,42,0.08)] md:p-10"
              >
                <div className="mt-8 flex items-center justify-center border-b border-white/55 pb-7">
                <motion.h2
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-[28px] font-semibold tracking-tight text-slate-900"
                >
                    Add Interview
                </motion.h2>
                </div>

                {/* Content */}
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
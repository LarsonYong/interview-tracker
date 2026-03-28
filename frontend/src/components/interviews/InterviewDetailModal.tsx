import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";

import type { Interview } from "../../features/interviews/types";
import StatusBadge from "./StatusBadge";

type InterviewDetailModalProps = {
  interview: Interview | null;
  open: boolean;
  onClose: () => void;
};

const spring = {
  type: "spring" as const,
  stiffness: 420,
  damping: 40,
  mass: 0.8,
};

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function InterviewDetailModal({
  interview,
  open,
  onClose,
}: InterviewDetailModalProps) {
  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence mode="wait">
      {open && interview ? (
        <div className="fixed inset-0 z-999">
          <motion.button
            type="button"
            aria-label="Close modal overlay"
            onClick={onClose}
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(8px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.14, ease: "linear" }}
            className="absolute inset-0 bg-black/8"
          />

          <div className="pointer-events-none absolute inset-0 flex items-center justify-center p-6">
            <div className="pointer-events-auto w-full max-w-6xl origin-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.97, y: 8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98, y: 4 }}
                transition={{ duration: 0.18, ease }}
                className="rounded-[28px] border border-white/60 bg-white/78 p-8 text-left shadow-[0_8px_24px_rgba(15,23,42,0.06)] md:p-10"
              >
                <motion.div
                  layout
                  className="flex items-start justify-between gap-6 border-b border-white/45 pb-6"
                >
                  <motion.div layout className="min-w-0 space-y-2">
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.12, delay: 0.03, ease }}
                      className="text-[11px] font-medium uppercase tracking-[0.2em] text-slate-400"
                    >
                      Interview
                    </motion.p>

                    <motion.div layout className="space-y-1">
                      <motion.h2
                        layoutId={`interview-company-${interview.id}`}
                        transition={{ layout: spring }}
                        className="truncate text-2xl font-semibold tracking-tight text-slate-900"
                      >
                        {interview.company}
                      </motion.h2>

                      <motion.p
                        layoutId={`interview-role-${interview.id}`}
                        transition={{ layout: spring }}
                        className="text-sm text-slate-600"
                      >
                        {interview.role}
                      </motion.p>
                    </motion.div>
                  </motion.div>

                  <motion.div layout className="flex items-start gap-3">
                    <motion.div
                      layoutId={`interview-status-${interview.id}`}
                      transition={{ layout: spring }}
                      className="shrink-0"
                    >
                      <StatusBadge status={interview.status} />
                    </motion.div>
                  </motion.div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.985 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 4, scale: 0.995 }}
                  transition={{
                    duration: 0.2,
                    delay: 0.2,
                    ease,
                  }}
                  className="origin-top"
                >
                  <div className="space-y-8 pt-7">
                    <div className="grid grid-cols-1 gap-x-10 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
                      <InfoRow label="Stage" value={formatStage(interview.stage)} />
                      <InfoRow
                        label="Interview Date"
                        value={formatDateTime(interview.interviewDate)}
                        muted={!interview.interviewDate}
                      />
                      <InfoRow
                        label="Salary"
                        value={formatSalary(interview.salary)}
                        muted={interview.salary == null}
                      />
                      <InfoRow
                        label="Job Link"
                        value={formatUrlLabel(interview.jobUrl)}
                        muted={!interview.jobUrl}
                      />
                      <InfoRow
                        label="Created"
                        value={formatDateTime(interview.createdAt)}
                      />
                      <InfoRow
                        label="Last Updated"
                        value={formatDateTime(interview.updatedAt)}
                      />
                    </div>

                    <div className="space-y-2">
                      <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-slate-400">
                        Notes
                      </p>

                      <div className="px-0.5 py-0.5">
                        <p className="whitespace-pre-wrap text-sm leading-6 text-slate-600">
                          {interview.notes?.trim() ? interview.notes : "No notes yet."}
                        </p>
                      </div>
                    </div>

                    {interview.jobUrl ? (
                      <div className="space-y-2">
                        <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-slate-400">
                          Open Job Posting
                        </p>

                        <a
                          href={interview.jobUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex max-w-full items-center text-sm font-medium text-slate-700 underline decoration-slate-300 underline-offset-4 transition hover:text-slate-900 hover:decoration-slate-500"
                        >
                          <span className="truncate">{interview.jobUrl}</span>
                        </a>
                      </div>
                    ) : null}
                  </div>

                  <div className="mt-12 flex items-center justify-end gap-3 border-t border-white/45 pt-8">
                    <button
                      type="button"
                      onClick={onClose}
                      className="inline-flex h-11 items-center justify-center rounded-2xl border border-white/45 bg-white/50 px-4 text-sm font-medium text-slate-700 transition hover:bg-white/70 hover:text-slate-900"
                    >
                      Close
                    </button>

                    <button
                      type="button"
                      className="inline-flex h-11 items-center justify-center rounded-2xl bg-slate-900 px-5 text-sm font-medium text-white shadow-[0_8px_20px_rgba(15,23,42,0.16)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_24px_rgba(15,23,42,0.18)]"
                    >
                      Edit
                    </button>
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

type InfoRowProps = {
  label: string;
  value: string;
  muted?: boolean;
};

function InfoRow({ label, value, muted = false }: InfoRowProps) {
  return (
    <div className="space-y-1.5">
      <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-400">
        {label}
      </p>
      <p
        className={`text-sm font-medium ${
          muted ? "text-slate-400" : "text-slate-700"
        }`}
      >
        {value}
      </p>
    </div>
  );
}

function formatStage(stage: string | null | undefined) {
  if (!stage) return "—";

  return stage
    .toLowerCase()
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function formatDateTime(value: string | null | undefined) {
  if (!value) return "—";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";

  return date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function formatSalary(value: number | null | undefined) {
  if (value == null) return "—";
  return `$${value.toLocaleString()}`;
}

function formatUrlLabel(value: string | null | undefined) {
  if (!value) return "—";

  try {
    const url = new URL(value);
    return url.hostname.replace("www.", "");
  } catch {
    return value;
  }
}
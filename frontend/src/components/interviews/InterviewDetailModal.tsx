import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import type { Interview } from "../../features/interviews/types";
import StatusBadge from "./StatusBadge";
import BaseModal from "../ui/BaseModal";
import ModalBody from "../ui/ModalBody";
import ModalFooter from "../ui/ModalFooter";
import {
  formatInterviewDate,
  formatSystemDateTime,
  formatCurrency,
} from "../../lib/format";

type InterviewDetailModalProps = {
  interview: Interview | null;
  open: boolean;
  onClose: () => void;
  onEditInterview?: (interview: Interview) => void;
  onMarkInactive?: (interview: Interview) => void;
  onOpenDeleteConfirm?: (interview: Interview) => void;
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
  onEditInterview,
  onMarkInactive,
  onOpenDeleteConfirm,
}: InterviewDetailModalProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  function handleClose() {
    setIsMenuOpen(false);
    onClose();
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    }

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isMenuOpen]);

  if (!interview) return null;

  return (
    <BaseModal open={open} onClose={handleClose} maxWidthClassName="max-w-6xl">
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

        <motion.div layout className="shrink-0">
          <div className="ml-auto flex flex-col items-center gap-1.5">
            <motion.div
              layoutId={`interview-status-${interview.id}`}
              transition={{ layout: spring }}
              className="shrink-0"
            >
              <StatusBadge status={interview.status} />
            </motion.div>

            <div ref={menuRef} className="relative">
              <button
                type="button"
                aria-label="More actions"
                onClick={() => setIsMenuOpen((prev) => !prev)}
                className="flex h-5 w-5 items-center justify-center rounded-md text-[18px] leading-none text-slate-400 transition hover:bg-black/5 hover:text-slate-600 active:scale-95"
              >
                ⋯
              </button>

              <AnimatePresence>
                {isMenuOpen ? (
                  <motion.div
                    initial={{
                      opacity: 0,
                      scale: 0.94,
                      y: -6,
                    }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      y: 0,
                    }}
                    exit={{
                      opacity: 0,
                      scale: 0.96,
                      y: -4,
                    }}
                    transition={{
                      duration: 0.14,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    style={{ transformOrigin: "top right" }}
                    className="
                      absolute right-0 top-full z-20 mt-2 w-48
                      rounded-2xl
                      border border-white/60
                      bg-white/90
                      p-2
                      shadow-[0_20px_50px_rgba(15,23,42,0.14)]
                      backdrop-blur-xl
                    "
                  >
                    <button
                      type="button"
                      onClick={() => {
                        setIsMenuOpen(false);
                        onMarkInactive?.(interview);
                      }}
                      className="w-full rounded-xl px-3 py-2 text-left text-sm text-slate-700 transition hover:bg-black/5 hover:text-slate-900"
                    >
                      Mark as inactive
                    </button>

                    <div className="my-1 h-px bg-slate-200/70" />

                    <button
                      type="button"
                      onClick={() => {
                        setIsMenuOpen(false);
                        onOpenDeleteConfirm?.(interview);
                      }}
                      className="w-full rounded-xl px-3 py-2 text-left text-sm text-rose-600 transition hover:bg-rose-50/80 hover:text-rose-700"
                    >
                      Delete
                    </button>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <ModalBody>
        <div className="space-y-8">
          <div className="grid grid-cols-1 gap-x-10 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
            <InfoRow label="Stage" value={formatStage(interview.stage)} />
            <InfoRow
              label="Interview Date"
              value={formatInterviewDate(interview.interviewDate)}
              muted={!interview.interviewDate}
            />
            <InfoRow
              label="Salary"
              value={formatCurrency(interview.salary)}
              muted={interview.salary == null}
            />
            <InfoRow
              label="Job Link"
              value={formatUrlLabel(interview.jobUrl)}
              muted={!interview.jobUrl}
            />
            <InfoRow
              label="Created"
              value={formatSystemDateTime(interview.createdAt)}
            />
            <InfoRow
              label="Last Updated"
              value={formatSystemDateTime(interview.updatedAt)}
            />
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

          <div className="border-t border-slate-200/70 pt-5">
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
          </div>
        </div>

        <ModalFooter>
          <button
            type="button"
            onClick={handleClose}
            className="inline-flex h-11 items-center justify-center rounded-2xl border border-white/45 bg-white/50 px-4 text-sm font-medium text-slate-700 transition hover:bg-white/70 hover:text-slate-900"
          >
            Close
          </button>

          <button
            type="button"
            onClick={() => onEditInterview?.(interview)}
            className="inline-flex h-11 items-center justify-center rounded-2xl bg-slate-900 px-5 text-sm font-medium text-white shadow-[0_8px_20px_rgba(15,23,42,0.16)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_24px_rgba(15,23,42,0.18)]"
          >
            Edit
          </button>
        </ModalFooter>
      </ModalBody>
    </BaseModal>
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

function formatUrlLabel(value: string | null | undefined) {
  if (!value) return "—";

  try {
    const url = new URL(value);
    return url.hostname.replace("www.", "");
  } catch {
    return value;
  }
}
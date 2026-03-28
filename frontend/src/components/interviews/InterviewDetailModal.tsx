import { cn } from "../../lib/cn";
import { styles } from "../../lib/styles";

import type { Interview } from "../../features/interviews/types";
import StatusBadge from "./StatusBadge";

type Props = {
  interview: Interview | null;
  open: boolean;
  onClose: () => void;
};

function formatStage(stage?: string | null) {
  if (!stage) return "—";
  return stage.replaceAll("_", " ");
}

function formatDate(date?: string | null) {
  if (!date) return "—";
  return new Date(date).toLocaleString();
}

function formatCurrency(value?: number | null) {
  if (!value) return "—";
  return `$${value.toLocaleString()}`;
}

export default function InterviewDetailModal({
  interview,
  open,
  onClose,
}: Props) {
  if (!open || !interview) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/20 backdrop-blur-sm"
        onClick={onClose}
      />

      <div
        className={cn(
          styles.glassCard,
          "relative z-10 w-full max-w-2xl p-6 md:p-7"
        )}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h2 className="text-xl font-semibold tracking-tight text-slate-900">
              {interview.company}
            </h2>
            <p className="mt-1.5 text-sm text-slate-600">{interview.role}</p>
          </div>

          <button
            onClick={onClose}
            className={styles.ghostButton}
          >
            Close
          </button>
        </div>

        <div className="mt-5 flex items-center gap-2">
          <span className={cn(styles.badgeBase, styles.badgeNeutral)}>
            {formatStage(interview.stage)}
          </span>

          <StatusBadge status={interview.status} />
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="rounded-2xl bg-white/55 px-4 py-4">
            <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-400">
              Interview Date
            </p>
            <p className="mt-2 text-sm font-medium text-slate-700">
              {formatDate(interview.interviewDate)}
            </p>
          </div>

          <div className="rounded-2xl bg-white/55 px-4 py-4">
            <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-400">
              Salary
            </p>
            <p className="mt-2 text-sm font-medium text-slate-700">
              {formatCurrency(interview.salary)}
            </p>
          </div>

          <div className="rounded-2xl bg-white/55 px-4 py-4 md:col-span-2">
            <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-400">
              Job URL
            </p>
            {interview.jobUrl ? (
              <a
                href={interview.jobUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-2 block break-all text-sm text-slate-700 underline decoration-slate-300 underline-offset-4"
              >
                {interview.jobUrl}
              </a>
            ) : (
              <p className="mt-2 text-sm font-medium text-slate-400">—</p>
            )}
          </div>

          <div className="rounded-2xl bg-white/55 px-4 py-4">
            <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-400">
              Created
            </p>
            <p className="mt-2 text-sm font-medium text-slate-700">
              {new Date(interview.createdAt).toLocaleDateString()}
            </p>
          </div>

          <div className="rounded-2xl bg-white/55 px-4 py-4">
            <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-400">
              Updated
            </p>
            <p className="mt-2 text-sm font-medium text-slate-700">
              {new Date(interview.updatedAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="mt-6 rounded-2xl bg-white/50 px-4 py-4">
          <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-400">
            Notes
          </p>
          <p className="mt-2 text-sm leading-7 text-slate-600">
            {interview.notes || "—"}
          </p>
        </div>

        <div className="mt-8 flex justify-end gap-3">
          <button className={styles.secondaryButton} onClick={onClose}>
            Close
          </button>
          <button className={styles.primaryButton}>Modify Interview</button>
        </div>
      </div>
    </div>
  );
}
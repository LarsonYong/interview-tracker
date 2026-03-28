import { cn } from "../../lib/cn";
import { styles } from "../../lib/styles";

import type { Interview } from "../../features/interviews/types";
import StatusBadge from "./StatusBadge";

type Props = {
  interview: Interview;
  onClick?: (interview: Interview) => void;
};

function formatStage(stage?: string | null) {
  if (!stage) return "—";
  return stage.replaceAll("_", " ");
}

function formatDate(date?: string | null) {
  if (!date) return "—";
  return new Date(date).toLocaleDateString();
}

export default function InterviewCard({ interview, onClick }: Props) {
  const hasInterviewDate = Boolean(interview.interviewDate);

  return (
    <button
      type="button"
      onClick={() => onClick?.(interview)}
      className={cn(
        styles.interviewCard,
        styles.hoverLift,
        styles.focusRing,
        "flex min-h-[210px] w-full flex-col cursor-pointer"
      )}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/55 to-transparent" />

      <div className="relative flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className={cn(styles.interviewCompany, "truncate")}>
            {interview.company}
          </p>

          <p className={cn(styles.interviewRole, "line-clamp-2")}>
            {interview.role}
          </p>
        </div>

        <div className="shrink-0">
          <StatusBadge status={interview.status} />
        </div>
      </div>

      <div className="relative mt-6 space-y-4">
        <div className="rounded-2xl bg-white/50 px-4 py-3">
          <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-400">
            Stage
          </p>
          <p className="mt-1.5 text-sm font-medium text-slate-700">
            {formatStage(interview.stage)}
          </p>
        </div>

        <div className="rounded-2xl bg-white/50 px-4 py-3">
          <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-400">
            Interview
          </p>
          <p
            className={cn(
              "mt-1.5 text-sm font-medium",
              hasInterviewDate ? "text-slate-700" : "text-slate-400"
            )}
          >
            {formatDate(interview.interviewDate)}
          </p>
        </div>
      </div>

      {interview.notes ? (
        <p className="relative mt-5 line-clamp-2 text-sm leading-6 text-slate-500">
          {interview.notes}
        </p>
      ) : (
        <div className="mt-5 flex-1" />
      )}
    </button>
  );
}
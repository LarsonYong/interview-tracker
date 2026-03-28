import { motion } from "framer-motion";

import { cn } from "../../lib/cn";
import { styles } from "../../lib/styles";

import type { Interview } from "../../features/interviews/types";
import StatusBadge from "./StatusBadge";

type Props = {
  interview: Interview;
  onClick?: (interview: Interview) => void;
  isActive?: boolean;
};

function formatStage(stage?: string | null) {
  if (!stage) return "—";

  return stage
    .toLowerCase()
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function formatDate(date?: string | null) {
  if (!date) return "—";

  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return "—";

  return parsed.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function InterviewCard({
  interview,
  onClick,
  isActive = false,
}: Props) {
  const hasInterviewDate = Boolean(interview.interviewDate);

  return (
    <motion.button
      layoutId={`interview-card-${interview.id}`}
      transition={{
        layout: {
          duration: 0.14,
          ease: [0.22, 1, 0.36, 1],
        },
      }}
      type="button"
      onClick={() => onClick?.(interview)}
      className={cn(
        styles.interviewCard,
        styles.hoverLift,
        styles.focusRing,
        "relative flex min-h-[220px] w-full cursor-pointer flex-col overflow-hidden"
      )}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-white/45 to-transparent" />

      <div className="relative flex items-start justify-between gap-4">
        <div className="min-w-0">
          <motion.p
            layoutId={`interview-company-${interview.id}`}
            className={cn(styles.interviewCompany, "truncate")}
          >
            {interview.company}
          </motion.p>

          <motion.p
            layoutId={`interview-role-${interview.id}`}
            className={cn(styles.interviewRole, "line-clamp-2")}
          >
            {interview.role}
          </motion.p>
        </div>

        <motion.div
          layoutId={`interview-status-${interview.id}`}
          className="shrink-0"
        >
          <StatusBadge status={interview.status} />
        </motion.div>
      </div>

      <motion.div
        animate={{ opacity: isActive ? 0 : 1 }}
        transition={{
          duration: 0.1,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="contents"
      >
        <div className="relative mt-6 grid grid-cols-1 gap-3">
          <InfoTile label="Stage" value={formatStage(interview.stage)} />

          <InfoTile
            label="Interview"
            value={formatDate(interview.interviewDate)}
            muted={!hasInterviewDate}
          />
        </div>

        {interview.notes ? (
          <p className="relative mt-5 line-clamp-2 text-sm leading-6 text-slate-500">
            {interview.notes}
          </p>
        ) : (
          <div className="mt-5 flex-1" />
        )}
      </motion.div>
    </motion.button>
  );
}

type InfoTileProps = {
  label: string;
  value: string;
  muted?: boolean;
};

function InfoTile({ label, value, muted = false }: InfoTileProps) {
  return (
    <div className="rounded-2xl bg-white/50 px-4 py-3">
      <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-400">
        {label}
      </p>
      <p
        className={cn(
          "mt-1.5 text-sm font-medium",
          muted ? "text-slate-400" : "text-slate-700"
        )}
      >
        {value}
      </p>
    </div>
  );
}
// import { motion } from "framer-motion";

// import { cn } from "../../lib/cn";
// import { formatInterviewDate } from "../../lib/format";
// import { styles } from "../../lib/styles";

// import type { Interview } from "../../features/interviews/types";
// import StatusBadge from "./StatusBadge";

// type Props = {
//   interview: Interview;
//   onClick?: (interview: Interview) => void;
//   isActive?: boolean;
// };

// function formatStage(stage?: string | null) {
//   if (!stage) return "—";

//   return stage
//     .toLowerCase()
//     .split("_")
//     .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
//     .join(" ");
// }

// export default function InterviewCard({
//   interview,
//   onClick,
//   isActive = false,
// }: Props) {
//   const hasInterviewDate = Boolean(interview.interviewDate);
//   const hasNotes = Boolean(interview.notes?.trim());

//   return (
//     <motion.button
//       layoutId={`interview-card-${interview.id}`}
//       transition={{
//         layout: {
//           duration: 0.14,
//           ease: [0.22, 1, 0.36, 1],
//         },
//       }}
//       type="button"
//       onClick={() => onClick?.(interview)}
//       className={cn(
//         styles.interviewCard,
//         styles.hoverLift,
//         styles.focusRing,
//         "relative flex min-h-55 w-full cursor-pointer flex-col overflow-hidden transition-all duration-200",
//         isActive && "shadow-[0_6px_18px_rgba(15,23,42,0.04)]"
//       )}
//     >
//       <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-linear-to-b from-white/45 to-transparent" />

//       <motion.div
//         animate={{
//           opacity: isActive ? 0 : 1,
//           scale: isActive ? 0.985 : 1,
//           filter: isActive ? "blur(2px)" : "blur(0px)",
//         }}
//         transition={{
//           duration: 0.14,
//           ease: [0.22, 1, 0.36, 1],
//         }}
//         className="relative"
//         style={{ pointerEvents: isActive ? "none" : "auto" }}
//       >
//         <div className="flex items-start justify-between gap-4">
//           <div className="min-w-0">
//             <motion.p
//               layoutId={`interview-company-${interview.id}`}
//               className={cn(styles.interviewCompany, "truncate")}
//             >
//               {interview.company}
//             </motion.p>

//             <motion.p
//               layoutId={`interview-role-${interview.id}`}
//               className={cn(styles.interviewRole, "mt-1 line-clamp-2")}
//             >
//               {interview.role}
//             </motion.p>
//           </div>

//           <motion.div
//             layoutId={`interview-status-${interview.id}`}
//             className="shrink-0"
//           >
//             <StatusBadge status={interview.status} />
//           </motion.div>
//         </div>
//       </motion.div>

//       <motion.div
//         animate={{
//           opacity: isActive ? 0 : 1,
//           scale: isActive ? 0.985 : 1,
//           filter: isActive ? "blur(2px)" : "blur(0px)",
//         }}
//         transition={{
//           duration: 0.14,
//           ease: [0.22, 1, 0.36, 1],
//         }}
//         className="contents"
//         style={{ pointerEvents: isActive ? "none" : "auto" }}
//       >
//         <div className="relative mt-6 grid grid-cols-1 gap-3">
//           <InfoTile label="Stage" value={formatStage(interview.stage)} />

//           <InfoTile
//             label="Interview"
//             value={formatInterviewDate(interview.interviewDate)}
//             muted={!hasInterviewDate}
//           />
//         </div>

//         {hasNotes ? (
//           <p className="relative mt-5 line-clamp-2 text-sm leading-6 text-slate-500/95">
//             {interview.notes}
//           </p>
//         ) : (
//           <div className="mt-5 flex-1" />
//         )}
//       </motion.div>
//     </motion.button>
//   );
// }

// type InfoTileProps = {
//   label: string;
//   value: string;
//   muted?: boolean;
// };

// function InfoTile({ label, value, muted = false }: InfoTileProps) {
//   return (
//     <div className="rounded-2xl bg-white/50 px-4 py-3">
//       <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-400">
//         {label}
//       </p>
//       <p
//         className={cn(
//           "mt-1.5 text-sm font-medium",
//           muted ? "text-slate-400" : "text-slate-700"
//         )}
//       >
//         {value}
//       </p>
//     </div>
//   );
// }

import { motion } from "framer-motion";

import { cn } from "../../lib/cn";
import { formatInterviewDate } from "../../lib/format";
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

export default function InterviewCard({
  interview,
  onClick,
  isActive = false,
}: Props) {
  const hasInterviewDate = Boolean(interview.interviewDate);
  const hasNotes = Boolean(interview.notes?.trim());

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
        "group relative flex min-h-55 w-full cursor-pointer flex-col overflow-hidden text-left transition-all duration-200",
        isActive && "shadow-[0_6px_18px_rgba(15,23,42,0.04)]"
      )}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-linear-to-b from-white/45 to-transparent" />

      <motion.div
        animate={{
          opacity: isActive ? 0 : 1,
          scale: isActive ? 0.985 : 1,
          filter: isActive ? "blur(2px)" : "blur(0px)",
        }}
        transition={{
          duration: 0.14,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="relative flex h-full flex-col"
        style={{ pointerEvents: isActive ? "none" : "auto" }}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <motion.p
              layoutId={`interview-company-${interview.id}`}
              className={cn(styles.interviewCompany, "truncate")}
            >
              {interview.company}
            </motion.p>

            <motion.p
              layoutId={`interview-role-${interview.id}`}
              className={cn(styles.interviewRole, "mt-1 line-clamp-2")}
            >
              {interview.role}
            </motion.p>
          </div>

          <motion.div
            layoutId={`interview-status-${interview.id}`}
            className="shrink-0 transition-opacity duration-200 group-hover:opacity-100"
          >
            <StatusBadge status={interview.status} />
          </motion.div>
        </div>

        <div className="relative mt-5 grid grid-cols-2 gap-x-8 gap-y-3 border-t border-white/40 pt-4">
          <CardMetaBlock label="Stage" value={formatStage(interview.stage)} />
          <CardMetaBlock
            label="Interview"
            value={formatInterviewDate(interview.interviewDate)}
            muted={!hasInterviewDate}
          />
        </div>

        {hasNotes ? (
            <div className="relative mt-6 border-t border-slate-200/60 pt-4">
              <p className="line-clamp-2 text-sm leading-6 text-slate-700 transition-colors duration-200 group-hover:text-slate-800">
                {interview.notes}
              </p>
            </div>
        ) : (
          <div className="mt-6 flex-1" />
        )}
      </motion.div>
    </motion.button>
  );
}

type CardMetaBlockProps = {
  label: string;
  value: string;
  muted?: boolean;
};

function CardMetaBlock({
  label,
  value,
  muted = false,
}: CardMetaBlockProps) {
  return (
    <div className="min-w-0">
      <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-400">
        {label}
      </p>

      <p
        className={cn(
          "mt-1.5 truncate text-sm font-medium transition-colors duration-200",
          muted
            ? "text-slate-400 group-hover:text-slate-500"
            : "text-slate-700 group-hover:text-slate-800"
        )}
      >
        {value}
      </p>
    </div>
  );
}
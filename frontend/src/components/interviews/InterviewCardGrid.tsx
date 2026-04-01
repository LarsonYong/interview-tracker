import { cn } from "../../lib/cn";
import { styles } from "../../lib/styles";

import type { Interview } from "../../features/interviews/types";
import InterviewCard from "./InterviewCard";

type InterviewCardGridProps = {
  interviews: Interview[];
  onCardClick: (interview: Interview) => void;
  selectedInterview: Interview | null;
  isDetailOpen: boolean;
};

export default function InterviewCardGrid({
  interviews,
  onCardClick,
  selectedInterview,
  isDetailOpen,
}: InterviewCardGridProps) {
  if (interviews.length === 0) {
    return (
      <div className={cn(styles.glassPanel, "p-8 text-center")}>
        <p className="text-sm font-medium text-slate-700">
          No interviews match these filters.
        </p>
        <p className="mt-2 text-sm text-slate-500">
          Try switching stage or status to see more results.
        </p>
      </div>
    );
  }

  return (
    <div className={styles.interviewGrid}>
      {interviews.map((interview) => (
        <InterviewCard
          key={interview.id}
          interview={interview}
          onClick={onCardClick}
          isActive={isDetailOpen && selectedInterview?.id === interview.id}
        />
      ))}
    </div>
  );
}
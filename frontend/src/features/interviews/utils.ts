import type { Interview } from "./types";
import type { StageFilter, StatusFilter } from "./filters";

type FilterArgs = {
  interviews: Interview[];
  selectedStage: StageFilter;
  selectedStatus: StatusFilter;
};

export function filterInterviews({
  interviews,
  selectedStage,
  selectedStatus,
}: FilterArgs) {
  return interviews.filter((interview) => {
    const matchesStage =
      selectedStage === "ALL" || interview.stage === selectedStage;

    const matchesStatus =
      selectedStatus === "ALL" || interview.status === selectedStatus;

    return matchesStage && matchesStatus;
  });
}
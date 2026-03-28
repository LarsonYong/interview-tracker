import { useMemo, useState } from "react";

import type { Interview } from "../../features/interviews/types";
import type {
  StageFilter,
  StatusFilter,
} from "../../features/interviews/filters";
import { filterInterviews } from "../../features/interviews/utils";

import InterviewFilters from "./InterviewFilters";
import InterviewResultsHeader from "./InterviewResultsHeader";
import InterviewCardGrid from "./InterviewCardGrid";

type Props = {
  interviews: Interview[];
  onCardClick: (interview: Interview) => void;
};

export default function InterviewBoard({
  interviews,
  onCardClick,
}: Props) {
  const [selectedStage, setSelectedStage] = useState<StageFilter>("ALL");
  const [selectedStatus, setSelectedStatus] = useState<StatusFilter>("ALL");

  const filteredInterviews = useMemo(() => {
    return filterInterviews({
      interviews,
      selectedStage,
      selectedStatus,
    });
  }, [interviews, selectedStage, selectedStatus]);

  return (
    <section className="space-y-5">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
        <InterviewResultsHeader count={filteredInterviews.length} />

        <InterviewFilters
          selectedStage={selectedStage}
          selectedStatus={selectedStatus}
          onStageChange={setSelectedStage}
          onStatusChange={setSelectedStatus}
        />
      </div>

      <InterviewCardGrid
        interviews={filteredInterviews}
        onCardClick={onCardClick}
      />
    </section>
  );
}
import FilterChip from "./FilterChip.tsx";
import {
  stageOptions,
  statusOptions,
  type StageFilter,
  type StatusFilter,
} from "../../features/interviews/filters";

type InterviewFiltersProps = {
  selectedStage: StageFilter;
  selectedStatus: StatusFilter;
  onStageChange: (value: StageFilter) => void;
  onStatusChange: (value: StatusFilter) => void;
};

export default function InterviewFilters({
  selectedStage,
  selectedStatus,
  onStageChange,
  onStatusChange,
}: InterviewFiltersProps) {
  return (
    <div className="flex flex-col gap-3 xl:items-end">
      <div className="flex flex-wrap gap-2">
        {stageOptions.map((option) => (
          <FilterChip
            key={option.value}
            label={option.label}
            active={selectedStage === option.value}
            onClick={() => onStageChange(option.value)}
          />
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        {statusOptions.map((option) => (
          <FilterChip
            key={option.value}
            label={option.label}
            active={selectedStatus === option.value}
            onClick={() => onStatusChange(option.value)}
          />
        ))}
      </div>
    </div>
  );
}
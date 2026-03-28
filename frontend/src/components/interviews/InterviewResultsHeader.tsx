type InterviewResultsHeaderProps = {
  count: number;
};

export default function InterviewResultsHeader({
  count,
}: InterviewResultsHeaderProps) {
  return (
    <div className="flex items-end justify-between px-1">
      <div>
        <h3 className="text-lg font-semibold text-slate-900">
          Interview Cards
        </h3>
        <p className="text-sm text-slate-500">
          {count} result{count === 1 ? "" : "s"} shown
        </p>
      </div>
    </div>
  );
}
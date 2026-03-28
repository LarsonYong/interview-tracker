import { cn } from "../../lib/cn";
import { styles } from "../../lib/styles";
import type { InterviewStatus } from "../../features/interviews/types";

type StatusBadgeProps = {
  status: InterviewStatus;
};

const statusLabelMap: Record<InterviewStatus, string> = {
  active: "Active",
  passed: "Passed",
  rejected: "Rejected",
  offer: "Offer",
};

const statusStyleMap: Record<InterviewStatus, string> = {
  active: styles.badgeActive,
  passed: styles.badgePassed,
  rejected: styles.badgeRejected,
  offer: styles.badgeOffer,
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span className={cn(styles.badgeBase, statusStyleMap[status])}>
      {statusLabelMap[status]}
    </span>
  );
}
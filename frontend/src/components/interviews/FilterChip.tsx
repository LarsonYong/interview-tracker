import { cn } from "../../lib/cn";
import { styles } from "../../lib/styles";

type FilterChipProps = {
  label: string;
  active: boolean;
  onClick: () => void;
};

export default function FilterChip({
  label,
  active,
  onClick,
}: FilterChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        styles.filterChip,
        active ? styles.filterChipActive : styles.filterChipInactive
      )}
    >
      {label}
    </button>
  );
}
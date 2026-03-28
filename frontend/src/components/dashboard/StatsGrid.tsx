import StatCard from "./StatCard";
import { styles } from "../../lib/styles";
import { cn } from "../../lib/cn";

const stats = [
  {
    title: "Total Applications",
    value: 24,
    hint: "+3 this week",
  },
  {
    title: "Active Interviews",
    value: 6,
    hint: "2 in progress",
  },
  {
    title: "Offers",
    value: 1,
    hint: "Waiting decision",
  },
  {
    title: "Rejections",
    value: 8,
    hint: "Archived gracefully",
  },
];

export default function StatsGrid() {
  return (
    <section className={cn(styles.statsGrid)}>
      {stats.map((stat) => (
        <StatCard
          key={stat.title}
          title={stat.title}
          value={stat.value}
          hint={stat.hint}
        />
      ))}
    </section>
  );
}
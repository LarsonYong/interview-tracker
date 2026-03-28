import { cn } from "../../lib/cn";
import { styles } from "../../lib/styles";

type StatCardProps = {
    title: string;
    value: number | string;
    hint: string;
    className?: string;
}

export default function StatCard({title,value,hint,className}: StatCardProps){
    return (
        <div className={cn(styles.glassCard, styles.hoverLift, "p-5", className)}>
            <p className={cn(styles.statTitle)}>{title}</p>

            <h2 className={cn(styles.statValue)}>{value}</h2>

            {hint ? <p className={styles.statHint}>{hint}</p> : null}
        </div>
    )
}
import { cn } from "../../lib/cn";
import { styles } from "../../lib/styles";
import StatusBadge from "../interviews/StatusBadge";

export default function AuthBrandPanel() {
  return (
    <div className="relative hidden min-h-140 flex-col md:flex">
      <div>
        <h1 className="mt-10 ml-3 text-[2.2rem] font-semibold tracking-tight text-slate-900">
          Interview Tracker
        </h1>

        <p className="mt-1 ml-3 max-w-sm text-sm leading-6 text-slate-500">
          Stay focused on what matters.
        </p>
      </div>

      <div className="-translate-y-3 mt-15 ml-9">
        <div className="pointer-events-none absolute inset-0 rounded-4xl bg-linear-to-br from-white/35 to-transparent" />

        <div
          className={cn(
            styles.glassCard,
            "relative max-w-105 rounded-4xl border-white/55 bg-white/64 p-5 shadow-[0_14px_40px_rgba(15,23,42,0.08)]"
          )}
        >
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="text-lg font-semibold tracking-tight text-slate-900">
                Product Designer
              </p>
              <p className="mt-1 text-sm text-slate-500">Apple</p>
            </div>

            <StatusBadge status="active" />
          </div>

          <div className="mt-5 space-y-4">
            <div className="rounded-2xl bg-white/50 px-4 py-3">
              <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-400">
                Stage
              </p>
              <p className="mt-1.5 text-sm font-medium text-slate-700">
                Onsite
              </p>
            </div>

            <div className="rounded-2xl bg-white/50 px-4 py-3">
              <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-400">
                Interview
              </p>
              <p className="mt-1.5 text-sm font-medium text-slate-700">
                Apr 4, 2026
              </p>
            </div>
          </div>

          <div className="mt-5 rounded-2xl bg-white/45 px-4 py-3">
            <div className="h-3 w-28 rounded-full bg-slate-200/80" />
            <div className="mt-2 h-3 w-40 rounded-full bg-slate-200/70" />
          </div>
        </div>
      </div>
    </div>
  );
}
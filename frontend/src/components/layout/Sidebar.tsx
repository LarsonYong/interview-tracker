import {
  BarChart3,
  BriefcaseBusiness,
  LayoutDashboard,
  Settings,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, active: true },
  { label: "Interviews", icon: BriefcaseBusiness, active: false },
  { label: "Analytics", icon: BarChart3, active: false },
  { label: "Settings", icon: Settings, active: false },
];

export default function Sidebar() {
  return (
    <div className="flex h-full flex-col px-4 py-5">
      <div className="flex items-center gap-3 px-3 py-2">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/80 shadow-sm">
          <span className="text-lg font-semibold text-slate-900">IT</span>
        </div>

        <div>
          <p className="text-sm font-semibold text-slate-900">
            Interview Tracker
          </p>
          <p className="text-xs text-slate-500">Calm, clear, focused</p>
        </div>
      </div>

      <nav className="mt-8 space-y-2">
        {navItems.map(({ label, icon: Icon, active }) => (
          <button
            key={label}
            className={[
              "flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left transition-all duration-200",
              active
                ? "bg-white/80 text-slate-900 shadow-sm"
                : "text-slate-500 hover:bg-white/50 hover:text-slate-800",
            ].join(" ")}
          >
            <Icon className="h-4 w-4" />
            <span className="text-sm font-medium">{label}</span>
          </button>
        ))}
      </nav>

      <div className="mt-auto rounded-[28px] border border-white/50 bg-white/55 p-4 backdrop-blur-xl">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400">
          Focus
        </p>
        <p className="mt-3 text-sm font-medium text-slate-800">
          One small follow-up can move everything forward.
        </p>

        <div className="mt-5 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white">
            Y
          </div>
          <div>
            <p className="text-sm font-medium text-slate-900">Yuhan</p>
            <p className="text-xs text-slate-500">Productive day</p>
          </div>
        </div>
      </div>
    </div>
  );
}
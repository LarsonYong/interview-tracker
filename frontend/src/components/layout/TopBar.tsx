import { Plus, Search, SunMedium } from "lucide-react";

type TopBarProps = {
  title?: string;
  subtitle?: string;
  onAddInterview?: () => void;
};

export default function TopBar({
  title = "Dashboard",
  subtitle,
  onAddInterview,
}: TopBarProps) {
  return (
    <header className="flex flex-col gap-4 px-6 py-6 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
          {title}
        </h1>

        {subtitle ? (
          <p className="mt-2 text-sm text-slate-500">{subtitle}</p>
        ) : null}
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="flex h-11 min-w-60 items-center gap-2 rounded-2xl border border-white/50 bg-white/70 px-4 backdrop-blur-xl">
          <Search className="h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search companies or roles"
            className="w-full bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400"
          />
        </div>

        <div className="flex h-11 items-center gap-2 rounded-2xl border border-white/50 bg-white/70 px-4 text-sm text-slate-700 backdrop-blur-xl">
          <SunMedium className="h-4 w-4 text-amber-500" />
          <span>Sunny · 61°F</span>
        </div>

      <button
        onClick={() => onAddInterview?.()}
        className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl bg-slate-900 px-5 text-sm font-medium text-white shadow-[0_8px_20px_rgba(15,23,42,0.16)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_24px_rgba(15,23,42,0.18)]"
      >
        <Plus className="h-4 w-4" />
        Add Interview
      </button>
      </div>
    </header>
  );
}
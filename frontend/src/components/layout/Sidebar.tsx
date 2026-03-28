import {
  BarChart3,
  BriefcaseBusiness,
  LayoutDashboard,
  Settings,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

import { useAuth } from "../../features/auth/use-auth";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, to: "/dashboard" },
  { label: "Interviews", icon: BriefcaseBusiness, to: "/interviews" },
  { label: "Analytics", icon: BarChart3, to: "/analytics" },
  { label: "Settings", icon: Settings, to: "/settings" },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout, user } = useAuth();

  const displayName = user?.name?.trim() || "User";
  const avatarLetter = displayName[0]?.toUpperCase() || "U";

  function handleLogout() {
    logout();
    navigate("/login", { replace: true });
  }

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
        {navItems.map(({ label, icon: Icon, to }) => {
          const isActive = location.pathname === to;

          return (
            <button
              key={label}
              type="button"
              onClick={() => navigate(to)}
              className={[
                "flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left transition-all duration-200",
                isActive
                  ? "bg-white/80 text-slate-900 shadow-sm"
                  : "text-slate-500 hover:bg-white/50 hover:text-slate-800",
              ].join(" ")}
            >
              <Icon className="h-4 w-4" />
              <span className="text-sm font-medium">{label}</span>
            </button>
          );
        })}
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
            {avatarLetter}
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-3">
              <p className="truncate text-sm font-medium text-slate-900">
                {displayName}
              </p>

              <button
                type="button"
                onClick={handleLogout}
                className="shrink-0 text-xs font-medium text-slate-500 transition hover:text-slate-800"
              >
                Log out
              </button>
            </div>

            <p className="text-xs text-slate-500">Productive day</p>
          </div>
        </div>
      </div>
    </div>
  );
}
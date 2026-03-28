export const styles = {
  glassCard:
    "rounded-3xl border border-white/50 bg-white/70 backdrop-blur-xl shadow-[0_4px_24px_rgba(15,23,42,0.06)]",

  glassPanel:
    "rounded-[28px] border border-white/50 bg-white/55 backdrop-blur-xl shadow-[0_4px_24px_rgba(15,23,42,0.05)]",

  hoverLift:
    "transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(15,23,42,0.10)]",

  focusRing:
    "focus:outline-none focus:ring-2 focus:ring-slate-900/10",

  statsGrid:
    "grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4",

  interviewGrid:
    "grid grid-cols-1 gap-5 lg:grid-cols-2 2xl:grid-cols-3",

  sectionTitle: "text-lg font-semibold text-slate-900",
  sectionSub: "text-sm text-slate-500",

  statTitle: "text-sm text-slate-500",
  statValue: "mt-3 text-3xl font-semibold tracking-tight text-slate-900",
  statHint: "mt-2 text-sm text-slate-500",

  interviewCard:
    "relative overflow-hidden rounded-[28px] border border-white/60 bg-white/78 p-6 text-left backdrop-blur-xl shadow-[0_8px_24px_rgba(15,23,42,0.06)]",

  interviewCompany: "text-[1.15rem] font-semibold tracking-tight text-slate-900",
  interviewRole: "mt-1.5 text-[15px] text-slate-600",
  interviewMeta: "mt-5 space-y-2 text-sm text-slate-500",

  badgeBase:
    "inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-medium backdrop-blur-sm",

  badgeNeutral:
    "border-slate-200/70 bg-slate-100/80 text-slate-500",

  badgeActive:
    "border-sky-200/70 bg-sky-50/85 text-sky-600",

  badgePassed:
    "border-violet-200/70 bg-violet-50/85 text-violet-600",

  badgeRejected:
    "border-slate-200/70 bg-slate-100/85 text-slate-500",

  badgeOffer:
    "border-emerald-200/70 bg-emerald-50/85 text-emerald-600",

  filterChip:
    "rounded-full px-3 py-1.5 text-sm font-medium transition-all duration-200",

  filterChipActive:
    "border border-white/70 bg-white text-slate-900 shadow-[0_4px_12px_rgba(15,23,42,0.08)]",

  filterChipInactive:
    "border border-white/50 bg-white/70 text-slate-600 hover:bg-white/90 hover:text-slate-900",

  primaryButton:
    "inline-flex h-11 items-center justify-center gap-2 rounded-2xl bg-slate-900 px-5 text-sm font-medium text-white shadow-[0_8px_20px_rgba(15,23,42,0.16)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_24px_rgba(15,23,42,0.18)]",

  secondaryButton:
    "inline-flex h-11 items-center justify-center rounded-2xl border border-white/50 bg-white/60 px-5 text-sm font-medium text-slate-700 backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(15,23,42,0.08)]",

  ghostButton:
    "inline-flex h-10 items-center justify-center rounded-xl px-3 text-sm text-slate-600 hover:bg-slate-100/70",

  input:
    "h-11 w-full rounded-2xl border border-white/50 bg-white/70 px-4 text-sm text-slate-800 backdrop-blur-xl placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900/20",
};

//我在做一个 interview tracker 项目（React + TS + Tailwind），
// 目前已经完成：
// - Apple 风格 glass UI
// - interview card（已优化为大卡片 + 分行 stage / interview date）
// - status badge（低饱和 Apple 风格，rejected 用灰色）
// - InterviewBoard（filter + card grid）
// - 已拆分 Dashboard 和 InterviewsPage

// 现在我想继续优化：________（写你下一步想做的）
import type { ReactNode } from "react";

type AppShellProps = {
  sidebar: ReactNode;
  children: ReactNode;
};

export default function AppShell({ sidebar, children }: AppShellProps) {
  return (
    <div className="min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.96),_rgba(239,244,255,0.92),_rgba(229,236,246,0.88))]">
      <div className="pointer-events-none absolute inset-0 opacity-60">
        <div className="absolute left-[-8%] top-[-10%] h-[340px] w-[340px] rounded-full bg-white/40 blur-3xl" />
        <div className="absolute bottom-[-8%] right-[-6%] h-[360px] w-[360px] rounded-full bg-sky-100/50 blur-3xl" />
        <div className="absolute left-[35%] top-[18%] h-[240px] w-[240px] rounded-full bg-violet-100/40 blur-3xl" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-[1600px] p-4 md:p-6">
        <div className="grid w-full grid-cols-1 overflow-hidden rounded-[36px] border border-white/40 bg-white/45 backdrop-blur-2xl shadow-[0_10px_50px_rgba(15,23,42,0.08)] lg:grid-cols-[260px_minmax(0,1fr)]">
          <aside className="border-b border-white/30 bg-white/35 lg:border-b-0 lg:border-r">
            {sidebar}
          </aside>

          <section className="min-w-0">{children}</section>
        </div>
      </div>
    </div>
  );
}
import AppShell from "../components/layout/AppShell";
import Sidebar from "../components/layout/Sidebar";
import TopBar from "../components/layout/TopBar";

export default function DashboardPage() {
  return (
    <AppShell sidebar={<Sidebar />}>
      <div className="flex h-full flex-col">
        <TopBar title="Dashboard" />

        <main className="flex-1 overflow-y-auto px-6 pb-6 pt-6">
          <div className="mx-auto w-full max-w-7xl space-y-6">

            <div className="rounded-[28px] border border-white/60 bg-white/70 p-6 backdrop-blur-xl">
              <p className="text-sm font-medium text-slate-900">
                Welcome back 👋
              </p>
              <p className="mt-1 text-sm text-slate-500">
                Stay focused. Every interview is one step closer.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {[
                { label: "Active", value: 3 },
                { label: "Interviews", value: 8 },
                { label: "Offers", value: 1 },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-3xl border border-white/60 bg-white/70 p-5 backdrop-blur-xl"
                >
                  <p className="text-xs text-slate-500">{item.label}</p>
                  <p className="mt-2 text-xl font-semibold text-slate-900">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>

            <div className="rounded-[28px] border border-white/60 bg-white/70 p-6 backdrop-blur-xl">
              <p className="text-sm font-medium text-slate-900">
                Recent activity
              </p>
              <p className="mt-2 text-sm text-slate-500">
                Your latest interviews and updates will appear here.
              </p>
            </div>

          </div>
        </main>
      </div>
    </AppShell>
  );
}
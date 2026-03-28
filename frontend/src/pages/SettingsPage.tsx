import AppShell from "../components/layout/AppShell";
import Sidebar from "../components/layout/Sidebar";
import TopBar from "../components/layout/TopBar";

export default function SettingsPage() {
  return (
    <AppShell sidebar={<Sidebar />}>
      <div className="flex h-full flex-col">
        <TopBar title="Settings" />

        <main className="flex-1 overflow-y-auto px-6 pb-6 pt-6">
          <div className="mx-auto max-w-5xl">
            <div className="rounded-[28px] border border-white/60 bg-white/70 p-8 backdrop-blur-xl">
              <p className="text-sm font-medium text-slate-900">
                Settings coming soon
              </p>

              <p className="mt-2 text-sm text-slate-500">
                Manage your account, preferences, and integrations.
              </p>
            </div>
          </div>
        </main>
      </div>
    </AppShell>
  );
}
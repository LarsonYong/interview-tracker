import { useState } from "react";

import AppShell from "../components/layout/AppShell";
import Sidebar from "../components/layout/Sidebar";
import TopBar from "../components/layout/TopBar";

import StatsGrid from "../components/dashboard/StatsGrid";
import InterviewBoard from "../components/interviews/InterviewBoard.tsx";
import InterviewDetailModal from "../components/interviews/InterviewDetailModal.tsx";

import type { Interview } from "../features/interviews/types.ts";
import { mockInterviews } from "../features/interviews/mock-data.ts";



export default function DashboardPage() {
  const [selectedInterview, setSelectedInterview] = useState<Interview | null>(
    null
  );
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  function handleOpenInterview(interview: Interview) {
    setSelectedInterview(interview);
    setIsDetailOpen(true);
  }

  function handleCloseInterview() {
    setIsDetailOpen(false);
  }

  return (
    <AppShell sidebar={<Sidebar />}>
      <div className="flex h-full flex-col">
        <TopBar />

        <main className="flex-1 overflow-hidden px-6 pb-6">
          <div className="grid h-full grid-rows-[auto_auto_1fr] gap-6">
            <StatsGrid />

            <section className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-slate-900">
                  Interview Board
                </h3>
                <p className="text-sm text-slate-500">
                  Keep every opportunity organized and easy to review.
                </p>
              </div>
            </section>

            <InterviewBoard
              interviews={mockInterviews}
              onCardClick={handleOpenInterview}
            />
          </div>
        </main>
      </div>

      <InterviewDetailModal
        interview={selectedInterview}
        open={isDetailOpen}
        onClose={handleCloseInterview}
      />
    </AppShell>
  );
}
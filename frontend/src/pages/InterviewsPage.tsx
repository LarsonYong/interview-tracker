import { useState } from "react";
import { LayoutGroup } from "framer-motion";

import AppShell from "../components/layout/AppShell";
import Sidebar from "../components/layout/Sidebar";
import TopBar from "../components/layout/TopBar";

import InterviewBoard from "../components/interviews/InterviewBoard";
import InterviewDetailModal from "../components/interviews/InterviewDetailModal";

import type { Interview } from "../features/interviews/types";
import { mockInterviews } from "../features/interviews/mock-data";

export default function InterviewsPage() {
  const [selectedInterview, setSelectedInterview] = useState<Interview | null>(null);
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
        <TopBar title="Interviews" />

        <main className="flex-1 overflow-y-auto px-6 pb-6 pt-6">
          <div className="mx-auto h-full w-full max-w-7xl">
            <LayoutGroup id="interview-detail-transition">
              <InterviewBoard
                interviews={mockInterviews}
                onCardClick={handleOpenInterview}
                selectedInterview={selectedInterview}
              />

              <InterviewDetailModal
                interview={selectedInterview}
                open={isDetailOpen}
                onClose={handleCloseInterview}
              />
            </LayoutGroup>
          </div>
        </main>
      </div>
    </AppShell>
  );
}
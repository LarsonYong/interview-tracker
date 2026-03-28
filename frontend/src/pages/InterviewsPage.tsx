import { useEffect, useState } from "react";
import { LayoutGroup } from "framer-motion";

import AppShell from "../components/layout/AppShell";
import Sidebar from "../components/layout/Sidebar";
import TopBar from "../components/layout/TopBar";

import InterviewBoard from "../components/interviews/InterviewBoard";
import InterviewDetailModal from "../components/interviews/InterviewDetailModal";

import type { Interview } from "../features/interviews/types";
import { getMyInterviews } from "../features/interviews/api";

import AddInterviewModal from "../components/interviews/AddInterviewModal";

export default function InterviewsPage() {
  const [selectedInterview, setSelectedInterview] = useState<Interview | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAddOpen, setIsAddOpen] = useState(false);

  function handleOpenInterview(interview: Interview) {
    setSelectedInterview(interview);
    setIsDetailOpen(true);
  }

  function handleCloseInterview() {
    setIsDetailOpen(false);
  }

  useEffect(() => {
    async function fetchInterviews() {
      try {
        setIsLoading(true);
        setError(null);

        const data = await getMyInterviews();
        setInterviews(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Failed to load interviews");
        }
      } finally {
        setIsLoading(false);
      }
    }

    fetchInterviews();
  }, []);

  return (
    <AppShell sidebar={<Sidebar />}>
      <div className="flex h-full flex-col">
        <TopBar
          title="Interviews"
          onAddInterview={() => setIsAddOpen(true)}
        />

        <main className="flex-1 overflow-y-auto px-6 pb-6 pt-6">
          <div className="mx-auto h-full w-full max-w-7xl">
            {isLoading ? (
              <div className="text-sm text-slate-500">Loading interviews...</div>
            ) : error ? (
              <div className="text-sm text-rose-500">{error}</div>
            ) : (
              <LayoutGroup id="interview-detail-transition">
                <InterviewBoard
                  interviews={interviews}
                  onCardClick={handleOpenInterview}
                  selectedInterview={selectedInterview}
                />

                <InterviewDetailModal
                  interview={selectedInterview}
                  open={isDetailOpen}
                  onClose={handleCloseInterview}
                />
              </LayoutGroup>
            )}
          </div>
        </main>
      </div>
      <AddInterviewModal
      open={isAddOpen}
      onClose={() => setIsAddOpen(false)}
      onSubmit={(values) => {
        console.log("New interview:", values);
      }}
    />
    </AppShell>
  );
}
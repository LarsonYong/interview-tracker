import { useEffect, useRef, useState } from "react";
import { LayoutGroup } from "framer-motion";

import AppShell from "../components/layout/AppShell";
import Sidebar from "../components/layout/Sidebar";
import TopBar from "../components/layout/TopBar";

import InterviewBoard from "../components/interviews/InterviewBoard";
import InterviewDetailModal from "../components/interviews/InterviewDetailModal";
import AddInterviewModal from "../components/interviews/AddInterviewModal";
import EditInterviewModal from "../components/interviews/EditInterviewModal";
import ConfirmModal from "../components/ui/ConfirmModal";
import Toast from "../components/ui/Toast";

import type { Interview } from "../features/interviews/types";
import type { InterviewFormValues } from "../components/interviews/InterviewForm";
import {
  createInterview,
  deleteInterview,
  getMyInterviews,
  updateInterview,
} from "../features/interviews/api";

export default function InterviewsPage() {
  const [selectedInterview, setSelectedInterview] = useState<Interview | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  const [editingInterview, setEditingInterview] = useState<Interview | null>(null);
  const [isSavingEdit, setIsSavingEdit] = useState(false);
  const [editError, setEditError] = useState<string | null>(null);

  const [deleteTarget, setDeleteTarget] = useState<Interview | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const [toastMessage, setToastMessage] = useState("");
  const [isToastOpen, setIsToastOpen] = useState(false);
  const toastTimerRef = useRef<number | null>(null);

  function handleOpenInterview(interview: Interview) {
    setSelectedInterview(interview);
    setIsDetailOpen(true);
  }

  function handleCloseInterview() {
    setIsDetailOpen(false);
  }

  function handleOpenAddModal() {
    setError(null);
    setIsAddOpen(true);
  }

  function showToast(message: string) {
    setToastMessage(message);
    setIsToastOpen(true);

    if (toastTimerRef.current) {
      window.clearTimeout(toastTimerRef.current);
    }

    toastTimerRef.current = window.setTimeout(() => {
      setIsToastOpen(false);
      toastTimerRef.current = null;
    }, 1800);
  }

  function handleOpenDeleteConfirm(interview: Interview) {
    setDeleteTarget(interview);
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

  useEffect(() => {
    return () => {
      if (toastTimerRef.current) {
        window.clearTimeout(toastTimerRef.current);
      }
    };
  }, []);

  async function handleCreateInterview(values: InterviewFormValues) {
    try {
      setError(null);
      setIsCreating(true);

      const createdInterview = await createInterview(values);

      setInterviews((prev) => [createdInterview, ...prev]);
      setSelectedInterview(createdInterview);
      setIsAddOpen(false);
      setIsDetailOpen(true);
      showToast("Interview added");
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Unable to create new interview");
      }
    } finally {
      setIsCreating(false);
    }
  }

  async function handleUpdateInterview(values: InterviewFormValues) {
    if (!editingInterview) return;

    try {
      setEditError(null);
      setIsSavingEdit(true);

      const updatedInterview = await updateInterview(editingInterview.id, values);

      setInterviews((prev) =>
        prev.map((interview) =>
          interview.id === updatedInterview.id ? updatedInterview : interview
        )
      );

      setSelectedInterview(updatedInterview);
      setEditingInterview(null);
      setIsDetailOpen(true);
      showToast("Changes saved");
    } catch (error: unknown) {
      console.log("Failed to update interview", error);

      if (error instanceof Error) {
        setEditError(error.message);
      } else {
        setEditError("Failed to save changes. Please try again.");
      }
    } finally {
      setIsSavingEdit(false);
    }
  }

  async function handleDeleteInterview(interviewId: string) {
    try {
      setError(null);
      setIsDeleting(true);

      await deleteInterview(interviewId);

      setInterviews((prev) =>
        prev.filter((interview) => interview.id !== interviewId)
      );

      if (selectedInterview?.id === interviewId) {
        setSelectedInterview(null);
        setIsDetailOpen(false);
      }

      if (editingInterview?.id === interviewId) {
        setEditingInterview(null);
        setEditError(null);
      }

      setDeleteTarget(null);
      showToast("Interview deleted");
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Failed to delete interview");
      }
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <AppShell sidebar={<Sidebar />}>
      <div className="flex h-full flex-col">
        <TopBar
          title="Interviews"
          onAddInterview={handleOpenAddModal}
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
                  isDetailOpen={isDetailOpen}
                />

                <InterviewDetailModal
                  interview={selectedInterview}
                  open={isDetailOpen}
                  onClose={handleCloseInterview}
                  onEditInterview={(interview) => {
                    setEditError(null);
                    setEditingInterview(interview);
                    setIsDetailOpen(false);
                  }}
                  onOpenDeleteConfirm={handleOpenDeleteConfirm}
                />
              </LayoutGroup>
            )}
          </div>
        </main>
      </div>

      <AddInterviewModal
        open={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onSubmit={handleCreateInterview}
        isSubmitting={isCreating}
      />

      <EditInterviewModal
        interview={editingInterview}
        open={!!editingInterview}
        onClose={() => {
          setEditingInterview(null);
          setEditError(null);
        }}
        isSubmitting={isSavingEdit}
        errorMessage={editError}
        onSubmit={handleUpdateInterview}
      />

      <ConfirmModal
        open={!!deleteTarget}
        title="Delete Interview?"
        description={
          deleteTarget
            ? `This will permanently remove ${deleteTarget.company} · ${deleteTarget.role} from your tracker.`
            : ""
        }
        confirmLabel="Delete"
        cancelLabel="Cancel"
        tone="destructive"
        isLoading={isDeleting}
        onClose={() => {
          if (isDeleting) return;
          setDeleteTarget(null);
        }}
        onConfirm={async () => {
          if (!deleteTarget) return;
          await handleDeleteInterview(deleteTarget.id);
        }}
      />

      <Toast open={isToastOpen} message={toastMessage} />
    </AppShell>
  );
}
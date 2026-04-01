import BaseModal from "./BaseModal";
import ModalBody from "./ModalBody";

type ConfirmModalProps = {
  open: boolean;
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  tone?: "default" | "destructive";
  isLoading?: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void> | void;
};

export default function ConfirmModal({
  open,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  tone = "default",
  isLoading = false,
  onClose,
  onConfirm,
}: ConfirmModalProps) {
  const confirmButtonClassName =
    tone === "destructive"
      ? "inline-flex h-11 items-center justify-center rounded-2xl border border-rose-200/80 bg-rose-50 px-5 text-sm font-medium text-rose-700 transition hover:bg-rose-100 disabled:cursor-not-allowed disabled:opacity-60"
      : "inline-flex h-11 items-center justify-center rounded-2xl bg-slate-900 px-5 text-sm font-medium text-white shadow-[0_8px_20px_rgba(15,23,42,0.16)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_24px_rgba(15,23,42,0.18)] disabled:cursor-not-allowed disabled:opacity-60";

  const iconClassName =
    tone === "destructive"
      ? "mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border border-rose-100 bg-rose-50/90"
      : "mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200/80 bg-slate-50/90";

  const iconColorClassName =
    tone === "destructive" ? "h-5 w-5 text-rose-600" : "h-5 w-5 text-slate-600";

  return (
    <BaseModal open={open} onClose={onClose} maxWidthClassName="max-w-md">
      <ModalBody>
        <div className="px-1 py-1">
          <div className={iconClassName}>
            {tone === "destructive" ? (
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className={iconColorClassName}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 3h6m-9 4h12m-1 0-.867 12.142A2 2 0 0 1 14.138 21H9.862a2 2 0 0 1-1.995-1.858L7 7m3 4v6m4-6v6"
                />
              </svg>
            ) : (
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className={iconColorClassName}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 8v4l2.5 2.5M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0Z"
                />
              </svg>
            )}
          </div>

          <div className="mt-5 text-center">
            <h2 className="text-[22px] font-semibold tracking-[-0.02em] text-slate-900">
              {title}
            </h2>

            {description ? (
              <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-slate-500">
                {description}
              </p>
            ) : null}
          </div>

          <div className="mt-8 flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="inline-flex h-11 items-center justify-center rounded-2xl border border-white/55 bg-white/78 px-5 text-sm font-medium text-slate-700 transition hover:bg-white hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {cancelLabel}
            </button>

            <button
              type="button"
              onClick={onConfirm}
              disabled={isLoading}
              className={confirmButtonClassName}
            >
              {isLoading ? "Working..." : confirmLabel}
            </button>
          </div>
        </div>
      </ModalBody>
    </BaseModal>
  );
}
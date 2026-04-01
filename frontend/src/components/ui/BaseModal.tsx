import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import type { ReactNode } from "react";

type BaseModalProps = {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  maxWidthClassName?: string;
};

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function BaseModal({
  open,
  onClose,
  children,
  maxWidthClassName = "max-w-6xl",
}: BaseModalProps) {
  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence mode="wait">
      {open ? (
        <div className="fixed inset-0 z-999">
          <motion.button
            type="button"
            aria-label="Close modal overlay"
            onClick={onClose}
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(8px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.14, ease: "linear" }}
            className="absolute inset-0 bg-black/8"
          />

          <div className="pointer-events-none absolute inset-0 flex items-center justify-center p-6">
            <div
              className={`pointer-events-auto w-full origin-center ${maxWidthClassName}`}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.97, y: 8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98, y: 4 }}
                transition={{ duration: 0.18, ease }}
                className="rounded-[28px] border border-white/60 bg-white/78 p-8 text-left shadow-[0_8px_24px_rgba(15,23,42,0.06)] md:p-10"
              >
                {children}
              </motion.div>
            </div>
          </div>
        </div>
      ) : null}
    </AnimatePresence>,
    document.body
  );
}
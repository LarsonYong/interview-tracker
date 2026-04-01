import { AnimatePresence, motion } from "framer-motion";

type ToastProps = {
  open: boolean;
  message: string;
};

export default function Toast({ open, message }: ToastProps) {
  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8, scale: 0.98 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="pointer-events-none fixed left-1/2 top-6 z-120 -translate-x-1/2"
        >
          <div className="rounded-2xl border border-white/60 bg-white/82 px-4 py-3 text-sm font-medium text-slate-800 shadow-[0_18px_48px_rgba(15,23,42,0.12)] backdrop-blur-xl">
            {message}
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
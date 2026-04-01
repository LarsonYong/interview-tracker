import { motion } from "framer-motion";
import type { ReactNode } from "react";

type ModalHeaderProps = {
  title: ReactNode;
  centered?: boolean;
};

export default function ModalHeader({
  title,
  centered = true,
}: ModalHeaderProps) {
  return (
    <div
      className={`border-b border-white/55 pb-6 ${
        centered ? "flex items-center justify-center" : ""
      }`}
    >
      <motion.h2
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="text-2xl font-semibold tracking-tight text-slate-900"
      >
        {title}
      </motion.h2>
    </div>
  );
}
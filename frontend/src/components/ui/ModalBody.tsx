import { motion } from "framer-motion";
import type { ReactNode } from "react";

type ModalBodyProps = {
  children: ReactNode;
};

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function ModalBody({ children }: ModalBodyProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.985 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 4, scale: 0.995 }}
      transition={{
        duration: 0.2,
        delay: 0.14,
        ease,
      }}
      className="origin-top"
    >
      <div className="pt-7">{children}</div>
    </motion.div>
  );
}
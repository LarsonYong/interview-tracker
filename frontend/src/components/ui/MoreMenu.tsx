import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type MoreMenuProps = {
  children: React.ReactNode;
};

export default function MoreMenu({ children }: MoreMenuProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <div ref={containerRef} className="relative">
      {/* trigger */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="rounded-lg px-2 py-1 text-slate-400 hover:bg-white/60 hover:text-slate-600 transition"
      >
        ⋯
      </button>

      {/* menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -4 }}
            transition={{ duration: 0.16 }}
            className="absolute right-0 z-50 mt-2 w-44 rounded-2xl border border-white/60 bg-white/80 p-2 shadow-lg backdrop-blur-xl"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

type MenuItemProps = {
  children: React.ReactNode;
  onClick?: () => void;
  destructive?: boolean;
};

export function MenuItem({
  children,
  onClick,
  destructive = false,
}: MenuItemProps) {
  return (
    <button
      onClick={onClick}
      className={`
        w-full text-left px-3 py-2 text-sm rounded-xl transition
        ${destructive
          ? "text-rose-500 hover:bg-rose-50"
          : "text-slate-700 hover:bg-white/70 hover:text-slate-900"}
      `}
    >
      {children}
    </button>
  );
}

export function MenuDivider() {
  return <div className="my-1 h-px bg-slate-200/60" />;
}
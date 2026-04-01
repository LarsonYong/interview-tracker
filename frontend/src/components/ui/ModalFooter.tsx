import type { ReactNode } from "react";

type ModalFooterProps = {
  children: ReactNode;
  justify?: "start" | "center" | "end" | "between";
};

function getJustifyClass(justify: ModalFooterProps["justify"]) {
  switch (justify) {
    case "start":
      return "justify-start";
    case "center":
      return "justify-center";
    case "between":
      return "justify-between";
    case "end":
    default:
      return "justify-end";
  }
}

export default function ModalFooter({
  children,
  justify = "end",
}: ModalFooterProps) {
  return (
    <div className="mt-12 border-t border-white/45 pt-8">
      <div className={`flex items-center gap-3 ${getJustifyClass(justify)}`}>
        {children}
      </div>
    </div>
  );
}
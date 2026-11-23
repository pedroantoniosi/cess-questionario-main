import type { ReactNode } from "react";

interface CardGradeProps {
  children: ReactNode;
  className?: string;
}

export default function CardGrade({
  children,
  className = "",
}: CardGradeProps) {
  return (
    <div
      className={`grid grid-cols-1 gap-4 lg:grid-cols-4 ${className}`}
    >
      {children}
    </div>
  );
}

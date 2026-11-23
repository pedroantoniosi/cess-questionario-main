"use client";

import { List, LayoutGrid } from "lucide-react";

type ViewMode = "list" | "grid";

interface ViewToggleProps {
  value: ViewMode;
  onChange: (value: ViewMode) => void;
}

export default function ViewToggle({
  value,
  onChange,
}: ViewToggleProps) {
  return (
    <div className="flex items-center gap-1 rounded-lg border border-white/10 bg-template p-1">
      <button
        type="button"
        onClick={() => onChange("list")}
        aria-label="Visualização em lista"
        aria-pressed={value === "list"}
        className={`cursor-pointer rounded-md p-2 transition-colors ${
          value === "list"
            ? "bg-navbar text-white"
            : "text-gray-400 hover:bg-white/10 hover:text-white"
        }`}
      >
        <List size={18} />
      </button>

      <button
        type="button"
        onClick={() => onChange("grid")}
        aria-label="Visualização em cards"
        aria-pressed={value === "grid"}
        className={`cursor-pointer rounded-md p-2 transition-colors ${
          value === "grid"
            ? "bg-navbar text-white"
            : "text-gray-400 hover:bg-white/10 hover:text-white"
        }`}
      >
        <LayoutGrid size={18} />
      </button>
    </div>
  );
}
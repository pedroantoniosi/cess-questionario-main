"use client";

import { Search } from "lucide-react";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export default function SearchInput({
  value,
  onChange,
  placeholder = "Pesquisar...",
  className = "",
}: SearchInputProps) {
  return (
    <div
      className={`flex w-full items-center gap-2 rounded-lg border border-[#454758] bg-template px-3 py-2 ${className}`}
    >
      <Search size={16} className="shrink-0 text-slate-400" />

      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
        className="w-full min-w-0 bg-transparent text-sm text-white placeholder:text-slate-400 outline-none"
      />
    </div>
  );
}

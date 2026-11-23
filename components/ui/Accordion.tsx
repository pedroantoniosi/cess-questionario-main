"use client";

import { ChevronDown } from "lucide-react";
import { useState, type ReactNode } from "react";

interface AccordionProps {
  /** Conteúdo sempre visível, mesmo com o acordeão fechado. */
  summary: ReactNode;
  /** Conteúdo revelado apenas quando o acordeão está aberto. */
  children: ReactNode;
  defaultOpen?: boolean;
  className?: string;
  /** Classe de cor de fundo do acordeão (ex: "bg-card"). Sem fundo por padrão. */
  background?: string;
}

export default function Accordion({
  summary,
  children,
  defaultOpen = false,
  className = "",
  background = "",
}: AccordionProps) {
  const [aberto, setAberto] = useState(defaultOpen);

  return (
    <div className={`overflow-hidden rounded-xl ${background} ${className}`}>
      <button
        type="button"
        onClick={() => setAberto((valor) => !valor)}
        aria-expanded={aberto}
        className="flex w-full items-center gap-4 px-5 py-4 text-left transition-colors hover:bg-white/[0.03] cursor-pointer"
      >
        <ChevronDown
          size={18}
          className={`shrink-0 text-gray-400 transition-transform ${aberto ? "rotate-180" : ""}`}
        />

        <div className="flex flex-1 flex-wrap items-center gap-x-6 gap-y-3">
          {summary}
        </div>
      </button>

      {aberto && (
        <div className="border-t border-white/5 px-5 py-4">{children}</div>
      )}
    </div>
  );
}

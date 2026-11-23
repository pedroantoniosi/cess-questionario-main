"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

interface PopoverProps {
  /** Conteúdo do botão que abre/fecha o popover. */
  trigger: ReactNode;
  /** Conteúdo exibido dentro do painel do popover. */
  children: ReactNode;
  /** Lado ao qual o painel é alinhado em relação ao botão. */
  align?: "left" | "right";
  /** Classes adicionais para o botão de gatilho. */
  triggerClassName?: string;
  /** Classes adicionais para o painel do popover. */
  panelClassName?: string;
}

export default function Popover({
  trigger,
  children,
  align = "left",
  triggerClassName = "",
  panelClassName = "",
}: PopoverProps) {
  const [aberto, setAberto] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!aberto) return;

    function handleClickFora(event: MouseEvent) {
      if (!containerRef.current?.contains(event.target as Node)) {
        setAberto(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setAberto(false);
    }

    document.addEventListener("mousedown", handleClickFora);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickFora);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [aberto]);

  return (
    <div ref={containerRef} className="relative inline-block">
      <button
        type="button"
        onClick={() => setAberto((valor) => !valor)}
        aria-expanded={aberto}
        className={
          triggerClassName ||
          "flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-gray-300 transition-colors hover:bg-white/10"
        }
      >
        {trigger}
      </button>

      {aberto && (
        <div
          className={`absolute top-full z-20 mt-2 w-64 rounded-xl border border-white/10 bg-[#21222D] p-4 shadow-xl ${
            align === "right" ? "right-0" : "left-0"
          } ${panelClassName}`}
        >
          {children}
        </div>
      )}
    </div>
  );
}

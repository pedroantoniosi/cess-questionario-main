"use client";

import { Ban, X } from "lucide-react";
import { useEffect } from "react";

import type { Rodada } from "../rodada/types";

interface ModalCancelarRodadaProps {
  rodada: Rodada;
  onFechar: () => void;
  onConfirmar: () => void;
}

export default function ModalCancelarRodada({
  rodada,
  onFechar,
  onConfirmar,
}: ModalCancelarRodadaProps) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onFechar();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onFechar]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={(event) => {
        if (event.target === event.currentTarget) onFechar();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="titulo-modal-cancelar-rodada"
    >
      <div className="flex w-full max-w-sm flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-5">
          <h2
            id="titulo-modal-cancelar-rodada"
            className="text-lg font-bold text-gray-900"
          >
            Cancelar rodada
          </h2>

          <button
            type="button"
            onClick={onFechar}
            aria-label="Fechar"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        <div className="px-6 py-5">
          <p className="text-sm text-gray-600">
            Tem certeza que deseja cancelar{" "}
            <span className="font-semibold text-gray-900">{rodada.titulo}</span>? Essa
            ação não pode ser desfeita: a rodada deixará de aceitar participantes e
            respostas, mas permanece registrada para fins de auditoria.
          </p>
        </div>

        <div className="flex items-center justify-end gap-3 border-t border-gray-200 px-6 py-4">
          <button
            type="button"
            onClick={onFechar}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 cursor-pointer"
          >
            Voltar
          </button>

          <button
            type="button"
            onClick={onConfirmar}
            className="flex items-center gap-2 rounded-lg bg-red-500 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-red-600 cursor-pointer"
          >
            <Ban size={16} />
            Cancelar rodada
          </button>
        </div>
      </div>
    </div>
  );
}

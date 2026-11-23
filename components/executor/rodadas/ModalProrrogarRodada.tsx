"use client";

import { CalendarClock, X } from "lucide-react";
import { useEffect, useState } from "react";

import { dataBrParaIso, dataIsoParaBr } from "../rodada/rodadaPageData";
import type { Rodada } from "../rodada/types";

interface ModalProrrogarRodadaProps {
  rodada: Rodada;
  onFechar: () => void;
  onConfirmar: (novaDataEncerramento: string) => void;
}

export default function ModalProrrogarRodada({
  rodada,
  onFechar,
  onConfirmar,
}: ModalProrrogarRodadaProps) {
  const [novaData, setNovaData] = useState(dataBrParaIso(rodada.dataEncerramento));

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onFechar();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onFechar]);

  const dataAtualIso = dataBrParaIso(rodada.dataEncerramento);
  const dataValida = novaData.length > 0 && novaData > dataAtualIso;

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!dataValida) return;
    onConfirmar(dataIsoParaBr(novaData));
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={(event) => {
        if (event.target === event.currentTarget) onFechar();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="titulo-modal-prorrogar-rodada"
    >
      <form
        onSubmit={handleSubmit}
        className="flex w-full max-w-sm flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
      >
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-5">
          <h2
            id="titulo-modal-prorrogar-rodada"
            className="text-lg font-bold text-gray-900"
          >
            Prorrogar rodada
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

        <div className="flex flex-col gap-4 px-6 py-5">
          <p className="text-sm text-gray-600">
            Defina a nova data de encerramento de{" "}
            <span className="font-semibold text-gray-900">{rodada.titulo}</span>. A data
            atual de encerramento é {rodada.dataEncerramento}.
          </p>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="nova-data-encerramento" className="text-sm font-medium text-gray-700">
              Nova data de encerramento <span className="text-red-500">*</span>
            </label>
            <input
              id="nova-data-encerramento"
              type="date"
              value={novaData}
              min={dataAtualIso}
              onChange={(event) => setNovaData(event.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
            {novaData.length > 0 && !dataValida && (
              <p className="text-xs text-red-500">
                A nova data precisa ser posterior à data de encerramento atual.
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 border-t border-gray-200 px-6 py-4">
          <button
            type="button"
            onClick={onFechar}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 cursor-pointer"
          >
            Cancelar
          </button>

          <button
            type="submit"
            disabled={!dataValida}
            className="flex items-center gap-2 rounded-lg bg-blue-500 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
          >
            <CalendarClock size={16} />
            Prorrogar
          </button>
        </div>
      </form>
    </div>
  );
}

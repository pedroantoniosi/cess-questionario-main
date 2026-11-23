"use client";

import { CalendarDays, Info, MessageSquareText } from "lucide-react";

import Accordion from "@/components/ui/Accordion";

import { STATUS_RODADA_LABELS, STATUS_RODADA_STYLES } from "./rodadaPageData";
import type { Rodada } from "./types";

interface RodadaInfoAccordionProps {
  rodada: Rodada;
}

export default function RodadaInfoAccordion({ rodada }: RodadaInfoAccordionProps) {
  return (
    <Accordion
      summary={
        <>
          <span
            className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium ${STATUS_RODADA_STYLES[rodada.status]}`}
          >
            {STATUS_RODADA_LABELS[rodada.status]}
          </span>

          <span className="flex items-center gap-2 text-sm text-gray-300">
            <CalendarDays size={16} className="text-gray-400" />
            Início: <time>{rodada.dataInicio}</time>
          </span>

          <span className="flex items-center gap-2 text-sm text-gray-300">
            <CalendarDays size={16} className="text-gray-400" />
            Encerramento: <time>{rodada.dataEncerramento}</time>
          </span>
        </>
      }
    >
      <div className="flex items-start gap-3">
        <MessageSquareText size={18} className="mt-0.5 shrink-0 text-gray-400" />

        <div className="flex flex-col gap-1">
          <h3 className="text-sm font-semibold text-gray-200">Observações</h3>
          {rodada.observacoes ? (
            <p className="text-sm leading-relaxed text-gray-400">{rodada.observacoes}</p>
          ) : (
            <p className="flex items-center gap-2 text-sm text-gray-500">
              <Info size={14} />
              Nenhuma observação registrada para esta rodada.
            </p>
          )}
        </div>
      </div>
    </Accordion>
  );
}

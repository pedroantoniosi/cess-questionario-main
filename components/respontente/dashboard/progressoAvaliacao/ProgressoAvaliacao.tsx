import { CircleCheck, CircleDashed, CircleDot, Flag, ListChecks } from "lucide-react";

import Card from "@/components/ui/Card";

import { STATUS_BLOCO } from "../../questionario/questionarioData";
import { StatusBloco } from "../../questionario/types";
import { useProgressoAvaliacao } from "./hooks/useProgressoAvaliacao";
import { ProgressoAvaliacaoProps } from "./types";

const VISUAL_STATUS: Record<
  StatusBloco,
  { icone: typeof CircleCheck; cor: string; etiqueta: string }
> = {
  concluido: {
    icone: CircleCheck,
    cor: "text-(--color-high)",
    etiqueta: "border-(--color-high)/30 bg-(--color-high)/15 text-(--color-high)",
  },
  finalizado: {
    icone: CircleCheck,
    cor: "text-gray-300",
    etiqueta: "border-white/15 bg-white/5 text-gray-300",
  },
  em_andamento: {
    icone: CircleDot,
    cor: "text-(--color-medium)",
    etiqueta: "border-(--color-medium)/50 bg-(--color-medium)/20 text-white",
  },
  nao_iniciado: {
    icone: CircleDashed,
    cor: "text-gray-400",
    etiqueta: "border-white/15 bg-white/5 text-gray-300",
  },
};

/** Card do dashboard: progresso geral e situação de cada bloco. */
export default function ProgressoAvaliacao({
  dados,
  className = "",
}: ProgressoAvaliacaoProps) {
  const { titulo, aviso, percentual, blocos, concluidos } =
    useProgressoAvaliacao(dados);

  return (
    <Card className={`gap-5 p-5 text-white ${className}`}>
      {/* CABEÇALHO (nome dentro do card) */}
      <header className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-(--color-high)/30 bg-(--color-high)/10 text-(--color-high)">
            <ListChecks size={20} aria-hidden="true" />
          </div>
          <h2 className="text-lg font-bold leading-tight">{titulo}</h2>
        </div>

        <span className="shrink-0 rounded-md border border-white/15 px-2.5 py-0.5 text-xs font-semibold text-gray-200">
          {concluidos} de {blocos.length} blocos concluídos
        </span>
      </header>

      {/* PROGRESSO GERAL */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between gap-3 text-sm font-bold">
          <span>{percentual}% concluído</span>
          <span aria-hidden="true">{percentual}%</span>
        </div>

        <div
          className="h-2 w-full overflow-hidden rounded-full bg-template"
          role="progressbar"
          aria-label="Progresso da avaliação"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={percentual}
        >
          <div
            className="h-full rounded-full bg-(--color-high) transition-all duration-300"
            style={{ width: `${percentual}%` }}
          />
        </div>
      </div>

      {/* BLOCOS */}
      {blocos.length === 0 ? (
        <p className="text-sm text-gray-400">Nenhum bloco nesta avaliação.</p>
      ) : (
        <ul className="flex flex-col">
          {blocos.map((bloco) => {
            const visual = VISUAL_STATUS[bloco.status];
            const StatusIcon = visual.icone;

            return (
              <li
                key={bloco.id}
                className="flex items-center gap-3 border-b border-white/10 py-3 last:border-b-0"
              >
                <StatusIcon
                  size={18}
                  className={`shrink-0 ${visual.cor}`}
                  aria-hidden="true"
                />

                <span className="min-w-0 flex-1 truncate text-sm text-gray-200">
                  Bloco {bloco.ordem} — {bloco.titulo}
                </span>

                <span
                  className={`shrink-0 whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-semibold ${visual.etiqueta}`}
                >
                  {STATUS_BLOCO[bloco.status].etiqueta}
                </span>
              </li>
            );
          })}
        </ul>
      )}

      {/* AVISO */}
      {aviso && (
        <div
          className="flex items-start gap-4 rounded-xl border border-dashed border-white/20 p-4"
          role="status"
        >
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/15">
            <Flag size={16} aria-hidden="true" />
          </span>

          <div className="flex min-w-0 flex-col gap-1">
            <span className="text-xs font-extrabold uppercase tracking-wider">
              {aviso.titulo}
            </span>
            <p className="text-sm text-gray-300">{aviso.texto}</p>
          </div>
        </div>
      )}
    </Card>
  );
}

import { CircleCheck, Clock, ClipboardCheck, Flag } from "lucide-react";

import Card from "@/components/ui/Card";

import CardCabecalho from "../shared/CardCabecalho";
import { AvaliacaoRodadaDados } from "./types";

interface AvaliacaoRodadaProps {
  dados: AvaliacaoRodadaDados;
}

const CAIXA = "rounded-xl border border-white/10 bg-template p-3";

/** Card pequeno: progresso da avaliação e blocos respondidos/pendentes. */
export default function AvaliacaoRodada({ dados }: AvaliacaoRodadaProps) {
  const percentual = Math.min(100, Math.max(0, Math.round(dados.percentual)));

  return (
    <Card className="h-full gap-4 p-5 text-white">
      <CardCabecalho
        titulo="Progresso da avaliação"
        descricao="Andamento da rodada mais recente"
        icone={<ClipboardCheck size={20} aria-hidden="true" />}
      />

      {/* Progresso */}
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between gap-3 text-xs">
          <span className="text-gray-400">
            {percentual}% da rodada concluída
          </span>
          <span className="font-bold">{percentual}%</span>
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
            className="h-full rounded-full bg-(--color-high)"
            style={{ width: `${percentual}%` }}
          />
        </div>
      </div>

      {/* Blocos respondidos e pendentes */}
      <dl className="grid grid-cols-2 gap-3">
        <div className={`${CAIXA} flex items-center gap-2.5`}>
          <CircleCheck
            size={18}
            className="shrink-0 text-(--color-high)"
            aria-hidden="true"
          />
          <div className="flex min-w-0 flex-col-reverse">
            <dt className="text-xs text-gray-400">Respondidos</dt>
            <dd className="text-lg font-extrabold leading-tight">
              {dados.blocosRespondidos}
            </dd>
          </div>
        </div>

        <div className={`${CAIXA} flex items-center gap-2.5`}>
          <Clock
            size={18}
            className="shrink-0 text-gray-400"
            aria-hidden="true"
          />
          <div className="flex min-w-0 flex-col-reverse">
            <dt className="text-xs text-gray-400">Pendentes</dt>
            <dd className="text-lg font-extrabold leading-tight">
              {dados.blocosPendentes}
            </dd>
          </div>
        </div>
      </dl>

      {dados.aviso && (
        <p
          className={`${CAIXA} mt-auto flex items-start gap-2 border-dashed text-sm text-gray-300`}
        >
          <Flag size={16} className="mt-0.5 shrink-0" aria-hidden="true" />
          {dados.aviso}
        </p>
      )}
    </Card>
  );
}

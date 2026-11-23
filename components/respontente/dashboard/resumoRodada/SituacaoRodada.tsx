import { CalendarCheck } from "lucide-react";

import Card from "@/components/ui/Card";

import CardCabecalho from "../../shared/CardCabecalho";
import { SituacaoRodadaDados } from "./types";

interface SituacaoRodadaProps {
  dados: SituacaoRodadaDados;
}

const LINHA =
  "flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-template p-3";
const ETIQUETA =
  "rounded-md border border-white/15 px-2.5 py-0.5 text-xs font-semibold text-gray-200";

/** Card pequeno: status, data e contagens da rodada. */
export default function SituacaoRodada({ dados }: SituacaoRodadaProps) {
  const ativa = dados.status === "ativa";

  return (
    <Card className="h-full gap-4 p-5 text-white">
      <CardCabecalho
        titulo="Situação da rodada"
        descricao="Status e respostas registradas"
        icone={<CalendarCheck size={20} aria-hidden="true" />}
      />

      <dl className="flex flex-col gap-3">
        {dados.rodada && (
          <div className={LINHA}>
            <dt className="text-sm text-gray-400">Rodada</dt>
            <dd className={ETIQUETA}>{dados.rodada}</dd>
          </div>
        )}

        <div className={LINHA}>
          <dt className="text-sm text-gray-400">Status</dt>
          <dd className="flex items-center gap-2">
            <span
              className={`h-2 w-2 rounded-full ${
                ativa ? "bg-(--color-high)" : "bg-white/40"
              }`}
              aria-hidden="true"
            />
            <span className={ETIQUETA}>{ativa ? "ATIVA" : "INATIVA"}</span>
          </dd>
        </div>

        <div className={LINHA}>
          <dt className="text-sm text-gray-400">{dados.dataRotulo}</dt>
          <dd className={ETIQUETA}>{dados.data}</dd>
        </div>

        <div className={LINHA}>
          <dt className="text-sm text-gray-400">Blocos respondidos</dt>
          <dd className={ETIQUETA}>
            {dados.blocosRespondidos} de {dados.totalBlocos}
          </dd>
        </div>

        <div className={LINHA}>
          <dt className="text-sm text-gray-400">Questões respondidas</dt>
          <dd className={ETIQUETA}>
            {dados.questoesRespondidas} de {dados.totalQuestoes}
          </dd>
        </div>
      </dl>
    </Card>
  );
}

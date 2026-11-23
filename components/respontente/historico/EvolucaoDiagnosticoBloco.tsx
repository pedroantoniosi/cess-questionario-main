import { Radar } from "lucide-react";

import Card from "@/components/ui/Card";

import CardCabecalho from "../shared/CardCabecalho";
import { CORES_RODADAS } from "./historicoData";
import RadarBlocos from "./RadarBlocos";
import { BlocoHistorico, RodadaHistorico } from "./types";

interface EvolucaoDiagnosticoBlocoProps {
  blocos: BlocoHistorico[];
  /** Da mais antiga para a mais recente. */
  rodadas: RodadaHistorico[];
}

/** Pontuação (%) de cada bloco, comparada entre as rodadas concluídas. */
export default function EvolucaoDiagnosticoBloco({
  blocos,
  rodadas,
}: EvolucaoDiagnosticoBlocoProps) {
  const series = rodadas
    .filter((rodada) => rodada.status === "concluida")
    .map((rodada, i) => ({
      id: rodada.id,
      nome: rodada.periodo,
      cor: CORES_RODADAS[i % CORES_RODADAS.length],
      valores: blocos.map(
        (bloco) =>
          rodada.pontuacaoPorBloco.find((p) => p.blocoId === bloco.id)
            ?.percentual ?? 0,
      ),
    }));

  return (
    <Card className="gap-5 border border-white/10 p-5 text-white">
      <CardCabecalho
        titulo="Evolução do diagnóstico por bloco"
        descricao="Pontuação (%) de cada bloco comparada entre rodadas concluídas"
        icone={<Radar size={20} aria-hidden="true" />}
      />

      <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-2">
        {/* Radar + legenda das rodadas */}
        <div className="flex flex-col items-center gap-3">
          <RadarBlocos
            eixos={blocos.map((bloco) => bloco.sigla)}
            series={series}
            titulo="Pontuação por bloco em cada rodada concluída"
          />

          {series.length > 0 && (
            <ul className="flex flex-wrap justify-center gap-x-4 gap-y-1">
              {series.map((serie) => (
                <li
                  key={serie.id}
                  className="flex items-center gap-2 text-xs text-gray-300"
                >
                  <span
                    className="h-2 w-2 shrink-0 rounded-full"
                    style={{ backgroundColor: serie.cor }}
                    aria-hidden="true"
                  />
                  {serie.nome}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Blocos */}
        <ul className="flex flex-col gap-3">
          {blocos.map((bloco) => (
            <li key={bloco.id} className="flex items-start gap-3 text-sm">
              <span className="shrink-0 whitespace-nowrap rounded-md bg-(--color-medium) px-2 py-0.5 text-xs font-extrabold text-white">
                {bloco.sigla}
              </span>
              <p className="text-gray-300">
                <strong className="font-bold text-white">{bloco.titulo}:</strong>{" "}
                {bloco.descricao}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
}

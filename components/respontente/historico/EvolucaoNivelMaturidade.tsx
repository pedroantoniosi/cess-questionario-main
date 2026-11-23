import { ArrowDown, ArrowUp, Minus, TrendingUp } from "lucide-react";

import Card from "@/components/ui/Card";

import {
  estiloEtiquetaNivel,
  NIVEIS_MATURIDADE,
} from "../dashboard/historicoMaturidade/historicoMaturidadeData";
import { NivelMaturidade } from "../dashboard/historicoMaturidade/types";
import CardCabecalho from "../shared/CardCabecalho";
import { RodadaHistorico } from "./types";

interface EvolucaoNivelMaturidadeProps {
  /** Da mais antiga para a mais recente. */
  rodadas: RodadaHistorico[];
}

type RodadaAvaliada = RodadaHistorico & { nivel: NivelMaturidade };

const NIVEIS: NivelMaturidade[] = ["N0", "N1", "N2", "N3", "N4", "N5"];

/** Diferença de nível em relação à rodada anterior. */
function Variacao({ atual, anterior }: { atual: number; anterior: number }) {
  const diferenca = atual - anterior;
  const niveis = Math.abs(diferenca) === 1 ? "nível" : "níveis";

  if (diferenca > 0) {
    return (
      <span className="flex items-center gap-1 text-xs font-semibold text-(--color-high)">
        <ArrowUp size={14} aria-hidden="true" />
        Subiu {diferenca} {niveis}
      </span>
    );
  }

  if (diferenca < 0) {
    return (
      <span className="flex items-center gap-1 text-xs font-semibold text-gray-300">
        <ArrowDown size={14} aria-hidden="true" />
        Caiu {-diferenca} {niveis}
      </span>
    );
  }

  return (
    <span className="flex items-center gap-1 text-xs font-semibold text-gray-400">
      <Minus size={14} aria-hidden="true" />
      Manteve o nível
    </span>
  );
}

/** Trilha N0…N5 com os níveis já alcançados preenchidos. */
function TrilhaNiveis({ nivel }: { nivel: NivelMaturidade }) {
  const indiceAtual = NIVEIS.indexOf(nivel);
  const { cor, descricao } = NIVEIS_MATURIDADE[nivel];

  return (
    <ol
      className="grid grid-cols-6 gap-1.5"
      aria-label={`Nível alcançado: ${nivel} · ${descricao}`}
    >
      {NIVEIS.map((codigo, indice) => {
        const atual = indice === indiceAtual;
        const alcancado = indice <= indiceAtual;

        return (
          <li
            key={codigo}
            aria-current={atual ? "step" : undefined}
            className="flex min-w-0 flex-col items-center gap-1.5"
          >
            <span
              className={`h-2 w-full rounded-full ${alcancado ? "" : "bg-white/10"}`}
              style={
                alcancado
                  ? { backgroundColor: cor, opacity: atual ? 1 : 0.45 }
                  : undefined
              }
            />
            <span
              className={`text-xs ${
                atual ? "font-extrabold text-white" : "font-semibold text-gray-500"
              }`}
            >
              {codigo}
            </span>
            <span
              className={`hidden w-full truncate text-center text-[11px] sm:block ${
                atual ? "text-gray-200" : "text-gray-500"
              }`}
            >
              {NIVEIS_MATURIDADE[codigo].descricao}
            </span>
          </li>
        );
      })}
    </ol>
  );
}

/** Nível (N0 a N5) de cada rodada concluída e avaliada, da mais recente para a mais antiga. */
export default function EvolucaoNivelMaturidade({
  rodadas,
}: EvolucaoNivelMaturidadeProps) {
  const avaliadas = rodadas.filter(
    (rodada): rodada is RodadaAvaliada =>
      rodada.status === "concluida" && rodada.nivel !== null,
  );

  return (
    <Card className="gap-5 border border-white/10 p-5 text-white">
      <CardCabecalho
        titulo="Evolução do nível de maturidade"
        descricao="Progressão do nível N0 a N5 por rodada concluída e avaliada"
        icone={<TrendingUp size={20} aria-hidden="true" />}
      />

      {avaliadas.length === 0 ? (
        <p className="py-8 text-center text-sm text-gray-400">
          Ainda não há rodada concluída e avaliada.
        </p>
      ) : (
        <ol className="flex flex-col gap-3">
          {avaliadas
            .map((rodada, indice) => ({
              rodada,
              anterior: indice > 0 ? avaliadas[indice - 1] : null,
            }))
            .reverse()
            .map(({ rodada, anterior }) => {
              const { descricao } = NIVEIS_MATURIDADE[rodada.nivel];

              return (
                <li
                  key={rodada.id}
                  className="flex flex-col gap-4 rounded-xl border border-white/10 bg-template p-4"
                >
                  <div className="flex flex-wrap items-center gap-3">
                    <span
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-extrabold"
                      style={estiloEtiquetaNivel(rodada.nivel)}
                    >
                      {rodada.nivel}
                    </span>

                    <div className="flex min-w-0 flex-1 flex-col">
                      <span className="truncate text-sm font-bold">
                        {rodada.periodo}
                      </span>
                      <span className="text-xs text-gray-400">
                        {rodada.nivel} · {descricao}
                      </span>
                    </div>

                    <div className="flex flex-col items-end gap-0.5">
                      {rodada.pontuacao !== null && (
                        <span className="text-lg font-extrabold tabular-nums">
                          {rodada.pontuacao}%
                        </span>
                      )}
                      {anterior && (
                        <Variacao
                          atual={NIVEIS.indexOf(rodada.nivel)}
                          anterior={NIVEIS.indexOf(anterior.nivel)}
                        />
                      )}
                    </div>
                  </div>

                  <TrilhaNiveis nivel={rodada.nivel} />
                </li>
              );
            })}
        </ol>
      )}
    </Card>
  );
}

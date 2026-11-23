"use client";

import { History } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import Card from "@/components/ui/Card";

import { estiloEtiquetaNivel } from "../dashboard/historicoMaturidade/historicoMaturidadeData";
import CardCabecalho from "../shared/CardCabecalho";
import { rotaPerguntas } from "../questionario/responder/hooks/useResponderQuestionario";
import { STATUS_RODADA } from "./historicoData";
import { RodadaHistorico } from "./types";

interface HistoricoRodadasProps {
  rodadas: RodadaHistorico[];
}

const TH =
  "px-3 py-2 text-left text-xs font-extrabold uppercase tracking-wider text-gray-300";
const TD = "px-3 py-3 text-sm";

/**
 * Tabela das rodadas: nível, respostas, blocos e situação. Cada linha é
 * clicável e abre as perguntas do questionário.
 */
export default function HistoricoRodadas({ rodadas }: HistoricoRodadasProps) {
  const router = useRouter();
  // Mais recente primeiro
  const linhas = [...rodadas].reverse();

  return (
    <Card className="gap-5 border border-white/10 p-5 text-white">
      <CardCabecalho
        titulo="Histórico de rodadas"
        descricao="Rodadas em que a instalação participou, com datas e status da avaliação"
        icone={<History size={20} aria-hidden="true" />}
      />

      {linhas.length === 0 ? (
        <p className="py-6 text-center text-sm text-gray-400">
          Sem histórico de rodadas.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] border-collapse">
            <thead>
              <tr className="border-b border-white/15">
                <th scope="col" className={TH}>
                  Período
                </th>
                <th scope="col" className={TH}>
                  Início
                </th>
                <th scope="col" className={TH}>
                  Encerramento
                </th>
                <th scope="col" className={TH}>
                  Nível
                </th>
                <th scope="col" className={TH}>
                  Respondidas
                </th>
                <th scope="col" className={TH}>
                  Blocos
                </th>
                <th scope="col" className={TH}>
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {linhas.map((rodada) => {
                const status = STATUS_RODADA[rodada.status];

                return (
                  <tr
                    key={rodada.id}
                    onClick={() => router.push(rotaPerguntas(rodada.id))}
                    className="cursor-pointer border-b border-white/10 transition-colors last:border-b-0 hover:bg-white/5"
                  >
                    <th scope="row" className={`${TD} text-left font-bold`}>
                      <Link
                        href={rotaPerguntas(rodada.id)}
                        className="rounded outline-none hover:underline focus-visible:ring-2 focus-visible:ring-(--color-high)"
                        aria-label={`Abrir as perguntas da rodada ${rodada.periodo}`}
                      >
                        {rodada.periodo}
                      </Link>
                    </th>
                    <td className={`${TD} whitespace-nowrap text-gray-200`}>
                      {rodada.inicio}
                    </td>
                    <td className={`${TD} whitespace-nowrap text-gray-200`}>
                      {rodada.fim ?? "Em aberto"}
                    </td>
                    <td className={TD}>
                      {rodada.nivel ? (
                        <span
                          className="rounded-full px-2.5 py-0.5 text-xs font-extrabold"
                          style={estiloEtiquetaNivel(rodada.nivel)}
                        >
                          {rodada.nivel}
                        </span>
                      ) : (
                        <span className="text-gray-400">—</span>
                      )}
                    </td>
                    <td className={`${TD} font-bold text-(--color-high)`}>
                      {rodada.respondidas}%
                    </td>
                    <td className={`${TD} font-semibold`}>
                      {rodada.blocosRespondidos}/{rodada.totalBlocos}
                    </td>
                    <td className={TD}>
                      <span
                        className={`whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-semibold ${status.classe}`}
                      >
                        {status.etiqueta}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  );
}

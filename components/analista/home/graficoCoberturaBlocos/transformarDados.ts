import { BlockCoverage, OverviewResponse } from "@/lib/api/analyticsService";
import { BlocoCobertura, CoberturaGeral, StatusCobertura } from "./types";

function statusDoBloco(bloco: BlockCoverage): StatusCobertura {
  const total = bloco.installations || 1;

  return {
    completo: Math.round((bloco.complete / total) * 100),
    emParte: Math.round((bloco.partial / total) * 100),
    semResposta: Math.round((bloco.none / total) * 100),
  };
}

export function construirCoberturaGeral(
  overview: OverviewResponse
): CoberturaGeral {
  const blocos: BlocoCobertura[] = overview.blockCoverage.map((bloco) => ({
    id: String(bloco.blockId ?? bloco.code),
    codigo: bloco.code,
    nome: bloco.name,
    status: statusDoBloco(bloco),
  }));

  const totais = overview.blockCoverage.reduce(
    (acc, bloco) => ({
      complete: acc.complete + bloco.complete,
      partial: acc.partial + bloco.partial,
      none: acc.none + bloco.none,
      slots: acc.slots + bloco.installations,
    }),
    { complete: 0, partial: 0, none: 0, slots: 0 }
  );

  const slots = totais.slots || 1;

  const statusGeral: StatusCobertura = {
    completo: Math.round((totais.complete / slots) * 100),
    emParte: Math.round((totais.partial / slots) * 100),
    semResposta: Math.round((totais.none / slots) * 100),
  };

  return {
    titulo: "Cobertura dos blocos",
    subtitulo:
      "Instalações com cada bloco respondido por completo, em parte ou sem resposta.",
    rotuloMetricaPrincipal: "% de blocos respondidos por completo",
    rodape:
      "Calculado a partir das respostas das instalações na rodada atual.",
    statusGeral,
    blocos,
  };
}

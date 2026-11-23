import {
  Installation,
  OverviewInstallation,
  OverviewResponse,
} from "@/lib/api/analyticsService";
import { installationTypeLabel } from "@/lib/api/installationType";
import { METADADOS_ESTADOS_BRASIL } from "./dadosEstadoMock";
import { COORDENADAS_ESTADOS } from "./mapaBrasilPath";
import { nivelMaturidadeDe, obterEstiloMaturidade } from "./maturidadeEstilos";
import {
  DetalhesEstadoMock,
  EstadoDistribuicao,
  InstalacaoDetalhe,
  SiglaEstado,
  StatusQuestionarioEstado,
} from "./types";

function isSiglaValida(
  state: string | null | undefined
): state is SiglaEstado {
  return !!state && state in METADADOS_ESTADOS_BRASIL;
}

function statusQuestionarioDe(
  resultado: OverviewInstallation | undefined
): StatusQuestionarioEstado {
  if (!resultado) return "Pendente";
  if (resultado.submittedAt) return "Concluído";
  return resultado.answeredPercent > 0 ? "Em andamento" : "Pendente";
}

export function construirEstados(
  instalacoes: Installation[]
): { titulo: string; descricao: string; estados: EstadoDistribuicao[] } {
  const contagemPorEstado = new Map<SiglaEstado, number>();

  for (const instalacao of instalacoes) {
    if (!isSiglaValida(instalacao.state)) continue;
    contagemPorEstado.set(
      instalacao.state,
      (contagemPorEstado.get(instalacao.state) ?? 0) + 1
    );
  }

  const total = [...contagemPorEstado.values()].reduce(
    (acc, quantidade) => acc + quantidade,
    0
  );

  const estados: EstadoDistribuicao[] = [...contagemPorEstado.entries()].map(
    ([sigla, quantidade]) => {
      const meta = METADADOS_ESTADOS_BRASIL[sigla];

      return {
        estado: meta.nome as EstadoDistribuicao["estado"],
        sigla,
        capital: meta.capital,
        instalacoes: quantidade,
        percentual: total > 0 ? (quantidade / total) * 100 : 0,
        coordenadas: COORDENADAS_ESTADOS[sigla],
      };
    }
  );

  return {
    titulo: "Distribuição por estado",
    descricao: "Distribuição geográfica das instalações cadastradas.",
    estados,
  };
}

export function construirDetalhesEstado(
  sigla: SiglaEstado,
  instalacoes: Installation[],
  overview: OverviewResponse
): DetalhesEstadoMock {
  const meta = METADADOS_ESTADOS_BRASIL[sigla];

  const resultadosPorId = new Map(
    overview.installations.map((item) => [item.installationId, item])
  );

  const instalacoesDoEstado = instalacoes.filter((i) => i.state === sigla);

  const totalGeral = instalacoes.filter((i) =>
    isSiglaValida(i.state)
  ).length;

  const instalacoesDetalhe: InstalacaoDetalhe[] = instalacoesDoEstado.map(
    (instalacao) => {
      const resultado = resultadosPorId.get(instalacao.id);
      const progresso = resultado?.answeredPercent ?? 0;
      const nivelMaturidade = resultado?.evaluated
        ? nivelMaturidadeDe(resultado.maturityLevel)
        : "N0";

      return {
        id: instalacao.uuid,
        nome: instalacao.name,
        municipio: instalacao.city ?? "-",
        nivelMaturidade,
        statusQuestionario: statusQuestionarioDe(resultado),
        progresso,
        responsavel: instalacao.responsibleName ?? "-",
        ultimaAtualizacao: resultado?.submittedAt
          ? new Date(resultado.submittedAt).toLocaleDateString("pt-BR")
          : "-",
        segmento: installationTypeLabel(instalacao.installationType),
        conformidade: undefined,
        blocosDetalhados: resultado?.blocks.map((bloco) => ({
          codigo: bloco.code,
          nome: bloco.name,
          percentual: bloco.percentage,
          status:
            bloco.percentage === 100
              ? ("Completo" as const)
              : bloco.percentage > 0
                ? ("Em parte" as const)
                : ("Sem resposta" as const),
        })),
      };
    }
  );

  const concluidos = instalacoesDetalhe.filter(
    (i) => i.statusQuestionario === "Concluído"
  ).length;

  const emAndamento = instalacoesDetalhe.filter(
    (i) => i.statusQuestionario === "Em andamento"
  ).length;

  const pendentes = instalacoesDetalhe.filter(
    (i) => i.statusQuestionario === "Pendente"
  ).length;

  const niveisAvaliados = instalacoesDetalhe
    .filter((i) => i.nivelMaturidade !== "N0")
    .map((i) => Number(i.nivelMaturidade.slice(1)));

  const nivelMedio =
    niveisAvaliados.length > 0
      ? Math.round(
          niveisAvaliados.reduce((acc, n) => acc + n, 0) /
            niveisAvaliados.length
        )
      : 0;

  const nivelMaturidadeMedia = nivelMaturidadeDe(nivelMedio);
  const estiloMedio = obterEstiloMaturidade(nivelMaturidadeMedia);

  const taxaConclusao =
    instalacoesDetalhe.length > 0
      ? Math.round(
          instalacoesDetalhe.reduce((acc, i) => acc + i.progresso, 0) /
            instalacoesDetalhe.length
        )
      : 0;

  const blocosMap = new Map<
    string,
    { nome: string; soma: number; total: number }
  >();

  for (const instalacao of instalacoesDetalhe) {
    for (const bloco of instalacao.blocosDetalhados ?? []) {
      const atual = blocosMap.get(bloco.codigo) ?? {
        nome: bloco.nome,
        soma: 0,
        total: 0,
      };
      atual.soma += bloco.percentual;
      atual.total += 1;
      blocosMap.set(bloco.codigo, atual);
    }
  }

  const coberturaBlocos = [...blocosMap.entries()].map(
    ([codigo, { nome, soma, total }]) => ({
      codigo,
      nome,
      percentual: total > 0 ? Math.round(soma / total) : 0,
    })
  );

  return {
    sigla,
    nome: meta.nome,
    capital: meta.capital,
    regiao: meta.regiao,
    totalInstalacoes: instalacoesDoEstado.length,
    percentualNacional:
      totalGeral > 0 ? (instalacoesDoEstado.length / totalGeral) * 100 : 0,
    maturidadeMedia: {
      nivel: nivelMaturidadeMedia,
      pontuacao: nivelMedio * 20,
      descricao: estiloMedio.descricao,
      cor: estiloMedio.corHex,
    },
    taxaConclusao,
    statusGeral: {
      concluidos,
      emAndamento,
      pendentes,
    },
    instalacoes: instalacoesDetalhe,
    coberturaBlocos,
  };
}

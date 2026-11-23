import { CoberturaGeral } from "./types";

export const CORES_COBERTURA = {
  completo: {
    chave: "completo" as const,
    rotulo: "Respondido por completo",
    rotuloCurto: "Completo",
    corHex: "#84CC16", // --color-high
    corVar: "var(--color-high, #84CC16)",
    bgClass: "bg-high",
    textClass: "text-high",
  },
  emParte: {
    chave: "emParte" as const,
    rotulo: "Respondido em parte",
    rotuloCurto: "Em parte",
    corHex: "#397F35", // --color-medium
    corVar: "var(--color-medium, #397F35)",
    bgClass: "bg-medium",
    textClass: "text-medium",
  },
  semResposta: {
    chave: "semResposta" as const,
    rotulo: "Sem resposta",
    rotuloCurto: "Sem resposta",
    corHex: "#0A4542", // --color-low
    corVar: "var(--color-low, #0A4542)",
    bgClass: "bg-low",
    textClass: "text-low",
  },
} as const;

/**
 * Percentuais calculados a partir dos `metadata.statuses` das 6 instalações
 * da seed de desenvolvimento (backend/prisma/seeds/development/020_installations.seed.js),
 * cruzados com os 6 blocos cadastrados em 030_questionnaire_blocks.seed.js (B1 a B6).
 */
export const mockCoberturaGeral: CoberturaGeral = {
  titulo: "Cobertura dos blocos",
  subtitulo:
    "Instalações com cada bloco respondido por completo, em parte ou sem resposta.",
  rotuloMetricaPrincipal: "% de blocos respondidos por completo",
  rodape: "Calculado a partir das respostas das instalações na rodada selecionada.",
  statusGeral: {
    completo: 47,
    emParte: 20,
    semResposta: 33,
  },
  blocos: [
    {
      id: "b1",
      codigo: "B1",
      nome: "Informações Gerais",
      status: {
        completo: 100,
        emParte: 0,
        semResposta: 0,
      },
    },
    {
      id: "b2",
      codigo: "B2",
      nome: "Infraestrutura Física e Acessibilidade",
      status: {
        completo: 83,
        emParte: 17,
        semResposta: 0,
      },
    },
    {
      id: "b3",
      codigo: "B3",
      nome: "Aspectos Regulatórios e Licenciamentos",
      status: {
        completo: 50,
        emParte: 33,
        semResposta: 17,
      },
    },
    {
      id: "b4",
      codigo: "B4",
      nome: "Aspectos Ambientais e Materiais Perigosos",
      status: {
        completo: 34,
        emParte: 33,
        semResposta: 33,
      },
    },
    {
      id: "b5",
      codigo: "B5",
      nome: "Recursos Humanos",
      status: {
        completo: 17,
        emParte: 17,
        semResposta: 66,
      },
    },
    {
      id: "b6",
      codigo: "B6",
      nome: "Capacidade Financeira e Segurança",
      status: {
        completo: 0,
        emParte: 17,
        semResposta: 83,
      },
    },
  ],
};

import { ResumoRodadaDados } from "./types";

/**
 * Dados de exemplo (mock) de cada rodada, pela chave da rodada. Serão
 * substituídos pelos dados da API quando o backend for ligado a esta tela.
 *
 * "2024" segue a submissão real da Dock Brasil na seed. "2025" é
 * ILUSTRATIVA: a instalação não tem submissão na seed de 2025; só a data
 * de encerramento vem da seed da rodada, o restante foi inventado.
 */
export const mockResumoPorRodada: Record<string, ResumoRodadaDados> = {
  "2024": {
    nivelAtual: { nivel: "N1", rodada: "2024" },

    situacao: {
      rodada: "2024",
      status: "inativa",
      dataRotulo: "Finalizada em",
      data: "01/09/2025",
      blocosRespondidos: 6,
      totalBlocos: 6,
      questoesRespondidas: 121,
      totalQuestoes: 129,
    },

    proximosNiveis: [
      { codigo: "N1", situacao: "atual" },
      {
        codigo: "N2",
        situacao: "proximo",
        criterios: { atendidos: 20, total: 23 },
      },
      { codigo: "N3", situacao: "futuro" },
      { codigo: "N4", situacao: "futuro" },
      { codigo: "N5", situacao: "futuro" },
    ],
  },

  "2025": {
    nivelAtual: { nivel: "N2", rodada: "2025" },

    situacao: {
      rodada: "2025",
      status: "inativa",
      dataRotulo: "Finalizada em",
      data: "31/12/2025",
      blocosRespondidos: 6,
      totalBlocos: 6,
      questoesRespondidas: 102,
      totalQuestoes: 132,
    },

    proximosNiveis: [
      { codigo: "N2", situacao: "atual" },
      {
        codigo: "N3",
        situacao: "proximo",
        criterios: { atendidos: 22, total: 26 },
      },
      { codigo: "N4", situacao: "futuro" },
      { codigo: "N5", situacao: "futuro" },
    ],
  },
};

/** Rodada mais recente: padrão das telas que não escolhem rodada. */
export const mockResumoRodada: ResumoRodadaDados = mockResumoPorRodada["2025"];

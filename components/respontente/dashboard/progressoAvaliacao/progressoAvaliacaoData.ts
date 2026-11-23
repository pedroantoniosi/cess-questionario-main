import { mockQuestionario } from "../../questionario/questionarioData";
import { StatusBloco } from "../../questionario/types";
import { ProgressoAvaliacaoDados } from "./types";

const TITULO = "Progresso da Avaliação";

/** Status dos blocos na rodada "2025" (ilustrativos), na ordem dos blocos. */
const STATUS_2025: StatusBloco[] = [
  "concluido",
  "concluido",
  "finalizado",
  "finalizado",
  "concluido",
  "concluido",
];

/**
 * Dados de exemplo (mock) de cada rodada, pela chave da rodada. Serão
 * substituídos pelos dados da API quando o backend for ligado a esta tela.
 *
 * "2024": os blocos são os mesmos da tela de Questionário (submissão real
 * da Dock Brasil na seed). "2025" é ILUSTRATIVA: não vem da seed.
 */
export const mockProgressoPorRodada: Record<string, ProgressoAvaliacaoDados> = {
  "2024": {
    titulo: TITULO,
    percentual: 94,
    blocos: mockQuestionario.blocos.map((bloco) => ({
      id: bloco.id,
      ordem: bloco.ordem,
      titulo: bloco.titulo,
      status: bloco.status,
    })),
    aviso: {
      titulo: "Rodada concluída",
      texto:
        'A rodada "2024" foi encerrada em 01/09/2025. Suas respostas foram enviadas e estão disponíveis apenas para consulta.',
    },
  },

  "2025": {
    titulo: TITULO,
    percentual: 77,
    blocos: mockQuestionario.blocos.map((bloco, indice) => ({
      id: bloco.id,
      ordem: bloco.ordem,
      titulo: bloco.titulo,
      status: STATUS_2025[indice] ?? "finalizado",
    })),
    aviso: {
      titulo: "Rodada concluída",
      texto:
        'A rodada "2025" foi encerrada em 31/12/2025. Suas respostas foram enviadas e estão disponíveis apenas para consulta.',
    },
  },
};

/** Rodada mais recente: padrão quando nenhuma rodada é escolhida. */
export const mockProgressoAvaliacao: ProgressoAvaliacaoDados =
  mockProgressoPorRodada["2025"];

import { questoes2024 } from "./questoes2024";
import { questoes2025 } from "./questoes2025";
import { ResponderQuestionarioDados } from "./types";

/**
 * Dados de exemplo (mock) das perguntas de cada rodada, pela id da
 * rodada. Serão substituídos pelos dados da API quando o backend for
 * ligado a esta tela. Detalhes de origem em questoes2024.ts e
 * questoes2025.ts.
 *
 * "2024" fica aberta para edição (as respostas ficam salvas no
 * navegador); "2025" é rodada encerrada, só para consulta.
 */
export const mockResponderPorRodada: Record<string, ResponderQuestionarioDados> = {
  "2024": {
    questoes: questoes2024,
    rodada: { titulo: "Questionário 2024", status: "ativa" },
  },
  "2025": {
    questoes: questoes2025,
    rodada: { titulo: "Questionário 2025", status: "inativa" },
  },
};

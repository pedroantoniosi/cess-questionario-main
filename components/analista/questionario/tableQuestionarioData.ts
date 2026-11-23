export type StatusRodada = "aberta" | "rascunho" | "encerrada";

export interface RodadaQuestionario {
  id: string;
  /** ID do questionário (entidade Questionnaire) exibido nesta rodada,
   * usado para navegar até /questionarios/[questionarioId]. */
  questionarioId: string;
  rodada: string;
  questionario: string;
  periodo: string;
  instalacoes: number;
  status: string;
  statusTipo: StatusRodada;
}

/**
 * Dados de exemplo (mock), derivados das rodadas reais do questionário
 * "Questionário do Modelo de Maturidade" (backend/prisma/seeds/catalogs):
 * - 2024 (v1.0): backend/prisma/seeds/data/070_questionnaire_2024_round.data.js
 *   e 060_questionnaire_2024_history.data.js (22 instalações participantes).
 * - 2025 (v2.0): backend/prisma/seeds/data/060_questionnaire_2025_history.data.js
 *   (12 instalações participantes).
 * Ambas as rodadas da seed já estão com roundStatus "CLOSED"; não há
 * rodada aberta na seed atual. Serão substituídos pelos dados da API
 * quando o backend for ligado a esta tela (GET /round).
 */
export const mockRodadasQuestionario: RodadaQuestionario[] = [
  {
    id: "01d61cae-6e3c-5177-85a9-2ce9e7520d6e",
    questionarioId: "9c1f7b2a-1a2b-4c3d-9e0f-aa11bb22cc01",
    rodada: "Questionário 2024",
    questionario: "Modelo de Maturidade v1.0",
    periodo: "12/01/2024 – 01/09/2025",
    instalacoes: 22,
    status: "Encerrada",
    statusTipo: "encerrada",
  },
  {
    id: "a5b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d",
    questionarioId: "9c1f7b2a-1a2b-4c3d-9e0f-aa11bb22cc02",
    rodada: "Questionário 2025",
    questionario: "Modelo de Maturidade v2.0",
    periodo: "18/09/2025 – 23/02/2026",
    instalacoes: 12,
    status: "Encerrada",
    statusTipo: "encerrada",
  },
];

export const statusRodadaStyles: Record<StatusRodada, string> = {
  aberta: "bg-[#84CC16]/15 text-[#84CC16]",
  rascunho: "bg-[#397F35]/20 text-[#65B85F]",
  encerrada: "bg-[#0A4542]/60 text-[#55B9AA]",
};

export const STATUS_RODADA_OPCOES: StatusRodada[] = [
  "aberta",
  "rascunho",
  "encerrada",
];

export const STATUS_RODADA_LABELS: Record<StatusRodada, string> = {
  aberta: "Aberta",
  rascunho: "Rascunho",
  encerrada: "Encerrada",
};

export const statusRodadaDot: Record<StatusRodada, string> = {
  aberta: "bg-[#84CC16]",
  rascunho: "bg-[#65B85F]",
  encerrada: "bg-[#55B9AA]",
};

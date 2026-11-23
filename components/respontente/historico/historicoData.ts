import { mockResumoRodada } from "../dashboard/resumoRodada/resumoRodadaData";
import { mockQuestionario } from "../questionario/questionarioData";
import { HistoricoDados, StatusRodadaHistorico } from "./types";

export const STATUS_RODADA: Record<
  StatusRodadaHistorico,
  { etiqueta: string; classe: string }
> = {
  concluida: {
    etiqueta: "Concluída",
    classe: "border-(--color-high)/30 bg-(--color-high)/15 text-(--color-high)",
  },
  em_andamento: {
    etiqueta: "Em andamento",
    classe: "border-(--color-medium)/50 bg-(--color-medium)/20 text-white",
  },
};

/** Cores das rodadas nos gráficos de comparação, na ordem das rodadas. */
export const CORES_RODADAS = [
  "var(--color-high)",
  "var(--color-medium)",
  "var(--color-navbar)",
  "var(--color-low)",
];

/**
 * Dados de exemplo (mock), derivados da submissão histórica real da
 * Dock Brasil Engenharia e Serviços S.A. na rodada "Questionário 2024"
 * (backend/prisma/seeds/data/060_questionnaire_2024_history.data.js,
 * instalação uuid 9773b318-5cff-51d1-85b4-335c13647e12 — a instalação à
 * qual o login de demonstração respondent@questionnaire.com é vinculado
 * em backend/prisma/seeds/development/100_respondent_participation.seed.js).
 *
 * `respondidas` (94%) e `pontuacaoPorBloco` foram calculados cruzando as
 * respostas da instalação com o catálogo de questões por bloco
 * (050_questionnaire_2024_questions.data.js): `respondidas` é o percentual
 * de questões respondidas, e cada item de `pontuacaoPorBloco` é a média das
 * notas de avaliação (evaluationScore, escala 0–5) das questões avaliativas
 * daquele bloco, convertida para percentual.
 *
 * `nivel` é mantido em "N1" para bater com o mesmo nível usado em
 * historicoMaturidadeData.ts e resumoRodadaData.ts para esta mesma rodada:
 * a classificação real de nível usa um modelo de critérios cumulativos por
 * Natureza (ML1=10, ML2=23, ML3=26, ML4=30, ML5=35 critérios, ver comentário
 * em 050_questionnaire_2024_questions.data.js) que não é recalculável a
 * partir dos dados de seed sem a lógica do backend
 * (src/modules/analytics/roundConsolidation.service.js).
 *
 * Serão substituídos pelos dados da API quando o backend for ligado a
 * esta tela.
 */
export const mockHistorico: HistoricoDados = {
  blocos: mockQuestionario.blocos.map((bloco) => ({
    id: bloco.id,
    sigla: `BL ${bloco.ordem}`,
    titulo: bloco.titulo,
    descricao: bloco.descricao,
  })),

  rodadas: [
    {
      id: "2024",
      periodo: "Questionário 2024 — respostas históricas",
      inicio: "12/01/2024",
      fim: "01/09/2025",
      nivel: "N1",
      pontuacao: 79,
      respondidas: 94,
      blocosRespondidos: 6,
      totalBlocos: 6,
      status: "concluida",
      pontuacaoPorBloco: [
        { blocoId: "informacoes-gerais", percentual: 84 },
        { blocoId: "infraestrutura-fisica-acessibilidade", percentual: 84 },
        { blocoId: "aspectos-regulatorios-licenciamentos", percentual: 84 },
        { blocoId: "aspectos-ambientais-materiais-perigosos", percentual: 65 },
        { blocoId: "recursos-humanos", percentual: 80 },
        { blocoId: "capacidade-financeira-seguranca", percentual: 78 },
      ],
    },
    // ILUSTRATIVA: a Dock Brasil não tem submissão na seed de 2025
    // (060_questionnaire_2025_history.data.js). Só o título e as datas vêm
    // da seed da rodada; nível, pontuação e percentuais foram inventados.
    {
      id: "2025",
      periodo: "Questionário 2025",
      inicio: "01/01/2025",
      fim: "31/12/2025",
      nivel: "N2",
      pontuacao: 83,
      respondidas: 77,
      blocosRespondidos: 6,
      totalBlocos: 6,
      status: "concluida",
      pontuacaoPorBloco: [
        { blocoId: "informacoes-gerais", percentual: 88 },
        { blocoId: "infraestrutura-fisica-acessibilidade", percentual: 86 },
        { blocoId: "aspectos-regulatorios-licenciamentos", percentual: 87 },
        { blocoId: "aspectos-ambientais-materiais-perigosos", percentual: 72 },
        { blocoId: "recursos-humanos", percentual: 83 },
        { blocoId: "capacidade-financeira-seguranca", percentual: 80 },
      ],
    },
  ],

  // Mesmos dados exibidos no dashboard
  situacao: mockResumoRodada.situacao,
  proximosNiveis: mockResumoRodada.proximosNiveis,

  avaliacao: {
    percentual: 77,
    blocosRespondidos: 6,
    blocosPendentes: 0,
    aviso: "Rodada concluída — disponível apenas para consulta.",
  },
};

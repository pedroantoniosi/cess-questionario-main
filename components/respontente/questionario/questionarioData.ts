import { QuestionarioDados, StatusBloco } from "./types";

/** Rótulos e textos de cada status de bloco. */
export const STATUS_BLOCO: Record<
  StatusBloco,
  { etiqueta: string; acao: string }
> = {
  concluido: { etiqueta: "Concluído", acao: "Respondido" },
  finalizado: { etiqueta: "Finalizado", acao: "Ver respostas" },
  em_andamento: { etiqueta: "Em andamento", acao: "Continuar respondendo" },
  nao_iniciado: { etiqueta: "Não iniciado", acao: "Iniciar" },
};

/**
 * Regra do status de um bloco:
 * 100% respondido = concluído; prazo da rodada encerrado = finalizado;
 * senão, em andamento (ou não iniciado, se ainda está em 0%).
 */
export function statusDoBloco(
  percentual: number,
  prazoEncerrado: boolean,
): StatusBloco {
  if (percentual >= 100) return "concluido";
  if (prazoEncerrado) return "finalizado";
  return percentual > 0 ? "em_andamento" : "nao_iniciado";
}

/**
 * Prazo da rodada de exemplo: a rodada real vinculada ao login de
 * demonstração (respondent@questionnaire.com -> Dock Brasil, rodada
 * "Questionário 2024") já está com `roundStatus: "CLOSED"` e `endDate`
 * em 01/09/2025 (backend/prisma/seeds/data/070_questionnaire_2024_round.data.js),
 * portanto o prazo já está encerrado.
 */
const PRAZO_ENCERRADO = true;

/**
 * Dados de exemplo (mock), com percentuais de resposta derivados da
 * submissão histórica real da Dock Brasil na rodada "Questionário 2024"
 * (backend/prisma/seeds/data/060_questionnaire_2024_history.data.js),
 * cruzados com o catálogo de questões por bloco
 * (050_questionnaire_2024_questions.data.js). Serão substituídos pelos
 * dados da API quando o backend for ligado a esta tela.
 */
export const mockQuestionario: QuestionarioDados = {
  orientacoes: {
    titulo: "Orientações para preenchimento",
    descricao:
      "Leia as recomendações antes de iniciar ou continuar a resposta.",
    itens: [
      "Preencha o questionário com calma e de forma detalhada.",
      "Período da rodada: 12/01/2024 a 01/09/2025.",
      "As respostas devem ser embasadas em documentação e dados verificados.",
      "Se necessário, consulte outros colegas e fontes antes de responder.",
      "As respostas salvas podem ser alteradas até o envio final. Depois do envio, ficam disponíveis apenas para consulta.",
    ],
    alerta:
      "Todas as respostas fornecidas devem ser verídicas, pois serão verificadas durante a análise e o diagnóstico. Dados falsos podem impactar a validade dos resultados.",
    rodape:
      "As respostas informadas poderão ser verificadas durante a etapa de análise.",
  },
  prazoEncerrado: PRAZO_ENCERRADO,
  // Mesma rodada e mesmos números do dashboard (94% das questões
  // respondidas, 121 respostas) para a submissão real da Dock Brasil.
  rodada: {
    id: "2024",
    titulo: "Questionário 2024",
    status: PRAZO_ENCERRADO ? "encerrada" : "aberta",
    inicio: "12/01/2024",
    fim: "01/09/2025",
    percentual: 94,
    totalQuestoes: 129,
    submissoes: 1,
    respostas: 121,
  },
  blocos: [
    {
      id: "informacoes-gerais",
      ordem: 1,
      titulo: "Informações Gerais",
      descricao: "Informações gerais relacionadas ao diagnóstico.",
      percentual: 91,
      tempoEstimadoMin: 10,
    },
    {
      id: "infraestrutura-fisica-acessibilidade",
      ordem: 2,
      titulo: "Infraestrutura Física e Acessibilidade",
      descricao:
        "Avaliação da infraestrutura física e das condições de acessibilidade.",
      percentual: 96,
      tempoEstimadoMin: 30,
    },
    {
      id: "aspectos-regulatorios-licenciamentos",
      ordem: 3,
      titulo: "Aspectos Regulatórios e Licenciamentos",
      descricao:
        "Avaliação dos aspectos regulatórios, legais e relacionados aos licenciamentos.",
      percentual: 90,
      tempoEstimadoMin: 10,
    },
    {
      id: "aspectos-ambientais-materiais-perigosos",
      ordem: 4,
      titulo: "Aspectos Ambientais e Materiais Perigosos",
      descricao:
        "Avaliação dos aspectos ambientais e do gerenciamento de materiais perigosos.",
      percentual: 92,
      tempoEstimadoMin: 10,
    },
    {
      id: "recursos-humanos",
      ordem: 5,
      titulo: "Recursos Humanos",
      descricao:
        "Avaliação dos recursos humanos, organização e aspectos relacionados à equipe.",
      percentual: 100,
      tempoEstimadoMin: 10,
    },
    {
      id: "capacidade-financeira-seguranca",
      ordem: 6,
      titulo: "Capacidade Financeira e Segurança",
      descricao:
        "Avaliação da capacidade financeira e dos aspectos relacionados à segurança.",
      percentual: 100,
      tempoEstimadoMin: 10,
    },
  ].map((bloco) => ({
    ...bloco,
    status: statusDoBloco(bloco.percentual, PRAZO_ENCERRADO),
  })),
};

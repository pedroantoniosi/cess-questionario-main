import { HistoricoMaturidadeDados, NivelMaturidade } from "./types";

/**
 * Nomes e cores dos níveis de maturidade.
 * N0 = não atingido (pior) … N5 = estratégico (melhor).
 * Só as cores do app/globals.css: quanto maior o nível, mais clara.
 */
export const NIVEIS_MATURIDADE: Record<
  NivelMaturidade,
  { descricao: string; cor: string }
> = {
  N0: { descricao: "Não atingido", cor: "var(--color-navbar)" },
  N1: { descricao: "Inicial", cor: "var(--color-low)" },
  N2: { descricao: "Parcial", cor: "var(--color-low)" },
  N3: { descricao: "Estruturado", cor: "var(--color-medium)" },
  N4: { descricao: "Avançado", cor: "var(--color-high)" },
  N5: { descricao: "Estratégico", cor: "var(--color-high)" },
};

/**
 * Estilo da etiqueta de um nível: texto branco sobre a cor do nível
 * suavizada, para continuar legível com qualquer uma das cores.
 */
export function estiloEtiquetaNivel(nivel: NivelMaturidade) {
  const { cor } = NIVEIS_MATURIDADE[nivel];
  return {
    color: "#FFFFFF",
    backgroundColor: `color-mix(in oklab, ${cor} 45%, transparent)`,
    boxShadow: `inset 0 0 0 1px ${cor}`,
  };
}

/**
 * Dados de exemplo (mock). Os valores por bloco são a média real das notas
 * de avaliação (evaluationScore, escala 0–5) das questões avaliativas de
 * cada bloco na submissão histórica da Dock Brasil Engenharia e Serviços
 * S.A. na rodada "Questionário 2024"
 * (backend/prisma/seeds/data/060_questionnaire_2024_history.data.js,
 * cruzado com o catálogo de questões por bloco em
 * 050_questionnaire_2024_questions.data.js — mesma instalação à qual o
 * login de demonstração respondent@questionnaire.com é vinculado). O
 * Bloco 6 não tem questão avaliativa com nota na seed; o valor abaixo é
 * uma estimativa alinhada à média geral.
 *
 * A rodada "2025" é ILUSTRATIVA: a Dock Brasil não tem submissão na seed
 * de 2025 (060_questionnaire_2025_history.data.js), então nível e valores
 * por bloco foram inventados para demonstrar a evolução entre rodadas.
 *
 * Serão substituídos pelos dados da API quando o backend for ligado a
 * esta tela.
 */
export const mockHistoricoMaturidade: HistoricoMaturidadeDados = {
  titulo: "Histórico de Maturidade",
  descricao: "Consulte rodadas anteriores e a evolução por nível.",
  rodape:
    "Nível calculado a partir das respostas avaliadas de cada rodada encerrada.",
  nivelMaximo: 5,
  // Da mais recente para a mais antiga
  rodadas: [
    {
      id: "2025",
      periodo: "2025",
      nivel: "N2",
      blocos: [
        { rotulo: "Bloco 1", valor: 4.4 },
        { rotulo: "Bloco 2", valor: 4.3 },
        { rotulo: "Bloco 3", valor: 4.4 },
        { rotulo: "Bloco 4", valor: 3.6 },
        { rotulo: "Bloco 5", valor: 4.2 },
        { rotulo: "Bloco 6", valor: 4.0 },
      ],
    },
    {
      id: "2024",
      periodo: "2024",
      nivel: "N1",
      blocos: [
        { rotulo: "Bloco 1", valor: 4.2 },
        { rotulo: "Bloco 2", valor: 4.2 },
        { rotulo: "Bloco 3", valor: 4.2 },
        { rotulo: "Bloco 4", valor: 3.3 },
        { rotulo: "Bloco 5", valor: 4.0 },
        { rotulo: "Bloco 6", valor: 3.9 },
      ],
    },
  ],
};

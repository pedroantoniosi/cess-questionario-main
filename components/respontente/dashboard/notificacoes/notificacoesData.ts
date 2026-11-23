import { RESPONDENTE_BASE } from "../../menu/menuData";
import { NotificacoesDados } from "./types";

const TITULO = "Notificações e avisos";
const DESCRICAO = "Comunicados do sistema sobre a rodada da sua instalação";

/**
 * Dados de exemplo (mock) de cada rodada, pela chave da rodada. Serão
 * substituídos pelos dados da API quando o backend for ligado a esta tela.
 *
 * Os textos seguem os mesmos números dos outros cards do dashboard:
 * "2024" = nível N1, 121 de 129 questões, 20 de 23 critérios (seed);
 * "2025" = nível N2, 102 de 132 questões, 22 de 26 critérios (ilustrativa,
 * não vem da seed).
 */
export const mockNotificacoesPorRodada: Record<string, NotificacoesDados> = {
  "2024": {
    titulo: TITULO,
    descricao: DESCRICAO,
    itens: [
      {
        id: "nivel-calculado",
        tipo: "notificacao",
        titulo: "Nível de maturidade calculado",
        texto:
          'A rodada "2024" foi avaliada e a instalação alcançou o nível N1 · Inicial.',
        data: "01/09/2025",
        acao: {
          rotulo: "Ver histórico",
          href: `${RESPONDENTE_BASE}/historico`,
        },
      },
      {
        id: "rodada-encerrada",
        tipo: "aviso",
        titulo: "Rodada encerrada",
        texto:
          'O prazo da rodada "2024" terminou. As respostas ficam disponíveis apenas para consulta.',
        data: "01/09/2025",
        acao: {
          rotulo: "Ver respostas",
          href: `${RESPONDENTE_BASE}/questionario`,
        },
      },
      {
        id: "questoes-sem-resposta",
        tipo: "aviso",
        titulo: "Questões sem resposta",
        texto:
          "8 das 129 questões ficaram sem resposta nesta rodada e não entraram no cálculo do nível.",
        data: "01/09/2025",
      },
      {
        id: "proximo-nivel",
        tipo: "notificacao",
        titulo: "Faltam 3 critérios para o nível N2",
        texto:
          "A instalação atende 20 dos 23 critérios do próximo nível. Eles serão reavaliados na próxima rodada.",
        data: "01/09/2025",
      },
    ],
  },

  "2025": {
    titulo: TITULO,
    descricao: DESCRICAO,
    itens: [
      {
        id: "nivel-calculado",
        tipo: "notificacao",
        titulo: "Nível de maturidade calculado",
        texto:
          'A rodada "2025" foi avaliada e a instalação subiu do nível N1 para o N2 · Parcial.',
        data: "31/12/2025",
        acao: {
          rotulo: "Ver histórico",
          href: `${RESPONDENTE_BASE}/historico`,
        },
      },
      {
        id: "rodada-encerrada",
        tipo: "aviso",
        titulo: "Rodada encerrada",
        texto:
          'O prazo da rodada "2025" terminou. As respostas ficam disponíveis apenas para consulta.',
        data: "31/12/2025",
      },
      {
        id: "questoes-sem-resposta",
        tipo: "aviso",
        titulo: "Questões sem resposta",
        texto:
          "30 das 132 questões ficaram sem resposta nesta rodada e não entraram no cálculo do nível.",
        data: "31/12/2025",
      },
      {
        id: "proximo-nivel",
        tipo: "notificacao",
        titulo: "Faltam 4 critérios para o nível N3",
        texto:
          "A instalação atende 22 dos 26 critérios do próximo nível. Eles serão reavaliados na próxima rodada.",
        data: "31/12/2025",
      },
    ],
  },
};

/** Rodada mais recente: padrão quando nenhuma rodada é escolhida. */
export const mockNotificacoes: NotificacoesDados =
  mockNotificacoesPorRodada["2025"];

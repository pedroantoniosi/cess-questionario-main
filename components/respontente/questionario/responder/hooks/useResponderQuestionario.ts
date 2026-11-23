"use client";

import { useMemo, useState } from "react";

import {
  PREFIXO_ARMAZENAMENTO,
  useArmazenamentoLocal,
} from "../../../shared/useArmazenamentoLocal";
import { mockResponderPorRodada } from "../responderData";
import { RespostaQuestao, ResponderQuestionarioDados } from "../types";

export const ROTA_QUESTIONARIO = "/respondente/questionario";
/** Página das perguntas de uma rodada. */
export const rotaPerguntas = (rodadaId: string) =>
  `${ROTA_QUESTIONARIO}/perguntas/${rodadaId}`;

/** Máximo de questões por página. */
export const MAXIMO_POR_PAGINA = 30;

const temResposta = (resposta: RespostaQuestao | undefined) =>
  Array.isArray(resposta) ? resposta.length > 0 : Boolean(resposta?.trim());

export function useResponderQuestionario(
  rodadaId: string,
  dados?: Partial<ResponderQuestionarioDados>,
  porPaginaSolicitado: number = MAXIMO_POR_PAGINA,
) {
  // Merge dos dados recebidos via props com o mock padrão
  const padrao = mockResponderPorRodada[rodadaId];
  const questoesRecebidas = dados?.questoes ?? padrao?.questoes ?? [];
  const rodada =
    dados?.rodada ?? padrao?.rodada ?? { titulo: "", status: "inativa" as const };

  const questoes = useMemo(
    () => [...questoesRecebidas].sort((a, b) => a.numero - b.numero),
    [questoesRecebidas],
  );

  // Paginação: nunca mais que MAXIMO_POR_PAGINA questões por página
  const porPagina = Math.min(
    MAXIMO_POR_PAGINA,
    Math.max(1, Math.floor(porPaginaSolicitado)),
  );
  const totalPaginas = Math.max(1, Math.ceil(questoes.length / porPagina));
  const [paginaPedida, setPagina] = useState(1);
  const pagina = Math.min(Math.max(1, paginaPedida), totalPaginas);

  const inicio = (pagina - 1) * porPagina;
  const questoesDaPagina = questoes.slice(inicio, inicio + porPagina);

  // Respostas editadas: guardadas no navegador a cada alteração, até o
  // envio ao backend ser ligado. Uma chave por rodada.
  const {
    valor: editadas,
    salvar: setEditadas,
    limpar: descartarEdicoes,
    carregado,
  } = useArmazenamentoLocal<Record<string, RespostaQuestao>>(
    `${PREFIXO_ARMAZENAMENTO}:respostas:${rodadaId}`,
    {},
  );

  const respostaDe = (questaoId: string): RespostaQuestao => {
    if (questaoId in editadas) return editadas[questaoId];
    const original = questoes.find((q) => q.id === questaoId);
    return (
      original?.resposta ?? (original?.tipo === "multipla_escolha" ? [] : "")
    );
  };

  const responder = (questaoId: string, resposta: RespostaQuestao) =>
    setEditadas((atual) => ({ ...atual, [questaoId]: resposta }));

  const obrigatorias = questoes.filter((q) => q.obrigatoria).length;
  const respondidas = questoes.filter((q) =>
    temResposta(q.id in editadas ? editadas[q.id] : q.resposta),
  ).length;

  // Rodada encerrada: as respostas ficam apenas para consulta
  const somenteLeitura = rodada.status !== "ativa";

  return {
    rodada,
    questoes,
    questoesDaPagina,
    pagina,
    totalPaginas,
    irParaPagina: (numero: number) =>
      setPagina(Math.min(Math.max(1, numero), totalPaginas)),
    /** Posição (1 a N) da primeira e da última questão da página. */
    primeiraDaPagina: questoes.length === 0 ? 0 : inicio + 1,
    ultimaDaPagina: inicio + questoesDaPagina.length,
    obrigatorias,
    respondidas,
    respostaDe,
    responder,
    somenteLeitura,
    /** Quantas respostas foram alteradas e estão guardadas. */
    alteradas: Object.keys(editadas).length,
    descartarEdicoes,
    carregado,
  };
}

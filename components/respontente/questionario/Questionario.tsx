"use client";

import { useQuestionario } from "./hooks/useQuestionario";
import OrientacoesPreenchimento from "./OrientacoesPreenchimento";
import RodadaQuestionarioLinha from "./RodadaQuestionario";
import { QuestionarioProps } from "./types";

/** Tela de Questionário do respondente: orientações + rodada. */
export default function Questionario({
  dados,
  onAbrir,
  className = "",
}: QuestionarioProps) {
  const { orientacoes, rodada } = useQuestionario(dados);

  return (
    <div className={`flex flex-col gap-6 ${className}`}>
      <OrientacoesPreenchimento dados={orientacoes} />

      {/* Linha da rodada: clicável, abre as perguntas */}
      <RodadaQuestionarioLinha
        rodada={rodada}
        onAbrir={onAbrir}
      />
    </div>
  );
}

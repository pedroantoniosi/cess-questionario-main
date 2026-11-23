import { useMemo } from "react";

import { mockQuestionario } from "../questionarioData";
import { QuestionarioDados } from "../types";

export function useQuestionario(dados?: Partial<QuestionarioDados>) {
  // Merge dos dados recebidos via props com o mock padrão
  const orientacoes = dados?.orientacoes ?? mockQuestionario.orientacoes;
  const rodada = dados?.rodada ?? mockQuestionario.rodada;
  const blocosRecebidos = dados?.blocos ?? mockQuestionario.blocos;

  const blocos = useMemo(
    () =>
      [...blocosRecebidos]
        .sort((a, b) => a.ordem - b.ordem)
        .map((bloco) => ({
          ...bloco,
          percentual: Math.min(100, Math.max(0, Math.round(bloco.percentual))),
        })),
    [blocosRecebidos],
  );

  return { orientacoes, rodada, blocos };
}

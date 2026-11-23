import { mockProgressoAvaliacao } from "../progressoAvaliacaoData";
import { ProgressoAvaliacaoDados } from "../types";

export function useProgressoAvaliacao(dados?: Partial<ProgressoAvaliacaoDados>) {
  // Merge dos dados recebidos via props com o mock padrão
  const titulo = dados?.titulo ?? mockProgressoAvaliacao.titulo;
  const aviso = dados?.aviso ?? mockProgressoAvaliacao.aviso;
  const blocosRecebidos = dados?.blocos ?? mockProgressoAvaliacao.blocos;

  const percentual = Math.min(
    100,
    Math.max(
      0,
      Math.round(dados?.percentual ?? mockProgressoAvaliacao.percentual),
    ),
  );

  const blocos = [...blocosRecebidos].sort((a, b) => a.ordem - b.ordem);
  const concluidos = blocos.filter(
    (bloco) => bloco.status === "concluido",
  ).length;

  return { titulo, aviso, percentual, blocos, concluidos };
}

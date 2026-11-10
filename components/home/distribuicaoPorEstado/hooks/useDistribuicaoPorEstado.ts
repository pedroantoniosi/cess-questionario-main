"use client";

import { distribuicaoPorEstado } from "@/components/home/distribuicaoPorEstado/distribuicaoPorEstadoData";
import { useMemo, useState } from "react";

export const CORES_DISTRIBUICAO = {
  teal: "#0D9488",
  green: "#65A30D",
  lime: "#84CC16",
};

export function useDistribuicaoPorEstado() {
  const [estadoSelecionado, setEstadoSelecionado] = useState("RJ");

  const estados = useMemo(() => {
    const total = distribuicaoPorEstado.estados.reduce(
      (acc, estado) => acc + estado.instalacoes,
      0,
    );

    return distribuicaoPorEstado.estados
      .map((estado) => ({
        ...estado,
        percentual: total > 0 ? (estado.instalacoes / total) * 100 : 0,
      }))
      .sort((a, b) => b.instalacoes - a.instalacoes);
  }, []);

  const totalInstalacoes = useMemo(
    () => estados.reduce((acc, estado) => acc + estado.instalacoes, 0),
    [estados],
  );

  const estadoAtual = estados.find(
    (estado) => estado.sigla === estadoSelecionado,
  );

  const selecionarEstado = (sigla: string) => {
    setEstadoSelecionado(sigla);
  };

  const obterCor = (instalacoes: number) => {
    if (instalacoes >= 5) return CORES_DISTRIBUICAO.teal;
    if (instalacoes >= 2) return CORES_DISTRIBUICAO.green;

    return CORES_DISTRIBUICAO.lime;
  };

  return {
    titulo: distribuicaoPorEstado.titulo,
    descricao: distribuicaoPorEstado.descricao,
    estados,
    totalInstalacoes,
    estadoAtual,
    estadoSelecionado,
    selecionarEstado,
    obterCor,
  };
}

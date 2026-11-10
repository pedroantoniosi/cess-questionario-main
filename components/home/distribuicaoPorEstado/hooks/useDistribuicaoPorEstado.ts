"use client";

import { useMemo, useState } from "react";
import { distribuicaoPorEstado } from "../distribuicaoPorEstadoData";
import { DistribuicaoPorEstadoDados, SiglaEstado } from "../types";

export const CORES_DISTRIBUICAO = {
  teal: "#0D9488",
  green: "#65A30D",
  lime: "#84CC16",
};

export function useDistribuicaoPorEstado(
  dadosCustom?: Partial<DistribuicaoPorEstadoDados>
) {
  const [estadoSelecionado, setEstadoSelecionado] = useState<SiglaEstado>("RJ");

  const dadosAtivos = useMemo(() => {
    return {
      titulo: dadosCustom?.titulo ?? distribuicaoPorEstado.titulo,
      descricao: dadosCustom?.descricao ?? distribuicaoPorEstado.descricao,
      estados: dadosCustom?.estados ?? distribuicaoPorEstado.estados,
    };
  }, [dadosCustom]);

  const estados = useMemo(() => {
    const total = dadosAtivos.estados.reduce(
      (acc, estado) => acc + estado.instalacoes,
      0
    );

    return dadosAtivos.estados
      .map((estado) => ({
        ...estado,
        percentual: total > 0 ? (estado.instalacoes / total) * 100 : 0,
      }))
      .sort(
        (a, b) =>
          b.instalacoes - a.instalacoes || a.sigla.localeCompare(b.sigla)
      );
  }, [dadosAtivos]);

  const totalInstalacoes = useMemo(
    () => estados.reduce((acc, estado) => acc + estado.instalacoes, 0),
    [estados]
  );

  const estadoAtual = estados.find(
    (estado) => estado.sigla === estadoSelecionado
  );

  const selecionarEstado = (sigla: SiglaEstado) => {
    setEstadoSelecionado(sigla);
  };

  const obterCor = (instalacoes: number) => {
    if (instalacoes >= 5) return CORES_DISTRIBUICAO.teal;
    if (instalacoes >= 2) return CORES_DISTRIBUICAO.green;

    return CORES_DISTRIBUICAO.lime;
  };

  return {
    titulo: dadosAtivos.titulo,
    descricao: dadosAtivos.descricao,
    estados,
    totalInstalacoes,
    estadoAtual,
    estadoSelecionado,
    selecionarEstado,
    obterCor,
  };
}

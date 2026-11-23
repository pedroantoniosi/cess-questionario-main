"use client";

import { useMemo, useState } from "react";
import { obterDetalhesEstado } from "../dadosEstadoMock";
import { distribuicaoPorEstado } from "../distribuicaoPorEstadoData";
import { DistribuicaoPorEstadoDados, SiglaEstado } from "../types";

export const CORES_DISTRIBUICAO = {
  high: "var(--color-high, #84CC16)",
  medium: "var(--color-medium, #397F35)",
  low: "var(--color-low, #0A4542)",
  hexHigh: "#84CC16",
  hexMedium: "#397F35",
  hexLow: "#0A4542",
};

export function useDistribuicaoPorEstado(
  dadosCustom?: Partial<DistribuicaoPorEstadoDados>,
  estadoInicial: SiglaEstado | null = null
) {
  const [estadoSelecionado, setEstadoSelecionado] = useState<SiglaEstado | null>(
    estadoInicial
  );

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

  const estadoAtual = useMemo(() => {
    if (!estadoSelecionado) return null;
    return (
      estados.find((estado) => estado.sigla === estadoSelecionado) ?? null
    );
  }, [estados, estadoSelecionado]);

  const detalhesEstado = useMemo(() => {
    if (!estadoSelecionado) return null;
    return obterDetalhesEstado(estadoSelecionado, estadoAtual);
  }, [estadoSelecionado, estadoAtual]);

  const selecionarEstado = (sigla: SiglaEstado | null) => {
    if (
      sigla !== null &&
      !estados.some((e) => e.sigla === sigla && e.instalacoes > 0)
    ) {
      return;
    }
    setEstadoSelecionado((prev) => (prev === sigla ? null : sigla));
  };

  const limparSelecao = () => {
    setEstadoSelecionado(null);
  };

  const obterCor = (instalacoes: number) => {
    if (instalacoes >= 5) return CORES_DISTRIBUICAO.high;
    if (instalacoes >= 2) return CORES_DISTRIBUICAO.medium;

    return CORES_DISTRIBUICAO.low;
  };

  const obterCorHex = (instalacoes: number) => {
    if (instalacoes >= 5) return CORES_DISTRIBUICAO.hexHigh;
    if (instalacoes >= 2) return CORES_DISTRIBUICAO.hexMedium;

    return CORES_DISTRIBUICAO.hexLow;
  };

  return {
    titulo: dadosAtivos.titulo,
    descricao: dadosAtivos.descricao,
    estados,
    totalInstalacoes,
    estadoAtual,
    estadoSelecionado,
    detalhesEstado,
    selecionarEstado,
    limparSelecao,
    obterCor,
    obterCorHex,
  };
}

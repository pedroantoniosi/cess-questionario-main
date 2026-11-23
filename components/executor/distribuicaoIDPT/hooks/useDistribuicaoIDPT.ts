"use client";

import { useMemo, useState } from "react";
import { distribuicaoIDPTData } from "../distribuicaoIDPTData";
import {
  DistribuicaoIDPTDados,
  QuadranteIDPT,
  SubtemaIDPT,
} from "../types";

export const QUADRANTES_CONFIG: Record<
  QuadranteIDPT,
  { rotulo: string; descricao: string }
> = {
  "intervencao-prioritaria": {
    rotulo: "Intervenção prioritária",
    descricao: "Alta complexidade estratégica e baixa prontidão técnica.",
  },
  "falsa-prontidao": {
    rotulo: "Falsa prontidão",
    descricao: "Alta prontidão aparente com alto risco ou descompasso estrutural.",
  },
  "capacidade-latente": {
    rotulo: "Capacidade latente",
    descricao: "Baixo impacto imediato com potencial de evolução contínua.",
  },
  facilitadores: {
    rotulo: "Facilitadores",
    descricao: "Alta prontidão técnica que impulsiona o avanço do projeto.",
  },
};

export function useDistribuicaoIDPT(
  dadosCustom?: Partial<DistribuicaoIDPTDados>,
  onSelecionar?: (subtema: SubtemaIDPT | null) => void,
) {
  const [subtemaSelecionadoId, setSubtemaSelecionadoId] = useState<
    string | null
  >(null);
  const [subtemaHoverId, setSubtemaHoverId] = useState<string | null>(null);

  const dadosAtivos = useMemo(() => {
    return {
      titulo: dadosCustom?.titulo ?? distribuicaoIDPTData.titulo,
      subtitulo: dadosCustom?.subtitulo ?? distribuicaoIDPTData.subtitulo,
      descricaoRodape:
        dadosCustom?.descricaoRodape ?? distribuicaoIDPTData.descricaoRodape,
      subtemas: dadosCustom?.subtemas ?? distribuicaoIDPTData.subtemas,
    };
  }, [dadosCustom]);

  const subtemaSelecionado = useMemo(() => {
    if (!subtemaSelecionadoId) return null;
    return (
      dadosAtivos.subtemas.find((s) => s.id === subtemaSelecionadoId) ?? null
    );
  }, [dadosAtivos.subtemas, subtemaSelecionadoId]);

  const subtemaHover = useMemo(() => {
    if (!subtemaHoverId) return null;
    return dadosAtivos.subtemas.find((s) => s.id === subtemaHoverId) ?? null;
  }, [dadosAtivos.subtemas, subtemaHoverId]);

  const selecionarSubtema = (id: string | null) => {
    const proximoId = subtemaSelecionadoId === id ? null : id;
    setSubtemaSelecionadoId(proximoId);

    if (onSelecionar) {
      const subtema = proximoId
        ? (dadosAtivos.subtemas.find((s) => s.id === proximoId) ?? null)
        : null;
      onSelecionar(subtema);
    }
  };

  const limparSelecao = () => {
    setSubtemaSelecionadoId(null);
    if (onSelecionar) onSelecionar(null);
  };

  return {
    titulo: dadosAtivos.titulo,
    subtitulo: dadosAtivos.subtitulo,
    descricaoRodape: dadosAtivos.descricaoRodape,
    subtemas: dadosAtivos.subtemas,
    subtemaSelecionado,
    subtemaHover,
    subtemaSelecionadoId,
    subtemaHoverId,
    setSubtemaHoverId,
    selecionarSubtema,
    limparSelecao,
    quadrantesConfig: QUADRANTES_CONFIG,
  };
}

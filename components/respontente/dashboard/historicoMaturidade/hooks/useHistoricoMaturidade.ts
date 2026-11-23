"use client";

import { useMemo, useState } from "react";

import {
  NIVEIS_MATURIDADE,
  mockHistoricoMaturidade,
} from "../historicoMaturidadeData";
import { HistoricoMaturidadeDados } from "../types";

export function useHistoricoMaturidade(
  dados?: Partial<HistoricoMaturidadeDados>,
  /** Seleção controlada por quem usa o card (opcional). */
  controle?: { rodadaId?: string; onSelecionar?: (rodadaId: string) => void },
) {
  // Merge dos dados recebidos via props com o mock padrão
  const titulo = dados?.titulo ?? mockHistoricoMaturidade.titulo;
  const descricao = dados?.descricao ?? mockHistoricoMaturidade.descricao;
  const rodape = dados?.rodape ?? mockHistoricoMaturidade.rodape;
  const nivelMaximo = dados?.nivelMaximo ?? mockHistoricoMaturidade.nivelMaximo;
  const rodadas = dados?.rodadas ?? mockHistoricoMaturidade.rodadas;

  // Abre na rodada mais recente que já tem nível calculado
  const indiceInicial = Math.max(
    0,
    rodadas.findIndex((rodada) => rodada.nivel !== null),
  );
  const [rodadaInterna, setRodadaInterna] = useState<string | null>(
    rodadas[indiceInicial]?.id ?? null,
  );
  const rodadaId = controle?.rodadaId ?? rodadaInterna;

  const selecionarRodada = (id: string) => {
    setRodadaInterna(id);
    controle?.onSelecionar?.(id);
  };

  const rodadaAtual = useMemo(
    () => rodadas.find((rodada) => rodada.id === rodadaId) ?? rodadas[0] ?? null,
    [rodadas, rodadaId],
  );

  const nivelAtual = rodadaAtual?.nivel
    ? { codigo: rodadaAtual.nivel, ...NIVEIS_MATURIDADE[rodadaAtual.nivel] }
    : null;

  const rotuloNivel = (nivel: (typeof rodadas)[number]["nivel"]) =>
    nivel ? `${nivel} · ${NIVEIS_MATURIDADE[nivel].descricao}` : "Aguardando";

  return {
    titulo,
    descricao,
    rodape,
    nivelMaximo,
    rodadas,
    rodadaAtual,
    nivelAtual,
    selecionarRodada,
    rotuloNivel,
  };
}

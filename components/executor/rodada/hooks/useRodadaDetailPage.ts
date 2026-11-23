"use client";

import { useMemo, useState } from "react";

import {
  mockInstalacoesDisponiveis,
  mockParticipantesPorRodada,
  mockRodadas,
  mockUsuariosRespondentes,
} from "../rodadaPageData";
import type { NovoParticipanteFormValues, ParticipanteRodada } from "../types";

export function useRodadaDetailPage(roundId: string) {
  const [participantesPorRodada, setParticipantesPorRodada] = useState<
    Record<string, ParticipanteRodada[]>
  >(mockParticipantesPorRodada);
  const [modalAdicionarAberto, setModalAdicionarAberto] = useState(false);
  const [participanteParaRemover, setParticipanteParaRemover] =
    useState<ParticipanteRodada | null>(null);

  const rodada = useMemo(
    () => mockRodadas.find((item) => item.id === roundId),
    [roundId]
  );

  const participantes = useMemo(
    () => participantesPorRodada[roundId] ?? [],
    [participantesPorRodada, roundId]
  );

  const instalacoesDisponiveis = useMemo(
    () =>
      mockInstalacoesDisponiveis.filter(
        (instalacao) => !participantes.some((p) => p.id === instalacao.id)
      ),
    [participantes]
  );

  function abrirModalAdicionar() {
    setModalAdicionarAberto(true);
  }

  function fecharModalAdicionar() {
    setModalAdicionarAberto(false);
  }

  function adicionarParticipante(valores: NovoParticipanteFormValues) {
    const instalacao = mockInstalacoesDisponiveis.find(
      (item) => item.id === valores.instalacaoId
    );
    const responsavel = mockUsuariosRespondentes.find(
      (item) => item.id === valores.responsavelId
    );

    if (!instalacao || !responsavel) return;

    const novoParticipante: ParticipanteRodada = {
      ...instalacao,
      status: "a_comecar",
      progresso: 0,
      responsavelId: responsavel.id,
      responsavelNome: responsavel.nome,
    };

    setParticipantesPorRodada((atual) => ({
      ...atual,
      [roundId]: [...(atual[roundId] ?? []), novoParticipante],
    }));
    fecharModalAdicionar();
  }

  function abrirConfirmacaoRemover(participante: ParticipanteRodada) {
    setParticipanteParaRemover(participante);
  }

  function fecharConfirmacaoRemover() {
    setParticipanteParaRemover(null);
  }

  function removerParticipante() {
    if (!participanteParaRemover) return;

    setParticipantesPorRodada((atual) => ({
      ...atual,
      [roundId]: (atual[roundId] ?? []).filter(
        (participante) => participante.id !== participanteParaRemover.id
      ),
    }));
    fecharConfirmacaoRemover();
  }

  return {
    rodada,
    participantes,
    modalAdicionarAberto,
    abrirModalAdicionar,
    fecharModalAdicionar,
    adicionarParticipante,
    instalacoesDisponiveis,
    usuariosResponsaveis: mockUsuariosRespondentes,
    participanteParaRemover,
    abrirConfirmacaoRemover,
    fecharConfirmacaoRemover,
    removerParticipante,
  };
}

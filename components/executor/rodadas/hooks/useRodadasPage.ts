"use client";

import { useMemo, useState } from "react";

import {
  cancelarRodada,
  calcularStatusRodada,
  encerrarRodada,
  mockParticipantesPorRodada,
  mockQuestionariosDisponiveis,
  mockRodadas,
  NOVA_RODADA_INICIAL,
  prorrogarRodada,
} from "../../rodada/rodadaPageData";
import type { NovaRodadaFormValues, Rodada } from "../../rodada/types";

export function useRodadasPage() {
  const [visualizacao, setVisualizacao] = useState<"list" | "grid">("list");
  const [rodadas, setRodadas] = useState<Rodada[]>(mockRodadas);
  const [modalNovaRodadaAberto, setModalNovaRodadaAberto] = useState(false);
  const [rodadaParaProrrogar, setRodadaParaProrrogar] = useState<Rodada | null>(null);
  const [rodadaParaEncerrar, setRodadaParaEncerrar] = useState<Rodada | null>(null);
  const [rodadaParaCancelar, setRodadaParaCancelar] = useState<Rodada | null>(null);

  const linhasRodadas = useMemo(
    () =>
      rodadas.map((rodada) => ({
        rodada,
        statusAgregado: calcularStatusRodada(
          rodada,
          mockParticipantesPorRodada[rodada.id] ?? []
        ),
      })),
    [rodadas]
  );

  function abrirModalNovaRodada() {
    setModalNovaRodadaAberto(true);
  }

  function fecharModalNovaRodada() {
    setModalNovaRodadaAberto(false);
  }

  function criarRodada(valores: NovaRodadaFormValues) {
    const questionario = mockQuestionariosDisponiveis.find(
      (item) => item.id === valores.questionarioId
    );

    const novaRodada: Rodada = {
      id: `nova-rodada-${Date.now()}`,
      titulo: valores.titulo.trim() || questionario?.nome || "Nova rodada",
      ano: new Date().getFullYear(),
      status: valores.statusInicial,
      dataInicio: valores.dataInicio || "-",
      dataEncerramento: valores.dataEncerramento || "-",
      observacoes: valores.observacoes,
    };

    setRodadas((atual) => [novaRodada, ...atual]);
    fecharModalNovaRodada();
  }

  function abrirProrrogar(rodada: Rodada) {
    setRodadaParaProrrogar(rodada);
  }

  function fecharProrrogar() {
    setRodadaParaProrrogar(null);
  }

  function confirmarProrrogar(novaDataEncerramento: string) {
    if (!rodadaParaProrrogar) return;

    setRodadas((atual) =>
      atual.map((item) =>
        item.id === rodadaParaProrrogar.id
          ? prorrogarRodada(item, novaDataEncerramento)
          : item
      )
    );
    fecharProrrogar();
  }

  function abrirEncerrar(rodada: Rodada) {
    setRodadaParaEncerrar(rodada);
  }

  function fecharEncerrar() {
    setRodadaParaEncerrar(null);
  }

  function confirmarEncerrar() {
    if (!rodadaParaEncerrar) return;

    setRodadas((atual) =>
      atual.map((item) => (item.id === rodadaParaEncerrar.id ? encerrarRodada(item) : item))
    );
    fecharEncerrar();
  }

  function abrirCancelar(rodada: Rodada) {
    setRodadaParaCancelar(rodada);
  }

  function fecharCancelar() {
    setRodadaParaCancelar(null);
  }

  function confirmarCancelar() {
    if (!rodadaParaCancelar) return;

    setRodadas((atual) =>
      atual.map((item) => (item.id === rodadaParaCancelar.id ? cancelarRodada(item) : item))
    );
    fecharCancelar();
  }

  return {
    linhasRodadas,
    modalNovaRodadaAberto,
    abrirModalNovaRodada,
    fecharModalNovaRodada,
    criarRodada,
    formInicialNovaRodada: NOVA_RODADA_INICIAL,
    questionariosDisponiveis: mockQuestionariosDisponiveis,
    rodadaParaProrrogar,
    abrirProrrogar,
    fecharProrrogar,
    confirmarProrrogar,
    rodadaParaEncerrar,
    abrirEncerrar,
    fecharEncerrar,
    confirmarEncerrar,
    rodadaParaCancelar,
    abrirCancelar,
    fecharCancelar,
    confirmarCancelar,
    visualizacao,
    setVisualizacao,
  };
}

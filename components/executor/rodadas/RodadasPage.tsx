"use client";


import ModalNovaRodada from "../rodada/ModalNovaRodada";

import { useRodadasPage } from "./hooks/useRodadasPage";
import ModalCancelarRodada from "./ModalCancelarRodada";
import ModalEncerrarRodada from "./ModalEncerrarRodada";
import ModalProrrogarRodada from "./ModalProrrogarRodada";
import TableRodadas from "./TableRodadas";

export default function RodadasPage() {
  const {
    linhasRodadas,
    visualizacao,
    setVisualizacao,
    modalNovaRodadaAberto,
    abrirModalNovaRodada,
    fecharModalNovaRodada,
    criarRodada,
    formInicialNovaRodada,
    questionariosDisponiveis,
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
  } = useRodadasPage();

  return (
    <div className="flex flex-col gap-6">

      <TableRodadas
        linhas={linhasRodadas}
        onProrrogar={abrirProrrogar}
        onEncerrar={abrirEncerrar}
        onCancelar={abrirCancelar}
        onNovaRodada={abrirModalNovaRodada}
        visualizacao={visualizacao}
        onVisualizacaoChange={setVisualizacao}
      />

      {modalNovaRodadaAberto && (
        <ModalNovaRodada
          questionariosDisponiveis={questionariosDisponiveis}
          valoresIniciais={formInicialNovaRodada}
          onFechar={fecharModalNovaRodada}
          onCriar={criarRodada}
        />
      )}

      {rodadaParaProrrogar && (
        <ModalProrrogarRodada
          rodada={rodadaParaProrrogar}
          onFechar={fecharProrrogar}
          onConfirmar={confirmarProrrogar}
        />
      )}

      {rodadaParaEncerrar && (
        <ModalEncerrarRodada
          rodada={rodadaParaEncerrar}
          onFechar={fecharEncerrar}
          onConfirmar={confirmarEncerrar}
        />
      )}

      {rodadaParaCancelar && (
        <ModalCancelarRodada
          rodada={rodadaParaCancelar}
          onFechar={fecharCancelar}
          onConfirmar={confirmarCancelar}
        />
      )}
    </div>
  );
}

"use client";

import StatusRodada from "@/components/executor/statusRodada/StatusRodada";

import { useRodadaDetailPage } from "./hooks/useRodadaDetailPage";
import ModalAdicionarParticipante from "./ModalAdicionarParticipante";
import ModalConfirmarRemocaoParticipante from "./ModalConfirmarRemocaoParticipante";
import RodadaInfoAccordion from "./RodadaInfoAccordion";
import { calcularStatusRodada, rodadaJaExpirou } from "./rodadaPageData";
import TableParticipantesRodada from "./TableParticipantesRodada";

interface RodadaDetailPageProps {
  roundId: string;
}

export default function RodadaDetailPage({ roundId }: RodadaDetailPageProps) {
  const {
    rodada,
    participantes,
    modalAdicionarAberto,
    abrirModalAdicionar,
    fecharModalAdicionar,
    adicionarParticipante,
    instalacoesDisponiveis,
    usuariosResponsaveis,
    participanteParaRemover,
    abrirConfirmacaoRemover,
    fecharConfirmacaoRemover,
    removerParticipante,
  } = useRodadaDetailPage(roundId);

  if (!rodada) return null;

  const dadosStatusRodada = calcularStatusRodada(rodada, participantes);
  const rodadaAtiva = !rodadaJaExpirou(dadosStatusRodada.dataEncerramento);

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-white">{rodada.titulo}</h1>
        <p className="text-sm text-gray-400">
          Acompanhe o status e os participantes desta rodada do questionário.
        </p>
      </header>

      <RodadaInfoAccordion rodada={rodada} />

      <div className="grid gap-4 xl:grid-cols-3">
        <div className="xl:col-span-1">
          <StatusRodada dados={dadosStatusRodada} />
        </div>

        <div className="xl:col-span-2">
          <TableParticipantesRodada
            participantes={participantes}
            rodadaAtiva={rodadaAtiva}
            onAdicionarParticipante={abrirModalAdicionar}
            onRemoverParticipante={abrirConfirmacaoRemover}
          />
        </div>
      </div>

      {modalAdicionarAberto && (
        <ModalAdicionarParticipante
          instalacoesDisponiveis={instalacoesDisponiveis}
          usuariosResponsaveis={usuariosResponsaveis}
          onFechar={fecharModalAdicionar}
          onAdicionar={adicionarParticipante}
        />
      )}

      {participanteParaRemover && (
        <ModalConfirmarRemocaoParticipante
          participante={participanteParaRemover}
          onFechar={fecharConfirmacaoRemover}
          onConfirmar={removerParticipante}
        />
      )}
    </div>
  );
}

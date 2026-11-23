"use client";

import { useState } from "react";

import HistoricoMaturidade from "./dashboard/historicoMaturidade";
import { mockHistoricoMaturidade } from "./dashboard/historicoMaturidade/historicoMaturidadeData";
import Notificacoes from "./dashboard/notificacoes";
import { mockNotificacoesPorRodada } from "./dashboard/notificacoes/notificacoesData";
import ProgressoAvaliacao from "./dashboard/progressoAvaliacao";
import { mockProgressoPorRodada } from "./dashboard/progressoAvaliacao/progressoAvaliacaoData";
import ResumoRodada from "./dashboard/resumoRodada";
import { mockResumoPorRodada } from "./dashboard/resumoRodada/resumoRodadaData";

/**
 * Dashboard do respondente.
 * Mesma divisão da home do analista: um contêiner maior, três menores
 * em linha e os maiores no final.
 *
 * A rodada escolhida no primeiro card (2024 ou 2025) vale para a página
 * toda: os outros cards mostram os dados dessa rodada.
 */
export default function Respontente() {
  // Abre na rodada mais recente
  const [rodadaId, setRodadaId] = useState(
    mockHistoricoMaturidade.rodadas[0]?.id ?? "",
  );

  return (
    <div className="flex flex-col gap-4">
      <HistoricoMaturidade
        rodadaId={rodadaId}
        onSelecionarRodada={setRodadaId}
      />
      <ResumoRodada dados={mockResumoPorRodada[rodadaId]} />
      <ProgressoAvaliacao dados={mockProgressoPorRodada[rodadaId]} />
      <Notificacoes dados={mockNotificacoesPorRodada[rodadaId]} />
    </div>
  );
}

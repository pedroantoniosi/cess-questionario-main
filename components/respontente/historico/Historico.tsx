import ProximosNiveis from "../dashboard/resumoRodada/ProximosNiveis";
import SituacaoRodada from "../dashboard/resumoRodada/SituacaoRodada";
import AvaliacaoRodada from "./AvaliacaoRodada";
import EvolucaoDiagnosticoBloco from "./EvolucaoDiagnosticoBloco";
import EvolucaoNivelMaturidade from "./EvolucaoNivelMaturidade";
import { mockHistorico } from "./historicoData";
import HistoricoRodadas from "./HistoricoRodadas";
import { HistoricoProps } from "./types";

/**
 * Tela de Histórico do respondente.
 * Mesma organização do dashboard: um contêiner maior, três menores em
 * linha e os maiores no final.
 */
export default function Historico({ dados, className = "" }: HistoricoProps) {
  // Merge dos dados recebidos via props com o mock padrão
  const blocos = dados?.blocos ?? mockHistorico.blocos;
  const rodadas = dados?.rodadas ?? mockHistorico.rodadas;
  const situacao = dados?.situacao ?? mockHistorico.situacao;
  const avaliacao = dados?.avaliacao ?? mockHistorico.avaliacao;
  const proximosNiveis = dados?.proximosNiveis ?? mockHistorico.proximosNiveis;

  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      <EvolucaoNivelMaturidade rodadas={rodadas} />

      <div className="grid gap-4 xl:grid-cols-3">
        <SituacaoRodada dados={situacao} />
        <AvaliacaoRodada dados={avaliacao} />
        <ProximosNiveis niveis={proximosNiveis} />
      </div>

      <HistoricoRodadas rodadas={rodadas} />
      <EvolucaoDiagnosticoBloco blocos={blocos} rodadas={rodadas} />
    </div>
  );
}

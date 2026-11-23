import NivelAtual from "./NivelAtual";
import ProximosNiveis from "./ProximosNiveis";
import { mockResumoRodada } from "./resumoRodadaData";
import SituacaoRodada from "./SituacaoRodada";
import { ResumoRodadaProps } from "./types";

/**
 * Linha de três cards menores do dashboard, como na home do analista:
 * nível atual, situação da rodada e próximos níveis.
 */
export default function ResumoRodada({ dados, className = "" }: ResumoRodadaProps) {
  // Merge dos dados recebidos via props com o mock padrão
  const nivelAtual = dados?.nivelAtual ?? mockResumoRodada.nivelAtual;
  const situacao = dados?.situacao ?? mockResumoRodada.situacao;
  const proximosNiveis =
    dados?.proximosNiveis ?? mockResumoRodada.proximosNiveis;

  return (
    <div className={`grid gap-4 xl:grid-cols-3 ${className}`}>
      <NivelAtual dados={nivelAtual} />
      <SituacaoRodada dados={situacao} />
      <ProximosNiveis niveis={proximosNiveis} />
    </div>
  );
}

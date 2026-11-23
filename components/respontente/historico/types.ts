import { NivelMaturidade } from "../dashboard/historicoMaturidade/types";
import {
  NivelProximo,
  SituacaoRodadaDados,
} from "../dashboard/resumoRodada/types";

export type StatusRodadaHistorico = "concluida" | "em_andamento";

/** Pontuação de um bloco em uma rodada, de 0 a 100. */
export interface PontuacaoBloco {
  blocoId: string;
  percentual: number;
}

export interface RodadaHistorico {
  id: string;
  periodo: string;
  /** Data de abertura da rodada, ex.: "12/01/2024". */
  inicio: string;
  /** Data de encerramento; null enquanto a rodada está aberta. */
  fim: string | null;
  /** null = rodada ainda sem nível calculado. */
  nivel: NivelMaturidade | null;
  /** Pontuação geral da rodada (0 a 100); null enquanto não avaliada. */
  pontuacao: number | null;
  /** Percentual de questões respondidas (0 a 100). */
  respondidas: number;
  blocosRespondidos: number;
  totalBlocos: number;
  status: StatusRodadaHistorico;
  pontuacaoPorBloco: PontuacaoBloco[];
}

export interface BlocoHistorico {
  id: string;
  /** Sigla exibida no radar e na legenda, ex.: "BL 1". */
  sigla: string;
  titulo: string;
  descricao: string;
}

/** Avaliação da rodada mais recente: progresso e blocos respondidos. */
export interface AvaliacaoRodadaDados {
  /** Percentual da rodada concluído, de 0 a 100. */
  percentual: number;
  blocosRespondidos: number;
  blocosPendentes: number;
  aviso?: string;
}

export interface HistoricoDados {
  blocos: BlocoHistorico[];
  /** Da mais antiga para a mais recente. */
  rodadas: RodadaHistorico[];
  /** Situação da rodada mais recente (mesmos dados do dashboard). */
  situacao: SituacaoRodadaDados;
  avaliacao: AvaliacaoRodadaDados;
  proximosNiveis: NivelProximo[];
}

export interface HistoricoProps {
  /** Se não for fornecido, o componente usa os dados mockados padrão. */
  dados?: Partial<HistoricoDados>;
  className?: string;
}

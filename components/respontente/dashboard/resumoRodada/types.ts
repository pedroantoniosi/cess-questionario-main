import { NivelMaturidade } from "../historicoMaturidade/types";

export interface NivelAtualDados {
  nivel: NivelMaturidade;
  /** Rodada em que o nível foi calculado. */
  rodada: string;
}

export interface SituacaoRodadaDados {
  /** Nome da rodada, ex.: "2024". */
  rodada?: string;
  status: "ativa" | "inativa";
  /** Rótulo da data: "Finalizada em" ou "Prazo final". */
  dataRotulo: string;
  data: string;
  blocosRespondidos: number;
  totalBlocos: number;
  questoesRespondidas: number;
  totalQuestoes: number;
}

export interface NivelProximo {
  codigo: NivelMaturidade;
  situacao: "atual" | "proximo" | "futuro";
  /** Critérios atendidos do próximo nível, ex.: 20 de 23. */
  criterios?: { atendidos: number; total: number };
}

export interface ResumoRodadaDados {
  nivelAtual: NivelAtualDados;
  situacao: SituacaoRodadaDados;
  proximosNiveis: NivelProximo[];
}

export interface ResumoRodadaProps {
  /** Se não for fornecido, o componente usa os dados mockados padrão. */
  dados?: Partial<ResumoRodadaDados>;
  className?: string;
}

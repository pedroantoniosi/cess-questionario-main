
export type SituacaoRodada =
  | "OPEN"
  | "CLOSED"
  | "SCHEDULED";

export interface StatusRodadaDados {
  ano: number;
  progresso: number;
  status: SituacaoRodada;
  dataInicio: string;
  dataEncerramento: string;
  participantes: number;
  submissoes: number;
  respostas: number;
}

export interface StatusRodadaProps {
  dados?: Partial<StatusRodadaDados>;
}

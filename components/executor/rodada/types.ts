export type StatusParticipanteRodada = "a_comecar" | "em_andamento" | "concluido";

export interface InstalacaoParticipante {
  id: string;
  nome: string;
  tipo: string;
  cidade: string;
  estado: string;
}

export interface UsuarioResponsavel {
  id: string;
  nome: string;
}

export interface ParticipanteRodada extends InstalacaoParticipante {
  status: StatusParticipanteRodada;
  progresso: number;
  responsavelId: string;
  responsavelNome: string;
}

export interface NovoParticipanteFormValues {
  instalacaoId: string;
  responsavelId: string;
}

/** Ciclo de vida da rodada, equivalente ao enum RoundStatus do backend
 * (backend/prisma/models/round.prisma: DRAFT/SCHEDULED/OPEN/CLOSED/CANCELLED). */
export type StatusRodada = "rascunho" | "agendada" | "aberta" | "encerrada" | "cancelada";

export interface Rodada {
  id: string;
  titulo: string;
  ano: number;
  status: StatusRodada;
  dataInicio: string;
  dataEncerramento: string;
  observacoes: string;
}

export interface QuestionarioDisponivel {
  id: string;
  nome: string;
}

export type StatusInicialRodada = "rascunho" | "aberta" | "agendada";
export type SituacaoRodadaForm = "ativo" | "inativo";

export interface NovaRodadaFormValues {
  questionarioId: string;
  titulo: string;
  descricao: string;
  dataInicio: string;
  dataEncerramento: string;
  statusInicial: StatusInicialRodada;
  observacoes: string;
  situacao: SituacaoRodadaForm;
}

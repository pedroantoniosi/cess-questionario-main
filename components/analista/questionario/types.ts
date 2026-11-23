/** Ciclo de publicação do questionário, equivalente ao enum
 * QuestionnairePublicationStatus do backend
 * (backend/prisma/models/questionnaire.prisma: DRAFT/PUBLISHED/ARCHIVED). */
export type PublicationStatus = "DRAFT" | "PUBLISHED" | "ARCHIVED";

export interface PerguntaVinculada {
  id: number;
  ordem: number;
  texto: string;
  obrigatoria: boolean;
}

export type StatusRodadaVinculada = "rascunho" | "agendada" | "aberta" | "encerrada" | "cancelada";

export interface RodadaVinculada {
  id: string;
  titulo: string;
  periodo: string;
  status: StatusRodadaVinculada;
}

export interface SubmissaoVinculada {
  id: string;
  status: string;
  enviadaEm: string | null;
}

export interface QuestionarioDetalhe {
  id: string;
  titulo: string;
  descricao: string | null;

  versao: number;
  revisao: number;
  idioma: string;

  publicationStatus: PublicationStatus;
  publicadoEm: string | null;
  ativo: boolean;

  criadoEm: string;
  atualizadoEm: string;
  criadoPor: string;
  atualizadoPor: string;

  perguntas: PerguntaVinculada[];
  rodadas: RodadaVinculada[];
  submissoes: SubmissaoVinculada[];
}

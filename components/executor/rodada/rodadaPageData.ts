import { mockParticipantes } from "@/components/analista/participantes/tableParticipantesData";

import type {
  InstalacaoParticipante,
  NovaRodadaFormValues,
  ParticipanteRodada,
  QuestionarioDisponivel,
  Rodada,
  StatusParticipanteRodada,
  StatusRodada,
  UsuarioResponsavel,
} from "./types";
import type { StatusRodadaDados } from "@/components/executor/statusRodada/types";

/**
 * Rodadas cadastradas, derivadas das mesmas rodadas exibidas em
 * components/analista/questionario/tableQuestionarioData.ts, mais a rodada
 * 2026 (em andamento) usada em components/executor/statusRodada/StatusRodadaData.ts.
 */
export const mockRodadas: Rodada[] = [
  {
    id: "f3a4b5c6-2026-4a4a-8b8b-000000002026",
    titulo: "Questionário 2026",
    ano: 2026,
    status: "aberta",
    dataInicio: "10/03/2026",
    dataEncerramento: "20/12/2026",
    observacoes: "Rodada em andamento, acompanhar prazos com as instalações pendentes.",
  },
  {
    id: "a5b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d",
    titulo: "Questionário 2025",
    ano: 2025,
    status: "encerrada",
    dataInicio: "18/09/2025",
    dataEncerramento: "23/02/2026",
    observacoes: "Rodada encerrada com participação total das instalações convidadas.",
  },
  {
    id: "01d61cae-6e3c-5177-85a9-2ce9e7520d6e",
    titulo: "Questionário 2024",
    ano: 2024,
    status: "encerrada",
    dataInicio: "15/02/2024",
    dataEncerramento: "30/09/2024",
    observacoes: "Primeira rodada do Modelo de Maturidade v1.0.",
  },
];

export const STATUS_RODADA_LABELS: Record<StatusRodada, string> = {
  rascunho: "Rascunho",
  agendada: "Agendada",
  aberta: "Aberta",
  encerrada: "Encerrada",
  cancelada: "Cancelada",
};

export const STATUS_RODADA_STYLES: Record<StatusRodada, string> = {
  rascunho: "bg-[#397F35]/20 text-[#65B85F]",
  agendada: "bg-sky-500/15 text-sky-300",
  aberta: "bg-[#84CC16]/15 text-[#84CC16]",
  encerrada: "bg-[#0A4542]/60 text-[#55B9AA]",
  cancelada: "bg-red-500/15 text-red-300",
};

/**
 * Converte uma data no formato dd/mm/aaaa para o formato aaaa-mm-dd usado
 * por inputs do tipo "date".
 */
export function dataBrParaIso(dataBr: string): string {
  const [dia, mes, ano] = dataBr.split("/");
  if (!dia || !mes || !ano) return "";
  return `${ano}-${mes}-${dia}`;
}

/** Converte uma data no formato aaaa-mm-dd (input type="date") para dd/mm/aaaa. */
export function dataIsoParaBr(dataIso: string): string {
  const [ano, mes, dia] = dataIso.split("-");
  if (!dia || !mes || !ano) return dataIso;
  return `${dia}/${mes}/${ano}`;
}

/** Verifica se a data de encerramento (dd/mm/aaaa) já passou. */
export function rodadaJaExpirou(dataEncerramentoBr: string): boolean {
  if (!dataEncerramentoBr || dataEncerramentoBr === "-") return false;

  const [dia, mes, ano] = dataEncerramentoBr.split("/").map(Number);
  if (!dia || !mes || !ano) return false;

  const fimDoDiaEncerramento = new Date(ano, mes - 1, dia, 23, 59, 59, 999);
  return fimDoDiaEncerramento.getTime() < Date.now();
}

/**
 * Agrega os dados de participantes de uma rodada no formato consumido pelo
 * componente StatusRodada (e pelas colunas agregadas da tabela de rodadas).
 */
export function calcularStatusRodada(
  rodada: Rodada,
  participantes: { progresso: number; status: string }[]
): StatusRodadaDados {
  const totalParticipantes = participantes.length;

  if (totalParticipantes === 0) {
    return {
      ano: rodada.ano,
      progresso: 0,
      status: rodada.status === "encerrada" || rodada.status === "cancelada" ? "CLOSED" : "SCHEDULED",
      dataInicio: rodada.dataInicio,
      dataEncerramento: rodada.dataEncerramento,
      participantes: 0,
      submissoes: 0,
      respostas: 0,
    };
  }

  const progresso = Math.round(
    participantes.reduce((soma, p) => soma + p.progresso, 0) / totalParticipantes
  );
  const submissoes = participantes.filter((p) => p.status === "concluido").length;

  return {
    ano: rodada.ano,
    progresso,
    status: rodada.status === "encerrada" || rodada.status === "cancelada" ? "CLOSED" : "OPEN",
    dataInicio: rodada.dataInicio,
    dataEncerramento: rodada.dataEncerramento,
    participantes: totalParticipantes,
    submissoes,
    respostas: Math.round(progresso * totalParticipantes * 2.5),
  };
}

/** Prorroga a rodada: define uma nova data de encerramento e reabre se necessário. */
export function prorrogarRodada(rodada: Rodada, novaDataEncerramento: string): Rodada {
  return {
    ...rodada,
    dataEncerramento: novaDataEncerramento,
    status: rodada.status === "encerrada" ? "aberta" : rodada.status,
  };
}

/** Encerra a rodada imediatamente. */
export function encerrarRodada(rodada: Rodada): Rodada {
  const hoje = new Date();
  const dataBr = `${String(hoje.getDate()).padStart(2, "0")}/${String(
    hoje.getMonth() + 1
  ).padStart(2, "0")}/${hoje.getFullYear()}`;

  return { ...rodada, status: "encerrada", dataEncerramento: dataBr };
}

/** Cancela a rodada (ação irreversível). */
export function cancelarRodada(rodada: Rodada): Rodada {
  return { ...rodada, status: "cancelada" };
}

/**
 * Instalações cadastradas, disponíveis para serem adicionadas como
 * participantes de uma rodada (ver botão "Adicionar participante" em
 * TableParticipantesRodada). Deriva das mesmas instalações exibidas em
 * components/analista/participantes/tableParticipantesData.ts.
 */
export const mockInstalacoesDisponiveis: InstalacaoParticipante[] = mockParticipantes.map(
  ({ id, nome, tipo, cidade, estado }) => ({ id, nome, tipo, cidade, estado })
);

/**
 * Usuários com perfil "Respondent" (ver
 * backend/prisma/seeds/development/010_user_logins.seed.js) disponíveis
 * para serem designados como responsáveis por uma instalação participante.
 */
export const mockUsuariosRespondentes: UsuarioResponsavel[] = [
  { id: "resp-0001", nome: "Respondente Padrão" },
  { id: "resp-0002", nome: "Lucas Oliveira" },
  { id: "resp-0003", nome: "Carlos Almeida" },
];

function statusPorProgresso(progresso: number): StatusParticipanteRodada {
  if (progresso <= 0) return "a_comecar";
  if (progresso >= 100) return "concluido";
  return "em_andamento";
}

function montarParticipantes(progressos: number[]): ParticipanteRodada[] {
  return mockParticipantes.map((participante, indice) => {
    const progresso = progressos[indice] ?? 0;
    const responsavel =
      mockUsuariosRespondentes[indice % mockUsuariosRespondentes.length];

    return {
      id: participante.id,
      nome: participante.nome,
      tipo: participante.tipo,
      cidade: participante.cidade,
      estado: participante.estado,
      progresso,
      status: statusPorProgresso(progresso),
      responsavelId: responsavel.id,
      responsavelNome: responsavel.nome,
    };
  });
}

export const mockParticipantesPorRodada: Record<string, ParticipanteRodada[]> = {
  "f3a4b5c6-2026-4a4a-8b8b-000000002026": montarParticipantes([65, 40, 0, 100, 10, 80]),
  "a5b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d": montarParticipantes([100, 100, 92, 100, 58, 100]),
  "01d61cae-6e3c-5177-85a9-2ce9e7520d6e": montarParticipantes([100, 85, 100, 60, 100, 100]),
};

export const STATUS_PARTICIPANTE_LABELS: Record<StatusParticipanteRodada, string> = {
  a_comecar: "A começar",
  em_andamento: "Em Andamento",
  concluido: "Concluído",
};

export const STATUS_PARTICIPANTE_STYLES: Record<StatusParticipanteRodada, string> = {
  a_comecar: "bg-white/10 text-gray-300",
  em_andamento: "bg-amber-500/15 text-amber-300",
  concluido: "bg-emerald-500/15 text-emerald-400",
};

/**
 * Questionários disponíveis para associar a uma nova rodada. Vazio porque,
 * no mock atual, os únicos questionários existentes ("Modelo de Maturidade"
 * v1.0 e v2.0) já estão associados às rodadas 2024 e 2025.
 */
export const mockQuestionariosDisponiveis: QuestionarioDisponivel[] = [];

export const STATUS_INICIAL_LABELS: Record<NovaRodadaFormValues["statusInicial"], string> = {
  rascunho: "Rascunho",
  aberta: "Aberta",
  agendada: "Agendada",
};

export const SITUACAO_RODADA_LABELS: Record<NovaRodadaFormValues["situacao"], string> = {
  ativo: "Ativo",
  inativo: "Inativo",
};

export const NOVA_RODADA_INICIAL: NovaRodadaFormValues = {
  questionarioId: "",
  titulo: "",
  descricao: "",
  dataInicio: "",
  dataEncerramento: "",
  statusInicial: "rascunho",
  observacoes: "",
  situacao: "ativo",
};

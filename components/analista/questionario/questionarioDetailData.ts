import type {
  PublicationStatus,
  QuestionarioDetalhe,
  StatusRodadaVinculada,
} from "./types";

export const PUBLICATION_STATUS_LABELS: Record<PublicationStatus, string> = {
  DRAFT: "Rascunho",
  PUBLISHED: "Disponível",
  ARCHIVED: "Arquivado",
};

export const PUBLICATION_STATUS_STYLES: Record<PublicationStatus, string> = {
  DRAFT: "bg-[#397F35]/20 text-[#65B85F]",
  PUBLISHED: "bg-sky-500/15 text-sky-300",
  ARCHIVED: "bg-white/10 text-gray-300",
};

export const STATUS_RODADA_VINCULADA_LABELS: Record<StatusRodadaVinculada, string> = {
  rascunho: "Rascunho",
  agendada: "Agendada",
  aberta: "Aberta",
  encerrada: "Encerrada",
  cancelada: "Cancelada",
};

export const STATUS_RODADA_VINCULADA_STYLES: Record<StatusRodadaVinculada, string> = {
  rascunho: "bg-[#397F35]/20 text-[#65B85F]",
  agendada: "bg-sky-500/15 text-sky-300",
  aberta: "bg-[#84CC16]/15 text-[#84CC16]",
  encerrada: "bg-[#0A4542]/60 text-[#55B9AA]",
  cancelada: "bg-red-500/15 text-red-300",
};

/**
 * Questionários cadastrados, derivados das mesmas rodadas exibidas em
 * ./tableQuestionarioData.ts e em components/executor/rodada/rodadaPageData.ts
 * (ids de rodada "01d61cae-..." e "a5b2c3d4-..." reaproveitados para manter
 * a consistência entre as telas mockadas).
 */
export const mockQuestionarios: QuestionarioDetalhe[] = [
  {
    id: "9c1f7b2a-1a2b-4c3d-9e0f-aa11bb22cc01",
    titulo: "Modelo de Maturidade",
    descricao:
      "Avalia o nível de maturidade das instalações portuárias, recicladoras e estaleiros frente às boas práticas de gestão socioambiental do setor.",
    versao: 1,
    revisao: 0,
    idioma: "pt-BR",
    publicationStatus: "ARCHIVED",
    publicadoEm: "10/01/2024, 09:00",
    ativo: false,
    criadoEm: "05/01/2024, 14:30",
    atualizadoEm: "01/09/2025, 11:15",
    criadoPor: "Analista",
    atualizadoPor: "Analista",
    perguntas: [
      { id: 101, ordem: 1, texto: "Escreva o nome do responsável pela instalação", obrigatoria: true },
      { id: 102, ordem: 2, texto: "A instalação possui procedimento formal de gestão de resíduos?", obrigatoria: true },
      { id: 103, ordem: 3, texto: "Com que frequência os colaboradores recebem treinamento ambiental?", obrigatoria: false },
    ],
    rodadas: [
      {
        id: "01d61cae-6e3c-5177-85a9-2ce9e7520d6e",
        titulo: "Questionário 2024",
        periodo: "15/02/2024 – 30/09/2024",
        status: "encerrada",
      },
    ],
    submissoes: [],
  },
  {
    id: "9c1f7b2a-1a2b-4c3d-9e0f-aa11bb22cc02",
    titulo: "Modelo de Maturidade",
    descricao:
      "Avalia o nível de maturidade das instalações portuárias, recicladoras e estaleiros frente às boas práticas de gestão socioambiental do setor.",
    versao: 2,
    revisao: 0,
    idioma: "pt-BR",
    publicationStatus: "PUBLISHED",
    publicadoEm: "12/09/2025, 10:00",
    ativo: true,
    criadoEm: "02/09/2025, 16:45",
    atualizadoEm: "23/02/2026, 08:20",
    criadoPor: "Analista",
    atualizadoPor: "Analista",
    perguntas: [
      { id: 201, ordem: 1, texto: "Escreva o nome do responsável pela instalação", obrigatoria: true },
      { id: 202, ordem: 2, texto: "A instalação possui procedimento formal de gestão de resíduos?", obrigatoria: true },
      { id: 203, ordem: 3, texto: "Com que frequência os colaboradores recebem treinamento ambiental?", obrigatoria: false },
      { id: 204, ordem: 4, texto: "A instalação possui plano de resposta a emergências ambientais?", obrigatoria: true },
    ],
    rodadas: [
      {
        id: "a5b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d",
        titulo: "Questionário 2025",
        periodo: "18/09/2025 – 23/02/2026",
        status: "encerrada",
      },
    ],
    submissoes: [
      { id: "sub-0001", status: "Concluída", enviadaEm: "20/02/2026, 17:40" },
    ],
  },
];

export function findQuestionarioById(id: string): QuestionarioDetalhe | undefined {
  return mockQuestionarios.find((item) => item.id === id);
}

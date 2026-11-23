
import type { StatusRodadaDados } from "./types";

export const mockStatusRodada: Record<number, StatusRodadaDados> = {
  2023: {
    ano: 2023,
    progresso: 100,
    status: "CLOSED",
    dataInicio: "10/03/2023",
    dataEncerramento: "20/08/2023",
    participantes: 8,
    submissoes: 8,
    respostas: 920,
  },

  2024: {
    ano: 2024,
    progresso: 85,
    status: "CLOSED",
    dataInicio: "15/02/2024",
    dataEncerramento: "30/09/2024",
    participantes: 10,
    submissoes: 9,
    respostas: 1200,
  },

  2025: {
    ano: 2025,
    progresso: 100,
    status: "CLOSED",
    dataInicio: "18/09/2025",
    dataEncerramento: "23/02/2026",
    participantes: 12,
    submissoes: 12,
    respostas: 1515,
  },

  2026: {
    ano: 2026,
    progresso: 65,
    status: "OPEN",
    dataInicio: "10/03/2026",
    dataEncerramento: "20/12/2026",
    participantes: 18,
    submissoes: 12,
    respostas: 1080,
  },
};

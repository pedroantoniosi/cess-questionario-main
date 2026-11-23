import { NivelMaturidadeEstado } from "./types";

/**
 * Estilo visual de cada nível de maturidade.
 *
 * O nível segue a mesma convenção do backend (evaluateMaturity): quanto
 * maior o número, mais critérios de maturidade a instalação atende.
 * N0 = ainda não avaliada (sem respostas suficientes para calcular).
 */
export const ESTILO_MATURIDADE: Record<
  NivelMaturidadeEstado,
  {
    bg: string;
    border: string;
    text: string;
    corHex: string;
    descricao: string;
  }
> = {
  N0: {
    bg: "bg-slate-500/15",
    border: "border-slate-500/30",
    text: "text-slate-400",
    corHex: "#64748B",
    descricao: "Não avaliado",
  },
  N1: {
    bg: "bg-red-500/15",
    border: "border-red-500/30",
    text: "text-red-400",
    corHex: "#EF4444",
    descricao: "Muito baixo",
  },
  N2: {
    bg: "bg-orange-500/15",
    border: "border-orange-500/30",
    text: "text-orange-400",
    corHex: "#F97316",
    descricao: "Baixo",
  },
  N3: {
    bg: "bg-amber-500/15",
    border: "border-amber-500/30",
    text: "text-amber-400",
    corHex: "#EAB308",
    descricao: "Intermediário",
  },
  N4: {
    bg: "bg-[#84CC16]/15",
    border: "border-[#84CC16]/30",
    text: "text-[#84CC16]",
    corHex: "#84CC16",
    descricao: "Alto",
  },
  N5: {
    bg: "bg-emerald-500/15",
    border: "border-emerald-500/30",
    text: "text-emerald-400",
    corHex: "#22C55E",
    descricao: "Excelente",
  },
};

export function obterEstiloMaturidade(nivel: NivelMaturidadeEstado) {
  return ESTILO_MATURIDADE[nivel] ?? ESTILO_MATURIDADE.N0;
}

/** Converte o nível numérico (0 a 5) retornado pela API no formato "N{nível}". */
export function nivelMaturidadeDe(
  maturityLevel: number | null | undefined
): NivelMaturidadeEstado {
  const nivel = maturityLevel ?? 0;
  return `N${Math.min(Math.max(nivel, 0), 5)}` as NivelMaturidadeEstado;
}

export type QuadranteIDPT =
  | "intervencao-prioritaria"
  | "falsa-prontidao"
  | "capacidade-latente"
  | "facilitadores";

export interface SubtemaIDPT {
  id: string;
  nome: string;
  x: number; // 0 a 100
  y: number; // 0 a 100 (Cartesiano: 0 na base, 100 no topo)
  quadrante: QuadranteIDPT;
  descricao?: string;
  labelDx?: number;
  labelDy?: number;
  labelAnchor?: "start" | "middle" | "end";
}

export interface DistribuicaoIDPTDados {
  titulo: string;
  subtitulo: string;
  descricaoRodape: string;
  subtemas: SubtemaIDPT[];
}

export interface DistribuicaoIDPTProps {
  dados?: Partial<DistribuicaoIDPTDados>;
  className?: string;
  onSelecionarSubtema?: (subtema: SubtemaIDPT | null) => void;
}

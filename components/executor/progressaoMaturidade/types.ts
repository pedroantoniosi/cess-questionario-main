export type NivelMaturidade = 1 | 2 | 3 | 4 | 5;

export interface MaturidadeAno {
  ano: number;
  nivel: NivelMaturidade;
}

export interface ProgressaoMaturidadeProps {
  dados?: MaturidadeAno[];
}

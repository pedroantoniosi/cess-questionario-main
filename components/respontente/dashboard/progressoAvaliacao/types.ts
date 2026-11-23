import { StatusBloco } from "../../questionario/types";

export interface BlocoProgresso {
  id: string;
  ordem: number;
  titulo: string;
  status: StatusBloco;
}

/** Aviso exibido no fim do card (ex.: rodada concluída). */
export interface AvisoProgresso {
  titulo: string;
  texto: string;
}

export interface ProgressoAvaliacaoDados {
  titulo: string;
  /** Percentual concluído da avaliação, de 0 a 100. */
  percentual: number;
  blocos: BlocoProgresso[];
  aviso?: AvisoProgresso;
}

export interface ProgressoAvaliacaoProps {
  /** Se não for fornecido, o componente usa os dados mockados padrão. */
  dados?: Partial<ProgressoAvaliacaoDados>;
  className?: string;
}

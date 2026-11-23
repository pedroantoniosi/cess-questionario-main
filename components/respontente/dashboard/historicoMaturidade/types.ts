export type NivelMaturidade = "N0" | "N1" | "N2" | "N3" | "N4" | "N5";

/** Pontuação de um bloco na escala de níveis (0 até nivelMaximo). */
export interface BlocoPontuacao {
  rotulo: string;
  valor: number;
}

export interface RodadaMaturidade {
  id: string;
  periodo: string;
  /** null = rodada ainda sem nível calculado. */
  nivel: NivelMaturidade | null;
  blocos: BlocoPontuacao[];
}

export interface HistoricoMaturidadeDados {
  titulo: string;
  descricao: string;
  rodape: string;
  /** Maior nível da escala; define os anéis do radar. */
  nivelMaximo: number;
  rodadas: RodadaMaturidade[];
}

export interface HistoricoMaturidadeProps {
  /** Se não for fornecido, o componente usa os dados mockados padrão. */
  dados?: Partial<HistoricoMaturidadeDados>;
  /** Rodada selecionada, quando quem usa o card controla a escolha. */
  rodadaId?: string;
  /** Avisado quando a pessoa escolhe outra rodada. */
  onSelecionarRodada?: (rodadaId: string) => void;
  className?: string;
}

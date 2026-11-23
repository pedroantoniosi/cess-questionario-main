/**
 * concluido    = bloco 100% respondido.
 * finalizado   = prazo da rodada encerrado antes de chegar a 100%.
 * em_andamento = começou a responder e ainda há prazo.
 * nao_iniciado = nada respondido e ainda há prazo.
 */
export type StatusBloco =
  | "concluido"
  | "finalizado"
  | "em_andamento"
  | "nao_iniciado";

export type FormatoExportacao = "pdf" | "csv";

export interface OrientacoesDados {
  titulo: string;
  descricao: string;
  /** Recomendações exibidas em lista. */
  itens: string[];
  /** Aviso em destaque (caixa amarela). */
  alerta?: string;
  rodape?: string;
}

export interface BlocoQuestionario {
  id: string;
  ordem: number;
  titulo: string;
  descricao: string;
  status: StatusBloco;
  /** Percentual respondido, de 0 a 100. */
  percentual: number;
  tempoEstimadoMin: number;
}

/** Rodada do questionário, exibida em uma linha única (como na tela de rodadas do executor). */
export interface RodadaQuestionario {
  /** Id da rodada, ex.: "2024"; define quais perguntas a linha abre. */
  id: string;
  titulo: string;
  status: "aberta" | "encerrada";
  /** Datas no formato dd/mm/aaaa. */
  inicio: string;
  fim: string;
  /** Percentual do questionário respondido, de 0 a 100. */
  percentual: number;
  totalQuestoes: number;
  submissoes: number;
  respostas: number;
}

export interface QuestionarioDados {
  orientacoes: OrientacoesDados;
  rodada: RodadaQuestionario;
  /** true = o prazo da rodada acabou (blocos incompletos ficam "Finalizado"). */
  prazoEncerrado: boolean;
  blocos: BlocoQuestionario[];
}

export interface QuestionarioProps {
  /** Se não for fornecido, o componente usa os dados mockados padrão. */
  dados?: Partial<QuestionarioDados>;
  /** Chamado ao abrir as perguntas da rodada. */
  onAbrir?: () => void;
  className?: string;
}

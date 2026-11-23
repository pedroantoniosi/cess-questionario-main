export type TipoQuestao =
  | "texto"
  | "texto_longo"
  | "numero"
  | "opcao_unica"
  | "multipla_escolha";

/** Texto para campos abertos e opção única; lista para múltipla escolha. */
export type RespostaQuestao = string | string[];

export interface Questao {
  id: string;
  numero: number;
  /** Código de referência exibido ao lado da pergunta. */
  codigo: string;
  texto: string;
  obrigatoria: boolean;
  tipo: TipoQuestao;
  opcoes?: string[];
  resposta?: RespostaQuestao;
}

/** Situação da rodada; define se as respostas podem ser editadas. */
export interface RodadaSituacao {
  /** Nome da rodada, ex.: "Questionário 2024". */
  titulo: string;
  status: "ativa" | "inativa";
}

export interface ResponderQuestionarioDados {
  /** Todas as questões da rodada, em um único grupo, na ordem em que são exibidas. */
  questoes: Questao[];
  rodada: RodadaSituacao;
}

export interface ResponderQuestionarioProps {
  /** Rodada cujas perguntas são exibidas, ex.: "2024". */
  rodadaId: string;
  /** Se não for fornecido, o componente usa os dados mockados padrão. */
  dados?: Partial<ResponderQuestionarioDados>;
  /** Questões por página (no máximo 30). */
  porPagina?: number;
  className?: string;
}

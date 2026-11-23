/** "aviso" pede atenção ou ação; "notificacao" só informa. */
export type TipoNotificacao = "aviso" | "notificacao";

export interface Notificacao {
  id: string;
  tipo: TipoNotificacao;
  titulo: string;
  texto: string;
  /** Data já formatada, ex.: "01/09/2025". */
  data: string;
  /** Atalho opcional para a tela relacionada. */
  acao?: { rotulo: string; href: string };
}

export interface NotificacoesDados {
  titulo: string;
  descricao: string;
  /** Da mais recente para a mais antiga. */
  itens: Notificacao[];
}

export interface NotificacoesProps {
  /** Se não for fornecido, o componente usa os dados mockados padrão. */
  dados?: Partial<NotificacoesDados>;
  className?: string;
}

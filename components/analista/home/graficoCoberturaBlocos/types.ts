export type CategoriaStatus = "completo" | "emParte" | "semResposta";

export interface StatusCobertura {
  /** Porcentagem respondida por completo (0 a 100) */
  completo: number;
  /** Porcentagem respondida em parte (0 a 100) */
  emParte: number;
  /** Porcentagem sem resposta (0 a 100) */
  semResposta: number;
}

export interface BlocoCobertura {
  id: string;
  codigo: string; // Ex: "B1", "B2"
  nome: string; // Ex: "Informações Gerais"
  status: StatusCobertura;
}

export interface CoberturaGeral {
  titulo: string;
  subtitulo: string;
  rotuloMetricaPrincipal?: string; // Padrão: "% de blocos respondidos por completo"
  rodape?: string;
  statusGeral: StatusCobertura;
  blocos: BlocoCobertura[];
}

export type ModoVisualizacao = "combinado" | "rosca" | "barras";

export interface GraficoCoberturaBlocosProps {
  /**
   * Dados de cobertura dos blocos. Se não for fornecido,
   * o componente utilizará os dados mockados padrão.
   */
  dados?: Partial<CoberturaGeral>;
  /** Modo inicial de exibição do gráfico: 'combinado' (rosca + blocos), 'rosca' ou 'barras' */
  modoExibicao?: ModoVisualizacao;
  /** Permite ao usuário alternar entre os modos de exibição */
  permitirAlternarModo?: boolean;
  /** Permite clicar em um bloco para inspecionar seus dados na rosca */
  permitirSelecaoBloco?: boolean;
  /** Classes CSS adicionais para o container do card */
  className?: string;
}

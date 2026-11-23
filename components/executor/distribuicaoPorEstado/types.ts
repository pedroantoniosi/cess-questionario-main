/**
 * As 27 Unidades Federativas do Brasil (26 Estados + 1 Distrito Federal)
 */
export const ESTADOS_BRASIL = [
  "AC",
  "AL",
  "AP",
  "AM",
  "BA",
  "CE",
  "DF",
  "ES",
  "GO",
  "MA",
  "MT",
  "MS",
  "MG",
  "PA",
  "PB",
  "PR",
  "PE",
  "PI",
  "RJ",
  "RN",
  "RS",
  "RO",
  "RR",
  "SC",
  "SP",
  "SE",
  "TO",
] as const;

export type SiglaEstado = (typeof ESTADOS_BRASIL)[number];

export type NomeEstado =
  | "Acre"
  | "Alagoas"
  | "Amapá"
  | "Amazonas"
  | "Bahia"
  | "Ceará"
  | "Distrito Federal"
  | "Espírito Santo"
  | "Goiás"
  | "Maranhão"
  | "Mato Grosso"
  | "Mato Grosso do Sul"
  | "Minas Gerais"
  | "Pará"
  | "Paraíba"
  | "Paraná"
  | "Pernambuco"
  | "Piauí"
  | "Rio de Janeiro"
  | "Rio Grande do Norte"
  | "Rio Grande do Sul"
  | "Rondônia"
  | "Roraima"
  | "Santa Catarina"
  | "São Paulo"
  | "Sergipe"
  | "Tocantins";

export interface Coordenadas {
  x: number; // Porcentagem de 0 a 100 no mapa
  y: number; // Porcentagem de 0 a 100 no mapa
}

export interface EstadoDistribuicao {
  estado: NomeEstado;
  sigla: SiglaEstado;
  capital: string;
  instalacoes: number;
  percentual: number;
  coordenadas: Coordenadas;
}

export interface DistribuicaoPorEstadoDados {
  titulo: string;
  descricao: string;
  estados: EstadoDistribuicao[];
}

export type NivelMaturidadeEstado = "N1" | "N2" | "N3" | "N4" | "N5";

export type StatusQuestionarioEstado =
  | "Concluído"
  | "Em andamento"
  | "Pendente";

export interface BlocoDesempenhoInstalacao {
  codigo: string;
  nome: string;
  percentual: number;
  status: "Completo" | "Em parte" | "Sem resposta";
}

export interface ConformidadeInstalacao {
  licencaOperacao: boolean;
  certificacaoAmbiental: boolean;
  responsavelCadastrado: boolean;
  auditoriaRealizada: boolean;
}

export interface InstalacaoDetalhe {
  id: string;
  nome: string;
  municipio: string;
  nivelMaturidade: NivelMaturidadeEstado;
  statusQuestionario: StatusQuestionarioEstado;
  progresso: number; // 0 a 100
  responsavel?: string;
  ultimaAtualizacao?: string;
  segmento?: string;
  conformidade?: ConformidadeInstalacao;
  blocosDetalhados?: BlocoDesempenhoInstalacao[];
}

export interface CoberturaBlocoEstado {
  codigo: string; // Ex: "B1", "B2"
  nome: string; // Ex: "Informações Gerais"
  percentual: number; // 0 a 100
}

export interface DetalhesEstadoMock {
  sigla: SiglaEstado;
  nome: string;
  capital: string;
  regiao: "Norte" | "Nordeste" | "Centro-Oeste" | "Sudeste" | "Sul";
  totalInstalacoes: number;
  percentualNacional: number;
  maturidadeMedia: {
    nivel: NivelMaturidadeEstado;
    pontuacao: number; // 0 a 100
    descricao: string;
    cor: string;
  };
  taxaConclusao: number; // 0 a 100
  statusGeral: {
    concluidos: number;
    emAndamento: number;
    pendentes: number;
  };
  instalacoes: InstalacaoDetalhe[];
  coberturaBlocos: CoberturaBlocoEstado[];
}

export interface DistribuicaoPorEstadoProps {
  dados?: Partial<DistribuicaoPorEstadoDados>;
  className?: string;
  estadoInicial?: SiglaEstado | null;
}

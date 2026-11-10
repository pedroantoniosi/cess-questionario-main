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

export interface DistribuicaoPorEstadoProps {
  dados?: Partial<DistribuicaoPorEstadoDados>;
  className?: string;
}

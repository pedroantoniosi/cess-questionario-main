import { COORDENADAS_ESTADOS } from "./mapaBrasilPath";
import { DistribuicaoPorEstadoDados } from "./types";

export const distribuicaoPorEstado: DistribuicaoPorEstadoDados = {
  titulo: "Distribuição por estado",
  descricao: "Distribuição geográfica das instalações cadastradas.",

  estados: [
    {
      estado: "Rio de Janeiro",
      sigla: "RJ",
      capital: "Rio de Janeiro",
      instalacoes: 3,
      percentual: 50.0,
      coordenadas: COORDENADAS_ESTADOS.RJ,
    },
    {
      estado: "Bahia",
      sigla: "BA",
      capital: "Salvador",
      instalacoes: 2,
      percentual: 33.3,
      coordenadas: COORDENADAS_ESTADOS.BA,
    },
    {
      estado: "Pernambuco",
      sigla: "PE",
      capital: "Recife",
      instalacoes: 1,
      percentual: 16.7,
      coordenadas: COORDENADAS_ESTADOS.PE,
    },
  ],
};

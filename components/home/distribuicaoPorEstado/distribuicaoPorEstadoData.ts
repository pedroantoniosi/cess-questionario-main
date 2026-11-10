export interface EstadoDistribuicao {
  estado: string;
  sigla: string;
  capital: string;
  instalacoes: number;
  percentual: number;
  coordenadas: {
    x: number;
    y: number;
  };
}

export const distribuicaoPorEstado = {
  titulo: "Distribuição por estado",
  descricao: "Distribuição geográfica das instalações cadastradas.",

  estados: [
    {
      estado: "Rio de Janeiro",
      sigla: "RJ",
      capital: "Rio de Janeiro",
      instalacoes: 7,
      percentual: 58.33,
      coordenadas: { x: 73, y: 73 },
    },
    {
      estado: "Maranhão",
      sigla: "MA",
      capital: "São Luís",
      instalacoes: 1,
      percentual: 8.33,
      coordenadas: { x: 65, y: 40 },
    },
    {
      estado: "Santa Catarina",
      sigla: "SC",
      capital: "Florianópolis",
      instalacoes: 1,
      percentual: 8.33,
      coordenadas: { x: 52, y: 91 },
    },
    {
      estado: "Paraná",
      sigla: "PR",
      capital: "Curitiba",
      instalacoes: 1,
      percentual: 8.33,
      coordenadas: { x: 60, y: 82 },
    },
    {
      estado: "Bahia",
      sigla: "BA",
      capital: "Salvador",
      instalacoes: 1,
      percentual: 8.33,
      coordenadas: { x: 77, y: 61 },
    },
    {
      estado: "Pernambuco",
      sigla: "PE",
      capital: "Recife",
      instalacoes: 1,
      percentual: 8.33,
      coordenadas: { x: 85, y: 48 },
    },
  ] satisfies EstadoDistribuicao[],
};

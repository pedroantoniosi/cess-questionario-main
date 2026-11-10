import { CoberturaGeral } from "./types";

export const CORES_COBERTURA = {
  completo: {
    chave: "completo" as const,
    rotulo: "Respondido por completo",
    rotuloCurto: "Completo",
    corHex: "#A3E635", // Verde-limão / lima
    bgClass: "bg-[#A3E635]",
    textClass: "text-[#A3E635]",
  },
  emParte: {
    chave: "emParte" as const,
    rotulo: "Respondido em parte",
    rotuloCurto: "Em parte",
    corHex: "#65A30D", // Verde-oliva / folha
    bgClass: "bg-[#65A30D]",
    textClass: "text-[#65A30D]",
  },
  semResposta: {
    chave: "semResposta" as const,
    rotulo: "Sem resposta",
    rotuloCurto: "Sem resposta",
    corHex: "#0D9488", // Azul petróleo / teal
    bgClass: "bg-[#0D9488]",
    textClass: "text-[#0D9488]",
  },
} as const;

export const mockCoberturaGeral: CoberturaGeral = {
  titulo: "Cobertura dos blocos",
  subtitulo:
    "Instalações com cada bloco respondido por completo, em parte ou sem resposta.",
  rotuloMetricaPrincipal: "% de blocos respondidos por completo",
  rodape: "Calculado a partir das respostas das instalações na rodada selecionada.",
  statusGeral: {
    completo: 25,
    emParte: 45,
    semResposta: 30,
  },
  blocos: [
    {
      id: "b1",
      codigo: "B1",
      nome: "Informações Gerais",
      status: {
        completo: 75,
        emParte: 15,
        semResposta: 10,
      },
    },
    {
      id: "b2",
      codigo: "B2",
      nome: "Infraestrutura Física e Acessibilidade",
      status: {
        completo: 0,
        emParte: 70,
        semResposta: 30,
      },
    },
    {
      id: "b3",
      codigo: "B3",
      nome: "Aspectos Regulatórios e Licenciamentos",
      status: {
        completo: 8,
        emParte: 62,
        semResposta: 30,
      },
    },
    {
      id: "b4",
      codigo: "B4",
      nome: "Aspectos Ambientais e Materiais Perigosos",
      status: {
        completo: 0,
        emParte: 65,
        semResposta: 35,
      },
    },
    {
      id: "b5",
      codigo: "B5",
      nome: "Recursos Humanos",
      status: {
        completo: 75,
        emParte: 15,
        semResposta: 10,
      },
    },
    {
      id: "b6",
      codigo: "B6",
      nome: "Capacidade Financeira e Segurança",
      status: {
        completo: 17,
        emParte: 53,
        semResposta: 30,
      },
    },
    {
      id: "b7",
      codigo: "B7",
      nome: "Outras perguntas",
      status: {
        completo: 0,
        emParte: 20,
        semResposta: 80,
      },
    },
  ],
};

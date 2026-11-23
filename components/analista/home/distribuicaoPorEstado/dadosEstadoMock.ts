import {
  DetalhesEstadoMock,
  EstadoDistribuicao,
  SiglaEstado,
} from "./types";

/**
 * Dados mockados específicos de cada estado que possui instalações cadastradas.
 * A quantidade de instalações por estado bate exatamente com a seed de
 * desenvolvimento do backend (backend/prisma/seeds/development/020_installations.seed.js):
 * - RJ: 3 instalações (Dock Brasil, EISA, OSX Brasil)
 * - BA: 2 instalações (BELOV Offshore, Estaleiro Enseada)
 * - PE: 1 instalação (Estaleiro Atlântico Sul)
 */
export const DADOS_ESTADOS_MOCK: Partial<Record<SiglaEstado, DetalhesEstadoMock>> = {
  RJ: {
    sigla: "RJ",
    nome: "Rio de Janeiro",
    capital: "Rio de Janeiro",
    regiao: "Sudeste",
    totalInstalacoes: 3,
    percentualNacional: 50.0,
    maturidadeMedia: {
      nivel: "N3",
      pontuacao: 42,
      descricao: "Intermediário",
      cor: "#EAB308",
    },
    taxaConclusao: 67,
    statusGeral: {
      concluidos: 1,
      emAndamento: 2,
      pendentes: 0,
    },
    coberturaBlocos: [
      { codigo: "B1", nome: "Informações Gerais", percentual: 100 },
      { codigo: "B2", nome: "Infraestrutura Física", percentual: 83 },
      { codigo: "B3", nome: "Aspectos Regulatórios", percentual: 67 },
      { codigo: "B4", nome: "Aspectos Ambientais", percentual: 67 },
      { codigo: "B5", nome: "Recursos Humanos", percentual: 50 },
      { codigo: "B6", nome: "Capacidade Financeira", percentual: 17 },
    ],
    instalacoes: [
      {
        id: "10000000-0000-4000-8000-000000000001",
        nome: "Dock Brasil Engenharia e Serviços S.A.",
        municipio: "Rio de Janeiro",
        nivelMaturidade: "N4",
        statusQuestionario: "Em andamento",
        progresso: 82,
        segmento: "Portos",
        ultimaAtualizacao: "Atualizado em 12/02/2026",
        blocosDetalhados: [
          { codigo: "B1", nome: "Informações Gerais", percentual: 100, status: "Completo" },
          { codigo: "B2", nome: "Infraestrutura Física", percentual: 100, status: "Completo" },
          { codigo: "B3", nome: "Aspectos Regulatórios", percentual: 100, status: "Completo" },
          { codigo: "B4", nome: "Aspectos Ambientais", percentual: 100, status: "Completo" },
          { codigo: "B5", nome: "Recursos Humanos", percentual: 50, status: "Em parte" },
          { codigo: "B6", nome: "Capacidade Financeira", percentual: 0, status: "Sem resposta" },
        ],
      },
      {
        id: "10000000-0000-4000-8000-000000000003",
        nome: "EISA - Estaleiro Ilha S.A.",
        municipio: "Rio de Janeiro",
        nivelMaturidade: "N5",
        statusQuestionario: "Concluído",
        progresso: 94,
        segmento: "Estaleiros",
        ultimaAtualizacao: "Atualizado em 12/02/2026",
        blocosDetalhados: [
          { codigo: "B1", nome: "Informações Gerais", percentual: 100, status: "Completo" },
          { codigo: "B2", nome: "Infraestrutura Física", percentual: 100, status: "Completo" },
          { codigo: "B3", nome: "Aspectos Regulatórios", percentual: 100, status: "Completo" },
          { codigo: "B4", nome: "Aspectos Ambientais", percentual: 100, status: "Completo" },
          { codigo: "B5", nome: "Recursos Humanos", percentual: 100, status: "Completo" },
          { codigo: "B6", nome: "Capacidade Financeira", percentual: 50, status: "Em parte" },
        ],
      },
      {
        id: "10000000-0000-4000-8000-000000000004",
        nome: "OSX Brasil",
        municipio: "São João da Barra",
        nivelMaturidade: "N1",
        statusQuestionario: "Em andamento",
        progresso: 24,
        segmento: "Portos",
        ultimaAtualizacao: "Atualizado em 10/02/2026",
        blocosDetalhados: [
          { codigo: "B1", nome: "Informações Gerais", percentual: 100, status: "Completo" },
          { codigo: "B2", nome: "Infraestrutura Física", percentual: 50, status: "Em parte" },
          { codigo: "B3", nome: "Aspectos Regulatórios", percentual: 0, status: "Sem resposta" },
          { codigo: "B4", nome: "Aspectos Ambientais", percentual: 0, status: "Sem resposta" },
          { codigo: "B5", nome: "Recursos Humanos", percentual: 0, status: "Sem resposta" },
          { codigo: "B6", nome: "Capacidade Financeira", percentual: 0, status: "Sem resposta" },
        ],
      },
    ],
  },

  BA: {
    sigla: "BA",
    nome: "Bahia",
    capital: "Salvador",
    regiao: "Nordeste",
    totalInstalacoes: 2,
    percentualNacional: 33.3,
    maturidadeMedia: {
      nivel: "N2",
      pontuacao: 63,
      descricao: "Alto",
      cor: "#84CC16",
    },
    taxaConclusao: 50,
    statusGeral: {
      concluidos: 0,
      emAndamento: 2,
      pendentes: 0,
    },
    coberturaBlocos: [
      { codigo: "B1", nome: "Informações Gerais", percentual: 100 },
      { codigo: "B2", nome: "Infraestrutura Física", percentual: 100 },
      { codigo: "B3", nome: "Aspectos Regulatórios", percentual: 75 },
      { codigo: "B4", nome: "Aspectos Ambientais", percentual: 50 },
      { codigo: "B5", nome: "Recursos Humanos", percentual: 0 },
      { codigo: "B6", nome: "Capacidade Financeira", percentual: 0 },
    ],
    instalacoes: [
      {
        id: "10000000-0000-4000-8000-000000000005",
        nome: "BELOV Offshore Industrial LTDA",
        municipio: "Salvador",
        nivelMaturidade: "N3",
        statusQuestionario: "Em andamento",
        progresso: 53,
        segmento: "Recicladoras",
        ultimaAtualizacao: "Atualizado em 10/02/2026",
        blocosDetalhados: [
          { codigo: "B1", nome: "Informações Gerais", percentual: 100, status: "Completo" },
          { codigo: "B2", nome: "Infraestrutura Física", percentual: 100, status: "Completo" },
          { codigo: "B3", nome: "Aspectos Regulatórios", percentual: 100, status: "Completo" },
          { codigo: "B4", nome: "Aspectos Ambientais", percentual: 50, status: "Em parte" },
          { codigo: "B5", nome: "Recursos Humanos", percentual: 0, status: "Sem resposta" },
          { codigo: "B6", nome: "Capacidade Financeira", percentual: 0, status: "Sem resposta" },
        ],
      },
      {
        id: "10000000-0000-4000-8000-000000000006",
        nome: "Estaleiro Enseada",
        municipio: "Maragogipe",
        nivelMaturidade: "N2",
        statusQuestionario: "Em andamento",
        progresso: 47,
        segmento: "Estaleiros",
        ultimaAtualizacao: "Atualizado em 09/02/2026",
        blocosDetalhados: [
          { codigo: "B1", nome: "Informações Gerais", percentual: 100, status: "Completo" },
          { codigo: "B2", nome: "Infraestrutura Física", percentual: 100, status: "Completo" },
          { codigo: "B3", nome: "Aspectos Regulatórios", percentual: 50, status: "Em parte" },
          { codigo: "B4", nome: "Aspectos Ambientais", percentual: 50, status: "Em parte" },
          { codigo: "B5", nome: "Recursos Humanos", percentual: 0, status: "Sem resposta" },
          { codigo: "B6", nome: "Capacidade Financeira", percentual: 0, status: "Sem resposta" },
        ],
      },
    ],
  },

  PE: {
    sigla: "PE",
    nome: "Pernambuco",
    capital: "Recife",
    regiao: "Nordeste",
    totalInstalacoes: 1,
    percentualNacional: 16.7,
    maturidadeMedia: {
      nivel: "N2",
      pontuacao: 75,
      descricao: "Alto",
      cor: "#84CC16",
    },
    taxaConclusao: 38,
    statusGeral: {
      concluidos: 0,
      emAndamento: 1,
      pendentes: 0,
    },
    coberturaBlocos: [
      { codigo: "B1", nome: "Informações Gerais", percentual: 100 },
      { codigo: "B2", nome: "Infraestrutura Física", percentual: 100 },
      { codigo: "B3", nome: "Aspectos Regulatórios", percentual: 50 },
      { codigo: "B4", nome: "Aspectos Ambientais", percentual: 0 },
      { codigo: "B5", nome: "Recursos Humanos", percentual: 0 },
      { codigo: "B6", nome: "Capacidade Financeira", percentual: 0 },
    ],
    instalacoes: [
      {
        id: "10000000-0000-4000-8000-000000000002",
        nome: "Estaleiro Atlântico Sul S.A.",
        municipio: "Ipojuca",
        nivelMaturidade: "N2",
        statusQuestionario: "Em andamento",
        progresso: 38,
        segmento: "Estaleiros",
        ultimaAtualizacao: "Atualizado em 11/02/2026",
        blocosDetalhados: [
          { codigo: "B1", nome: "Informações Gerais", percentual: 100, status: "Completo" },
          { codigo: "B2", nome: "Infraestrutura Física", percentual: 100, status: "Completo" },
          { codigo: "B3", nome: "Aspectos Regulatórios", percentual: 50, status: "Em parte" },
          { codigo: "B4", nome: "Aspectos Ambientais", percentual: 0, status: "Sem resposta" },
          { codigo: "B5", nome: "Recursos Humanos", percentual: 0, status: "Sem resposta" },
          { codigo: "B6", nome: "Capacidade Financeira", percentual: 0, status: "Sem resposta" },
        ],
      },
    ],
  },
};

/**
 * Tabela de metadados para fallback de qualquer uma das 27 UFs brasileiras
 */
const METADADOS_ESTADOS_BRASIL: Record<
  SiglaEstado,
  {
    nome: string;
    capital: string;
    regiao: "Norte" | "Nordeste" | "Centro-Oeste" | "Sudeste" | "Sul";
  }
> = {
  AC: { nome: "Acre", capital: "Rio Branco", regiao: "Norte" },
  AL: { nome: "Alagoas", capital: "Maceió", regiao: "Nordeste" },
  AP: { nome: "Amapá", capital: "Macapá", regiao: "Norte" },
  AM: { nome: "Amazonas", capital: "Manaus", regiao: "Norte" },
  BA: { nome: "Bahia", capital: "Salvador", regiao: "Nordeste" },
  CE: { nome: "Ceará", capital: "Fortaleza", regiao: "Nordeste" },
  DF: { nome: "Distrito Federal", capital: "Brasília", regiao: "Centro-Oeste" },
  ES: { nome: "Espírito Santo", capital: "Vitória", regiao: "Sudeste" },
  GO: { nome: "Goiás", capital: "Goiânia", regiao: "Centro-Oeste" },
  MA: { nome: "Maranhão", capital: "São Luís", regiao: "Nordeste" },
  MT: { nome: "Mato Grosso", capital: "Cuiabá", regiao: "Centro-Oeste" },
  MS: { nome: "Mato Grosso do Sul", capital: "Campo Grande", regiao: "Centro-Oeste" },
  MG: { nome: "Minas Gerais", capital: "Belo Horizonte", regiao: "Sudeste" },
  PA: { nome: "Pará", capital: "Belém", regiao: "Norte" },
  PB: { nome: "Paraíba", capital: "João Pessoa", regiao: "Nordeste" },
  PR: { nome: "Paraná", capital: "Curitiba", regiao: "Sul" },
  PE: { nome: "Pernambuco", capital: "Recife", regiao: "Nordeste" },
  PI: { nome: "Piauí", capital: "Teresina", regiao: "Nordeste" },
  RJ: { nome: "Rio de Janeiro", capital: "Rio de Janeiro", regiao: "Sudeste" },
  RN: { nome: "Rio Grande do Norte", capital: "Natal", regiao: "Nordeste" },
  RS: { nome: "Rio Grande do Sul", capital: "Porto Alegre", regiao: "Sul" },
  RO: { nome: "Rondônia", capital: "Porto Velho", regiao: "Norte" },
  RR: { nome: "Roraima", capital: "Boa Vista", regiao: "Norte" },
  SC: { nome: "Santa Catarina", capital: "Florianópolis", regiao: "Sul" },
  SP: { nome: "São Paulo", capital: "São Paulo", regiao: "Sudeste" },
  SE: { nome: "Sergipe", capital: "Aracaju", regiao: "Nordeste" },
  TO: { nome: "Tocantins", capital: "Palmas", regiao: "Norte" },
};

/**
 * Retorna os dados mockados detalhados para o estado solicitado.
 * Se o estado não estiver na base principal, gera dados consistentes e realistas.
 */
export function obterDetalhesEstado(
  sigla: SiglaEstado,
  estadoAtual?: EstadoDistribuicao | null
): DetalhesEstadoMock {
  if (DADOS_ESTADOS_MOCK[sigla]) {
    return DADOS_ESTADOS_MOCK[sigla]!;
  }

  const meta = METADADOS_ESTADOS_BRASIL[sigla] ?? {
    nome: estadoAtual?.estado ?? sigla,
    capital: estadoAtual?.capital ?? "Capital",
    regiao: "Sudeste" as const,
  };

  const total = estadoAtual?.instalacoes ?? 0;
  const percentual = estadoAtual?.percentual ?? 0;

  return {
    sigla,
    nome: meta.nome,
    capital: meta.capital,
    regiao: meta.regiao,
    totalInstalacoes: total,
    percentualNacional: percentual,
    maturidadeMedia: {
      nivel: "N3",
      pontuacao: 65,
      descricao: "Intermediário",
      cor: "#EAB308",
    },
    taxaConclusao: total > 0 ? 70 : 0,
    statusGeral: {
      concluidos: Math.floor(total * 0.6),
      emAndamento: Math.ceil(total * 0.4),
      pendentes: 0,
    },
    coberturaBlocos: [
      { codigo: "B1", nome: "Informações Gerais", percentual: 75 },
      { codigo: "B2", nome: "Infraestrutura Física", percentual: 68 },
      { codigo: "B3", nome: "Aspectos Regulatórios", percentual: 65 },
      { codigo: "B4", nome: "Aspectos Ambientais", percentual: 62 },
      { codigo: "B5", nome: "Recursos Humanos", percentual: 70 },
      { codigo: "B6", nome: "Capacidade Financeira", percentual: 60 },
    ],
    instalacoes:
      total > 0
        ? [
            {
              id: `${sigla.toLowerCase()}-01`,
              nome: `Unidade Operacional ${meta.nome}`,
              municipio: meta.capital,
              nivelMaturidade: "N3",
              statusQuestionario: "Em andamento",
              progresso: 70,
              responsavel: "Coordenação Regional CESS",
              ultimaAtualizacao: "Atualizado recentemente",
            },
          ]
        : [],
  };
}

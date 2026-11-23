export type NivelAdesaoBloco = "completo" | "parcial" | "nenhum";

export interface BlocoAdesao {
  codigo: string; // Ex: "B1"
  nome: string; // Ex: "Informações Gerais"
  percentual: number; // 0 a 100
}

export interface ProgressaoML {
  /** % de requisitos do ML atendidos (cor azul) */
  atendido: number;
  /** % de requisitos do ML atendidos parcialmente (cor amarela) */
  parcial: number;
  /** % de requisitos do ML não atendidos (cor cinza) */
  naoAtendido: number;
}

export interface Participante {
  id: string;
  nome: string;
  tipo: string; // installationType (ver lib/api/installationType)
  cidade: string;
  estado: string;
  blocos: BlocoAdesao[];
  progressao: ProgressaoML;
}

/** Deriva o nível de adesão de um bloco a partir do percentual atendido. */
export function nivelAdesaoBloco(percentual: number): NivelAdesaoBloco {
  if (percentual >= 100) return "completo";
  if (percentual <= 0) return "nenhum";
  return "parcial";
}

/** Estilo visual (cor) de cada nível de adesão por bloco. */
export const ESTILO_ADESAO_BLOCO: Record<
  NivelAdesaoBloco,
  { dot: string; label: string }
> = {
  completo: {
    dot: "bg-emerald-400",
    label: "100% dos requisitos do bloco atendidos",
  },
  parcial: {
    dot: "bg-blue-400",
    label: "Atendimento parcial (1% a 99%)",
  },
  nenhum: {
    dot: "bg-slate-500",
    label: "Nenhum requisito do bloco atendido (0%)",
  },
};

/** Estilo visual (cor) de cada segmento da progressão geral do ML. */
export const CORES_PROGRESSAO_ML: {
  chave: keyof ProgressaoML;
  barraClass: string;
  label: string;
}[] = [
  { chave: "atendido", barraClass: "bg-blue-500", label: "Requisitos atendidos" },
  { chave: "parcial", barraClass: "bg-yellow-400", label: "Atendido parcialmente" },
  { chave: "naoAtendido", barraClass: "bg-slate-600", label: "Requisitos não atendidos" },
];

/**
 * Nomes dos blocos do diagnóstico, na mesma ordem/convenção usada em
 * components/analista/home/graficoCoberturaBlocos/GraficoCoberturaBlocosData.ts
 * (B1 a B6, cadastrados em backend/prisma/seeds/.../030_questionnaire_blocks.seed.js).
 */
export const NOMES_BLOCOS: { codigo: string; nome: string }[] = [
  { codigo: "B1", nome: "Informações Gerais" },
  { codigo: "B2", nome: "Infraestrutura Física e Acessibilidade" },
  { codigo: "B3", nome: "Aspectos Regulatórios e Licenciamentos" },
  { codigo: "B4", nome: "Aspectos Ambientais e Materiais Perigosos" },
  { codigo: "B5", nome: "Recursos Humanos" },
  { codigo: "B6", nome: "Capacidade Financeira e Segurança" },
];

function montarBlocos(percentuais: number[]): BlocoAdesao[] {
  return NOMES_BLOCOS.map((bloco, indice) => ({
    ...bloco,
    percentual: percentuais[indice],
  }));
}

/**
 * Dados de exemplo (mock) das instalações participantes, com nomes, tipos
 * e localização derivados da seed de desenvolvimento
 * (backend/prisma/seeds/development/020_installations.seed.js).
 * Os percentuais de adesão por bloco e a progressão geral do ML ainda não
 * existem na API; serão substituídos quando o backend expuser esses dados
 * para esta tela (ex.: GET /round/:id/installations).
 */
export const mockParticipantes: Participante[] = [
  {
    id: "10000000-0000-4000-8000-000000000001",
    nome: "Dock Brasil Engenharia e Serviços S.A.",
    tipo: "PORT",
    cidade: "Rio de Janeiro",
    estado: "RJ",
    blocos: montarBlocos([100, 100, 83, 50, 17, 0]),
    progressao: { atendido: 58, parcial: 25, naoAtendido: 17 },
  },
  {
    id: "10000000-0000-4000-8000-000000000002",
    nome: "Estaleiro Atlântico Sul S.A.",
    tipo: "SHIPYARD",
    cidade: "Ipojuca",
    estado: "PE",
    blocos: montarBlocos([100, 100, 100, 100, 83, 67]),
    progressao: { atendido: 92, parcial: 8, naoAtendido: 0 },
  },
  {
    id: "10000000-0000-4000-8000-000000000003",
    nome: "EISA - Estaleiro Ilha S.A.",
    tipo: "SHIPYARD",
    cidade: "Rio de Janeiro",
    estado: "RJ",
    blocos: montarBlocos([100, 83, 50, 33, 0, 0]),
    progressao: { atendido: 44, parcial: 28, naoAtendido: 28 },
  },
  {
    id: "10000000-0000-4000-8000-000000000004",
    nome: "OSX Brasil",
    tipo: "PORT",
    cidade: "São João da Barra",
    estado: "RJ",
    blocos: montarBlocos([100, 50, 0, 0, 0, 0]),
    progressao: { atendido: 25, parcial: 8, naoAtendido: 67 },
  },
  {
    id: "10000000-0000-4000-8000-000000000005",
    nome: "BELOV Offshore Industrial LTDA",
    tipo: "RECYCLER",
    cidade: "Salvador",
    estado: "BA",
    blocos: montarBlocos([0, 0, 0, 0, 0, 0]),
    progressao: { atendido: 0, parcial: 0, naoAtendido: 100 },
  },
  {
    id: "10000000-0000-4000-8000-000000000006",
    nome: "Estaleiro Enseada",
    tipo: "SHIPYARD",
    cidade: "Maragogipe",
    estado: "BA",
    blocos: montarBlocos([100, 100, 100, 100, 100, 100]),
    progressao: { atendido: 100, parcial: 0, naoAtendido: 0 },
  },
];

export type InstallationType = "PORT" | "SHIPYARD" | "RECYCLER";

export type IndicatorGroup =
  | "summary"
  | "infrastructure"
  | "structure"
  | "capacity"
  | "processes";

export interface InstallationRound {
  id: number;
  uuid: string;
  roundId: number;
  installationId: number;
  type: InstallationType;
  maturityLevel: number;
  participationStatus: string;
  completionRate: number;
  startedAt: string | null;
  completedAt: string | null;
  calculatedAt: string | null;

  currentDraftM: number | null;
  dredgedDraftM: number | null;
  airDraftM: number | null;
  quayLengthM: number | null;
  maxBerthLengthM: number | null;

  dryDockLengthM: number | null;
  dryDockWidthM: number | null;
  dryDockDepthM: number | null;

  rampLengthM: number | null;
  rampWidthM: number | null;
  rampDepthM: number | null;

  primaryCutImpermeableAreaM2: number | null;
  primaryCutDrainageAreaM2: number | null;

  organizationalStructure: string | null;
  environmentalArea: string | null;
  safetyArea: string | null;
  formalPlanning: string | null;
  operationsControl: string | null;
  incidentRecords: string | null;
  audits: string | null;

  hasCrane: boolean | null;
  craneQuantity: number | null;
  craneDescription: string | null;
  craneLiftingDescription: string | null;

  hasCuttingEquipment: boolean | null;
  cuttingEquipmentType: string | null;
  cuttingEquipmentQuantity: number | null;

  hasMobileCrane: boolean | null;
  mobileCraneQuantity: number | null;
  hasForklift: boolean | null;
  forkliftQuantity: number | null;
  hasOffshoreLiftingEquipment: boolean | null;
  offshoreLiftingEquipmentQuantity: number | null;

  fireFightingSystem: boolean | null;
  medicalSupport: boolean | null;
  environmentalContingencySystem: boolean | null;
  environmentalMonitoringSystem: boolean | null;

  hazardousWasteCollection: boolean | null;
  normCollection: boolean | null;
  oilyEffluentTreatment: boolean | null;
  sanitaryEffluentTreatment: boolean | null;
  wasteStorageArea: boolean | null;
  scrapStorageArea: boolean | null;
  normTemporaryStorageArea: boolean | null;
  wasteSegregationArea: boolean | null;

  environmentalOperatingLicense: boolean | null;
  shipRecyclingLicense: boolean | null;
  scrapProcessingLicense: boolean | null;
  normHandlingLicense: boolean | null;
  exoticSpeciesRemovalLicense: boolean | null;
  hazardousWasteTransportAuthorization: boolean | null;

  status: boolean;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface InstallationRoundResponse {
  success: boolean;
  status: number;
  message: string;
  filters: unknown;
  rules: unknown;
  pagination: Pagination;
  errors: unknown;
  data: InstallationRound[];
}

export interface IndicatorDefinition {
  key: keyof InstallationRound;
  label: string;
  unit?: string;
}

export interface IndicatorGroupDefinition {
  id: IndicatorGroup;
  label: string;
  indicators: IndicatorDefinition[];
}

export const ROUND_YEAR_BY_ID: Record<number, string> = {
  2: "2025",
  1: "2024",
};

export const INDICATOR_GROUPS: IndicatorGroupDefinition[] = [
  {
    id: "summary",
    label: "Resumo",
    indicators: [
      { key: "maturityLevel", label: "Nível de maturidade" },
      { key: "completionRate", label: "Perguntas respondidas", unit: "%" },
    ],
  },
  {
    id: "infrastructure",
    label: "Infraestrutura",
    indicators: [
      { key: "currentDraftM", label: "Calado atual", unit: "m" },
      { key: "dredgedDraftM", label: "Calado com dragagem", unit: "m" },
      { key: "airDraftM", label: "Calado aéreo", unit: "m" },
      { key: "quayLengthM", label: "Extensão do cais", unit: "m" },
      {
        key: "maxBerthLengthM",
        label: "Comprimento máximo permitido pelo berço",
        unit: "m",
      },
      { key: "dryDockLengthM", label: "Comprimento do dique seco", unit: "m" },
      { key: "dryDockWidthM", label: "Largura do dique seco", unit: "m" },
      { key: "dryDockDepthM", label: "Profundidade do dique seco", unit: "m" },
      { key: "rampLengthM", label: "Comprimento da rampa", unit: "m" },
      { key: "rampWidthM", label: "Largura da rampa", unit: "m" },
      { key: "rampDepthM", label: "Profundidade da rampa", unit: "m" },
      {
        key: "primaryCutImpermeableAreaM2",
        label: "Solo impermeável na área primária",
        unit: "m²",
      },
      {
        key: "primaryCutDrainageAreaM2",
        label: "Área de drenagem na área primária",
        unit: "m²",
      },
    ],
  },
  {
    id: "structure",
    label: "Estrutura",
    indicators: [
      { key: "organizationalStructure", label: "Estrutura organizacional" },
      { key: "environmentalArea", label: "Área ambiental" },
      { key: "safetyArea", label: "Área de segurança" },
      { key: "formalPlanning", label: "Planejamento formal" },
      { key: "operationsControl", label: "Controle operacional" },
      { key: "incidentRecords", label: "Registros de incidentes" },
      { key: "audits", label: "Auditorias" },
    ],
  },
  {
    id: "capacity",
    label: "Capacidade",
    indicators: [
      { key: "hasCrane", label: "Possui guindaste" },
      { key: "craneQuantity", label: "Quantidade de guindastes" },
      { key: "craneDescription", label: "Descrição dos guindastes" },
      { key: "craneLiftingDescription", label: "Capacidade de içamento" },
      { key: "hasCuttingEquipment", label: "Equipamentos de corte" },
      { key: "cuttingEquipmentType", label: "Tipos de equipamentos de corte" },
      {
        key: "cuttingEquipmentQuantity",
        label: "Quantidade de equipamentos de corte",
      },
      { key: "hasMobileCrane", label: "Possui guindaste móvel" },
      { key: "mobileCraneQuantity", label: "Quantidade de guindastes móveis" },
      { key: "hasForklift", label: "Possui empilhadeira" },
      { key: "forkliftQuantity", label: "Quantidade de empilhadeiras" },
      {
        key: "hasOffshoreLiftingEquipment",
        label: "Equipamento de içamento offshore",
      },
      {
        key: "offshoreLiftingEquipmentQuantity",
        label: "Quantidade de equipamentos offshore",
      },
    ],
  },
  {
    id: "processes",
    label: "Processos e licenças",
    indicators: [
      { key: "fireFightingSystem", label: "Sistema de combate a incêndio" },
      { key: "medicalSupport", label: "Suporte médico" },
      {
        key: "environmentalContingencySystem",
        label: "Sistema de contingência ambiental",
      },
      {
        key: "environmentalMonitoringSystem",
        label: "Monitoramento ambiental",
      },
      {
        key: "hazardousWasteCollection",
        label: "Coleta de resíduos perigosos",
      },
      { key: "normCollection", label: "Coleta de NORM" },
      {
        key: "oilyEffluentTreatment",
        label: "Tratamento de efluentes oleosos",
      },
      {
        key: "sanitaryEffluentTreatment",
        label: "Tratamento de efluentes sanitários",
      },
      { key: "wasteStorageArea", label: "Área de armazenamento de resíduos" },
      { key: "scrapStorageArea", label: "Área de armazenamento de sucata" },
      {
        key: "normTemporaryStorageArea",
        label: "Armazenamento temporário de NORM",
      },
      { key: "wasteSegregationArea", label: "Área de segregação de resíduos" },
      {
        key: "environmentalOperatingLicense",
        label: "Licença de operação ambiental",
      },
      { key: "shipRecyclingLicense", label: "Licença de reciclagem de navios" },
      {
        key: "scrapProcessingLicense",
        label: "Licença de processamento de sucata",
      },
      { key: "normHandlingLicense", label: "Licença de manuseio de NORM" },
      {
        key: "exoticSpeciesRemovalLicense",
        label: "Licença de remoção de espécies exóticas",
      },
      {
        key: "hazardousWasteTransportAuthorization",
        label: "Autorização de transporte de resíduos perigosos",
      },
    ],
  },
];

import type { LucideIcon } from "lucide-react";
import {
  Anchor,
  Building2,
  ChartNoAxesColumnIncreasing,
  ClipboardCheck,
  Database,
  FileText,
  MapPin,
  Paperclip,
  Recycle,
  TrendingUp,
} from "lucide-react";

export type Participant = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export const participants: Participant[] = [
  {
    title: "Estaleiro",
    description: "Instalações com capacidade de desmantelamento de unidades offshore.",
    icon: Building2,
  },
  {
    title: "Porto",
    description:
      "Instalações portuárias que apoiam as atividades de recebimento, movimentação e destinação de materiais.",
    icon: Anchor,
  },
  {
    title: "Recicladora",
    description:
      "Empresas que realizam o processamento, a segregação e a reciclagem dos materiais oriundos do descomissionamento.",
    icon: Recycle,
  },
];

export type ProcessStep = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export const processSteps: ProcessStep[] = [
  {
    title: "Cadastre sua instalação",
    description: "Registre a instalação (estaleiro, porto ou recicladora).",
    icon: Building2,
  },
  {
    title: "Preencha o questionário",
    description: "Informe capacidades, infraestrutura, licenças, processos e demais requisitos.",
    icon: ClipboardCheck,
  },
  {
    title: "Envie evidências",
    description: "Anexe documentos comprobatórios (licenças, certificações, fotos etc.).",
    icon: Paperclip,
  },
  {
    title: "Receba sua avaliação",
    description:
      "Ao final, sua instalação receberá a avaliação de maturidade de forma confidencial, com indicações de melhorias.",
    icon: ChartNoAxesColumnIncreasing,
  },
];

export type DecisionFeature = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export const decisionFeatures: DecisionFeature[] = [
  {
    title: "Base estruturada de dados",
    description: "Informações consolidadas, comparáveis e rastreáveis.",
    icon: Database,
  },
  {
    title: "Visualização geográfica",
    description: "Mapeamento das capacidades no território nacional.",
    icon: MapPin,
  },
  {
    title: "Indicações de melhorias",
    description: "Recomendações práticas para evolução das capacidades da instalação.",
    icon: TrendingUp,
  },
];

export const respondentProfile = {
  title: "Perfil do Respondente",
  description:
    "Representa a instalação participante (estaleiro, porto ou recicladora) e é responsável pelo preenchimento do diagnóstico da plataforma.",
  icon: FileText,
};

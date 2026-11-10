import React from "react";
import {
  LucideIcon,
  Database,
  Server,
  CircleHelp,
  Info,
  Menu,
  X,
  LayoutDashboard,
  BarChart3,
  PieChart,
  Check,
  Building2,
  FileText,
  ClipboardList,
  User,
  Settings,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  ChevronUp,
  Search,
} from "lucide-react";

/** Mapa de ícones pré-definidos para acesso rápido por nome */
export const ICON_MAP = {
  database: Database,
  server: Server,
  help: CircleHelp,
  info: Info,
  menu: Menu,
  close: X,
  dashboard: LayoutDashboard,
  chart: BarChart3,
  pie: PieChart,
  check: Check,
  building: Building2,
  file: FileText,
  list: ClipboardList,
  user: User,
  settings: Settings,
  chevronRight: ChevronRight,
  chevronLeft: ChevronLeft,
  chevronDown: ChevronDown,
  chevronUp: ChevronUp,
  search: Search,
} as const;

export type IconName = keyof typeof ICON_MAP;

export type IconSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | number;

const SIZE_PRESETS: Record<"xs" | "sm" | "md" | "lg" | "xl" | "2xl", number> = {
  xs: 14,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32,
  "2xl": 40,
};

export interface IconProps extends React.SVGAttributes<SVGElement> {
  /**
   * Componente de ícone (ex: LucideIcon ou qualquer SVG component).
   * Ex: `<Icon icon={Database} size="md" />`
   */
  icon?: LucideIcon | React.ComponentType<{
    size?: number | string;
    className?: string;
    color?: string;
    strokeWidth?: number | string;
  }>;
  /**
   * Nome de um ícone pré-registrado.
   * Ex: `<Icon name="database" size="lg" />`
   */
  name?: IconName;
  /**
   * Tamanho do ícone: presets ('xs', 'sm', 'md', 'lg', 'xl', '2xl') ou numérico em pixels.
   * Padrão: 'md' (20px).
   */
  size?: IconSize;
  /**
   * Largura do traço (stroke). Padrão: 2.
   */
  strokeWidth?: number;
  /**
   * Cor de preenchimento ou linha personalizada.
   * Padrão: branco através de 'text-white' / 'currentColor'.
   */
  color?: string;
  /**
   * Texto de acessibilidade.
   */
  ariaLabel?: string;
  /**
   * Classes adicionais do Tailwind. Padrão inclui 'text-white'.
   */
  className?: string;
  /**
   * SVG customizado passado como children (paths, circles, etc.).
   */
  children?: React.ReactNode;
}

/**
 * Componente padrão e reutilizável para ícones com SVG branco e tamanho variável.
 *
 * Exemplos de uso:
 * - `<Icon name="database" size="md" />`
 * - `<Icon icon={CircleHelp} size="sm" />`
 * - `<Icon size={28}><path d="..." /></Icon>`
 */
export default function Icon({
  icon,
  name,
  size = "md",
  strokeWidth = 2,
  color,
  ariaLabel,
  className = "",
  children,
  viewBox = "0 0 24 24",
  ...rest
}: IconProps) {
  // Resolução do tamanho em pixels
  const dimension: number =
    typeof size === "number"
      ? size
      : SIZE_PRESETS[size as keyof typeof SIZE_PRESETS] ?? 20;

  // Classes padrão: SVG branco por padrão (text-white), com transição suave
  const baseClasses = `inline-block shrink-0 text-white transition-colors duration-200 ${className}`;

  // 1. Caso seja passado um componente de ícone diretamente ou por nome
  const IconComponent = icon || (name ? ICON_MAP[name] : null);

  if (IconComponent) {
    return (
      <IconComponent
        size={dimension}
        color={color}
        strokeWidth={strokeWidth}
        className={baseClasses}
        aria-hidden={ariaLabel ? undefined : "true"}
        aria-label={ariaLabel}
        {...rest}
      />
    );
  }

  // 2. Caso sejam passados elementos SVG como children (paths customizados)
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={dimension}
      height={dimension}
      viewBox={viewBox}
      fill="none"
      stroke={color || "currentColor"}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={baseClasses}
      aria-hidden={ariaLabel ? undefined : "true"}
      aria-label={ariaLabel}
      role={ariaLabel ? "img" : "presentation"}
      {...rest}
    >
      {children}
    </svg>
  );
}

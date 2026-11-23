import {
  ClipboardList,
  History,
  LayoutGrid,
  LogOut,
  Settings,
  User,
  type LucideIcon,
} from "lucide-react";

/**
 * Dados do Menu Principal do respondente.
 * O componente MenuPrincipal só desenha o que está descrito aqui.
 */

export const RESPONDENTE_BASE = "/respondente";

export interface MenuItem {
  id: string;
  label: string;
  href: string;
  icon: LucideIcon;
  /** true = ativo só na rota exata; false = ativo também nas sub-rotas. */
  exact?: boolean;
}

export interface MenuGroup {
  id: string;
  title: string;
  items: MenuItem[];
}

export interface MenuParceiro {
  id: string;
  /** Nome exibido ao lado do logo, uma palavra por linha. */
  nome: string[];
  logo: string;
  alt: string;
  /** true = logo de uma cor só, exibido em branco sobre o fundo escuro. */
  monocromatico: boolean;
}

export const menuPrincipal: MenuGroup[] = [
  {
    id: "respondente",
    title: "Respondente",
    items: [
      {
        id: "dashboard",
        label: "Dashboard",
        href: RESPONDENTE_BASE,
        icon: LayoutGrid,
        exact: true,
      },
      {
        id: "questionario",
        label: "Questionário",
        href: `${RESPONDENTE_BASE}/questionario`,
        icon: ClipboardList,
      },
      {
        id: "historico",
        label: "Histórico",
        href: `${RESPONDENTE_BASE}/historico`,
        icon: History,
      },
    ],
  },
  {
    id: "usuario",
    title: "Usuário",
    items: [
      {
        id: "perfil",
        label: "Perfil",
        href: `${RESPONDENTE_BASE}/perfil`,
        icon: User,
      },
      {
        id: "configuracoes",
        label: "Configurações",
        href: `${RESPONDENTE_BASE}/configuracoes`,
        icon: Settings,
      },
    ],
  },
];

export const menuSair: MenuItem = {
  id: "sair",
  label: "Sair",
  href: "/",
  icon: LogOut,
};

export const menuParceiros: MenuParceiro[] = [
  {
    id: "cess",
    nome: ["Centro de", "Estudos", "Sustentáveis"],
    logo: "/logos/logo-cess.png",
    alt: "CESS",
    monocromatico: true,
  },
  {
    id: "uff",
    nome: ["Universidade", "Federal", "Fluminense"],
    logo: "/logos/logo-uff.png",
    alt: "UFF",
    monocromatico: true,
  },
  {
    id: "petrobras",
    nome: ["Petrobras"],
    logo: "/logos/logo-petrobras.png",
    alt: "Petrobras",
    monocromatico: false,
  },
];

/** Diz se um item do menu corresponde à rota atual. */
export function isMenuItemActive(item: MenuItem, pathname: string): boolean {
  if (item.exact) return pathname === item.href;
  return pathname === item.href || pathname.startsWith(`${item.href}/`);
}

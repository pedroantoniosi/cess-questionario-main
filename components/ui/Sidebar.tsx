"use client";

import {
  Building2,
  ClipboardList,
  FileText,
  LayoutDashboard,
  Settings,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
  {
    title: "Principal",
    items: [
      { label: "Visão geral", href: "/", icon: LayoutDashboard },
      {
        label: "Questionario",
        href: "/questionario",
        icon: ClipboardList,
      },
      {
        label: "Solicitações",
        href: "/explore/solicitations",
        icon: Building2,
      },

      { label: "Documentação", href: "/explore/documentation", icon: FileText },
    ],
  },
  // {
  //   title: "Ecossistema",
  //   items: [
  //     { label: "Mapa da cadeia", href: "/mapa", icon: MapPinned },
  //     { label: "Pesquisa e inovação", href: "/pesquisa", icon: GraduationCap },
  //     { label: "Oportunidades", href: "/oportunidades", icon: Target },
  //   ],
  // },
];

export default function Sidebar() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/dashboard"
      ? pathname === href
      : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <aside
      className="
        z-40 h-full
        border-r border-slate-200 bg-navbar
      "
    >
      {/* Logo */}
      <Link
        href="/dashboard"
        aria-label="CESS Connections — página inicial"
        className="flex h-16 items-center justify-center gap-3 border-b border-slate-200 px-3 md:justify-start md:px-5"
      >
        <div className="bg-card w-12 h-12 rounded-full"></div>

        <span className="hidden min-w-0 md:block">
          <span className="block font-bold text-white">CESS</span>
          <span className="block text-xs text-gray-200">Questionario</span>
        </span>
      </Link>

      {/* Navegação */}
      <nav
        aria-label="Navegação principal"
        className="flex-1 space-y-6 overflow-y-auto px-2 py-5 md:px-3"
      >
        {navigation.map((group) => (
          <section key={group.title}>
            <h2 className="mb-2 hidden px-3 text-xs font-semibold uppercase tracking-wider text-slate-400 md:block">
              {group.title}
            </h2>

            <div className="space-y-1">
              {group.items.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    title={item.label}
                    aria-label={item.label}
                    aria-current={active ? "page" : undefined}
                    className={`
                      flex min-h-11 items-center justify-center gap-3
                      rounded-lg px-2 text-sm font-medium
                      transition-colors md:justify-start md:px-3
                      ${
                        active
                          ? "bg-cyan-50 text-cyan-900"
                          : "text-white hover:bg-slate-800/20"
                      }
                    `}
                  >
                    <Icon
                      size={20}
                      strokeWidth={active ? 2.3 : 1.8}
                      className="shrink-0"
                    />

                    <span className="hidden truncate md:block">
                      {item.label}
                    </span>
                  </Link>
                );
              })}
            </div>
          </section>
        ))}
      </nav>

      {/* Configurações */}
      <div className="border-t border-slate-200 p-2 md:p-3">
        <Link
          href="/configuracoes"
          title="Configurações"
          aria-label="Configurações"
          className={`
            flex min-h-11 items-center justify-center gap-3
            rounded-lg px-2 text-sm font-medium md:justify-start md:px-3 text-white
            ${
              isActive("/configuracoes")
                ? "bg-cyan-50 text-cyan-900"
                : "text-white hover:bg-slate-800/20"
            }
          `}
        >
          <Settings size={20} className="shrink-0" />
          <span className="hidden md:block">Configurações</span>
        </Link>
      </div>
      <div className="mt-auto border-t border-slate-200 p-2 md:p-3">
        <Link
          href="/configuracoes"
          title="Configurações"
          aria-label="Configurações"
          className={`
            flex min-h-11 items-center justify-center gap-3
            rounded-lg px-2 text-sm font-medium md:justify-start md:px-3
            ${
              isActive("/configuracoes")
                ? "bg-cyan-50 text-cyan-900"
                : "text-white hover:bg-slate-800/20"
            }
          `}
        >
          <Settings size={20} className="shrink-0" />
          <span className="hidden md:block">Sair</span>
        </Link>
      </div>
    </aside>
  );
}

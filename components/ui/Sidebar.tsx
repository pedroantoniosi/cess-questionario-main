"use client";

import {
  Building2,
  ClipboardList,
  FileText,
  LayoutDashboard,
} from "lucide-react";

import Link from "next/link";

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
        label: "Participantes",
        href: "/participantes",
        icon: Building2,
      },
      {
        label: "Indicadores Técnicos",
        href: "/indicadores-tecnicos",
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
  return (
    <aside
      className="
        z-40 h-full
        border-r border-slate-200/50 bg-navbar
      "
    >
      {/* Logo */}
      <Link
        href="/dashboard"
        aria-label="CESS Connections — página inicial"
        className="flex h-16 items-center justify-center gap-3 border-b border-slate-200/50 px-3 md:justify-start md:px-5"
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

            <div className="flex flex-col q col-2">
              {group.items.map((item) => {
                const Icon = item.icon;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    title={item.label}
                    aria-label={item.label}
                    className={`
                      flex min-h-11 items-center justify-center gap-3
                      rounded-lg px-2 text-sm font-medium
                      transition-colors md:justify-start md:px-3
                      text-white hover:bg-slate-800/20
                    `}
                  >
                    <Icon size={20} strokeWidth={2.3} className="shrink-0" />

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
    </aside>
  );
}

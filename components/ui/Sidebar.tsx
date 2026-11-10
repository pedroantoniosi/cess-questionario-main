"use client";

import {
  Building2,
  ChartNoAxesCombined,
  ClipboardList,
  LayoutDashboard,
  Settings,
} from "lucide-react";

import Link from "next/link";

const navigation = [
  {
    title: "Principal",
    items: [
      { label: "Visão geral", href: "/", icon: LayoutDashboard },
      {
        label: "Questionário",
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
        icon: ChartNoAxesCombined,
      },
      {
        label: "Configurações",
        href: "/configuracoes",
        icon: Settings,
      },
    ],
  },
];

export default function Sidebar() {
  return (
    <aside
      className="
        fixed bottom-0 left-0 z-40 w-full
        border-t border-slate-200/50 bg-navbar
        md:sticky md:top-0 md:h-screen md:w-64
        md:shrink-0 md:overflow-hidden
        md:border-r md:border-t-0
      "
    >
      {/* Logo - Desktop */}
      <Link
        href="/dashboard"
        aria-label="CESS Connections — página inicial"
        className="
          hidden h-16 items-center gap-3
          border-b border-slate-200/50 px-5
          md:flex
        "
      >
        <div className="bg-card h-12 w-12 shrink-0 rounded-full" />

        <span className="min-w-0">
          <span className="block font-bold text-white">CESS</span>
          <span className="block text-xs text-gray-200">Questionário</span>
        </span>
      </Link>

      {/* Navegação */}
      <nav
        aria-label="Navegação principal"
        className="
          flex w-full items-center justify-around
          gap-1 px-1 py-2
          md:flex-col md:items-stretch
          md:gap-6 md:px-3 md:py-5
        "
      >
        {navigation.map((group) => (
          <section key={group.title} className="w-full">
            <h2
              className="
                hidden px-3 pb-2
                text-xs font-semibold uppercase
                tracking-wider text-slate-400
                md:block
              "
            >
              {group.title}
            </h2>

            <div
              className="
                flex w-full items-center justify-around gap-1
                md:flex-col md:items-stretch
              "
            >
              {group.items.map((item) => {
                const Icon = item.icon;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    title={item.label}
                    aria-label={item.label}
                    className="
                      flex min-w-0 flex-1 flex-col
                      items-center justify-center gap-1
                      rounded-lg px-1 py-2
                      text-center text-[10px] font-medium
                      text-white transition-colors
                      hover:bg-slate-800/20

                      md:min-h-11 md:flex-row
                      md:justify-start md:gap-3
                      md:px-3 md:text-left md:text-sm
                    "
                  >
                    <Icon size={20} strokeWidth={2.3} className="shrink-0" />

                    <span className="w-full truncate">{item.label}</span>
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

"use client";

import Link from "next/link";

import { menuPrincipal, menuSair, RESPONDENTE_BASE } from "./menuData";

/**
 * Menu do respondente.
 * Mesmo padrão visual da components/ui/Sidebar (página inicial): mesmas
 * classes, bloco do logo, grupos e itens. Só os links mudam, e vêm de
 * menuData. "Sair" entra como último item do último grupo.
 */
export default function MenuPrincipal() {
  const grupos = menuPrincipal.map((grupo, indice) =>
    indice === menuPrincipal.length - 1
      ? { ...grupo, items: [...grupo.items, menuSair] }
      : grupo,
  );

  return (
    <aside className="fixed bottom-0 bg-navbar w-full md:w-64 md:min-h-svh z-40">
      {/* Logo - Desktop */}
      <Link
        href={RESPONDENTE_BASE}
        aria-label="CESS Connections — página inicial"
        className="
          hidden h-16 items-center gap-3
          border-b border-slate-200/50 px-5
          md:flex z-40 bottom-0
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
        {grupos.map((grupo) => (
          <section key={grupo.id} className="w-full">
            <h2
              className="
                hidden px-3 pb-2
                text-xs font-semibold uppercase
                tracking-wider text-slate-400
                md:block
              "
            >
              {grupo.title}
            </h2>

            <div
              className="
                flex w-full items-center justify-around gap-1
                md:flex-col md:items-stretch
              "
            >
              {grupo.items.map((item) => {
                const Icon = item.icon;

                return (
                  <Link
                    key={item.id}
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

import type { ReactNode } from "react";

import Navbar from "@/components/ui/Navbar";

import MenuPrincipal from "./menu/MenuPrincipal";

interface RespondenteTemplateProps {
  children: ReactNode;
}

/**
 * Template das páginas do respondente. Mesmo padrão do MainTemplate
 * (página inicial): Navbar fixa no topo, menu lateral e conteúdo ao lado.
 * Só o menu muda, porque os links do respondente são outros.
 */
export default function RespondenteTemplate({
  children,
}: RespondenteTemplateProps) {
  return (
    <div>
      {/* Navbar fixa no topo */}
      <header className="fixed inset-x-0 top-0 z-50 h-16">
        <Navbar />
      </header>

      {/* Área abaixo da navbar */}
      <div className="flex min-h-screen pt-16">
        {/* Menu fixo abaixo da navbar */}
        <MenuPrincipal />

        {/* Conteúdo ao lado do menu (pb no celular: barra inferior) */}
        <main className="min-w-0 flex-1 bg-template p-4 pb-24 text-white md:ml-64 md:pb-4">
          {children}
        </main>
      </div>
    </div>
  );
}

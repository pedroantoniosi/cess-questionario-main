import React from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

interface ExploreTemplateProps {
  children: React.ReactNode;
}

export default function MainTemplate({ children }: ExploreTemplateProps) {
  return (
    <div className="min-h-screen bg-zinc-50">
      {/* Navbar fixa no topo */}
      <header className="fixed inset-x-0 top-0 z-50 h-16">
        <Navbar />
      </header>

      {/* Área abaixo da navbar */}
      <div className="flex min-h-screen pt-16">
        {/* Sidebar fixa abaixo da navbar */}
        <aside className="fixed bottom-0 left-0 top-16 z-40 w-16 overflow-y-auto border-r border-cyan-900 bg-cyan-950 md:w-64">
          <Sidebar />
        </aside>

        {/* Conteúdo ao lado da sidebar */}
        <main className=" min-w-0 flex-1  md:ml-64 ">{children}</main>
      </div>
    </div>
  );
}

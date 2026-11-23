import React from "react";
import Breadcrumb from "./Breadcrumb";
import { BreadcrumbProvider } from "./BreadcrumbContext";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

interface ExploreTemplateProps {
  children: React.ReactNode;
}

export default function MainTemplate({ children }: ExploreTemplateProps) {
  return (
    <BreadcrumbProvider>
      <div className="flex min-h-screen">
        {/* Sidebar fixa abaixo da navbar */}
        <Sidebar />

        {/* Conteúdo ao lado da sidebar */}
        <main className=" min-w-0 flex-1 md:ml-64 p-4 bg-template pt-20">
          <div className="m-auto max-w-7xl">
            <Breadcrumb />
            <div className="flex">
              {children}
            </div>
          </div>
        </main>
      </div>
    </BreadcrumbProvider>
  );
}

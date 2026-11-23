"use client";

import { ChevronRight, Home } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment } from "react";

import { useBreadcrumbLabels } from "./BreadcrumbContext";

const SEGMENT_LABELS: Record<string, string> = {
  dashboard: "Visão Geral",
  questionarios: "Gerenciar Questionários",
  rodadas: "Gerenciar Rodadas",
  usuarios: "Gerenciar Usuários",
  auditoria: "Auditoria",
  participantes: "Participantes",
  analista: "Analista",
  home: "Início",
};

function formatSegment(segment: string) {
  const decoded = decodeURIComponent(segment);
  return SEGMENT_LABELS[decoded] ?? decoded.replace(/-/g, " ");
}

export default function Breadcrumb() {
  const pathname = usePathname();
  const labels = useBreadcrumbLabels();

  const segments = pathname
    .split("/")
    .filter((segment) => segment && !segment.startsWith("("));

  if (segments.length === 0) {
    return null;
  }

  return (
    <nav aria-label="Breadcrumb" className="mb-4 flex items-center text-sm text-gray-300">
      <Link href="/dashboard" className="flex items-center transition-colors hover:text-white">
        <Home size={16} />
      </Link>

      {segments.map((segment, index) => {
        const href = `/${segments.slice(0, index + 1).join("/")}`;
        const isLast = index === segments.length - 1;
        const label = labels[href] ?? formatSegment(segment);

        return (
          <Fragment key={href}>
            <ChevronRight size={16} className="mx-1 shrink-0 text-gray-400" />
            {isLast ? (
              <span className="font-medium text-white" aria-current="page">
                {label}
              </span>
            ) : (
              <Link href={href} className="transition-colors hover:text-white">
                {label}
              </Link>
            )}
          </Fragment>
        );
      })}
    </nav>
  );
}

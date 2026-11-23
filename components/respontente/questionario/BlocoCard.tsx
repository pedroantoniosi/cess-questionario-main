import { CircleCheck, Eye, FileText, Play, Sheet } from "lucide-react";
import Link from "next/link";

import Card from "@/components/ui/Card";

import { STATUS_BLOCO } from "./questionarioData";
import { BlocoQuestionario, FormatoExportacao } from "./types";

interface BlocoCardProps {
  bloco: BlocoQuestionario;
  /** Página de responder as questões deste bloco. */
  href: string;
  onAbrir?: (bloco: BlocoQuestionario) => void;
  onExportar?: (bloco: BlocoQuestionario, formato: FormatoExportacao) => void;
}

const ETIQUETA_STATUS = {
  concluido: "border-(--color-high)/30 bg-(--color-high)/15 text-(--color-high)",
  finalizado: "border-white/15 bg-white/5 text-gray-300",
  em_andamento: "border-(--color-medium)/50 bg-(--color-medium)/20 text-white",
  nao_iniciado: "border-white/15 bg-white/5 text-gray-300",
} as const;

const BOTAO_EXPORTAR =
  "inline-flex items-center gap-1.5 rounded-lg border border-white/20 px-3 py-1.5 text-xs font-bold text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-high)";

export default function BlocoCard({
  bloco,
  href,
  onAbrir,
  onExportar,
}: BlocoCardProps) {
  const status = STATUS_BLOCO[bloco.status];
  const AcaoIcon =
    bloco.status === "concluido"
      ? CircleCheck
      : bloco.status === "finalizado"
        ? Eye
        : Play;

  return (
    <Card className="h-full gap-4 border border-white/10 p-4 text-white">
      {/* CABEÇALHO (nome dentro do card) */}
      <header className="flex items-start gap-3">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-template text-sm font-bold">
          {bloco.ordem}
        </span>

        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <h3 className="text-base font-bold leading-tight">{bloco.titulo}</h3>
          <p className="text-sm text-gray-400">{bloco.descricao}</p>
        </div>

        <span
          className={`shrink-0 whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-semibold ${ETIQUETA_STATUS[bloco.status]}`}
        >
          {status.etiqueta}
        </span>
      </header>

      {/* PROGRESSO */}
      <div className="mt-auto flex flex-col gap-1.5">
        <span className="self-end text-xs font-bold">{bloco.percentual}%</span>

        <div
          className="h-1.5 w-full overflow-hidden rounded-full bg-template"
          role="progressbar"
          aria-label={`Progresso do bloco ${bloco.titulo}`}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={bloco.percentual}
        >
          <div
            className="h-full rounded-full bg-(--color-high) transition-all duration-300"
            style={{ width: `${bloco.percentual}%` }}
          />
        </div>
      </div>

      {/* RODAPÉ: exportar à esquerda, ação principal à direita */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <button
            type="button"
            className={BOTAO_EXPORTAR}
            onClick={() => onExportar?.(bloco, "pdf")}
            aria-label={`Exportar ${bloco.titulo} em PDF`}
          >
            <FileText size={14} aria-hidden="true" />
            PDF
          </button>
          <button
            type="button"
            className={BOTAO_EXPORTAR}
            onClick={() => onExportar?.(bloco, "csv")}
            aria-label={`Exportar ${bloco.titulo} em CSV`}
          >
            <Sheet size={14} aria-hidden="true" />
            CSV
          </button>
        </div>

        {/* Abre a página de responder o bloco */}
        <Link
          href={href}
          onClick={() => onAbrir?.(bloco)}
          className="inline-flex min-h-8 items-center justify-center gap-1.5 rounded-lg bg-(--color-medium) px-3 text-xs font-bold text-white transition-colors hover:bg-(--color-low) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-high)"
        >
          <AcaoIcon size={14} aria-hidden="true" />
          {status.acao}
        </Link>
      </div>
    </Card>
  );
}

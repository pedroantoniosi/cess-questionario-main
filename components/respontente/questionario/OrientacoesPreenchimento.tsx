import { CircleCheck, ClipboardList, TriangleAlert } from "lucide-react";

import Card from "@/components/ui/Card";

import { OrientacoesDados } from "./types";

interface OrientacoesPreenchimentoProps {
  dados: OrientacoesDados;
  className?: string;
}

export default function OrientacoesPreenchimento({
  dados,
  className = "",
}: OrientacoesPreenchimentoProps) {
  return (
    <Card className={`gap-5 p-5 text-white ${className}`}>
      {/* CABEÇALHO (nome dentro do card) */}
      <header className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-(--color-high)/30 bg-(--color-high)/10 text-(--color-high)">
            <ClipboardList size={20} aria-hidden="true" />
          </div>

          <div className="flex min-w-0 flex-col">
            <h2 className="text-lg font-bold leading-tight">{dados.titulo}</h2>
            <p className="text-sm text-gray-400">{dados.descricao}</p>
          </div>
        </div>
      </header>

      {/* RECOMENDAÇÕES */}
      <ul className="flex flex-col gap-3">
        {dados.itens.map((item) => (
          <li key={item} className="flex items-start gap-3 text-sm text-gray-200">
            <CircleCheck
              size={16}
              className="mt-0.5 shrink-0 text-(--color-high)"
              aria-hidden="true"
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>

      {/* ALERTA */}
      {dados.alerta && (
        <p
          role="note"
          className="flex items-start gap-3 rounded-xl border border-(--color-high)/60 bg-(--color-high)/10 p-4 text-sm font-medium text-white"
        >
          <TriangleAlert
            size={18}
            className="mt-0.5 shrink-0 text-(--color-high)"
            aria-hidden="true"
          />
          <span>{dados.alerta}</span>
        </p>
      )}

      {/* RODAPÉ */}
      {dados.rodape && (
        <p className="border-t border-white/10 pt-4 text-sm text-gray-400">
          {dados.rodape}
        </p>
      )}
    </Card>
  );
}

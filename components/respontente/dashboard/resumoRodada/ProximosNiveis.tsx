import { Layers } from "lucide-react";

import Card from "@/components/ui/Card";

import CardCabecalho from "../../shared/CardCabecalho";
import { NIVEIS_MATURIDADE } from "../historicoMaturidade/historicoMaturidadeData";
import { NivelProximo } from "./types";

interface ProximosNiveisProps {
  niveis: NivelProximo[];
}

/** Card pequeno: o nível atual e os que vêm depois. */
export default function ProximosNiveis({ niveis }: ProximosNiveisProps) {
  return (
    <Card className="h-full gap-4 p-5 text-white">
      <CardCabecalho
        titulo="Próximos níveis"
        descricao="Nível atual e o que vem a seguir"
        icone={<Layers size={20} aria-hidden="true" />}
      />

      <ol className="flex flex-col gap-2">
        {niveis.map((nivel) => {
          const atual = nivel.situacao === "atual";
          const proximo = nivel.situacao === "proximo";

          return (
            <li
              key={nivel.codigo}
              aria-current={atual ? "step" : undefined}
              className={`flex items-center gap-3 rounded-xl border p-2.5 ${
                atual
                  ? "border-(--color-high)/60 bg-(--color-high)/10"
                  : proximo
                    ? "border-dashed border-white/20 bg-template"
                    : "border-white/10 bg-template"
              }`}
            >
              <span
                className={`flex h-8 w-9 shrink-0 items-center justify-center rounded-lg text-xs font-extrabold text-white ${
                  atual ? "bg-(--color-medium)" : "bg-white/15"
                }`}
              >
                {nivel.codigo}
              </span>

              <span
                className={`min-w-0 flex-1 truncate text-sm font-bold ${
                  atual ? "text-(--color-high)" : "text-white"
                }`}
              >
                {NIVEIS_MATURIDADE[nivel.codigo].descricao}
              </span>

              {atual && (
                <span className="rounded-md border border-(--color-high)/30 bg-(--color-high)/15 px-2 py-0.5 text-xs font-semibold text-(--color-high)">
                  Atual
                </span>
              )}

              {proximo && (
                <span className="whitespace-nowrap rounded-md border border-(--color-medium)/50 bg-(--color-medium)/20 px-2 py-0.5 text-xs font-semibold text-white">
                  Próximo
                  {nivel.criterios &&
                    ` · ${nivel.criterios.atendidos}/${nivel.criterios.total}`}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </Card>
  );
}

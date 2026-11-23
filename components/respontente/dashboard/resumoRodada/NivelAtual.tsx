import { Gauge } from "lucide-react";

import Card from "@/components/ui/Card";

import CardCabecalho from "../../shared/CardCabecalho";
import { NIVEIS_MATURIDADE } from "../historicoMaturidade/historicoMaturidadeData";
import { NivelAtualDados } from "./types";

interface NivelAtualProps {
  dados: NivelAtualDados;
}

const TOTAL_NIVEIS = 5;

/** Card pequeno: nível de maturidade atual, no mesmo anel do analista. */
export default function NivelAtual({ dados }: NivelAtualProps) {
  const nivel = NIVEIS_MATURIDADE[dados.nivel];
  const percentual = (Number(dados.nivel.slice(1)) / TOTAL_NIVEIS) * 100;

  return (
    <Card className="h-full gap-4 p-5 text-white">
      <CardCabecalho
        titulo="Nível de maturidade"
        descricao={`Nível atingido na rodada ${dados.rodada}`}
        icone={<Gauge size={20} aria-hidden="true" />}
      />

      <div className="my-auto flex flex-col items-center gap-3 py-2">
        <div
          className="relative flex h-36 w-36 items-center justify-center rounded-full"
          style={{
            background: `conic-gradient(${nivel.cor} ${percentual * 3.6}deg, rgb(255 255 255 / 0.12) 0deg)`,
          }}
        >
          <div className="absolute inset-2 flex flex-col items-center justify-center rounded-full bg-card">
            <span className="text-4xl font-bold text-white">
              {dados.nivel}
            </span>
            <span className="text-xs text-gray-400">{percentual}%</span>
          </div>
        </div>

        <p
          className="text-sm font-semibold uppercase tracking-wider text-white"
        >
          {nivel.descricao}
        </p>
      </div>
    </Card>
  );
}

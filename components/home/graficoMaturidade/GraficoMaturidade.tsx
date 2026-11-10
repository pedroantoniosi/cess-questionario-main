"use client";

import { maturidadeConfig } from "./GraficoMaturidadeData";
import { GraficoMaturidadeProps } from "./types";

export default function GraficoMaturidade({
  nivel = "N2",
}: GraficoMaturidadeProps) {
  const maturidade = maturidadeConfig[nivel];

  return (
    <div className="flex flex-col items-center gap-4">
      <div
        className="relative flex h-36 w-36 items-center justify-center rounded-full"
        style={{
          background: `conic-gradient(
            ${maturidade.cor} ${maturidade.porcentagem * 3.6}deg,
            #E5E7EB 0deg
          )`,
        }}
      >
        <div className="absolute inset-2 flex flex-col items-center justify-center rounded-full bg-card">
          <span
            className="text-4xl font-bold"
            style={{ color: maturidade.cor }}
          >
            {nivel}
          </span>

          <span className="text-xs text-gray-500">
            {maturidade.porcentagem}%
          </span>
        </div>
      </div>

      <div className="text-center">
        <span
          className="text-sm font-semibold uppercase tracking-wider"
          style={{ color: maturidade.cor }}
        >
          Nível de Maturidade
        </span>

        <p className="text-sm font-medium" style={{ color: maturidade.cor }}>
          {maturidade.descricao}
        </p>
      </div>
    </div>
  );
}

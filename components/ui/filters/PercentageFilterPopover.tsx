"use client";

import { type ReactNode } from "react";

import Popover from "@/components/ui/Popover";

export type OperadorComparacao = ">" | "<" | "=";

export interface FiltroPercentual {
  operador: OperadorComparacao;
  /** Percentual (0 a 100) a comparar; null = filtro inativo. */
  valor: number | null;
}

const OPERADORES: OperadorComparacao[] = [">", "<", "="];

export const FILTRO_PERCENTUAL_INATIVO: FiltroPercentual = {
  operador: ">",
  valor: null,
};

/** Avalia se um percentual real atende ao filtro (sempre true quando inativo). */
export function correspondeFiltroPercentual(
  valorReal: number,
  filtro: FiltroPercentual
): boolean {
  if (filtro.valor === null) return true;

  switch (filtro.operador) {
    case ">":
      return valorReal > filtro.valor;
    case "<":
      return valorReal < filtro.valor;
    case "=":
      return valorReal === filtro.valor;
  }
}

interface PercentageFilterPopoverProps {
  label: string;
  /** Ícone exibido antes do rótulo do filtro (já com a cor aplicada). */
  icon?: ReactNode;
  filtro: FiltroPercentual;
  onChange: (filtro: FiltroPercentual) => void;
  align?: "left" | "right";
}

export default function PercentageFilterPopover({
  label,
  icon,
  filtro,
  onChange,
  align = "left",
}: PercentageFilterPopoverProps) {
  const ativo = filtro.valor !== null;

  return (
    <Popover
      align={align}
      trigger={
        <>
          {icon}
          {label}
          {ativo && (
            <span className="rounded-full bg-blue-500 px-1.5 text-[10px] font-semibold text-white">
              1
            </span>
          )}
        </>
      }
    >
      <p className="mb-3 flex items-center gap-2 text-xs font-medium text-gray-400">
        {icon}
        {label}
      </p>

      <div className="flex items-center gap-2">
        <select
          value={filtro.operador}
          onChange={(event) =>
            onChange({
              ...filtro,
              operador: event.target.value as OperadorComparacao,
            })
          }
          className="rounded-lg border border-white/10 bg-white/5 px-2 py-1.5 text-sm text-gray-200 outline-none focus:border-white/20"
        >
          {OPERADORES.map((operador) => (
            <option key={operador} value={operador} className="bg-[#21222D]">
              {operador}
            </option>
          ))}
        </select>

        <input
          type="number"
          min={0}
          max={100}
          value={filtro.valor ?? ""}
          onChange={(event) => {
            const texto = event.target.value;
            onChange({
              ...filtro,
              valor: texto === "" ? null : Number(texto),
            });
          }}
          placeholder="0"
          className="w-20 rounded-lg border border-white/10 bg-white/5 px-2 py-1.5 text-sm text-gray-200 outline-none placeholder:text-gray-500 focus:border-white/20"
        />
        <span className="text-sm text-gray-400">%</span>
      </div>

      {ativo && (
        <button
          type="button"
          onClick={() => onChange({ ...filtro, valor: null })}
          className="mt-3 text-xs text-gray-400 underline-offset-2 hover:text-gray-200 hover:underline"
        >
          Limpar filtro
        </button>
      )}
    </Popover>
  );
}

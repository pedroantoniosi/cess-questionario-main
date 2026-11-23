"use client";

import type { IndicatorGroup, InstallationType } from "./types/Types";

import { INDICATOR_GROUPS } from "./types/Types";

interface FiltersProps {
  year: string;
  onYearChange: (year: string) => void;

  type: InstallationType | "ALL";
  onTypeChange: (type: InstallationType | "ALL") => void;

  visibleGroups: IndicatorGroup[];
  onToggleGroup: (group: IndicatorGroup) => void;

  totalInstallations: number;
}

const categories = [
  { label: "Todas", value: "ALL" },
  { label: "Estaleiros", value: "SHIPYARD" },
  { label: "Portos", value: "PORT" },
  { label: "Recicladoras", value: "RECYCLER" },
] as const;

export default function Filters({
  year,
  onYearChange,
  type,
  onTypeChange,
  visibleGroups,
  onToggleGroup,
  totalInstallations,
}: FiltersProps) {
  return (
    <div className="space-y-5">
      {/* Filtros superiores */}
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-yellow-400/15 text-yellow-400">
            <span className="text-lg font-bold">Ⅱ</span>
          </div>

          <div>
            <h2 className="text-lg font-bold text-white">
              Indicadores técnicos
            </h2>

            <p className="text-sm text-slate-400">
              {totalInstallations} instalações selecionadas · questionário
              {' "'}
              {year}
              {'"'}.
            </p>
          </div>
        </div>

        <div className="flex flex-col items-start gap-2 sm:items-end">
          {/* Anos */}
          <div className="flex rounded-xl border border-slate-700 bg-[#111827] p-1">
            {["2025", "2024"].map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => onYearChange(item)}
                className={`rounded-lg px-4 py-2 text-xs transition ${
                  year === item
                    ? "bg-[#42432F] text-yellow-400"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          {/* Categorias */}
          <div className="flex flex-wrap rounded-xl border border-slate-700 bg-[#111827] p-1">
            {categories.map((item) => (
              <button
                key={item.value}
                type="button"
                onClick={() =>
                  onTypeChange(item.value as InstallationType | "ALL")
                }
                className={`rounded-lg px-4 py-2 text-xs transition ${
                  type === item.value
                    ? "bg-[#42432F] text-yellow-400"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grupos visíveis */}
      <fieldset className="rounded-2xl border border-slate-700 bg-[#192337] p-4">
        <legend className="px-1 text-sm font-bold text-white">
          Grupos visíveis
        </legend>

        <p className="mb-4 text-sm text-slate-400">
          O resumo de maturidade fica sempre no topo. Marque os grupos técnicos
          que deseja comparar.
        </p>

        <div className="flex flex-wrap gap-x-5 gap-y-3">
          {INDICATOR_GROUPS.map((group) => {
            const checked = visibleGroups.includes(group.id);
            const isSummary = group.id === "summary";

            return (
              <label
                key={group.id}
                className="flex cursor-pointer items-center gap-2 text-sm text-white"
              >
                <input
                  type="checkbox"
                  checked={checked}
                  disabled={isSummary}
                  onChange={() => onToggleGroup(group.id)}
                  className="h-[18px] w-[18px] cursor-pointer accent-yellow-400 disabled:cursor-not-allowed"
                />

                <span className={isSummary ? "font-semibold" : ""}>
                  {group.label}
                </span>
              </label>
            );
          })}
        </div>
      </fieldset>
    </div>
  );
}

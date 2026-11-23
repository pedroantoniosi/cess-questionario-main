"use client";

import { AlertCircle, RefreshCw } from "lucide-react";

import type {
  IndicatorDefinition,
  IndicatorGroup,
  InstallationRound,
} from "./types/Types";

import { INDICATOR_GROUPS } from "./types/Types";

interface TableProps {
  data: InstallationRound[];
  loading: boolean;
  error: string | null;
  visibleGroups: IndicatorGroup[];
  onRefresh: () => void;
}

function getInstallationName(item: InstallationRound) {
  const names = {
    PORT: "PORTO",
    SHIPYARD: "ESTALEIRO",
    RECYCLER: "RECICLADORA",
  };

  return `${names[item.type]} #${item.installationId}`;
}

function formatValue(item: InstallationRound, indicator: IndicatorDefinition) {
  const value = item[indicator.key];

  if (value === null || value === undefined || value === "") {
    return "Não informado";
  }

  if (indicator.key === "maturityLevel") {
    return `N${value}`;
  }

  if (typeof value === "boolean") {
    return value ? "Sim" : "Não";
  }

  if (typeof value === "number") {
    const formatted = new Intl.NumberFormat("pt-BR", {
      maximumFractionDigits: 2,
    }).format(value);

    return indicator.unit ? `${formatted} ${indicator.unit}` : formatted;
  }

  return String(value);
}

export default function Table({
  data,
  loading,
  error,
  visibleGroups,
  onRefresh,
}: TableProps) {
  if (loading) {
    return (
      <div className="flex min-h-64 items-center justify-center gap-3 text-sm text-slate-400">
        <RefreshCw size={18} className="animate-spin" />
        Carregando indicadores técnicos...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-64 flex-col items-center justify-center gap-3">
        <AlertCircle className="text-red-400" size={28} />

        <p className="text-sm text-slate-300">{error}</p>

        <button
          onClick={onRefresh}
          className="rounded-lg bg-yellow-400 px-4 py-2 text-sm font-semibold text-slate-900"
        >
          Tentar novamente
        </button>
      </div>
    );
  }

  if (!data.length) {
    return (
      <div className="flex min-h-64 items-center justify-center text-sm text-slate-400">
        Nenhuma instalação encontrada para os filtros selecionados.
      </div>
    );
  }

  // O resumo permanece sempre no topo.
  const groups = INDICATOR_GROUPS.filter(
    (group) => group.id === "summary" || visibleGroups.includes(group.id),
  );

  return (
    <div className="overflow-hidden rounded-xl border border-slate-700 bg-[#111827]">
      <div className="max-h-[650px] overflow-auto">
        <table className="w-full min-w-max border-collapse text-left">
          <thead className="sticky top-0 z-30">
            <tr className="bg-[#1C293D]">
              <th className="sticky left-0 z-40 min-w-[210px] border border-slate-700 bg-[#1C293D] px-4 py-4 text-xs font-bold uppercase tracking-wide text-slate-400">
                Indicador técnico
                <span className="ml-2">↕</span>
              </th>

              {data.map((item) => (
                <th
                  key={item.uuid}
                  className="w-[225px] min-w-[225px] max-w-[225px] border border-slate-700 px-4 py-4 text-xs font-bold uppercase tracking-wide text-slate-400"
                >
                  {getInstallationName(item)}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {groups.map((group) => (
              <FragmentGroup
                key={group.id}
                groupId={group.id}
                label={group.label}
                indicators={group.indicators}
                data={data}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function FragmentGroup({
  groupId,
  label,
  indicators,
  data,
}: {
  groupId: IndicatorGroup;
  label: string;
  indicators: IndicatorDefinition[];
  data: InstallationRound[];
}) {
  return (
    <>
      {groupId !== "summary" && (
        <tr>
          <td
            colSpan={data.length + 1}
            className="border border-slate-700 bg-[#192337] px-4 py-3 text-xs font-bold uppercase tracking-wide text-yellow-400"
          >
            {label}
          </td>
        </tr>
      )}

      {indicators.map((indicator) => (
        <tr
          key={indicator.key}
          className="transition-colors hover:bg-slate-800/60"
        >
          <th className="sticky left-0 z-10 w-[210px] min-w-[210px] border border-slate-700 bg-[#111827] px-4 py-3 text-left text-sm font-bold text-white">
            {indicator.label}
          </th>

          {data.map((item) => (
            <td
              key={item.uuid}
              className="border border-slate-700 px-4 py-3 text-sm text-slate-100"
            >
              {formatValue(item, indicator)}
            </td>
          ))}
        </tr>
      ))}
    </>
  );
}

"use client";

import { type ReactNode } from "react";

import Popover from "@/components/ui/Popover";

export interface OpcaoFiltroCheckbox<T extends string> {
  valor: T;
  label: string;
  dotClassName?: string;
}

interface CheckboxFilterPopoverProps<T extends string> {
  label: string;
  /** Ícone exibido antes do rótulo do filtro. */
  icon?: ReactNode;
  opcoes: OpcaoFiltroCheckbox<T>[];
  selecionados: Set<T>;
  onChange: (selecionados: Set<T>) => void;
  align?: "left" | "right";
}

export default function CheckboxFilterPopover<T extends string>({
  label,
  icon,
  opcoes,
  selecionados,
  onChange,
  align = "left",
}: CheckboxFilterPopoverProps<T>) {
  function alternar(valor: T) {
    const novoConjunto = new Set(selecionados);
    if (novoConjunto.has(valor)) {
      novoConjunto.delete(valor);
    } else {
      novoConjunto.add(valor);
    }
    onChange(novoConjunto);
  }

  return (
    <Popover
      align={align}
      trigger={
        <>
          {icon}
          {label}
          {selecionados.size > 0 && (
            <span className="rounded-full bg-blue-500 px-1.5 text-[10px] font-semibold text-white">
              {selecionados.size}
            </span>
          )}
        </>
      }
    >
      <p className="mb-2 flex items-center gap-2 text-xs font-medium text-gray-400">
        {icon}
        {label}
      </p>
      <div className="flex flex-col gap-2">
        {opcoes.map((opcao) => (
          <label
            key={opcao.valor}
            className="flex items-center gap-2 text-sm text-gray-300"
          >
            <input
              type="checkbox"
              checked={selecionados.has(opcao.valor)}
              onChange={() => alternar(opcao.valor)}
              className="rounded border-white/20 bg-transparent"
            />
            {opcao.dotClassName && (
              <span
                className={`h-2.5 w-2.5 rounded-full ${opcao.dotClassName}`}
              />
            )}
            {opcao.label}
          </label>
        ))}
      </div>
    </Popover>
  );
}

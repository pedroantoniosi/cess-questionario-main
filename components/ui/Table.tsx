"use client";

import { ArrowUpDown, ChevronLeft, ChevronRight, Filter, FilterX } from "lucide-react";
import SearchInput from "@/components/ui/SearchInput";
import { useState, type Key, type ReactNode } from "react";

export interface TableColumn<T> {
  key: string;
  header: ReactNode;
  /** Ícone exibido antes do rótulo da coluna. */
  icon?: ReactNode;
  headerTitle?: string;
  align?: "left" | "center" | "right";
  sortable?: boolean;
  headerClassName?: string;
  cellClassName?: string;
  render: (item: T) => ReactNode;
}

interface TableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  rowKey: (item: T) => Key;
  searchValue: string;
  onSearchChange: (value: string) => void;
  searchPlaceholder?: string;
  /** Botões/popovers de filtro, exibidos em sua própria linha, após "Filtros". */
  filters?: ReactNode;
  /** Opções À direita da barra de ferramentas */
  actions?: ReactNode;
  /** Indica se algum filtro está ativo, exibindo o botão "Limpar filtros". */
  hasActiveFilters?: boolean;
  /** Chamado ao clicar em "Limpar filtros". */
  onClearFilters?: () => void;
  emptyMessage?: string;
  minWidthClassName?: string;
  /** Conteúdo extra exibido abaixo da tabela (ex.: legenda de cores). */
  footer?: ReactNode;
  /** Chamado ao clicar em uma linha; quando definido, a linha fica clicável. */
  onRowClick?: (item: T) => void;
  /** Quantidade de linhas por página. Quando omitido, a paginação fica desativada. */
  pageSize?: number;
  //** Conteúdo exibido em grid */
  gridContent?: (dadosPaginados: T[]) => ReactNode;
}

const alinhamentoTexto: Record<NonNullable<TableColumn<unknown>["align"]>, string> = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
};

const alinhamentoFlex: Record<NonNullable<TableColumn<unknown>["align"]>, string> = {
  left: "justify-start",
  center: "justify-center",
  right: "justify-end",
};

export default function Table<T>({
  columns,
  data,
  gridContent,
  rowKey,
  searchValue,
  onSearchChange,
  searchPlaceholder = "Buscar...",
  filters,
  actions,
  hasActiveFilters = false,
  onClearFilters,
  emptyMessage = "Nenhum resultado encontrado para os filtros selecionados.",
  minWidthClassName = "min-w-[750px]",
  footer,
  onRowClick,
  pageSize,
}: TableProps<T>) {
  const colSpan = columns.length;

  const [pagina, setPagina] = useState(1);
  const totalPaginas = pageSize ? Math.max(1, Math.ceil(data.length / pageSize)) : 1;
  const paginaAtual = Math.min(pagina, totalPaginas);
  const dadosPaginados = pageSize
    ? data.slice((paginaAtual - 1) * pageSize, paginaAtual * pageSize)
    : data;
  const paginacaoAtiva = Boolean(pageSize) && data.length > 0;
  const primeiroItem = pageSize ? (paginaAtual - 1) * pageSize + 1 : 1;
  const ultimoItem = pageSize ? Math.min(paginaAtual * pageSize, data.length) : data.length;

  return (
    <div className="w-full overflow-hidden rounded-xl border border-white/5 bg-[#21222D]">


      {/* BARRA DE FERRAMENTAS */}
      <div className="flex flex-col gap-3 border-b border-white/5 px-5 py-4">

        {/* Filtros e ações */}
        <div className="flex justify-end flex-wrap items-center justify-between gap-3 sm:justify-start">
          {filters && (
            <div className="flex flex-wrap items-center gap-3">
              <span className="flex items-center gap-2 text-sm font-medium text-gray-400">
                <Filter size={14} />
                Filtros
              </span>

              {filters}

              {hasActiveFilters && onClearFilters && (
                <button
                  type="button"
                  onClick={onClearFilters}
                  className="flex items-center gap-1.5 rounded-lg px-2 py-1 text-xs font-medium text-gray-400 transition-colors hover:bg-white/10 hover:text-white"
                >
                  <FilterX size={14} />
                  Limpar filtros
                </button>
              )}
            </div>
          )}

          {actions && (
            <div className="flex items-center sm:ml-auto">
              {actions}
            </div>
          )}
        </div>

        {/* Pesquisa */}
        <div className="w-full sm:w-72">
          <SearchInput
            value={searchValue}
            onChange={onSearchChange}
            placeholder={searchPlaceholder}
          />
        </div>

      </div>

      {/* Área de resultados */}
      {gridContent !== undefined ? (
        <div className="p-5">
          {gridContent(dadosPaginados)}
        </div>
      ) : (

      <div className="overflow-x-auto">
        <table className={`w-full text-left text-sm ${minWidthClassName}`}>
          <thead className="bg-[#5A5F79]/20 text-xs text-gray-400">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  title={column.headerTitle}
                  className={`px-5 py-4 font-medium whitespace-nowrap ${
                    alinhamentoTexto[column.align ?? "left"]
                  } ${column.headerClassName ?? ""}`}
                >
                  <div
                    className={`flex items-center gap-2 ${
                      alinhamentoFlex[column.align ?? "left"]
                    }`}
                  >
                    {column.icon}
                    {column.header}
                    {column.sortable && (
                      <ArrowUpDown size={12} className="text-gray-500" />
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-white/5">
            {data.length === 0 && (
              <tr>
                <td
                  colSpan={colSpan}
                  className="px-5 py-6 text-center text-gray-400"
                >
                  {emptyMessage}
                </td>
              </tr>
            )}

            {dadosPaginados.map((item) => (
              <tr
                key={rowKey(item)}
                onClick={onRowClick ? () => onRowClick(item) : undefined}
                className={`transition-colors hover:bg-white/[0.03] ${
                  onRowClick ? "cursor-pointer" : ""
                }`}
              >
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className={`px-5 py-4 ${
                      alinhamentoTexto[column.align ?? "left"]
                    } ${column.cellClassName ?? ""}`}
                  >
                    {column.render(item)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      )}

      {paginacaoAtiva && (
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/5 px-5 py-3 text-xs text-gray-400">
          <span>
            Exibindo {primeiroItem}–{ultimoItem} de {data.length}
          </span>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setPagina(Math.max(1, paginaAtual - 1))}
              disabled={paginaAtual === 1}
              className="flex items-center gap-1 rounded-lg px-2 py-1 font-medium text-gray-300 transition-colors hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent"
            >
              <ChevronLeft size={14} />
              Anterior
            </button>

            <span className="px-1">
              Página {paginaAtual} de {totalPaginas}
            </span>

            <button
              type="button"
              onClick={() => setPagina(Math.min(totalPaginas, paginaAtual + 1))}
              disabled={paginaAtual === totalPaginas}
              className="flex items-center gap-1 rounded-lg px-2 py-1 font-medium text-gray-300 transition-colors hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent"
            >
              Próxima
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      )}

      {footer}
    </div>
  );
}

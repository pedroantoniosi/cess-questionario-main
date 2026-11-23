"use client";

import {
  Activity,
  Ban,
  CalendarClock,
  CalendarDays,
  Flag,
  MessageCircle,
  MoreVertical,
  Plus,
  Repeat,
  TrendingUp,
  Users,
} from "lucide-react";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import CardGrade from "@/components/ui/CardGrade";
import Table, { type TableColumn } from "@/components/ui/Table";
import CheckboxFilterPopover from "@/components/ui/filters/CheckboxFilterPopover";
import Popover from "@/components/ui/Popover";
import ViewToggle from "@/components/ui/ViewToggle";

import {
  STATUS_RODADA_LABELS,
  STATUS_RODADA_STYLES,
} from "../rodada/rodadaPageData";
import type { Rodada, StatusRodada } from "../rodada/types";
import type { StatusRodadaDados } from "../statusRodada/types";

export interface LinhaRodada {
  rodada: Rodada;
  statusAgregado: StatusRodadaDados;
}

const OPCOES_STATUS = (
  Object.entries(STATUS_RODADA_LABELS) as [StatusRodada, string][]
).map(([valor, label]) => ({ valor, label }));

interface AcaoDesabilitada {
  motivo: string;
}

function podeProrrogar(status: StatusRodada): AcaoDesabilitada | null {
  if (status === "aberta" || status === "encerrada") return null;
  return { motivo: "Só é possível prorrogar rodadas abertas ou encerradas." };
}

function podeEncerrar(status: StatusRodada): AcaoDesabilitada | null {
  if (status === "aberta") return null;
  return { motivo: "Só é possível encerrar rodadas abertas." };
}

function podeCancelar(status: StatusRodada): AcaoDesabilitada | null {
  if (status === "rascunho" || status === "agendada" || status === "aberta") return null;
  return { motivo: "Rodadas encerradas ou já canceladas não podem ser canceladas." };
}

interface TableRodadasProps {
  linhas: LinhaRodada[];
  onProrrogar: (rodada: Rodada) => void;
  onEncerrar: (rodada: Rodada) => void;
  onCancelar: (rodada: Rodada) => void;
  onNovaRodada: () => void;
  visualizacao: "list" | "grid";
  onVisualizacaoChange: (value: "list" | "grid") => void;
}

export default function TableRodadas({
  linhas,
  onProrrogar,
  onEncerrar,
  onCancelar,
  onNovaRodada,
  visualizacao,
  onVisualizacaoChange,
}: TableRodadasProps) {
  const router = useRouter();
  const [busca, setBusca] = useState("");
  const [statusSelecionados, setStatusSelecionados] = useState<Set<StatusRodada>>(
    new Set()
  );

  const linhasFiltradas = useMemo(() => {
    const termo = busca.trim().toLowerCase();

    return linhas.filter(({ rodada }) => {
      const correspondeBusca =
        termo.length === 0 || rodada.titulo.toLowerCase().includes(termo);

      const correspondeStatus =
        statusSelecionados.size === 0 || statusSelecionados.has(rodada.status);

      return correspondeBusca && correspondeStatus;
    });
  }, [linhas, busca, statusSelecionados]);

  const colunas: TableColumn<LinhaRodada>[] = [
    {
      key: "titulo",
      header: "Título",
      icon: <Repeat size={14} />,
      sortable: true,
      render: ({ rodada }) => (
        <span className="font-medium text-gray-100">{rodada.titulo}</span>
      ),
    },
    {
      key: "status",
      header: "Status",
      icon: <Activity size={14} />,
      sortable: true,
      render: ({ rodada }) => (
        <span
          className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${STATUS_RODADA_STYLES[rodada.status]}`}
        >
          {STATUS_RODADA_LABELS[rodada.status]}
        </span>
      ),
    },
    {
      key: "inicio",
      header: "Início",
      icon: <CalendarDays size={14} />,
      sortable: true,
      cellClassName: "whitespace-nowrap text-gray-300",
      render: ({ rodada }) => rodada.dataInicio,
    },
    {
      key: "fim",
      header: "Fim",
      icon: <CalendarDays size={14} />,
      sortable: true,
      cellClassName: "whitespace-nowrap text-gray-300",
      render: ({ rodada }) => rodada.dataEncerramento,
    },
    {
      key: "conclusao",
      header: "Conclusão",
      icon: <TrendingUp size={14} />,
      sortable: true,
      render: ({ statusAgregado }) => (
        <div className="flex items-center gap-2">
          <div className="h-2 w-20 overflow-hidden rounded-full bg-slate-700">
            <div
              className="h-full rounded-full bg-emerald-400"
              style={{ width: `${statusAgregado.progresso}%` }}
            />
          </div>
          <span className="whitespace-nowrap text-xs text-gray-400">
            {statusAgregado.progresso}%
          </span>
        </div>
      ),
    },
    {
      key: "participantes",
      header: "Participantes",
      icon: <Users size={14} />,
      cellClassName: "whitespace-nowrap text-gray-300",
      render: ({ statusAgregado }) => statusAgregado.participantes,
    },
    {
      key: "submissoes",
      header: "Submissões",
      icon: <Activity size={14} />,
      cellClassName: "whitespace-nowrap text-gray-300",
      render: ({ statusAgregado }) => statusAgregado.submissoes,
    },
    {
      key: "respostas",
      header: "Respostas",
      icon: <MessageCircle size={14} />,
      cellClassName: "whitespace-nowrap text-gray-300",
      render: ({ statusAgregado }) => statusAgregado.respostas.toLocaleString("pt-BR"),
    },
    {
      key: "acoes",
      header: "Ações",
      align: "right",
      render: ({ rodada }) => {
        const prorrogar = podeProrrogar(rodada.status);
        const encerrar = podeEncerrar(rodada.status);
        const cancelar = podeCancelar(rodada.status);

        return (
          <div onClick={(event) => event.stopPropagation()} className="inline-block">
            <Popover
              align="right"
              triggerClassName="flex items-center justify-center rounded-lg p-2 text-gray-400 transition-colors hover:bg-white/10 hover:text-white cursor-pointer"
              panelClassName="w-56 flex flex-col gap-1"
              trigger={<MoreVertical size={16} />}
            >
              <button
                type="button"
                disabled={Boolean(prorrogar)}
                title={prorrogar?.motivo}
                onClick={() => onProrrogar(rodada)}
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-gray-200 transition-colors hover:bg-white/10 disabled:cursor-not-allowed disabled:text-gray-500 disabled:hover:bg-transparent cursor-pointer"
              >
                <CalendarClock size={14} />
                Prorrogar
              </button>

              <button
                type="button"
                disabled={Boolean(encerrar)}
                title={encerrar?.motivo}
                onClick={() => onEncerrar(rodada)}
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-amber-300 transition-colors hover:bg-amber-500/10 disabled:cursor-not-allowed disabled:text-gray-500 disabled:hover:bg-transparent cursor-pointer"
              >
                <Flag size={14} />
                Encerrar
              </button>

              <button
                type="button"
                disabled={Boolean(cancelar)}
                title={cancelar?.motivo}
                onClick={() => onCancelar(rodada)}
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-red-400 transition-colors hover:bg-red-500/10 disabled:cursor-not-allowed disabled:text-gray-500 disabled:hover:bg-transparent cursor-pointer"
              >
                <Ban size={14} />
                Cancelar
              </button>
            </Popover>
          </div>
        );
      },
    },
  ];

  return (
    <Table
      actions={
        <button
          type="button"
          onClick={onNovaRodada}
          className="flex cursor-pointer items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-black transition-colors btn-high"
        >
          <Plus size={16} />
          Nova Rodada
        </button>
      }
      columns={colunas}
      data={linhasFiltradas}
      pageSize={8}
      gridContent={
        visualizacao === "grid"
          ? (dadosPaginados) => (
            <CardGrade>
                {dadosPaginados.map(({ rodada, statusAgregado }) => (
            
                  <article
                    key={rodada.id}
                    onClick={() => router.push(`/rodadas/${rodada.id}`)}
                    className="flex cursor-pointer flex-col gap-5 rounded-xl border border-white/10 bg-template p-5 transition-colors hover:border-white/20"
                  >
                    {/* Título e status */}
                    <div className="flex flex-col gap-2">
                      <h3 className="font-semibold text-white">
                        {rodada.titulo}
                      </h3>

                      <span
                        className={`w-fit rounded-full px-3 py-1 text-xs font-medium ${STATUS_RODADA_STYLES[rodada.status]}`}
                      >
                        {STATUS_RODADA_LABELS[rodada.status]}
                      </span>
                    </div>

                    
                    {/* Datas */}
                    <div className="flex items-center gap-4">
                      <div className="flex flex-1 flex-col gap-1">
                        <span className="text-xs text-gray-400">
                          Início
                        </span>
                        <span className="text-sm text-gray-200">
                          {rodada.dataInicio}
                        </span>
                      </div>

                      <div className="flex flex-1 flex-col gap-1">
                        <span className="text-xs text-gray-400">
                          Fim
                        </span>
                        <span className="text-sm text-gray-200">
                          {rodada.dataEncerramento}
                        </span>
                      </div>
                    </div>


                    {/* Conclusão */}
                    <div className="mt-auto flex flex-col gap-2 border-t border-white/10 pt-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-300">
                          Conclusão
                        </span>

                        <span className="font-medium text-white">
                          {statusAgregado.progresso}%
                        </span>
                      </div>

                      <div className="h-2 overflow-hidden rounded-full bg-slate-700">
                        <div
                          className="h-full rounded-full bg-emerald-400"
                          style={{ width: `${statusAgregado.progresso}%` }}
                        />
                      </div>
                    </div>
                  </article>
              ))}
            </CardGrade>
        ) : undefined
      }
      rowKey={({ rodada }) => rodada.id}
      onRowClick={({ rodada }) => router.push(`/rodadas/${rodada.id}`)}
      searchValue={busca}
      onSearchChange={setBusca}
      searchPlaceholder="Buscar por título da rodada"
      emptyMessage="Nenhuma rodada encontrada para os filtros selecionados."
      hasActiveFilters={statusSelecionados.size > 0}
      onClearFilters={() => setStatusSelecionados(new Set())}
      minWidthClassName="min-w-[1000px]"
      filters={
        <div className="flex items-center gap-3">
          <CheckboxFilterPopover
            label="Status"
            icon={<Activity size={14} />}
            opcoes={OPCOES_STATUS}
            selecionados={statusSelecionados}
            onChange={setStatusSelecionados}
          />

          <ViewToggle
            value={visualizacao}
            onChange={onVisualizacaoChange}
          />
        </div>
      
      }
    />
  );
}

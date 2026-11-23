"use client";

import { Activity, Building2, Calendar, FileText, Plus, Repeat, } from "lucide-react";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import Table, { type TableColumn } from "@/components/ui/Table";
import CheckboxFilterPopover from "@/components/ui/filters/CheckboxFilterPopover";

import {
  STATUS_RODADA_LABELS,
  STATUS_RODADA_OPCOES,
  mockRodadasQuestionario,
  statusRodadaDot,
  statusRodadaStyles,
  type RodadaQuestionario,
  type StatusRodada,
} from "./tableQuestionarioData";

const OPCOES_STATUS = STATUS_RODADA_OPCOES.map((status) => ({
  valor: status,
  label: STATUS_RODADA_LABELS[status],
  dotClassName: statusRodadaDot[status],
}));

const colunas: TableColumn<RodadaQuestionario>[] = [
  {
    key: "rodada",
    header: "Rodada",
    icon: <Repeat size={14} />,
    sortable: true,
    render: (rodada) => (
      <span className="font-medium text-gray-100">{rodada.rodada}</span>
    ),
  },
  {
    key: "questionario",
    header: "Questionário",
    icon: <FileText size={14} />,
    sortable: true,
    cellClassName: "whitespace-nowrap text-gray-400",
    render: (rodada) => rodada.questionario,
  },
  {
    key: "periodo",
    header: "Período",
    icon: <Calendar size={14} />,
    sortable: true,
    cellClassName: "whitespace-nowrap text-gray-300",
    render: (rodada) => rodada.periodo,
  },
  {
    key: "instalacoes",
    header: "Instalações",
    icon: <Building2 size={14} />,
    sortable: true,
    cellClassName: "whitespace-nowrap text-gray-300",
    render: (rodada) => `${rodada.instalacoes} instalações`,
  },
  {
    key: "status",
    header: "Status",
    icon: <Activity size={14} />,
    sortable: true,
    render: (rodada) => (
      <span
        className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${statusRodadaStyles[rodada.statusTipo]}`}
      >
        {rodada.status}
      </span>
    ),
  },
];

export default function TableQuestionario() {
  const router = useRouter();
  const [busca, setBusca] = useState("");
  const [statusSelecionados, setStatusSelecionados] = useState<
    Set<StatusRodada>
  >(new Set());

  const rodadasFiltradas = useMemo(() => {
    const termo = busca.trim().toLowerCase();

    return mockRodadasQuestionario.filter((rodada) => {
      const correspondeBusca =
        termo.length === 0 ||
        rodada.rodada.toLowerCase().includes(termo) ||
        rodada.questionario.toLowerCase().includes(termo) ||
        rodada.periodo.toLowerCase().includes(termo);

      const correspondeStatus =
        statusSelecionados.size === 0 ||
        statusSelecionados.has(rodada.statusTipo);

      return correspondeBusca && correspondeStatus;
    });
  }, [busca, statusSelecionados]);

  return (
    <Table
      actions={
        <button
          type="button"
          className="flex cursor-pointer items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-black transition-colors btn-high"
        >
          <Plus size={16} />
          Criar Questionário
        </button>
      }
      columns={colunas}
      data={rodadasFiltradas}
      rowKey={(rodada) => rodada.id}
      onRowClick={(rodada) => router.push(`/questionarios/${rodada.questionarioId}`)}
      searchValue={busca}
      onSearchChange={setBusca}
      searchPlaceholder="Buscar por rodada, questionário ou período"
      emptyMessage="Nenhuma rodada encontrada para os filtros selecionados."
      hasActiveFilters={statusSelecionados.size > 0}
      onClearFilters={() => setStatusSelecionados(new Set())}
      filters={
        <CheckboxFilterPopover
          label="Status"
          icon={<Activity size={14} />}
          opcoes={OPCOES_STATUS}
          selecionados={statusSelecionados}
          onChange={setStatusSelecionados}
          
        />
      }
    />
  );
}

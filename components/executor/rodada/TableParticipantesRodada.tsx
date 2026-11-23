"use client";

import {
  Activity,
  Building2,
  MapPin,
  Tag,
  Trash2,
  TrendingUp,
  UserPlus,
  UserRound,
} from "lucide-react";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { installationTypeLabel } from "@/lib/api/installationType";
import Table, { type TableColumn } from "@/components/ui/Table";
import CheckboxFilterPopover from "@/components/ui/filters/CheckboxFilterPopover";
import Popover from "@/components/ui/Popover";

import {
  STATUS_PARTICIPANTE_LABELS,
  STATUS_PARTICIPANTE_STYLES,
} from "./rodadaPageData";
import type { ParticipanteRodada, StatusParticipanteRodada } from "./types";

const OPCOES_STATUS = (
  Object.entries(STATUS_PARTICIPANTE_LABELS) as [StatusParticipanteRodada, string][]
).map(([valor, label]) => ({ valor, label }));

const CORES_PROGRESSO: Record<StatusParticipanteRodada, string> = {
  a_comecar: "bg-slate-500",
  em_andamento: "bg-amber-400",
  concluido: "bg-emerald-400",
};

interface TableParticipantesRodadaProps {
  participantes: ParticipanteRodada[];
  rodadaAtiva: boolean;
  onAdicionarParticipante: () => void;
  onRemoverParticipante: (participante: ParticipanteRodada) => void;
}

export default function TableParticipantesRodada({
  participantes,
  rodadaAtiva,
  onAdicionarParticipante,
  onRemoverParticipante,
}: TableParticipantesRodadaProps) {
  const router = useRouter();
  const [busca, setBusca] = useState("");
  const [statusSelecionados, setStatusSelecionados] = useState<
    Set<StatusParticipanteRodada>
  >(new Set());

  const participantesFiltrados = useMemo(() => {
    const termo = busca.trim().toLowerCase();

    return participantes.filter((participante) => {
      const correspondeBusca =
        termo.length === 0 ||
        participante.nome.toLowerCase().includes(termo) ||
        participante.cidade.toLowerCase().includes(termo) ||
        participante.estado.toLowerCase().includes(termo) ||
        installationTypeLabel(participante.tipo).toLowerCase().includes(termo);

      const correspondeStatus =
        statusSelecionados.size === 0 || statusSelecionados.has(participante.status);

      return correspondeBusca && correspondeStatus;
    });
  }, [participantes, busca, statusSelecionados]);

  const colunas: TableColumn<ParticipanteRodada>[] = [
    {
      key: "instalacao",
      header: "Instalação",
      icon: <Building2 size={14} />,
      sortable: true,
      render: (participante) => (
        <span className="font-medium text-gray-100">{participante.nome}</span>
      ),
    },
    {
      key: "tipo",
      header: "Tipo",
      icon: <Tag size={14} />,
      cellClassName: "whitespace-nowrap text-gray-300",
      render: (participante) => installationTypeLabel(participante.tipo),
    },
    {
      key: "localizacao",
      header: "Localização",
      icon: <MapPin size={14} />,
      cellClassName: "whitespace-nowrap text-gray-300",
      render: (participante) => `${participante.cidade}/${participante.estado}`,
    },
    {
      key: "status",
      header: "Status",
      icon: <Activity size={14} />,
      sortable: true,
      render: (participante) => (
        <span
          className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${STATUS_PARTICIPANTE_STYLES[participante.status]}`}
        >
          {STATUS_PARTICIPANTE_LABELS[participante.status]}
        </span>
      ),
    },
    {
      key: "progresso",
      header: "Progresso",
      icon: <TrendingUp size={14} />,
      render: (participante) => (
        <div className="flex items-center gap-2">
          <div className="h-2 w-24 overflow-hidden rounded-full bg-slate-700">
            <div
              className={`h-full rounded-full ${CORES_PROGRESSO[participante.status]}`}
              style={{ width: `${participante.progresso}%` }}
            />
          </div>
          <span className="whitespace-nowrap text-xs text-gray-400">
            {participante.progresso}%
          </span>
        </div>
      ),
    },
    {
      key: "responsavel",
      header: "Responsável",
      icon: <UserRound size={14} />,
      cellClassName: "whitespace-nowrap text-gray-300",
      render: (participante) => participante.responsavelNome,
    },
    {
      key: "acoes",
      header: "Ações",
      align: "right",
      render: (participante) =>
        rodadaAtiva ? (
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onRemoverParticipante(participante);
            }}
            className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-red-400 transition-colors hover:bg-red-500/10 hover:text-red-300 cursor-pointer"
          >
            <Trash2 size={14} />
            Remover
          </button>
        ) : (
          <div
            onClick={(event) => event.stopPropagation()}
            title="Esta rodada não está ativa. Só é possível remover participantes de rodadas em andamento."
            className="inline-block"
          >
            <Popover
              align="right"
              triggerClassName="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-gray-500 cursor-not-allowed"
              panelClassName="w-56"
              trigger={
                <>
                  <Trash2 size={14} />
                  Remover
                </>
              }
            >
              <p className="text-xs text-gray-300">
                Esta rodada não está ativa. Só é possível remover participantes
                de rodadas em andamento.
              </p>
            </Popover>
          </div>
        ),
    },
  ];

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-gray-200">Participantes da rodada</h2>

        <button
          type="button"
          onClick={onAdicionarParticipante}
          className="flex items-center gap-2 rounded-lg bg-(--color-medium) px-3 py-2 text-xs font-bold text-white transition-colors hover:bg-(--color-low) cursor-pointer"
        >
          <UserPlus size={14} />
          Adicionar participante
        </button>
      </div>

      <Table
        columns={colunas}
        data={participantesFiltrados}
        rowKey={(participante) => participante.id}
        onRowClick={(participante) => router.push(`/participantes/${participante.id}`)}
        searchValue={busca}
        onSearchChange={setBusca}
        searchPlaceholder="Buscar por instalação, tipo ou localização"
        emptyMessage="Nenhum participante encontrado para os filtros selecionados."
        hasActiveFilters={statusSelecionados.size > 0}
        onClearFilters={() => setStatusSelecionados(new Set())}
        pageSize={5}
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
    </div>
  );
}

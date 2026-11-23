"use client";

import type { StatusRodadaProps } from "./types"
import { useStatusRodada } from "./hooks/useStatusRodada";

import {
  CalendarDays,
  Flag,
  Info,
  MessageCircle,
  FileText,
  Users,
} from "lucide-react";

export default function StatusRodada({
  dados: dadosExternos,
 }: StatusRodadaProps) {
  const {
    anoSelecionado,
    setAnoSelecionado,
    anosDisponiveis,
    dados,
    corProgresso,
  } = useStatusRodada({ dados: dadosExternos });

  const progresso = dados.progresso;
  const controladoExternamente = dadosExternos !== undefined;

  return (
    <section
      aria-labelledby="titulo-status-rodada"
      className="@container flex h-full flex-col gap-8 rounded-2xl bg-card p-6 text-white"
    >
      {/* Cabeçalho */}
      <header className="flex items-center gap-4">
        <div className="rounded-xl bg-template p-3">
          <Flag size={28} style={{ color: corProgresso }} />
        </div>

        <div className="flex flex-col gap-1">
          <h2
            id="titulo-status-rodada"
            className="text-2xl font-bold"
          >
            Status da rodada
          </h2>

          <p className="text-sm text-gray-400">
            Visão geral da rodada.
          </p>
        </div>
      </header>

      {/* informações */}
      {!controladoExternamente && (
        <div className="flex items-center gap-3">
          <label
            htmlFor="ano-rodada"
            className="text-sm text-gray-400"
          >
            Selecionar rodada:
          </label>

          <select
            id="ano-rodada"
            value={anoSelecionado}
            onChange={(e) =>
              setAnoSelecionado(Number(e.target.value))
            }
            className="cursor-pointer rounded-lg border border-[#454758] bg-template px-3 py-2 text-sm text-white outline-none"
          >
            {anosDisponiveis.map((ano) => (
              <option key={ano} value={ano}>
                {ano}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Progresso circular e informações */}
      <div className="flex flex-col items-center gap-8 @xl:flex-row">
        <div
          className="relative flex h-48 w-48 shrink-0 items-center justify-center rounded-full"
          style={{
            background: `conic-gradient(${corProgresso} ${progresso}%, #5A5F79 ${progresso}%)`,
          }}
        >
          <div className="flex h-40 w-40 flex-col items-center justify-center rounded-full bg-card">
            <strong className="text-4xl">{progresso}%</strong>
            <span className="text-sm text-gray-400">
              {progresso === 100 ? "Concluída" : "Em progresso"}
            </span>
          </div>
        </div>

        <dl className="flex w-full flex-col gap-5">
          <div>
            <dt className="sr-only">Status</dt>
            <dd
              className="inline-flex w-fit items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold"
              style={{
                backgroundColor: `${corProgresso}20`,
                color: corProgresso,
              }}
            >
              <span
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: corProgresso }}
              />
              {dados.status}
            </dd>
          </div>

          <div className="flex items-center gap-2">
            <dt className="text-gray-400">Rodada</dt>
            <dd className="text-xl font-bold">{dados.ano}</dd>
          </div>

          <div className="flex items-center gap-3">
            <CalendarDays size={20} className="text-gray-400" />
            <dt className="text-gray-400">Início:</dt>
            <dd>
              <time>{dados.dataInicio}</time>
            </dd>
          </div>

          <div className="flex items-center gap-3">
            <CalendarDays size={20} className="text-gray-400" />
            <dt className="text-gray-400">Encerramento:</dt>
            <dd>
              <time>{dados.dataEncerramento}</time>
            </dd>
          </div>
        </dl>
      </div>

      {/* Participantes */}
      <section
        aria-labelledby="titulo-participantes"
        className="flex flex-col gap-5 border-t border-white/50 pt-6"
      >
        <h3
          id="titulo-participantes"
          className="text-xl font-semibold"
        >
          Participantes
        </h3>

        <dl className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="flex flex-col items-center gap-2 rounded-xl border border-white/50 p-4">
            <Users size={26} style={{ color: corProgresso }} />
            <dd className="text-2xl font-bold">
              {dados.participantes}
            </dd>
            <dt className="text-sm text-gray-400">Participantes</dt>
          </div>

          <div className="flex flex-col items-center gap-2 rounded-xl border border-white/50 p-4">
            <FileText size={26} style={{ color: corProgresso }} />
            <dd className="text-2xl font-bold">
              {dados.submissoes}
            </dd>
            <dt className="text-sm text-gray-400">Submissões</dt>
          </div>

          <div className="flex flex-col items-center gap-2 rounded-xl border border-white/50 p-4">
            <MessageCircle
              size={26}
              style={{ color: corProgresso }}
            />
            <dd className="text-2xl font-bold">
              {dados.respostas.toLocaleString("pt-BR")}
            </dd>
            <dt className="text-sm text-gray-400">Respostas</dt>
          </div>
        </dl>
      </section>

      {/* Rodapé */}
      <footer className="mt-auto flex items-start gap-4 border-t border-white/50 pt-6">
        <Info
          size={24}
          className="shrink-0"
          style={{ color: corProgresso }}
        />

        <p className="text-sm leading-relaxed text-gray-400">
          Encerrar ou prorrogar a rodada exige confirmação
          adicional para evitar alterações acidentais.
        </p>
      </footer>
    </section>
  );
}

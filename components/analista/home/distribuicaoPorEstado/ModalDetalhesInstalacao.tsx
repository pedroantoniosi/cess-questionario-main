"use client";

import Link from "next/link";
import {
  Award,
  Building2,
  Calendar,
  CheckCircle2,
  Clock,
  ExternalLink,
  MapPin,
  ShieldCheck,
  User,
  X,
} from "lucide-react";
import { useEffect } from "react";
import {
  BlocoDesempenhoInstalacao,
  InstalacaoDetalhe,
  NivelMaturidadeEstado,
  SiglaEstado,
} from "./types";

interface ModalDetalhesInstalacaoProps {
  instalacao: InstalacaoDetalhe;
  siglaEstado: SiglaEstado;
  nomeEstado: string;
  onClose: () => void;
}

export default function ModalDetalhesInstalacao({
  instalacao,
  siglaEstado,
  nomeEstado,
  onClose,
}: ModalDetalhesInstalacaoProps) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const obterEstiloMaturidade = (nivel: NivelMaturidadeEstado) => {
    switch (nivel) {
      case "N1":
        return {
          bg: "bg-emerald-500/15",
          border: "border-emerald-500/30",
          text: "text-emerald-400",
          corHex: "#22C55E",
          descricao: "Excelente (100% dos requisitos)",
        };
      case "N2":
        return {
          bg: "bg-[#84CC16]/15",
          border: "border-[#84CC16]/30",
          text: "text-[#84CC16]",
          corHex: "#84CC16",
          descricao: "Alto (75% dos requisitos)",
        };
      case "N3":
        return {
          bg: "bg-amber-500/15",
          border: "border-amber-500/30",
          text: "text-amber-400",
          corHex: "#EAB308",
          descricao: "Intermediário (50% dos requisitos)",
        };
      case "N4":
        return {
          bg: "bg-orange-500/15",
          border: "border-orange-500/30",
          text: "text-orange-400",
          corHex: "#F97316",
          descricao: "Baixo (25% dos requisitos)",
        };
      case "N5":
      default:
        return {
          bg: "bg-red-500/15",
          border: "border-red-500/30",
          text: "text-red-400",
          corHex: "#EF4444",
          descricao: "Muito baixo (< 25% dos requisitos)",
        };
    }
  };

  const estiloMaturidade = obterEstiloMaturidade(instalacao.nivelMaturidade);
  const isConcluido = instalacao.statusQuestionario === "Concluído";

  const blocosPadrao: BlocoDesempenhoInstalacao[] = [
    {
      codigo: "B1",
      nome: "Informações Gerais e Cadastrais",
      percentual: Math.min(100, Math.round(instalacao.progresso * 1.05)),
      status: "Completo",
    },
    {
      codigo: "B2",
      nome: "Infraestrutura Física e Acessibilidade",
      percentual: Math.min(100, Math.round(instalacao.progresso * 0.95)),
      status: instalacao.progresso >= 85 ? "Completo" : "Em parte",
    },
    {
      codigo: "B3",
      nome: "Aspectos Regulatórios e Licenciamentos",
      percentual: Math.min(100, Math.round(instalacao.progresso * 0.9)),
      status: instalacao.progresso >= 80 ? "Completo" : "Em parte",
    },
    {
      codigo: "B4",
      nome: "Aspectos Ambientais e Materiais Perigosos",
      percentual: Math.min(100, Math.round(instalacao.progresso * 0.85)),
      status: instalacao.progresso >= 75 ? "Completo" : "Em parte",
    },
    {
      codigo: "B5",
      nome: "Recursos Humanos e Capacitação",
      percentual: Math.min(100, Math.round(instalacao.progresso * 0.98)),
      status: "Completo",
    },
    {
      codigo: "B6",
      nome: "Capacidade Financeira e Segurança",
      percentual: Math.min(100, Math.round(instalacao.progresso * 0.8)),
      status: instalacao.progresso >= 90 ? "Completo" : "Em parte",
    },
  ];

  const blocosExibicao = instalacao.blocosDetalhados ?? blocosPadrao;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-in fade-in-50 duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="titulo-modal-instalacao"
    >
      <div className="relative flex w-full max-w-2xl max-h-[90vh] flex-col gap-5 overflow-y-auto rounded-2xl border border-white/10 bg-[#0F172A] p-6 text-white shadow-2xl">
        {/* HEADER DO MODAL */}
        <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-4">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-8 items-center justify-center rounded border border-[#0D9488]/40 bg-[#0D9488]/20 font-mono text-xs font-bold text-[#84CC16]">
                {siglaEstado}
              </span>
              <span className="flex items-center gap-1 text-xs text-slate-400">
                <MapPin size={12} className="text-slate-500" />
                <span>
                  {instalacao.municipio}, {nomeEstado}
                </span>
              </span>
            </div>

            <h3
              id="titulo-modal-instalacao"
              className="text-lg font-bold text-white leading-tight"
            >
              {instalacao.nome}
            </h3>

            <div className="flex flex-wrap items-center gap-2">
              {/* STATUS */}
              <span
                className={`flex items-center gap-1 rounded px-2 py-0.5 text-xs font-medium ${
                  isConcluido
                    ? "bg-emerald-500/10 text-emerald-400"
                    : "bg-amber-500/10 text-amber-300"
                }`}
              >
                {isConcluido ? <CheckCircle2 size={12} /> : <Clock size={12} />}
                <span>Questionário {instalacao.statusQuestionario}</span>
              </span>

              {/* MATURIDADE */}
              <span
                className={`flex items-center gap-1 rounded border px-2 py-0.5 text-xs font-bold ${estiloMaturidade.bg} ${estiloMaturidade.border} ${estiloMaturidade.text}`}
              >
                <Award size={12} />
                <span>Nível {instalacao.nivelMaturidade}</span>
              </span>

              {/* IDENTIFICADOR */}
              <span className="rounded bg-white/5 border border-white/10 px-2 py-0.5 text-xs text-slate-400 font-mono">
                ID: {instalacao.id.toUpperCase()}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-400 transition-colors hover:bg-white/10 hover:text-white cursor-pointer"
            title="Fechar detalhes da instalação"
            aria-label="Fechar"
          >
            <X size={16} />
          </button>
        </div>

        {/* METADADOS / CARDS DE VISÃO GERAL */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex flex-1 min-w-0 flex-col gap-1 rounded-xl border border-white/5 bg-slate-900/60 p-3">
            <div className="flex items-center gap-1.5 text-slate-400 text-[11px]">
              <User size={13} className="text-[#84CC16]" />
              <span>Responsável Técnico</span>
            </div>
            <strong className="text-xs font-semibold text-white truncate">
              {instalacao.responsavel ?? "Coordenação Regional CESS"}
            </strong>
          </div>

          <div className="flex flex-1 min-w-0 flex-col gap-1 rounded-xl border border-white/5 bg-slate-900/60 p-3">
            <div className="flex items-center gap-1.5 text-slate-400 text-[11px]">
              <Calendar size={13} className="text-[#0D9488]" />
              <span>Última Atualização</span>
            </div>
            <strong className="text-xs font-semibold text-white truncate">
              {instalacao.ultimaAtualizacao ?? "Atualizado recentemente"}
            </strong>
          </div>

          <div className="flex flex-1 min-w-0 flex-col gap-1 rounded-xl border border-white/5 bg-slate-900/60 p-3">
            <div className="flex items-center justify-between text-slate-400 text-[11px]">
              <span className="flex items-center gap-1.5">
                <Building2 size={13} className="text-amber-400" />
                <span>Progresso Geral</span>
              </span>
              <strong className="text-xs font-bold text-[#84CC16]">
                {instalacao.progresso}%
              </strong>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
              <div
                className="h-full rounded-full bg-[#84CC16] transition-all duration-300"
                style={{ width: `${instalacao.progresso}%` }}
              />
            </div>
          </div>
        </div>

        {/* DESEMPENHO POR BLOCO DO QUESTIONÁRIO (B1 A B6) */}
        <div className="flex flex-col gap-2.5">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-300">
              Desempenho por Bloco do Questionário
            </h4>
            <span className="text-[11px] text-slate-400">
              {blocosExibicao.length} blocos avaliados
            </span>
          </div>

          <div className="flex flex-col gap-2">
            {blocosExibicao.map((bloco) => {
              const corBloco =
                bloco.percentual >= 85
                  ? "#84CC16"
                  : bloco.percentual >= 60
                    ? "#0D9488"
                    : "#EAB308";

              return (
                <div
                  key={bloco.codigo}
                  className="flex flex-col gap-1.5 rounded-xl border border-white/5 bg-slate-900/40 p-3"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="flex h-5 w-7 items-center justify-center rounded bg-slate-800 text-[11px] font-bold text-slate-200">
                        {bloco.codigo}
                      </span>
                      <span className="text-xs font-medium text-slate-200">
                        {bloco.nome}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="rounded bg-white/5 px-2 py-0.5 text-[10px] text-slate-400">
                        {bloco.status}
                      </span>
                      <strong
                        className="text-xs font-bold tabular-nums"
                        style={{ color: corBloco }}
                      >
                        {bloco.percentual}%
                      </strong>
                    </div>
                  </div>

                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
                    <div
                      className="h-full rounded-full transition-all duration-300"
                      style={{
                        width: `${bloco.percentual}%`,
                        backgroundColor: corBloco,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* INDICADORES DE CONFORMIDADE E REGULARIDADE */}
        <div className="flex flex-col gap-2.5 rounded-xl border border-white/5 bg-slate-900/60 p-4">
          <div className="flex items-center gap-2">
            <ShieldCheck size={16} className="text-[#84CC16]" />
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
              Indicadores de Conformidade & Auditoria
            </h4>
          </div>

          <div className="flex flex-wrap gap-2 text-xs">
            <div className="flex flex-1 min-w-[200px] items-center justify-between rounded-lg bg-slate-800/60 px-3 py-2">
              <span className="text-slate-400">Licença de Operação</span>
              <span className="font-semibold text-emerald-400">Ativa / Regular</span>
            </div>

            <div className="flex flex-1 min-w-[200px] items-center justify-between rounded-lg bg-slate-800/60 px-3 py-2">
              <span className="text-slate-400">Certificação Ambiental</span>
              <span className="font-semibold text-emerald-400">Em Conformidade</span>
            </div>

            <div className="flex flex-1 min-w-[200px] items-center justify-between rounded-lg bg-slate-800/60 px-3 py-2">
              <span className="text-slate-400">Responsável Cadastrado</span>
              <span className="font-semibold text-[#84CC16]">Validado</span>
            </div>

            <div className="flex flex-1 min-w-[200px] items-center justify-between rounded-lg bg-slate-800/60 px-3 py-2">
              <span className="text-slate-400">Avaliação do Analista</span>
              <span
                className={`font-semibold ${
                  isConcluido ? "text-[#84CC16]" : "text-amber-400"
                }`}
              >
                {isConcluido ? "Aprovado" : "Em análise técnica"}
              </span>
            </div>
          </div>
        </div>

        {/* FOOTER DO MODAL */}
        <div className="flex items-center justify-end gap-3 border-t border-white/10 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-slate-300 transition-colors hover:bg-white/10 hover:text-white cursor-pointer"
          >
            Fechar
          </button>

          <Link
            href="/questionario"
            className="flex items-center gap-1.5 rounded-xl border border-[#0D9488]/50 bg-[#0D9488] px-4 py-2 text-xs font-semibold text-white transition-all hover:bg-[#0f766e] hover:border-[#84CC16]/60 cursor-pointer"
          >
            <span>Acessar questionário completo</span>
            <ExternalLink size={13} />
          </Link>
        </div>
      </div>
    </div>
  );
}

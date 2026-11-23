"use client";

import {
  AlertCircle,
  ArrowLeft,
  Award,
  Building2,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  FileText,
  MapPin,
  X,
} from "lucide-react";
import { useState } from "react";
import ModalDetalhesInstalacao from "./ModalDetalhesInstalacao";
import {
  DetalhesEstadoMock,
  InstalacaoDetalhe,
  NivelMaturidadeEstado,
} from "./types";

interface DetalhesEstadoProps {
  dadosEstado: DetalhesEstadoMock;
  onVoltar: () => void;
  className?: string;
}

export default function DetalhesEstado({
  dadosEstado,
  onVoltar,
  className = "",
}: DetalhesEstadoProps) {
  const {
    sigla,
    nome,
    capital,
    regiao,
    totalInstalacoes,
    percentualNacional,
    maturidadeMedia,
    taxaConclusao,
    statusGeral,
    instalacoes,
  } = dadosEstado;

  const [paginaAtual, setPaginaAtual] = useState(1);
  const [instalacaoModal, setInstalacaoModal] =
    useState<InstalacaoDetalhe | null>(null);
  const ITENS_POR_PAGINA = 3;

  const totalPaginas = Math.ceil(instalacoes.length / ITENS_POR_PAGINA);
  const inicioItem = (paginaAtual - 1) * ITENS_POR_PAGINA;
  const fimItem = inicioItem + ITENS_POR_PAGINA;
  const instalacoesPaginadas = instalacoes.slice(inicioItem, fimItem);

  const totalStatus =
    statusGeral.concluidos + statusGeral.emAndamento + statusGeral.pendentes ||
    1;

  const pctConcluidos = (statusGeral.concluidos / totalStatus) * 100;
  const pctEmAndamento = (statusGeral.emAndamento / totalStatus) * 100;
  const pctPendentes = (statusGeral.pendentes / totalStatus) * 100;

  const obterEstiloMaturidade = (nivel: NivelMaturidadeEstado) => {
    switch (nivel) {
      case "N1":
        return {
          bg: "bg-emerald-500/15",
          border: "border-emerald-500/30",
          text: "text-emerald-400",
          corHex: "#22C55E",
        };
      case "N2":
        return {
          bg: "bg-[#84CC16]/15",
          border: "border-[#84CC16]/30",
          text: "text-[#84CC16]",
          corHex: "#84CC16",
        };
      case "N3":
        return {
          bg: "bg-amber-500/15",
          border: "border-amber-500/30",
          text: "text-amber-400",
          corHex: "#EAB308",
        };
      case "N4":
        return {
          bg: "bg-orange-500/15",
          border: "border-orange-500/30",
          text: "text-orange-400",
          corHex: "#F97316",
        };
      case "N5":
      default:
        return {
          bg: "bg-red-500/15",
          border: "border-red-500/30",
          text: "text-red-400",
          corHex: "#EF4444",
        };
    }
  };

  const estiloMaturidade = obterEstiloMaturidade(maturidadeMedia.nivel);

  return (
    <div
      className={`min-w-0 flex flex-col gap-5 animate-in fade-in-50 duration-300 ${className}`}
      role="region"
      aria-label={`Dados detalhados do estado de ${nome}`}
    >
      {/* HEADER: BOTÃO VOLTAR E TÍTULO DO ESTADO */}
      <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={onVoltar}
            className="group flex items-center gap-1.5 rounded-lg border border-[#0D9488]/40 bg-[#0D9488]/15 px-3 py-1.5 text-xs font-medium text-slate-200 transition-all hover:bg-[#0D9488]/30 hover:border-[#84CC16]/50 hover:text-white cursor-pointer"
            title="Voltar para o ranking geral de estados"
          >
            <ArrowLeft
              size={14}
              className="text-[#84CC16] transition-transform group-hover:-translate-x-0.5"
            />
            <span>Todos os estados</span>
          </button>

          <div className="h-5 w-px bg-white/10 hidden sm:block" />

          <div className="flex items-center gap-2.5">
            <span className="flex h-7 w-9 items-center justify-center rounded-md border border-[#0D9488]/40 bg-[#0D9488]/20 font-mono text-xs font-bold text-[#84CC16]">
              {sigla}
            </span>
            <div className="flex flex-col">
              <h3 className="text-base font-bold text-white leading-tight">
                {nome}
              </h3>
              <p className="text-xs text-slate-400">
                Capital: {capital} • Região {regiao}
              </p>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={onVoltar}
          className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-white/5 hover:text-white"
          title="Fechar e ver todos os estados"
          aria-label="Voltar para a visão geral"
        >
          <X size={17} />
        </button>
      </div>

      {/* KPIS DO ESTADO */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* KPI 1: TOTAL DE INSTALAÇÕES */}
        <div className="flex flex-1 min-w-0 flex-col gap-1.5 rounded-xl border border-white/5 bg-slate-900/60 p-3.5">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-medium uppercase tracking-wider">
              Instalações
            </span>
            <Building2 size={15} className="text-[#84CC16]" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <strong className="text-2xl font-bold text-white">
              {totalInstalacoes}
            </strong>
            <span className="text-xs text-slate-400">
              ({percentualNacional.toFixed(1)}% do total)
            </span>
          </div>
          <p className="text-[11px] text-slate-400 truncate">
            {statusGeral.concluidos} concluídas • {statusGeral.emAndamento} em
            andamento
          </p>
        </div>

        {/* KPI 2: MATURIDADE MÉDIA */}
        <div className="flex flex-1 min-w-0 flex-col gap-1.5 rounded-xl border border-white/5 bg-slate-900/60 p-3.5">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-medium uppercase tracking-wider">
              Maturidade
            </span>
            <Award size={15} className={estiloMaturidade.text} />
          </div>
          <div className="flex items-center gap-2">
            <span
              className={`rounded-md px-2 py-0.5 text-xs font-bold border ${estiloMaturidade.bg} ${estiloMaturidade.border} ${estiloMaturidade.text}`}
            >
              {maturidadeMedia.nivel}
            </span>
            <span className="text-sm font-semibold text-white">
              {maturidadeMedia.pontuacao}%
            </span>
          </div>
          <p className="text-[11px] text-slate-400 truncate">
            Nível médio: {maturidadeMedia.descricao}
          </p>
        </div>

        {/* KPI 3: TAXA DE CONCLUSÃO */}
        <div className="flex flex-1 min-w-0 flex-col gap-1.5 rounded-xl border border-white/5 bg-slate-900/60 p-3.5">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-medium uppercase tracking-wider">
              Conclusão
            </span>
            <FileText size={15} className="text-[#0D9488]" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <strong className="text-2xl font-bold text-[#84CC16]">
              {taxaConclusao}%
            </strong>
            <span className="text-xs text-slate-400">preenchido</span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
            <div
              className="h-full rounded-full bg-[#84CC16] transition-all duration-500"
              style={{ width: `${taxaConclusao}%` }}
            />
          </div>
        </div>
      </div>

      {/* STATUS DOS QUESTIONÁRIOS NO ESTADO */}
      <div className="flex flex-col gap-2.5 rounded-xl border border-white/5 bg-slate-900/40 p-3.5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-200">
            Status dos questionários em {sigla}
          </span>
          <span className="text-[11px] text-slate-400">
            {totalInstalacoes} {totalInstalacoes === 1 ? "unidade" : "unidades"}
          </span>
        </div>

        {/* BARRA SEGMENTADA */}
        <div className="flex h-3 w-full overflow-hidden rounded-md bg-slate-800">
          {pctConcluidos > 0 && (
            <div
              style={{ width: `${pctConcluidos}%` }}
              className="bg-[#84CC16] transition-all duration-500"
              title={`Concluídos: ${statusGeral.concluidos} (${pctConcluidos.toFixed(0)}%)`}
            />
          )}
          {pctEmAndamento > 0 && (
            <div
              style={{ width: `${pctEmAndamento}%` }}
              className="bg-[#65A30D] transition-all duration-500"
              title={`Em andamento: ${statusGeral.emAndamento} (${pctEmAndamento.toFixed(0)}%)`}
            />
          )}
          {pctPendentes > 0 && (
            <div
              style={{ width: `${pctPendentes}%` }}
              className="bg-[#0D9488] transition-all duration-500"
              title={`Pendentes: ${statusGeral.pendentes} (${pctPendentes.toFixed(0)}%)`}
            />
          )}
        </div>

        {/* LEGENDA SEGMENTADA */}
        <div className="flex flex-wrap items-center gap-4 text-xs pt-1">
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-[#84CC16]" />
            <span className="text-slate-300">
              Concluídos: <strong>{statusGeral.concluidos}</strong>
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-[#65A30D]" />
            <span className="text-slate-300">
              Em andamento: <strong>{statusGeral.emAndamento}</strong>
            </span>
          </div>

          {statusGeral.pendentes > 0 && (
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-[#0D9488]" />
              <span className="text-slate-300">
                Pendentes: <strong>{statusGeral.pendentes}</strong>
              </span>
            </div>
          )}
        </div>
      </div>

      {/* LISTA DE INSTALAÇÕES ESPECÍFICAS DO ESTADO */}
      <div className="flex flex-col gap-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-300">
              Instalações cadastradas
            </h4>
            <span className="rounded-full bg-[#0D9488]/20 px-2 py-0.5 text-[10px] font-bold text-[#84CC16]">
              {instalacoes.length}
            </span>
          </div>

          <span className="text-[11px] text-slate-400">
            Mapeamento estadual
          </span>
        </div>

        {instalacoes.length === 0 ? (
          <div className="flex min-h-[306px] flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-white/10 p-6 text-center text-slate-400">
            <AlertCircle size={24} className="text-slate-500" />
            <p className="text-xs">
              Nenhuma instalação cadastrada neste estado.
            </p>
          </div>
        ) : (
          <div className="flex flex-col justify-between min-h-[306px]">
            {/* LISTA PAGINADA COM ALTURA MÍNIMA FIXA PARA EVITAR LAYOUT SHIFT */}
            <div className="flex flex-col gap-2 min-h-[258px]">
              {instalacoesPaginadas.map((item) => {
                const estiloItem = obterEstiloMaturidade(item.nivelMaturidade);
                const isConcluido = item.statusQuestionario === "Concluído";

                return (
                  <div
                    key={item.id}
                    onClick={() => setInstalacaoModal(item)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setInstalacaoModal(item);
                      }
                    }}
                    role="button"
                    tabIndex={0}
                    className="group flex flex-col justify-between min-h-[78px] gap-2 rounded-xl border border-white/5 bg-slate-900/50 p-3 transition-colors hover:border-[#0D9488]/40 hover:bg-slate-900/80 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#84CC16]"
                    title="Clique para ver os detalhes completos desta instalação"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex flex-col gap-0.5">
                        <strong className="text-xs font-semibold text-white group-hover:text-[#84CC16] transition-colors">
                          {item.nome}
                        </strong>
                        <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                          <MapPin size={11} className="text-slate-500" />
                          <span>{item.municipio}</span>
                          {item.responsavel && (
                            <>
                              <span>•</span>
                              <span className="truncate max-w-[150px] sm:max-w-[200px]">
                                {item.responsavel}
                              </span>
                            </>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        {/* BADGE DE MATURIDADE */}
                        <span
                          className={`rounded px-1.5 py-0.5 text-[10px] font-bold border ${estiloItem.bg} ${estiloItem.border} ${estiloItem.text}`}
                          title={`Maturidade ${item.nivelMaturidade}`}
                        >
                          {item.nivelMaturidade}
                        </span>

                        {/* BADGE DE STATUS */}
                        <span
                          className={`flex items-center gap-1 rounded px-1.5 py-0.5 text-[10px] font-medium ${
                            isConcluido
                              ? "bg-emerald-500/10 text-emerald-400"
                              : "bg-amber-500/10 text-amber-300"
                          }`}
                        >
                          {isConcluido ? (
                            <CheckCircle2 size={11} />
                          ) : (
                            <Clock size={11} />
                          )}
                          <span>{item.statusQuestionario}</span>
                        </span>
                      </div>
                    </div>

                    {/* BARRA DE PROGRESSO INDIVIDUAL DA INSTALAÇÃO */}
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-800">
                        <div
                          className="h-full rounded-full transition-all duration-300"
                          style={{
                            width: `${item.progresso}%`,
                            backgroundColor: estiloItem.corHex,
                          }}
                        />
                      </div>
                      <span className="text-[10px] tabular-nums text-slate-400">
                        {item.progresso}%
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* CONTROLES DE PAGINAÇÃO: SEMPRE RENDERIZADOS PARA MANTER ALTURA CONSTANTE */}
            <div className="flex items-center justify-between border-t border-white/5 pt-2.5 px-0.5 min-h-[38px]">
              <span className="text-[11px] text-slate-400">
                Mostrando{" "}
                <strong className="text-white">{inicioItem + 1}</strong> a{" "}
                <strong className="text-white">
                  {Math.min(fimItem, instalacoes.length)}
                </strong>{" "}
                de <strong className="text-white">{instalacoes.length}</strong>
              </span>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setPaginaAtual((p) => Math.max(1, p - 1))}
                  disabled={paginaAtual === 1 || totalPaginas <= 1}
                  className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-300 transition-colors hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-30 cursor-pointer"
                  aria-label="Página anterior"
                  title="Página anterior"
                >
                  <ChevronLeft size={14} />
                </button>

                <div className="flex items-center gap-1">
                  {Array.from(
                    { length: Math.max(totalPaginas, 1) },
                    (_, i) => i + 1,
                  ).map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setPaginaAtual(num)}
                      disabled={totalPaginas <= 1}
                      className={`flex h-7 min-w-7 items-center justify-center rounded-lg px-2 text-xs transition-colors ${
                        totalPaginas <= 1 ? "cursor-default" : "cursor-pointer"
                      } ${
                        paginaAtual === num
                          ? "bg-[#0D9488]/30 border border-[#84CC16]/60 text-[#84CC16] font-bold"
                          : "border border-white/10 bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white"
                      }`}
                      aria-label={`Ir para a página ${num}`}
                      aria-current={paginaAtual === num ? "page" : undefined}
                    >
                      {num}
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setPaginaAtual((p) => Math.min(totalPaginas, p + 1))
                  }
                  disabled={paginaAtual === totalPaginas || totalPaginas <= 1}
                  className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-300 transition-colors hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-30 cursor-pointer"
                  aria-label="Próxima página"
                  title="Próxima página"
                >
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* MODAL DE DETALHES COMPLETOS DA INSTALAÇÃO */}
      {instalacaoModal && (
        <ModalDetalhesInstalacao
          instalacao={instalacaoModal}
          siglaEstado={sigla}
          nomeEstado={nome}
          onClose={() => setInstalacaoModal(null)}
        />
      )}
    </div>
  );
}

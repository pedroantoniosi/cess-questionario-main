"use client";

import { CircleHelp, Database, X } from "lucide-react";
import { useGraficoCoberturaBlocos } from "./hooks/useGraficoCoberturaBlocos";
import { GraficoCoberturaBlocosProps } from "./types";

export default function GraficoCoberturaBlocos({
  dados,
  className = "",
}: GraficoCoberturaBlocosProps) {
  const {
    titulo,
    subtitulo,
    rotuloMetricaPrincipal,
    statusAtivo,
    blocos,
    conicGradient,
    infoCentro,
    blocoSelecionado,
    toggleBloco,
    limparSelecao,
    categoriaHover,
    setCategoriaHover,
    cores,
  } = useGraficoCoberturaBlocos(dados);

  return (
    <div
      className={`w-full h-full flex-1 flex flex-col justify-between gap-4 text-white ${className}`}
    >
      {/* CABEÇALHO */}
      <header className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-high/30 bg-high/15 text-high">
            <Database size={18} />
          </div>

          <div className="flex flex-col">
            <h3 className="text-base font-bold text-white leading-tight">
              {titulo}
            </h3>
            <p className="text-xs text-slate-400 leading-snug">{subtitulo}</p>
          </div>
        </div>

        {/* AJUDA / TOOLTIP */}
        <div className="group relative flex items-center">
          <button
            type="button"
            className="rounded-lg p-1 text-slate-400 transition-colors hover:bg-white/5 hover:text-white cursor-pointer"
            aria-label="Informações sobre a cobertura dos blocos"
          >
            <CircleHelp size={18} />
          </button>

          <div className="pointer-events-none absolute right-0 top-full z-30 hidden w-60 rounded-xl border border-white/10 bg-template p-3 text-xs text-slate-300 shadow-xl group-hover:flex flex-col gap-1 animate-in fade-in-50 duration-200">
            <strong className="text-white">Sobre a cobertura</strong>
            <p className="text-[11px] leading-relaxed text-slate-400">
              {subtitulo}
            </p>
          </div>
        </div>
      </header>

      {/* ÁREA CENTRAL EXPANSÍVEL (SELETOR + ROSCA + LEGENDA) */}
      <div className="flex-1 flex flex-col items-center justify-center gap-3 py-1">
        {/* BADGE DE FILTRO ATIVO */}
        {blocoSelecionado && (
          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-xs text-slate-300">
            <span>
              Filtrando:{" "}
              <strong className="text-high">{blocoSelecionado.codigo}</strong>
            </span>
            <button
              type="button"
              onClick={limparSelecao}
              className="text-slate-400 hover:text-white cursor-pointer"
              aria-label="Limpar filtro de bloco"
              title="Voltar à visão geral de todos os blocos"
            >
              <X size={13} />
            </button>
          </div>
        )}

        {/* GRÁFICO DE ROSCA */}
        <div
          className="relative flex h-36 w-36 items-center justify-center rounded-full shrink-0 shadow-md transition-all"
          style={{ background: conicGradient }}
        >
          <div className="absolute inset-2 flex flex-col items-center justify-center rounded-full bg-card">
            <span
              className="text-3xl font-bold transition-colors"
              style={{ color: infoCentro.cor }}
            >
              {infoCentro.valor}
            </span>
            <span className="text-xs text-slate-400">{infoCentro.rotulo}</span>
          </div>
        </div>

        {/* LEGENDA DO GRÁFICO DE ROSCA */}
        <div className="flex flex-wrap items-center justify-center gap-3 text-xs">
          {(["completo", "emParte", "semResposta"] as const).map((catKey) => {
            const config = cores[catKey];
            const valor = statusAtivo[catKey];
            const isHover = categoriaHover === catKey;

            return (
              <div
                key={catKey}
                onMouseEnter={() => setCategoriaHover(catKey)}
                onMouseLeave={() => setCategoriaHover(null)}
                className={`flex items-center gap-1.5 cursor-pointer transition-colors ${
                  isHover ? "text-white" : "text-slate-300 hover:text-white"
                }`}
              >
                <span
                  className="h-2.5 w-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: config.corHex }}
                />
                <span className="text-[11px] text-slate-400">
                  {config.rotuloCurto}:
                </span>
                <span className="text-[11px] font-bold text-white">
                  {valor}%
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* MÉTRICA GERAL E BARRA SEGMENTADA (RODAPÉ) */}
      <footer className="flex flex-col gap-1.5 border-t border-white/10 pt-3">
        <div className="flex items-center justify-between text-xs font-semibold">
          <span className="text-slate-300">{rotuloMetricaPrincipal}</span>
          <span className="text-sm font-bold text-high">
            {statusAtivo.completo}%
          </span>
        </div>

        <div className="flex h-2 w-full overflow-hidden rounded-full bg-slate-800">
          <div
            style={{ width: `${statusAtivo.completo}%` }}
            className="bg-high transition-all duration-300"
            title={`Completo: ${statusAtivo.completo}%`}
          />
          <div
            style={{ width: `${statusAtivo.emParte}%` }}
            className="bg-medium transition-all duration-300"
            title={`Em parte: ${statusAtivo.emParte}%`}
          />
          <div
            style={{ width: `${statusAtivo.semResposta}%` }}
            className="bg-low transition-all duration-300"
            title={`Sem resposta: ${statusAtivo.semResposta}%`}
          />
        </div>
      </footer>
    </div>
  );
}

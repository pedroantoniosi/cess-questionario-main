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
      <div className="flex-1 flex flex-col items-center justify-center gap-10 py-1">
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
        {/* Altere h-* e w-* para mudar o tamanho total do gráfico */}
        <div
          className="relative flex h-50 w-50 items-center justify-center rounded-full shrink-0 shadow-md transition-all"
          style={{ background: conicGradient }}
        >
          {/* LARGURA/ESPESSURA DA ROSCA: altere o valor de "inset-*" abaixo (ex: inset-4 = 16px, inset-5 = 20px, inset-6 = 24px) */}
          <div className="absolute inset-5 flex flex-col items-center justify-center rounded-full bg-card">
            <span
              className="text-5xl font-bold transition-colors"
              style={{ color: infoCentro.cor }}
            >
              {infoCentro.valor}
            </span>
            <span className="text-xs text-slate-400">{infoCentro.rotulo}</span>
          </div>
        </div>

        {/* LEGENDA DO GRÁFICO DE ROSCA */}
        {/* Altere gap-* e text-* abaixo para ajustar o espaçamento e tamanho da legenda */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          {(["completo", "emParte", "semResposta"] as const).map((catKey) => {
            const config = cores[catKey];
            const valor = statusAtivo[catKey];
            const isHover = categoriaHover === catKey;

            return (
              <div
                key={catKey}
                onMouseEnter={() => setCategoriaHover(catKey)}
                onMouseLeave={() => setCategoriaHover(null)}
                className={`flex items-center gap-2 cursor-pointer transition-colors ${
                  isHover ? "text-white" : "text-slate-300 hover:text-white"
                }`}
              >
                {/* TAMANHO DO PONTO INDICADOR DA LEGENDA: altere h-* e w-* */}
                <span
                  className="h-3.5 w-3.5 rounded-full shrink-0"
                  style={{ backgroundColor: config.corHex }}
                />
                {/* TAMANHO DO TEXTO DO RÓTULO: altere text-* */}
                <span className="text-xs text-slate-300">
                  {config.rotuloCurto}:
                </span>
                {/* TAMANHO DO VALOR PERCENTUAL: altere text-* */}
                <span className="text-sm font-bold text-white">
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

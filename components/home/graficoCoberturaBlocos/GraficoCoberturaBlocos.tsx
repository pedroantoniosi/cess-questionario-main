"use client";

import { Database, CircleHelp, X } from "lucide-react";
import { useGraficoCoberturaBlocos } from "./hooks/useGraficoCoberturaBlocos";
import { GraficoCoberturaBlocosProps } from "./types";

export default function GraficoCoberturaBlocos({
  dados,
  className = "",
}: GraficoCoberturaBlocosProps) {
  const {
    titulo,
    subtitulo,
    rodape,
    rotuloMetricaPrincipal,
    statusGeral,
    blocos,
    statusAtivo,
    conicGradient,
    infoCentro,
    blocoSelecionado,
    toggleBloco,
    limparSelecao,
    setCategoriaHover,
    cores,
  } = useGraficoCoberturaBlocos(dados);

  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      {/* CABEÇALHO */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-400">
            <Database className="h-5 w-5" />
          </div>

          <div className="flex flex-col">
            <h3 className="text-base font-bold text-white leading-tight">
              {titulo}
            </h3>
            <p className="text-xs text-gray-400 leading-snug">
              {subtitulo}
            </p>
          </div>
        </div>

        <button
          type="button"
          title="Instalações com cada bloco respondido por completo, em parte ou sem resposta."
          className="text-gray-400 hover:text-white p-1 transition-colors"
        >
          <CircleHelp className="h-4 w-4" />
        </button>
      </div>

      {/* GRÁFICO DE ROSCA (NO PADRÃO CONIC-GRADIENT DO GRAFICOMATURIDADE) */}
      <div className="flex flex-col items-center gap-3 py-1">
        {blocoSelecionado && (
          <div className="flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-slate-800 text-xs text-gray-300">
            <span>
              Filtrando: <strong className="text-white">{blocoSelecionado.codigo}</strong>
            </span>
            <button
              type="button"
              onClick={limparSelecao}
              className="text-gray-400 hover:text-white"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        )}

        <div
          className="relative flex h-36 w-36 items-center justify-center rounded-full shrink-0 shadow-md"
          style={{
            background: conicGradient,
          }}
        >
          <div className="absolute inset-2 flex flex-col items-center justify-center rounded-full bg-card">
            <span
              className="text-3xl font-bold transition-colors"
              style={{ color: infoCentro.cor }}
            >
              {infoCentro.valor}
            </span>
            <span className="text-xs text-gray-400">
              {infoCentro.rotulo}
            </span>
          </div>
        </div>

        {/* LEGENDA DO GRÁFICO DE ROSCA */}
        <div className="flex flex-wrap items-center justify-center gap-3 text-xs">
          {(
            [
              "completo",
              "emParte",
              "semResposta",
            ] as const
          ).map((catKey) => {
            const config = cores[catKey];
            const valor = statusAtivo[catKey];

            return (
              <div
                key={catKey}
                onMouseEnter={() => setCategoriaHover(catKey)}
                onMouseLeave={() => setCategoriaHover(null)}
                className="flex items-center gap-1.5 cursor-pointer text-gray-300 hover:text-white transition-colors"
              >
                <span
                  className="h-2 w-2 rounded-full shrink-0"
                  style={{ backgroundColor: config.corHex }}
                />
                <span className="text-[11px]">{config.rotuloCurto}:</span>
                <span className="text-[11px] font-bold text-white">
                  {valor}%
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* MÉTRICA GERAL E BARRA DO MODELO ANEXADO */}
      <div className="flex flex-col gap-1.5 pt-1">
        <div className="flex items-center justify-between text-xs font-semibold">
          <span className="text-gray-200">{rotuloMetricaPrincipal}</span>
          <span className="text-sm font-bold text-white">
            {statusGeral.completo}%
          </span>
        </div>

        <div className="h-2 w-full rounded-full overflow-hidden flex bg-slate-800">
          <div
            style={{ width: `${statusGeral.completo}%` }}
            className="bg-[#A3E635] transition-all duration-300"
          />
          <div
            style={{ width: `${statusGeral.emParte}%` }}
            className="bg-[#65A30D] transition-all duration-300"
          />
          <div
            style={{ width: `${statusGeral.semResposta}%` }}
            className="bg-[#0D9488] transition-all duration-300"
          />
        </div>
      </div>

      {/* LISTA DE BLOCOS (B1 a B7) COM OVERFLOW AUTO */}
      <div className="flex flex-col gap-2 max-h-60 pr-1">
        {blocos.map((bloco) => {
          const selecionado = blocoSelecionado?.id === bloco.id;

          return (
            <div
              key={bloco.id}
              onClick={() => toggleBloco(bloco)}
              className={`flex items-center justify-between gap-3 text-xs p-1.5 rounded-lg cursor-pointer transition-colors ${
                selecionado
                  ? "bg-slate-800 ring-1 ring-amber-400/50"
                  : "hover:bg-slate-800/60"
              }`}
            >
              <span className="truncate w-6/12 text-gray-300">
                <strong className="text-white mr-1.5">{bloco.codigo}</strong>
                {bloco.nome}
              </span>

              <div className="flex-1 h-2 rounded-full overflow-hidden flex bg-slate-800">
                <div
                  style={{ width: `${bloco.status.completo}%` }}
                  className="bg-[#A3E635] transition-all duration-300"
                />
                <div
                  style={{ width: `${bloco.status.emParte}%` }}
                  className="bg-[#65A30D] transition-all duration-300"
                />
                <div
                  style={{ width: `${bloco.status.semResposta}%` }}
                  className="bg-[#0D9488] transition-all duration-300"
                />
              </div>

              <span className="w-8 text-right font-semibold text-white">
                {bloco.status.completo}%
              </span>
            </div>
          );
        })}
      </div>

      {/* RODAPÉ */}
      {rodape && (
        <div className="pt-2 border-t border-slate-800 text-[11px] text-gray-400">
          {rodape}
        </div>
      )}
    </div>
  );
}

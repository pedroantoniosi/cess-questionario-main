"use client";

import { Info, MapPin } from "lucide-react";
import { useId } from "react";
import { useDistribuicaoPorEstado } from "./hooks/useDistribuicaoPorEstado";
import {
  MAPA_BRASIL_ESTADOS_PATHS,
} from "./mapaBrasilPath";
import { DistribuicaoPorEstadoProps, SiglaEstado } from "./types";

export default function DistribuicaoPorEstado({
  dados,
  className = "",
}: DistribuicaoPorEstadoProps) {
  const {
    titulo,
    descricao,
    estados,
    totalInstalacoes,
    estadoAtual,
    estadoSelecionado,
    selecionarEstado,
    obterCor,
  } = useDistribuicaoPorEstado(dados);

  const gradientId = useId().replace(/:/g, "");

  const maiorValor = Math.max(
    ...estados.map((estado) => estado.instalacoes),
    1
  );

  return (
    <section
      className={`w-full overflow-hidden rounded-2xl border border-white/5 bg-card p-5 text-white flex flex-col gap-6 ${className}`}
    >
      {/* HEADER */}
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#0D9488]/20">
              <MapPin size={18} className="text-[#84CC16]" />
            </div>

            <h2 className="text-lg font-semibold">{titulo}</h2>
          </div>

          <p className="text-sm text-slate-400">{descricao}</p>
        </div>

        <div className="flex flex-col gap-1 rounded-xl border border-[#0D9488]/30 bg-[#0D9488]/10 px-4 py-2">
          <span className="text-xs text-slate-400">Total de instalações</span>
          <strong className="text-xl text-[#84CC16]">{totalInstalacoes}</strong>
        </div>
      </header>

      {/* VISUALIZAÇÕES (GRID DE 2 COLUNAS) */}
      <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-2">
        {/* MAPA DO BRASIL COM DIVISÕES ESTADUAIS */}
        <div className="relative min-w-0 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold">Mapa de distribuição</h3>
            <span className="text-xs text-slate-500">Brasil</span>
          </div>

          <div className="relative w-full max-w-[550px] self-center">
            <svg
              viewBox="0 0 1000 1000"
              className="h-auto w-full overflow-visible"
              role="img"
              aria-label="Mapa do Brasil com divisões estaduais e marcadores"
            >
              <defs>
                <linearGradient
                  id={`${gradientId}-land`}
                  x1="0"
                  y1="0"
                  x2="1"
                  y2="1"
                >
                  <stop offset="0%" stopColor="#0B2D2B" />
                  <stop offset="100%" stopColor="#071F1E" />
                </linearGradient>

                <radialGradient id={`${gradientId}-glow`}>
                  <stop offset="0%" stopColor="#84CC16" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#84CC16" stopOpacity="0" />
                </radialGradient>

                <filter
                  id={`${gradientId}-shadow`}
                  x="-100%"
                  y="-100%"
                  width="300%"
                  height="300%"
                >
                  <feGaussianBlur stdDeviation="8" />
                </filter>
              </defs>

              {/* BRILHO AMBIENTE */}
              <ellipse
                cx="500"
                cy="500"
                rx="380"
                ry="420"
                fill={`url(#${gradientId}-glow)`}
                opacity="0.2"
              />

              {/* CONTORNOS DOS 27 ESTADOS BRASILEIROS COM DIVISÕES EM BRANCO */}
              <g className="transition-all duration-300">
                {(
                  Object.entries(MAPA_BRASIL_ESTADOS_PATHS) as [
                    SiglaEstado,
                    string,
                  ][]
                ).map(([sigla, pathD]) => {
                  const estaSelecionado = sigla === estadoSelecionado;

                  return (
                    <path
                      key={sigla}
                      d={pathD}
                      fill={estaSelecionado ? "#134E4A" : `url(#${gradientId}-land)`}
                      stroke="#FFFFFF"
                      strokeWidth={estaSelecionado ? "2" : "1.2"}
                      strokeOpacity={estaSelecionado ? "0.9" : "0.55"}
                      strokeLinejoin="round"
                      className="transition-colors duration-200 hover:fill-[#0F3D3A] cursor-pointer"
                      onClick={() => selecionarEstado(sigla)}
                      aria-label={`Estado ${sigla}`}
                    />
                  );
                })}
              </g>

              {/* BULLETPOINTS VETORIAIS (MARCADORES DE INSTALAÇÃO) */}
              {estados.map((estado) => {
                const x = estado.coordenadas.x * 10;
                const y = estado.coordenadas.y * 10;
                const selecionado = estado.sigla === estadoSelecionado;

                return (
                  <g
                    key={estado.sigla}
                    transform={`translate(${x}, ${y})`}
                    onClick={(e) => {
                      e.stopPropagation();
                      selecionarEstado(estado.sigla);
                    }}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        selecionarEstado(estado.sigla);
                      }
                    }}
                    tabIndex={0}
                    role="button"
                    aria-label={`${estado.estado} (${estado.capital}), ${estado.instalacoes} instalações`}
                    className="cursor-pointer outline-none transition-transform duration-200 hover:scale-110"
                  >
                    {/* AURA */}
                    <circle
                      r={selecionado ? 42 : 28}
                      fill="#0D9488"
                      opacity={selecionado ? 0.4 : 0.2}
                      filter={`url(#${gradientId}-shadow)`}
                    />

                    {/* ANEL */}
                    <circle
                      r={selecionado ? 18 : 13}
                      fill="#0D9488"
                      stroke="#84CC16"
                      strokeWidth={selecionado ? 3.5 : 2}
                    />

                    {/* CENTRO */}
                    <circle r={selecionado ? 8 : 5.5} fill="#FFFFFF" />

                    {/* IDENTIFICAÇÃO DA SIGLA */}
                    {selecionado && (
                      <text
                        y="-26"
                        textAnchor="middle"
                        fill="#84CC16"
                        fontSize="22"
                        fontWeight="bold"
                        filter="drop-shadow(0 2px 4px rgba(0,0,0,0.9))"
                      >
                        {estado.sigla}
                      </text>
                    )}
                  </g>
                );
              })}
            </svg>
          </div>

          {/* ESTADO SELECIONADO */}
          {estadoAtual && (
            <div className="rounded-xl border border-[#0D9488]/30 bg-[#0D9488]/10 p-4">
              <div className="flex items-center justify-between gap-3">
                <div className="flex flex-col gap-1">
                  <span className="text-xs text-slate-400">
                    Estado selecionado
                  </span>
                  <h4 className="font-semibold text-white">
                    {estadoAtual.estado}
                  </h4>
                  <p className="text-xs text-slate-400">
                    Capital: {estadoAtual.capital}
                  </p>
                </div>

                <div className="flex flex-col items-end gap-0.5 text-right">
                  <strong className="text-2xl text-[#84CC16]">
                    {estadoAtual.instalacoes}
                  </strong>
                  <p className="text-xs text-slate-400">instalações</p>
                  <p className="text-xs text-[#84CC16]">
                    {estadoAtual.percentual.toFixed(1)}%
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* RANKING / GRÁFICO DE BARRAS */}
        <div className="min-w-0 flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <h3 className="text-sm font-semibold">Instalações por estado</h3>
              <p className="text-xs text-slate-400">
                Ranking por quantidade cadastrada
              </p>
            </div>

            <Info size={17} className="text-slate-500" />
          </div>

          {/* LISTA DE BARRAS */}
          <div className="flex flex-col gap-4">
            {estados.map((estado) => {
              const selecionado = estado.sigla === estadoSelecionado;
              const largura = (estado.instalacoes / maiorValor) * 100;

              return (
                <button
                  key={estado.sigla}
                  type="button"
                  onClick={() => selecionarEstado(estado.sigla)}
                  aria-pressed={selecionado}
                  className="group flex w-full flex-col gap-1.5 rounded-md text-left outline-none transition-all focus-visible:ring-2 focus-visible:ring-[#84CC16]"
                >
                  {/* INFORMAÇÕES */}
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-xs font-semibold transition-colors ${
                          selecionado ? "text-[#84CC16]" : "text-slate-300"
                        }`}
                      >
                        {estado.sigla}
                      </span>

                      <span className="text-xs text-slate-500">
                        {estado.estado}
                      </span>
                    </div>

                    <span className="text-xs font-semibold tabular-nums text-slate-200">
                      {estado.instalacoes}
                    </span>
                  </div>

                  {/* BARRA */}
                  <div className="h-[13px] w-full overflow-hidden rounded-sm bg-[#12303B]">
                    <div
                      className="h-full rounded-sm transition-all duration-500 ease-out"
                      style={{
                        width: `${largura}%`,
                        backgroundColor: obterCor(estado.instalacoes),
                        opacity: selecionado ? 1 : 0.8,
                        boxShadow: selecionado
                          ? `0 0 14px ${obterCor(estado.instalacoes)}66`
                          : "none",
                      }}
                    />
                  </div>

                  {/* PERCENTUAL */}
                  <div className="flex justify-end">
                    <span className="text-[10px] text-slate-500">
                      {estado.percentual.toFixed(1)}%
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* LEGENDA */}
          <div className="flex flex-col gap-3 border-t border-white/10 pt-5">
            <p className="text-xs font-medium text-slate-400">
              Concentração de instalações
            </p>

            <div className="flex flex-wrap gap-4">
              {[
                {
                  cor: "#0D9488",
                  label: "Alta",
                },
                {
                  cor: "#65A30D",
                  label: "Média",
                },
                {
                  cor: "#84CC16",
                  label: "Baixa",
                },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-2">
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{
                      backgroundColor: item.cor,
                    }}
                  />

                  <span className="text-xs text-slate-400">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

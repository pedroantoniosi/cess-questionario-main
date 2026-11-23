"use client";

import { CircleHelp } from "lucide-react";
import { useId } from "react";
import { useDistribuicaoIDPT } from "./hooks/useDistribuicaoIDPT";
import { DistribuicaoIDPTProps } from "./types";

export default function DistribuicaoIDPT({
  dados,
  className = "",
  onSelecionarSubtema,
}: DistribuicaoIDPTProps) {
  const {
    titulo,
    subtitulo,
    descricaoRodape,
    subtemas,
    subtemaSelecionado,
    subtemaHover,
    subtemaSelecionadoId,
    subtemaHoverId,
    setSubtemaHoverId,
    selecionarSubtema,
    quadrantesConfig,
  } = useDistribuicaoIDPT(dados, onSelecionarSubtema);

  const filterId = useId().replace(/:/g, "");

  const subtemaAtivo = subtemaHover ?? subtemaSelecionado;

  return (
    <section
      className={`w-full overflow-hidden rounded-2xl border border-white/5 bg-card p-5 text-white flex flex-col gap-4 ${className}`}
      aria-label={titulo}
    >
      {/* CABEÇALHO */}
      <header className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          {/* ÍCONE 2x3 DE PONTOS */}
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-high/30 bg-high/15 text-high">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <circle cx="7" cy="5" r="2.5" />
              <circle cx="17" cy="5" r="2.5" />
              <circle cx="7" cy="12" r="2.5" />
              <circle cx="17" cy="12" r="2.5" />
              <circle cx="7" cy="19" r="2.5" />
              <circle cx="17" cy="19" r="2.5" />
            </svg>
          </div>

          <div className="flex flex-col">
            <h2 className="text-base font-bold text-white leading-tight">
              {titulo}
            </h2>
            <p className="text-xs text-slate-400">{subtitulo}</p>
          </div>
        </div>

        {/* BOTÃO DE INFORMAÇÕES / AJUDA */}
        <div className="group relative flex items-center">
          <button
            type="button"
            className="rounded-lg p-1 text-slate-400 transition-colors hover:bg-white/5 hover:text-white cursor-pointer"
            aria-label="Informações sobre o Índice Diagnóstico de Prontidão Tecnológica"
          >
            <CircleHelp size={18} />
          </button>

          {/* TOOLTIP EXPLICATIVO */}
          <div className="pointer-events-none absolute right-0 top-full z-30 hidden w-64 rounded-xl border border-white/10 bg-template p-3 text-xs text-slate-300 shadow-xl group-hover:flex flex-col gap-1.5 animate-in fade-in-50 duration-200">
            <strong className="text-white">Sobre o IDPT</strong>
            <p className="text-[11px] leading-relaxed text-slate-400">
              Mapeia os subtemas em 4 quadrantes relacionando prontidão técnica
              e impacto estratégico para orientar planos de ação.
            </p>
          </div>
        </div>
      </header>

      {/* ÁREA DA MATRIZ 2x2 (4 QUADRANTES) */}
      <div className="relative w-full aspect-[4/3] min-h-[300px] overflow-hidden rounded-2xl border border-white/10 bg-template/30">
        {/* LINHAS CENTRAIS DOS EIXOS */}
        <div className="pointer-events-none absolute inset-x-0 top-1/2 h-px bg-white/15" />
        <div className="pointer-events-none absolute inset-y-0 left-1/2 w-px bg-white/15" />

        {/* RÓTULOS DOS 4 QUADRANTES */}
        <span className="pointer-events-none absolute left-3 top-3 select-none text-xs font-medium text-slate-400">
          Intervenção prioritária
        </span>
        <span className="pointer-events-none absolute right-3 top-3 select-none text-right text-xs font-medium text-slate-400">
          Falsa prontidão
        </span>
        <span className="pointer-events-none absolute bottom-3 left-3 select-none text-xs font-medium text-slate-400">
          Capacidade latente
        </span>
        <span className="pointer-events-none absolute bottom-3 right-3 select-none text-right text-xs font-medium text-slate-400">
          Facilitadores
        </span>

        {/* SVG DOS PONTOS E RÓTULOS */}
        <svg
          viewBox="0 0 1000 750"
          className="absolute inset-0 h-full w-full overflow-visible"
          role="img"
          aria-label="Gráfico de dispersão dos subtemas nos quadrantes IDPT"
        >
          <defs>
            <filter
              id={`${filterId}-shadow`}
              x="-50%"
              y="-50%"
              width="200%"
              height="200%"
            >
              <feGaussianBlur stdDeviation="6" />
            </filter>
          </defs>

          {subtemas.map((subtema) => {
            const cx = (subtema.x / 100) * 1000;
            // Coordenada Y cartesiana (0 na base, 100 no topo)
            const cy = ((100 - subtema.y) / 100) * 750;

            const isSelecionado = subtema.id === subtemaSelecionadoId;
            const isHover = subtema.id === subtemaHoverId;
            const isAtivo = isSelecionado || isHover;

            return (
              <g
                key={subtema.id}
                tabIndex={0}
                role="button"
                aria-label={`Subtema ${subtema.nome}, X: ${subtema.x}%, Y: ${subtema.y}%, Quadrante: ${quadrantesConfig[subtema.quadrante].rotulo}`}
                onClick={() => selecionarSubtema(subtema.id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    selecionarSubtema(subtema.id);
                  }
                }}
                onMouseEnter={() => setSubtemaHoverId(subtema.id)}
                onMouseLeave={() => setSubtemaHoverId(null)}
                className="group cursor-pointer outline-none"
              >
                {/* ALVO DE CLIQUE TRANSPARENTE E ESTÁVEL */}
                <circle cx={cx} cy={cy} r={24} fill="transparent" />

                {/* AURA / BRILHO */}
                <circle
                  cx={cx}
                  cy={cy}
                  r={isAtivo ? 20 : 12}
                  fill="var(--color-high, #84CC16)"
                  opacity={isAtivo ? 0.5 : 0.25}
                  filter={`url(#${filterId}-shadow)`}
                  className="transition-all duration-200 group-hover:opacity-50"
                />

                {/* ANEL EXTERNO */}
                <circle
                  cx={cx}
                  cy={cy}
                  r={isAtivo ? 10 : 7}
                  fill="none"
                  stroke="var(--color-high, #84CC16)"
                  strokeWidth={isAtivo ? 2.5 : 1.5}
                  opacity={isAtivo ? 1 : 0.85}
                  className="transition-all duration-200"
                />

                {/* PONTO CENTRAL */}
                <circle
                  cx={cx}
                  cy={cy}
                  r={isAtivo ? 5 : 3.5}
                  fill="var(--color-high, #84CC16)"
                  stroke="#FFFFFF"
                  strokeWidth={1}
                  className="transition-all duration-200"
                />

                {/* RÓTULO DO SUBTEMA */}
                <text
                  x={cx + (subtema.labelDx ?? 12)}
                  y={cy + (subtema.labelDy ?? 4)}
                  textAnchor={subtema.labelAnchor ?? "start"}
                  fill="#FFFFFF"
                  fontSize="12"
                  fontWeight="700"
                  letterSpacing="0.04em"
                  filter="drop-shadow(0 1px 3px rgba(0,0,0,0.9))"
                  className={`select-none pointer-events-none transition-opacity duration-200 ${
                    isAtivo ? "opacity-100" : "opacity-90"
                  }`}
                >
                  {subtema.nome}
                </text>
              </g>
            );
          })}
        </svg>

        {/* FEEDBACK DO SUBTEMA ATIVO / SELECIONADO */}
        {subtemaAtivo && (
          <div className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full border border-high/40 bg-card/95 px-3 py-1 text-xs text-white shadow-lg backdrop-blur-xs flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-high" />
            <span className="font-semibold">{subtemaAtivo.nome}</span>
            <span className="text-slate-400">
              ({subtemaAtivo.x}%, {subtemaAtivo.y}%)
            </span>
            <span className="text-high text-[11px]">
              • {quadrantesConfig[subtemaAtivo.quadrante].rotulo}
            </span>
          </div>
        )}
      </div>

      {/* RODAPÉ */}
      <footer className="border-t border-white/10 pt-3">
        <p className="text-xs text-slate-400">{descricaoRodape}</p>
      </footer>
    </section>
  );
}

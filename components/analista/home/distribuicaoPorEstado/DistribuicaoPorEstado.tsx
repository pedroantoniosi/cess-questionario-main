"use client";

import { ChevronLeft, ChevronRight, Info, MapPin } from "lucide-react";
import { useId, useMemo, useState } from "react";
import DetalhesEstado from "./DetalhesEstado";
import { useDistribuicaoPorEstado } from "./hooks/useDistribuicaoPorEstado";
import { MAPA_BRASIL_ESTADOS_PATHS } from "./mapaBrasilPath";
import { DistribuicaoPorEstadoProps, SiglaEstado } from "./types";

export default function DistribuicaoPorEstado({
  dados,
  className = "",
  estadoInicial = null,
}: DistribuicaoPorEstadoProps) {
  const {
    titulo,
    descricao,
    estados,
    totalInstalacoes,
    estadoAtual,
    estadoSelecionado,
    detalhesEstado,
    selecionarEstado,
    limparSelecao,
    obterCor,
  } = useDistribuicaoPorEstado(dados, estadoInicial);

  const [paginaRanking, setPaginaRanking] = useState(1);
  const ITENS_POR_PAGINA_RANKING = 5;

  const gradientId = useId().replace(/:/g, "");

  const siglasComDados = useMemo(
    () =>
      new Set(
        estados
          .filter((estado) => estado.instalacoes > 0)
          .map((estado) => estado.sigla),
      ),
    [estados],
  );

  const mapaInstalacoesPorSigla = useMemo(() => {
    const map = new Map<SiglaEstado, number>();
    estados.forEach((e) => map.set(e.sigla, e.instalacoes));
    return map;
  }, [estados]);

  const marcadoresOrdenados = useMemo(() => {
    if (!estadoSelecionado) return estados;
    return [...estados].sort((a, b) => {
      if (a.sigla === estadoSelecionado) return 1;
      if (b.sigla === estadoSelecionado) return -1;
      return 0;
    });
  }, [estados, estadoSelecionado]);

  const maiorValor = Math.max(
    ...estados.map((estado) => estado.instalacoes),
    1,
  );

  const totalPaginasRanking = Math.ceil(
    estados.length / ITENS_POR_PAGINA_RANKING,
  );
  const inicioRanking = (paginaRanking - 1) * ITENS_POR_PAGINA_RANKING;
  const fimRanking = inicioRanking + ITENS_POR_PAGINA_RANKING;
  const estadosPaginados = estados.slice(inicioRanking, fimRanking);

  return (
    <section
      className={`w-full overflow-hidden rounded-2xl border border-white/5 bg-card p-5 text-white flex flex-col gap-6 ${className}`}
    >
      {/* HEADER */}
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-high/20">
              <MapPin size={18} className="text-high" />
            </div>

            <h2 className="text-lg font-semibold">{titulo}</h2>
          </div>

          <p className="text-sm text-slate-400">{descricao}</p>
        </div>

        <div className="flex flex-col gap-1 rounded-xl border border-high/30 bg-high/10 px-4 py-2">
          <span className="text-xs text-slate-400">Total de instalações</span>
          <strong className="text-xl text-high">{totalInstalacoes}</strong>
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
                {/* GRADIENTE BASE PARA ESTADOS SEM INSTALAÇÕES (USANDO CORES DE GLOBALS.CSS) */}
                <linearGradient
                  id={`${gradientId}-land`}
                  x1="0"
                  y1="0"
                  x2="1"
                  y2="1"
                >
                  <stop offset="0%" stopColor="#2B2D3D" />
                  <stop offset="100%" stopColor="#1E202C" />
                </linearGradient>

                <radialGradient id={`${gradientId}-glow`}>
                  <stop offset="0%" stopColor="#84CC16" stopOpacity="0.2" />
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
                opacity="0.25"
              />

              {/* CONTORNOS DOS 27 ESTADOS BRASILEIROS COM CORES ALTERNADAS POR NÚMERO DE INSTALAÇÕES */}
              <g className="transition-all duration-300">
                {(
                  Object.entries(MAPA_BRASIL_ESTADOS_PATHS) as [
                    SiglaEstado,
                    string,
                  ][]
                ).map(([sigla, pathD]) => {
                  const estaSelecionado = sigla === estadoSelecionado;
                  const temDados = siglasComDados.has(sigla);
                  const qtdInstalacoes = mapaInstalacoesPorSigla.get(sigla) ?? 0;
                  const corEstado = temDados
                    ? obterCor(qtdInstalacoes)
                    : `url(#${gradientId}-land)`;

                  return (
                    <path
                      key={sigla}
                      d={pathD}
                      fill={corEstado}
                      stroke="#FFFFFF"
                      strokeWidth={estaSelecionado ? "2.5" : "1.2"}
                      strokeOpacity={estaSelecionado ? "1" : "0.55"}
                      strokeLinejoin="round"
                      className={
                        temDados
                          ? `transition-all duration-200 hover:brightness-125 cursor-pointer ${
                              estaSelecionado ? "brightness-110" : ""
                            }`
                          : "cursor-default select-none transition-colors duration-200"
                      }
                      onClick={
                        temDados ? () => selecionarEstado(sigla) : undefined
                      }
                      aria-label={
                        temDados
                          ? `Estado ${sigla} - ${qtdInstalacoes} ${
                              qtdInstalacoes === 1
                                ? "instalação"
                                : "instalações"
                            }`
                          : `Estado ${sigla} (sem dados cadastrados)`
                      }
                    />
                  );
                })}
              </g>

              {/* BULLETPOINTS VETORIAIS (MARCADORES DE INSTALAÇÃO) */}
              {marcadoresOrdenados.map((estado) => {
                const x = estado.coordenadas.x * 10;
                const y = estado.coordenadas.y * 10;
                const selecionado = estado.sigla === estadoSelecionado;
                const corEstado = obterCor(estado.instalacoes);

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
                    className="group cursor-pointer outline-none"
                  >
                    {/* HIT TARGET ESTÁVEL - NUNCA SE MOVE OU OSCILA NO HOVER */}
                    <circle
                      r={26}
                      fill="transparent"
                      className="pointer-events-auto"
                    />

                    {/* ELEMENTOS VISUAIS - ISOLADOS COM POINTER-EVENTS-NONE E ORIGEM CENTRADA */}
                    <g
                      className="pointer-events-none transition-transform duration-200 ease-out group-hover:scale-125"
                      style={{
                        transformBox: "fill-box",
                        transformOrigin: "center",
                      }}
                    >
                      {/* AURA */}
                      <circle
                        r={selecionado ? 42 : 28}
                        fill={corEstado}
                        opacity={selecionado ? 0.5 : 0.3}
                        filter={`url(#${gradientId}-shadow)`}
                        className="transition-opacity duration-200 group-hover:opacity-50"
                      />

                      {/* ANEL */}
                      <circle
                        r={selecionado ? 18 : 13}
                        fill={corEstado}
                        stroke="#FFFFFF"
                        strokeWidth={selecionado ? 3 : 2}
                        className="transition-[stroke-width] duration-200"
                      />

                      {/* CENTRO */}
                      <circle r={selecionado ? 7 : 5} fill="#FFFFFF" />
                    </g>

                    {/* IDENTIFICAÇÃO DA SIGLA (FORA DO GRUPO QUE ESCALA) */}
                    {selecionado && (
                      <text
                        y="-26"
                        textAnchor="middle"
                        fill="#FFFFFF"
                        fontSize="22"
                        fontWeight="bold"
                        filter="drop-shadow(0 2px 4px rgba(0,0,0,0.9))"
                        className="pointer-events-none select-none"
                      >
                        {estado.sigla}
                      </text>
                    )}
                  </g>
                );
              })}
            </svg>
          </div>

          {/* ESTADO SELECIONADO OU DICA DE SELEÇÃO */}
          {estadoAtual ? (
            <div className="rounded-xl border border-high/30 bg-high/10 p-4 transition-all">
              <div className="flex items-center justify-between gap-3">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold uppercase tracking-wider text-high">
                      Estado selecionado
                    </span>
                    <button
                      type="button"
                      onClick={limparSelecao}
                      className="text-[11px] text-slate-400 hover:text-white underline underline-offset-2 cursor-pointer"
                      title="Limpar seleção e voltar à visão geral de todos os estados"
                    >
                      (limpar seleção)
                    </button>
                  </div>

                  <h4 className="font-semibold text-white">
                    {estadoAtual.estado} ({estadoAtual.sigla})
                  </h4>
                  <p className="text-xs text-slate-400">
                    Capital: {estadoAtual.capital}
                  </p>
                </div>

                <div className="flex flex-col items-end gap-0.5 text-right">
                  <strong className="text-2xl text-high">
                    {estadoAtual.instalacoes}
                  </strong>
                  <p className="text-xs text-slate-400">
                    {estadoAtual.instalacoes === 1
                      ? "instalação"
                      : "instalações"}
                  </p>
                  <p className="text-xs text-high">
                    {estadoAtual.percentual.toFixed(1)}% do total
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3 rounded-xl border border-white/5 bg-slate-900/40 p-4 text-xs text-slate-400">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-high/15 text-high">
                <MapPin size={17} />
              </div>
              <p className="leading-relaxed">
                Clique em qualquer{" "}
                <strong className="text-slate-200">bullet point</strong> no mapa
                ou na lista ao lado para visualizar os dados detalhados e
                instalações daquele estado.
              </p>
            </div>
          )}
        </div>

        {/* LADO DIREITO: DINÂMICO ENTRE DETALHES DO ESTADO SELECIONADO E RANKING GERAL */}
        {estadoSelecionado && detalhesEstado ? (
          <DetalhesEstado
            key={detalhesEstado.sigla}
            dadosEstado={detalhesEstado}
            onVoltar={limparSelecao}
          />
        ) : (
          <div className="min-w-0 flex flex-col justify-between gap-6 animate-in fade-in-50 duration-300">
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <h3 className="text-sm font-semibold">
                  Instalações por estado
                </h3>
                <p className="text-xs text-slate-400">
                  Ranking por quantidade cadastrada
                </p>
              </div>

              <Info size={17} className="text-slate-500" />
            </div>

            {/* LISTA DE BARRAS PAGINADA (5 ITENS POR PÁGINA) COM ALTURA CONSTANTE */}
            <div className="flex flex-col justify-between min-h-[350px]">
              <div className="flex flex-col gap-4 min-h-[295px]">
                {estadosPaginados.map((estado) => {
                  const selecionado = estado.sigla === estadoSelecionado;
                  const largura = (estado.instalacoes / maiorValor) * 100;
                  const corEstado = obterCor(estado.instalacoes);

                  return (
                    <button
                      key={estado.sigla}
                      type="button"
                      onClick={() => selecionarEstado(estado.sigla)}
                      aria-pressed={selecionado}
                      className="group flex w-full flex-col gap-1.5 rounded-md text-left outline-none transition-all focus-visible:ring-2 focus-visible:ring-high cursor-pointer"
                    >
                      {/* INFORMAÇÕES */}
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-xs font-semibold transition-colors ${
                              selecionado ? "text-high" : "text-slate-300"
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
                            backgroundColor: corEstado,
                            opacity: selecionado ? 1 : 0.85,
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

              {/* PAGINAÇÃO (5 ITENS POR PÁGINA) */}
              <div className="flex items-center justify-between border-t border-white/5 pt-3 px-0.5 min-h-[38px]">
                <span className="text-[11px] text-slate-400">
                  Mostrando{" "}
                  <strong className="text-white">{inicioRanking + 1}</strong> a{" "}
                  <strong className="text-white">
                    {Math.min(fimRanking, estados.length)}
                  </strong>{" "}
                  de <strong className="text-white">{estados.length}</strong>{" "}
                  estados
                </span>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() =>
                      setPaginaRanking((p) => Math.max(1, p - 1))
                    }
                    disabled={
                      paginaRanking === 1 || totalPaginasRanking <= 1
                    }
                    className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-300 transition-colors hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-30 cursor-pointer"
                    aria-label="Página anterior"
                    title="Página anterior"
                  >
                    <ChevronLeft size={14} />
                  </button>

                  <div className="flex items-center gap-1">
                    {Array.from(
                      { length: Math.max(totalPaginasRanking, 1) },
                      (_, i) => i + 1,
                    ).map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => setPaginaRanking(num)}
                        disabled={totalPaginasRanking <= 1}
                        className={`flex h-7 min-w-7 items-center justify-center rounded-lg px-2 text-xs transition-colors ${
                          totalPaginasRanking <= 1
                            ? "cursor-default"
                            : "cursor-pointer"
                        } ${
                          paginaRanking === num
                            ? "bg-high/20 border border-high/60 text-high font-bold"
                            : "border border-white/10 bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white"
                        }`}
                        aria-label={`Ir para a página ${num}`}
                        aria-current={
                          paginaRanking === num ? "page" : undefined
                        }
                      >
                        {num}
                      </button>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      setPaginaRanking((p) =>
                        Math.min(totalPaginasRanking, p + 1),
                      )
                    }
                    disabled={
                      paginaRanking === totalPaginasRanking ||
                      totalPaginasRanking <= 1
                    }
                    className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-300 transition-colors hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-30 cursor-pointer"
                    aria-label="Próxima página"
                    title="Próxima página"
                  >
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            </div>

            {/* LEGENDA USANDO CONFIGURAÇÕES DE GLOBALS.CSS */}
            <div className="flex flex-col gap-3 border-t border-white/10 pt-4">
              <p className="text-xs font-medium text-slate-400">
                Concentração de instalações
              </p>

              <div className="flex flex-wrap gap-4">
                {[
                  {
                    cor: "var(--color-high, #84CC16)",
                    classeBg: "bg-high",
                    label: "Alta",
                    faixa: "5+ inst.",
                  },
                  {
                    cor: "var(--color-medium, #397F35)",
                    classeBg: "bg-medium",
                    label: "Média",
                    faixa: "2 a 4 inst.",
                  },
                  {
                    cor: "var(--color-low, #0A4542)",
                    classeBg: "bg-low",
                    label: "Baixa",
                    faixa: "1 inst.",
                  },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-2">
                    <span
                      className={`h-2.5 w-2.5 rounded-full ${item.classeBg}`}
                      style={{
                        backgroundColor: item.cor,
                      }}
                    />

                    <span className="text-xs text-slate-400">
                      {item.label}{" "}
                      <span className="text-[10px] text-slate-500">
                        ({item.faixa})
                      </span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

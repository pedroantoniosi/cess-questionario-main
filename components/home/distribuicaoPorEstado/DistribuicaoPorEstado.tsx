"use client";

import { Info, MapPin } from "lucide-react";
import { useId } from "react";

import { useDistribuicaoPorEstado } from "./hooks/useDistribuicaoPorEstado";

export default function DistribuicaoPorEstado() {
  const {
    titulo,
    descricao,
    estados,
    totalInstalacoes,
    estadoAtual,
    estadoSelecionado,
    selecionarEstado,
    obterCor,
  } = useDistribuicaoPorEstado();

  const gradientId = useId().replace(/:/g, "");

  const maiorValor = Math.max(
    ...estados.map((estado) => estado.instalacoes),
    1,
  );

  return (
    <section className="w-full overflow-hidden rounded-2xl border border-white/5 b p-5 text-white">
      {/* HEADER */}

      <header className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#0D9488]/20">
              <MapPin size={18} className="text-[#84CC16]" />
            </div>

            <h2 className="text-lg font-semibold">{titulo}</h2>
          </div>

          <p className="mt-2 text-sm text-slate-400">{descricao}</p>
        </div>

        <div className="rounded-xl border border-[#0D9488]/30 bg-[#0D9488]/10 px-4 py-2">
          <span className="block text-xs text-slate-400">
            Total de instalações
          </span>

          <strong className="text-xl text-[#84CC16]">{totalInstalacoes}</strong>
        </div>
      </header>

      {/* VISUALIZAÇÕES */}

      <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2">
        {/* MAPA */}

        <div className="relative min-w-0">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-sm font-semibold">Mapa de distribuição</h3>

            <span className="text-xs text-slate-500">Brasil</span>
          </div>

          <div className="relative mx-auto w-full max-w-[550px]">
            <svg
              viewBox="0 0 520 540"
              className="h-auto w-full overflow-visible"
              role="img"
              aria-label="Mapa ilustrativo do Brasil com marcadores das capitais dos estados cadastrados"
            >
              <defs>
                <linearGradient
                  id={`${gradientId}-land`}
                  x1="0"
                  y1="0"
                  x2="1"
                  y2="1"
                >
                  <stop offset="0%" stopColor="#0D9488" />
                  <stop offset="100%" stopColor="#065B55" />
                </linearGradient>

                <radialGradient id={`${gradientId}-glow`}>
                  <stop offset="0%" stopColor="#84CC16" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#84CC16" stopOpacity="0" />
                </radialGradient>

                <filter
                  id={`${gradientId}-shadow`}
                  x="-100%"
                  y="-100%"
                  width="300%"
                  height="300%"
                >
                  <feGaussianBlur stdDeviation="5" />
                </filter>

                <clipPath id={`${gradientId}-map-clip`}>
                  <path
                    d="
                    M 91 113
                    L 110 83
                    L 150 73
                    L 164 43
                    L 195 52
                    L 227 41
                    L 250 57
                    L 287 49
                    L 309 79
                    L 340 78
                    L 355 100
                    L 395 106
                    L 424 133
                    L 458 150
                    L 474 186
                    L 461 220
                    L 431 243
                    L 425 274
                    L 448 308
                    L 428 345
                    L 406 375
                    L 390 413
                    L 368 453
                    L 337 479
                    L 319 505
                    L 292 480
                    L 276 451
                    L 244 439
                    L 216 412
                    L 233 387
                    L 251 367
                    L 241 338
                    L 217 323
                    L 224 287
                    L 198 264
                    L 183 239
                    L 147 235
                    L 125 212
                    L 91 207
                    L 73 179
                    L 60 151
                    Z
                  "
                  />
                </clipPath>
              </defs>

              {/* BRILHO AMBIENTE */}

              <ellipse
                cx="330"
                cy="315"
                rx="170"
                ry="190"
                fill={`url(#${gradientId}-glow)`}
                opacity="0.15"
              />

              {/* TERRITÓRIO BRASILEIRO */}

              <path
                d="
                  M 91 113
                  L 110 83
                  L 150 73
                  L 164 43
                  L 195 52
                  L 227 41
                  L 250 57
                  L 287 49
                  L 309 79
                  L 340 78
                  L 355 100
                  L 395 106
                  L 424 133
                  L 458 150
                  L 474 186
                  L 461 220
                  L 431 243
                  L 425 274
                  L 448 308
                  L 428 345
                  L 406 375
                  L 390 413
                  L 368 453
                  L 337 479
                  L 319 505
                  L 292 480
                  L 276 451
                  L 244 439
                  L 216 412
                  L 233 387
                  L 251 367
                  L 241 338
                  L 217 323
                  L 224 287
                  L 198 264
                  L 183 239
                  L 147 235
                  L 125 212
                  L 91 207
                  L 73 179
                  L 60 151
                  Z
                "
                fill={`url(#${gradientId}-land)`}
                stroke="#4FD6B5"
                strokeWidth="1.5"
              />

              {/* DIVISÕES INTERNAS ILUSTRATIVAS */}

              <g
                clipPath={`url(#${gradientId}-map-clip)`}
                fill="none"
                stroke="#62C7B0"
                strokeWidth="1"
                opacity="0.55"
              >
                <path d="M 130 50 L 143 145 L 185 210 L 180 280" />
                <path d="M 190 45 L 200 115 L 250 160 L 237 245" />
                <path d="M 250 50 L 278 110 L 260 175 L 290 230" />
                <path d="M 310 75 L 320 140 L 350 180 L 330 240" />
                <path d="M 380 100 L 370 165 L 400 220 L 390 280" />
                <path d="M 440 135 L 420 195 L 435 245" />
                <path d="M 70 170 L 150 165 L 210 180 L 280 190" />
                <path d="M 115 215 L 180 225 L 240 260 L 300 250" />
                <path d="M 210 285 L 270 300 L 330 285 L 420 310" />
                <path d="M 240 350 L 300 345 L 370 360 L 420 340" />
                <path d="M 235 405 L 290 390 L 360 410" />
                <path d="M 270 455 L 320 435 L 390 440" />
                <path d="M 350 110 L 400 135 L 455 160" />
              </g>

              {/* PONTOS DE INSTALAÇÃO */}

              {estados.map((estado) => {
                const x = (estado.coordenadas.x / 100) * 520;
                const y = (estado.coordenadas.y / 100) * 540;

                const selecionado = estado.sigla === estadoSelecionado;

                return (
                  <g
                    key={estado.sigla}
                    transform={`translate(${x}, ${y})`}
                    onClick={() => selecionarEstado(estado.sigla)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        selecionarEstado(estado.sigla);
                      }
                    }}
                    tabIndex={0}
                    role="button"
                    aria-label={`${estado.estado}, ${estado.instalacoes} instalações`}
                    className="cursor-pointer outline-none"
                  >
                    <title>
                      {estado.estado} - {estado.capital} - {estado.instalacoes}{" "}
                      instalações
                    </title>

                    {/* AURA */}

                    <circle
                      r={selecionado ? 25 : 18}
                      fill="#0D9488"
                      opacity={selecionado ? 0.3 : 0.15}
                      filter={`url(#${gradientId}-shadow)`}
                    />

                    {/* ANEL */}

                    <circle
                      r={selecionado ? 11 : 8}
                      fill="#0D9488"
                      stroke="#84CC16"
                      strokeWidth={selecionado ? 2 : 1}
                    />

                    {/* CENTRO */}

                    <circle r={selecionado ? 5 : 3.5} fill="#FFFFFF" />

                    {/* IDENTIFICAÇÃO */}

                    {selecionado && (
                      <text
                        y="-19"
                        textAnchor="middle"
                        fill="#84CC16"
                        fontSize="11"
                        fontWeight="bold"
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
            <div className="mt-3 rounded-xl border border-[#0D9488]/30 bg-[#0D9488]/10 p-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <span className="text-xs text-slate-400">
                    Estado selecionado
                  </span>

                  <h4 className="mt-1 font-semibold">{estadoAtual.estado}</h4>

                  <p className="mt-1 text-xs text-slate-400">
                    Capital: {estadoAtual.capital}
                  </p>
                </div>

                <div className="text-right">
                  <strong className="text-2xl text-[#84CC16]">
                    {estadoAtual.instalacoes}
                  </strong>

                  <p className="text-xs text-slate-400">instalações</p>

                  <p className="mt-1 text-xs text-[#84CC16]">
                    {estadoAtual.percentual.toFixed(1)}%
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* GRÁFICO DE BARRAS */}

        <div className="min-w-0">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold">Instalações por estado</h3>

              <p className="mt-1 text-xs text-slate-400">
                Ranking por quantidade cadastrada
              </p>
            </div>

            <Info size={17} className="text-slate-500" />
          </div>

          <div className="space-y-4">
            {estados.map((estado, index) => {
              const selecionado = estado.sigla === estadoSelecionado;

              const largura = (estado.instalacoes / maiorValor) * 100;

              return (
                <button
                  key={estado.sigla}
                  type="button"
                  onClick={() => selecionarEstado(estado.sigla)}
                  aria-pressed={selecionado}
                  className="group w-full rounded-md text-left outline-none transition-all focus-visible:ring-2 focus-visible:ring-[#84CC16]"
                >
                  {/* INFORMAÇÕES */}

                  <div className="mb-2 flex items-center justify-between gap-3">
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

                  <div className="mt-1 flex justify-end">
                    <span className="text-[10px] text-slate-500">
                      {estado.percentual.toFixed(1)}%
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* LEGENDA */}

          <div className="mt-8 border-t border-white/10 pt-5">
            <p className="mb-3 text-xs font-medium text-slate-400">
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

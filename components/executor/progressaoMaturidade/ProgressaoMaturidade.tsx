"use client";

import { ArrowLeftRight } from "lucide-react";
import Header from "@/components/ui/Header";

import { useProgressaoMaturidade } from "./hooks/useProgressaoMaturidade";
import type { ProgressaoMaturidadeProps } from "./types";



const COR_ANO_1 = "#0D9488";
const COR_ANO_2 = "#84CC16";


export default function ProgressaoMaturidade({
  dados: dadosExternos,
}: ProgressaoMaturidadeProps) {
  const {
    ano1,
    setAno1,
    ano2,
    setAno2,
    anosDisponiveis,
    nivelAno1,
    nivelAno2,
    inverterAnos,
  } = useProgressaoMaturidade({
    dados: dadosExternos,
  });

  const nivelValidoAno1 = nivelAno1 ?? 0;
  const nivelValidoAno2 = nivelAno2 ?? 0;


  const centro = 180;
  const raio = 115;
  const totalLados = 6;
  const totalNiveis = 5;

  // Calcula a posição de cada vértice do hexágono
  function obterPonto(indice: number, nivel: number) {
    const angulo =
      (Math.PI * 2 * indice) / totalLados - Math.PI / 2;

    const distancia = (nivel / totalNiveis) * raio;

    return {
      x: centro + Math.cos(angulo) * distancia,
      y: centro + Math.sin(angulo) * distancia,
    };
  }

  // Monta os seis vértices de um hexágono
  function obterPoligono(nivel: number) {
    return Array.from({ length: totalLados }, (_, indice) => {
      const ponto = obterPonto(indice, nivel);

      return `${ponto.x},${ponto.y}`;
    }).join(" ");
  }

  return (
    <section className="flex h-full w-full flex-col gap-1 text-white">

        <Header title="Progressão de Maturidade" text="Comparação entre anos selecionados" icon={<ArrowLeftRight size={20} />} />
        

      {/* SELETORES DE ANOS */}
      <div className="flex flex-wrap items-center justify-center gap-2">


        {/* Ano 1 */}
        <label className="flex items-center gap-1 text-[11px] text-slate-300">
          Ano 1

          <div className="flex items-center gap-1 rounded-md border border-[#0D9488] bg-template px-1.5 py-0.5">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#0D9488]" />

            <select
              value={ano1}
              onChange={(e) => setAno1(Number(e.target.value))}
              className="cursor-pointer bg-transparent text-[11px] font-semibold text-[#0D9488] outline-none"
              aria-label="Selecionar primeiro ano"
            >
              {anosDisponiveis.map((ano) => (
                <option
                  key={ano}
                  value={ano}
                  className="bg-template text-white"
                >
                  {ano}
                </option>
              ))}
            </select>
          </div>
        </label>

        {/* Inverter anos */}
        <button
          type="button"
          onClick={inverterAnos}
          className="cursor-pointer rounded-md p-1 text-slate-400 transition-colors hover:bg-white/5 hover:text-white"
          aria-label="Inverter anos selecionados"
          title="Inverter anos"
        >
          <ArrowLeftRight size={14} />
        </button>

        {/* Ano 2 */}
        <label className="flex items-center gap-1 text-[11px] text-slate-300">
          Ano 2

          <div className="flex items-center gap-1 rounded-md border border-[#84CC16] bg-template px-1.5 py-0.5">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#84CC16]" />

            <select
              value={ano2}
              onChange={(e) => setAno2(Number(e.target.value))}
              className="cursor-pointer bg-transparent text-[11px] font-semibold text-[#84CC16] outline-none"
              aria-label="Selecionar segundo ano"
            >
              {anosDisponiveis.map((ano) => (
                <option
                  key={ano}
                  value={ano}
                  className="bg-template text-white"
                >
                  {ano}
                </option>
              ))}
            </select>
          </div>
        </label>
      </div>

      {/* GRÁFICO HEXAGONAL */}
      <div className="relative flex flex-1 flex-col items-center justify-center gap-1">

        {/* NÍVEIS DOS ANOS SELECIONADOS */}
        <div className="flex w-full items-center justify-center gap-25">

        {/* Nível do Ano 1 */}
        <div className="flex flex-col items-center gap-1">
            <span className="text-[11px] text-slate-400">
            {ano1}
            </span>

            <span className="text-2xl font-bold text-[#0D9488]">
            N{nivelAno1}
            </span>
        </div>

        {/* Nível do Ano 2 */}
        <div className="flex flex-col items-center gap-1">
            <span className="text-[11px] text-slate-400">
            {ano2}
            </span>

            <span className="text-2xl font-bold text-[#84CC16]">
            N{nivelAno2}
            </span>
        </div>

        </div>

        <svg
          viewBox="0 0 360 360"
          className="h-auto w-full max-w-[340px]"
          role="img"
          aria-label={`Comparação de maturidade: ${ano1}, nível ${nivelAno1}; ${ano2}, nível ${nivelAno2}`}
        >

          {/* Cinco hexágonos de referência */}
          {Array.from(
            { length: totalNiveis },
            (_, indice) => indice + 1
          ).map((nivel) => (
            <polygon
              key={nivel}
              points={obterPoligono(nivel)}
              fill="none"
              stroke={nivel === 5 ? "#5A5F79" : "#454758"}
              strokeWidth={nivel === 5 ? 2 : 1}
            />
          ))}

          {/* Seis eixos */}
          {Array.from({ length: totalLados }, (_, indice) => {
            const ponto = obterPonto(indice, totalNiveis);

            return (
              <line
                key={indice}
                x1={centro}
                y1={centro}
                x2={ponto.x}
                y2={ponto.y}
                stroke="#454758"
                strokeWidth="1"
              />
            );
          })}

          {/* Maturidade do Ano 1 */}
          <polygon
            points={obterPoligono(nivelValidoAno1)}
            fill={COR_ANO_1}
            fillOpacity="0.12"
            stroke={COR_ANO_1}
            strokeWidth="2.5"
            strokeLinejoin="round"
          />

          {/* Maturidade do Ano 2 */}
          <polygon
            points={obterPoligono(nivelValidoAno2)}
            fill={COR_ANO_2}
            fillOpacity="0.12"
            stroke={COR_ANO_2}
            strokeWidth="2.5"
            strokeLinejoin="round"
          />

          {/* Números dos níveis */}
          {[1, 2, 3, 4, 5].map((nivel) => {
            const ponto = obterPonto(0, nivel);

            return (
              <text
                key={nivel}
                x={ponto.x + 9}
                y={ponto.y + 12}
                fill="#CBD5E1"
                fontSize="10"
                textAnchor="middle"
              >
                {nivel}
              </text>
            );
          })}

        </svg>

        {/* INDICAÇÃO DOS NÍVEIS */}
        <p className="text-center text-[11px] text-slate-400">
          Nível 1 — Menor maturidade | Nível 5 — Maior maturidade
        </p>

      </div>
    </section>
  );
}

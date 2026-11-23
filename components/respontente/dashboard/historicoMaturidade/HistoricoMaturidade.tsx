"use client";

import { ChevronDown, History } from "lucide-react";

import Card from "@/components/ui/Card";

import { estiloEtiquetaNivel } from "./historicoMaturidadeData";
import { useHistoricoMaturidade } from "./hooks/useHistoricoMaturidade";
import RadarNiveis from "./RadarNiveis";
import { HistoricoMaturidadeProps } from "./types";

const TITULO_SECAO =
  "text-xs font-extrabold uppercase tracking-wider text-white";
const CAIXA = "rounded-xl border border-white/10 bg-template";

export default function HistoricoMaturidade({
  dados,
  rodadaId,
  onSelecionarRodada,
  className = "",
}: HistoricoMaturidadeProps) {
  const {
    titulo,
    descricao,
    rodape,
    nivelMaximo,
    rodadas,
    rodadaAtual,
    nivelAtual,
    selecionarRodada,
    rotuloNivel,
  } = useHistoricoMaturidade(dados, {
    rodadaId,
    onSelecionar: onSelecionarRodada,
  });

  const periodo = rodadaAtual?.periodo;

  return (
    <Card className={`gap-6 p-5 text-white ${className}`}>
      {/* CABEÇALHO (nome dentro do card) */}
      <header className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-(--color-high)/30 bg-(--color-high)/10 text-(--color-high)">
          <History size={20} aria-hidden="true" />
        </div>

        <div className="flex min-w-0 flex-col">
          <h2 className="text-lg font-bold leading-tight">{titulo}</h2>
          <p className="text-sm text-gray-400">{descricao}</p>
        </div>
      </header>

      {/* RODADAS · EVOLUÇÃO · RESUMO */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(260px,1.3fr)_minmax(0,1fr)]">
        {/* Rodadas */}
        <section
          className="flex min-w-0 flex-col gap-3"
          aria-label="Rodadas"
        >
          <h3 className={TITULO_SECAO}>
            <label htmlFor="historico-maturidade-rodada">
              Rodadas
            </label>
          </h3>

          {rodadas.length === 0 ? (
            <p className="text-sm text-gray-400">Sem histórico de rodadas.</p>
          ) : (
            <div className="relative">
              <select
                id="historico-maturidade-rodada"
                value={rodadaAtual?.id ?? ""}
                onChange={(evento) => {
                  const escolhida = rodadas.find(
                    (rodada) => String(rodada.id) === evento.target.value,
                  );
                  if (escolhida) selecionarRodada(escolhida.id);
                }}
                className="w-full cursor-pointer appearance-none rounded-xl border border-white/10 bg-template py-3 pl-3 pr-10 text-sm font-bold text-white outline-none transition-colors hover:border-white/25 focus-visible:border-(--color-high)/60 focus-visible:ring-2 focus-visible:ring-(--color-high)"
              >
                {rodadas.map((rodada) => (
                  <option
                    key={rodada.id}
                    value={rodada.id}
                    className="bg-template text-white"
                  >
                    {rodada.periodo} — {rotuloNivel(rodada.nivel)}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={18}
                aria-hidden="true"
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
            </div>
          )}
        </section>

        {/* Evolução por nível */}
        <section
          className="flex min-w-0 flex-col gap-3"
          aria-label="Evolução por nível"
        >
          <h3 className={TITULO_SECAO}>
            {periodo ? `Evolução por nível — ${periodo}` : "Evolução por nível"}
          </h3>

          <div
            className={`${CAIXA} flex min-h-64 items-center justify-center p-4`}
          >
            <RadarNiveis
              blocos={rodadaAtual?.blocos ?? []}
              nivelMaximo={nivelMaximo}
              titulo={`Gráfico de níveis — ${periodo ?? ""}`}
            />
          </div>
        </section>

        {/* Resumo */}
        <section className="flex min-w-0 flex-col gap-3" aria-label="Resumo">
          <h3 className={TITULO_SECAO}>
            {periodo ? `Resumo — ${periodo}` : "Resumo"}
          </h3>

          <div className={`${CAIXA} flex items-center justify-between gap-3 p-3`}>
            <span className="text-xs font-semibold text-gray-400">
              Nível alcançado
            </span>

            {nivelAtual ? (
              <span
                className="whitespace-nowrap rounded-full px-3 py-1 text-xs font-extrabold"
                style={estiloEtiquetaNivel(nivelAtual.codigo)}
              >
                {nivelAtual.codigo} · {nivelAtual.descricao}
              </span>
            ) : (
              <span className="text-xs font-semibold text-gray-400">
                Aguardando
              </span>
            )}
          </div>

          {!nivelAtual && (
            <p className="text-sm text-gray-400">
              O nível aparece depois que a rodada é encerrada e avaliada.
            </p>
          )}
        </section>
      </div>

      {/* RODAPÉ */}
      {rodape && (
        <p className="border-t border-white/10 pt-4 text-sm text-gray-400">
          {rodape}
        </p>
      )}
    </Card>
  );
}

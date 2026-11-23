"use client";

import Link from "next/link";
import {
  Activity,
  CalendarDays,
  ChevronRight,
  ListChecks,
  MessageCircle,
  Repeat,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";

import { rotaPerguntas } from "./responder/hooks/useResponderQuestionario";
import { RodadaQuestionario } from "./types";

interface RodadaQuestionarioLinhaProps {
  rodada: RodadaQuestionario;
  /** Chamado ao abrir as perguntas (clique na linha). */
  onAbrir?: () => void;
}

const ETIQUETA_STATUS = {
  aberta: { rotulo: "Aberta", classe: "bg-(--color-high)/15 text-(--color-high)" },
  encerrada: { rotulo: "Encerrada", classe: "bg-(--color-low)/60 text-white" },
} as const;

/** Mesmas colunas no cabeçalho e na linha, para ficarem alinhados. */
const COLUNAS =
  "grid grid-cols-[minmax(0,2fr)_120px_110px_110px_150px_90px_110px_100px_70px] items-center gap-4 px-5";

const COLUNAS_CABECALHO: { rotulo: string; icone?: LucideIcon; direita?: boolean }[] =
  [
    { rotulo: "Título", icone: Repeat },
    { rotulo: "Status", icone: Activity },
    { rotulo: "Início", icone: CalendarDays },
    { rotulo: "Fim", icone: CalendarDays },
    { rotulo: "Conclusão", icone: TrendingUp },
    { rotulo: "Questões", icone: ListChecks },
    { rotulo: "Submissões", icone: Activity },
    { rotulo: "Respostas", icone: MessageCircle },
    { rotulo: "Ações", direita: true },
  ];

/**
 * Rodada do questionário no formato da tela de rodadas do executor:
 * um cabeçalho de colunas e, separada dele, a linha da rodada. A linha
 * inteira é clicável e abre as perguntas, em um único grupo paginado.
 */
export default function RodadaQuestionarioLinha({
  rodada,
  onAbrir,
}: RodadaQuestionarioLinhaProps) {
  const status = ETIQUETA_STATUS[rodada.status];

  const conteudo = (
    <>
      <span className="truncate font-medium text-gray-100">{rodada.titulo}</span>

      <span>
        <span
          className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${status.classe}`}
        >
          {status.rotulo}
        </span>
      </span>

      <span className="whitespace-nowrap text-gray-300">{rodada.inicio}</span>
      <span className="whitespace-nowrap text-gray-300">{rodada.fim}</span>

      <span className="flex items-center gap-2">
        <span
          className="h-2 w-20 overflow-hidden rounded-full bg-white/10"
          role="progressbar"
          aria-label="Conclusão do questionário"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={rodada.percentual}
        >
          <span
            className="block h-full rounded-full bg-(--color-high)"
            style={{ width: `${rodada.percentual}%` }}
          />
        </span>
        <span className="whitespace-nowrap text-xs text-gray-400">
          {rodada.percentual}%
        </span>
      </span>

      <span className="text-gray-300">{rodada.totalQuestoes.toLocaleString("pt-BR")}</span>
      <span className="text-gray-300">{rodada.submissoes}</span>
      <span className="text-gray-300">
        {rodada.respostas.toLocaleString("pt-BR")}
      </span>

      <span className="flex justify-end text-gray-400">
        <ChevronRight size={18} aria-hidden="true" />
      </span>
    </>
  );

  return (
    <section aria-label="Rodada do questionário" className="overflow-x-auto">
      <div className="flex min-w-[980px] flex-col gap-2 text-white">
        {/* CABEÇALHO DAS COLUNAS */}
        <div
          className={`${COLUNAS} rounded-xl border border-white/10 bg-white/5 py-3 text-xs font-medium text-gray-400`}
          role="presentation"
        >
          {COLUNAS_CABECALHO.map(({ rotulo, icone: Icone, direita }) => (
            <span
              key={rotulo}
              className={`flex items-center gap-2 ${direita ? "justify-end" : ""}`}
            >
              {Icone && <Icone size={14} aria-hidden="true" />}
              {rotulo}
            </span>
          ))}
        </div>

        {/* LINHA DA RODADA: clicável, abre as perguntas */}
        <Link
          href={rotaPerguntas(rodada.id)}
          onClick={() => onAbrir?.()}
          aria-label={`Abrir as perguntas de ${rodada.titulo}`}
          className={`${COLUNAS} rounded-xl border border-white/10 bg-card py-4 text-sm outline-none transition-colors hover:bg-white/5 focus-visible:ring-2 focus-visible:ring-(--color-high)`}
        >
          {conteudo}
        </Link>
      </div>
    </section>
  );
}

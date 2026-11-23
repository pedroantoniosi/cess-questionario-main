"use client";

import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  ListChecks,
  RotateCcw,
  Save,
} from "lucide-react";
import Link from "next/link";
import { useRef } from "react";

import Card from "@/components/ui/Card";

import {
  MAXIMO_POR_PAGINA,
  ROTA_QUESTIONARIO,
  useResponderQuestionario,
} from "./hooks/useResponderQuestionario";
import QuestaoCampo from "./QuestaoCampo";
import { ResponderQuestionarioProps } from "./types";

const LINK_NAVEGACAO =
  "inline-flex min-h-10 items-center gap-2 rounded-lg border border-white/20 px-4 text-sm font-bold text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-high) disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-transparent";

/** Páginas exibidas na paginação: a atual e as vizinhas, com a primeira e a última. */
function paginasVisiveis(atual: number, total: number): (number | "…")[] {
  const numeros = new Set([1, total, atual - 1, atual, atual + 1]);
  const ordenados = [...numeros]
    .filter((n) => n >= 1 && n <= total)
    .sort((a, b) => a - b);

  const lista: (number | "…")[] = [];
  ordenados.forEach((numero, indice) => {
    if (indice > 0 && numero - ordenados[indice - 1] > 1) lista.push("…");
    lista.push(numero);
  });
  return lista;
}

/** Página de responder o questionário: um grupo único de perguntas, paginado. */
export default function ResponderQuestionario({
  rodadaId,
  dados,
  porPagina = MAXIMO_POR_PAGINA,
  className = "",
}: ResponderQuestionarioProps) {
  const {
    rodada,
    questoes,
    questoesDaPagina,
    pagina,
    totalPaginas,
    irParaPagina,
    primeiraDaPagina,
    ultimaDaPagina,
    obrigatorias,
    respondidas,
    respostaDe,
    responder,
    somenteLeitura,
    alteradas,
    descartarEdicoes,
  } = useResponderQuestionario(rodadaId, dados, porPagina);

  const topoRef = useRef<HTMLDivElement>(null);

  const trocarPagina = (numero: number) => {
    irParaPagina(numero);
    topoRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const navegacao = totalPaginas > 1 && (
    <nav
      aria-label="Paginação das perguntas"
      className="flex flex-wrap items-center justify-between gap-3"
    >
      <span className="text-sm text-gray-400">
        Exibindo {primeiraDaPagina}–{ultimaDaPagina} de {questoes.length}
      </span>

      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => trocarPagina(pagina - 1)}
          disabled={pagina === 1}
          className={LINK_NAVEGACAO}
        >
          <ChevronLeft size={16} aria-hidden="true" />
          Anterior
        </button>

        {paginasVisiveis(pagina, totalPaginas).map((item, indice) =>
          item === "…" ? (
            <span key={`reticencias-${indice}`} className="px-1 text-gray-400">
              …
            </span>
          ) : (
            <button
              key={item}
              type="button"
              onClick={() => trocarPagina(item)}
              aria-current={item === pagina ? "page" : undefined}
              aria-label={`Página ${item}`}
              className={`inline-flex min-h-10 min-w-10 items-center justify-center rounded-lg border px-3 text-sm font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-high) ${
                item === pagina
                  ? "border-(--color-high) bg-(--color-medium) text-white"
                  : "border-white/20 text-white hover:bg-white/10"
              }`}
            >
              {item}
            </button>
          ),
        )}

        <button
          type="button"
          onClick={() => trocarPagina(pagina + 1)}
          disabled={pagina === totalPaginas}
          className={LINK_NAVEGACAO}
        >
          Próxima
          <ChevronRight size={16} aria-hidden="true" />
        </button>
      </div>
    </nav>
  );

  return (
    <div className={`flex min-w-0 flex-col gap-5 ${className}`}>
      <Link href={ROTA_QUESTIONARIO} className={`${LINK_NAVEGACAO} self-start`}>
        <ArrowLeft size={16} aria-hidden="true" />
        Voltar ao questionário
      </Link>

      {/* QUESTÕES */}
      <Card className="gap-4 border border-white/10 p-4 text-white">
        <div ref={topoRef} className="scroll-mt-20" />

        <header className="flex items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-(--color-high)/30 bg-(--color-high)/10 text-(--color-high)">
            <ListChecks size={18} aria-hidden="true" />
          </div>

          <div className="flex min-w-0 flex-col">
            <h1 className="text-lg font-bold leading-tight">
              Perguntas — {rodada.titulo}
            </h1>
            <p className="text-sm text-gray-400">
              {questoes.length} pergunta(s) · {obrigatorias} obrigatória(s)
              {totalPaginas > 1 && ` · página ${pagina} de ${totalPaginas}`}
            </p>
          </div>
        </header>

        {somenteLeitura && (
          <p className="text-sm text-gray-400" role="status">
            Rodada encerrada: as respostas estão disponíveis apenas para
            consulta.
          </p>
        )}

        {questoes.length === 0 ? (
          <p className="text-sm text-gray-400">
            Este questionário ainda não tem questões cadastradas.
          </p>
        ) : (
          <form
            className="flex flex-col gap-4"
            onSubmit={(evento) => evento.preventDefault()}
          >
            {questoesDaPagina.map((questao) => (
              <QuestaoCampo
                key={questao.id}
                questao={questao}
                resposta={respostaDe(questao.id)}
                somenteLeitura={somenteLeitura}
                onResponder={(resposta) => responder(questao.id, resposta)}
              />
            ))}
          </form>
        )}
      </Card>

      {/* PAGINAÇÃO */}
      {navegacao}

      {/* SALVAMENTO */}
      {!somenteLeitura && questoes.length > 0 && (
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/10 bg-card px-4 py-3 text-sm">
          <p role="status" className="flex items-center gap-2 text-gray-300">
            <Save
              size={16}
              className="shrink-0 text-(--color-high)"
              aria-hidden="true"
            />
            <span>
              {respondidas} de {questoes.length} respondida(s).{" "}
              {alteradas > 0
                ? `${alteradas} alteração(ões) salva(s) automaticamente neste navegador.`
                : "As alterações são salvas automaticamente neste navegador."}
            </span>
          </p>

          <button
            type="button"
            onClick={descartarEdicoes}
            disabled={alteradas === 0}
            className={LINK_NAVEGACAO}
          >
            <RotateCcw size={16} aria-hidden="true" />
            Desfazer alterações
          </button>
        </div>
      )}
    </div>
  );
}

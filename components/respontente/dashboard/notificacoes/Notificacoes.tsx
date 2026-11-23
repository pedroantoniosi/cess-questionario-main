import Link from "next/link";
import { ArrowRight, Bell, Info, TriangleAlert } from "lucide-react";

import Card from "@/components/ui/Card";

import CardCabecalho from "../../shared/CardCabecalho";
import { mockNotificacoes } from "./notificacoesData";
import { NotificacoesProps, TipoNotificacao } from "./types";

const VISUAL_TIPO: Record<
  TipoNotificacao,
  { icone: typeof Info; rotulo: string; caixa: string; etiqueta: string }
> = {
  aviso: {
    icone: TriangleAlert,
    rotulo: "Aviso",
    caixa: "border-(--color-high)/30 bg-(--color-high)/10 text-(--color-high)",
    etiqueta:
      "border-(--color-high)/30 bg-(--color-high)/15 text-(--color-high)",
  },
  notificacao: {
    icone: Info,
    rotulo: "Notificação",
    caixa: "border-white/15 bg-white/5 text-gray-300",
    etiqueta: "border-white/15 bg-white/5 text-gray-300",
  },
};

/** Card do dashboard: notificações e avisos do sistema. */
export default function Notificacoes({
  dados,
  className = "",
}: NotificacoesProps) {
  // Merge dos dados recebidos via props com o mock padrão
  const titulo = dados?.titulo ?? mockNotificacoes.titulo;
  const descricao = dados?.descricao ?? mockNotificacoes.descricao;
  const itens = dados?.itens ?? mockNotificacoes.itens;

  const avisos = itens.filter((item) => item.tipo === "aviso").length;

  return (
    <Card className={`gap-5 p-5 text-white ${className}`}>
      <CardCabecalho
        titulo={titulo}
        descricao={descricao}
        icone={<Bell size={20} aria-hidden="true" />}
        acao={
          <span className="shrink-0 whitespace-nowrap rounded-md border border-white/15 px-2.5 py-0.5 text-xs font-semibold text-gray-200">
            {avisos} {avisos === 1 ? "aviso" : "avisos"}
          </span>
        }
      />

      {itens.length === 0 ? (
        <p className="py-6 text-center text-sm text-gray-400">
          Nenhuma notificação no momento.
        </p>
      ) : (
        <ul className="flex flex-col gap-3">
          {itens.map((item) => {
            const visual = VISUAL_TIPO[item.tipo];
            const TipoIcon = visual.icone;

            return (
              <li
                key={item.id}
                className="flex items-start gap-3 rounded-xl border border-white/10 bg-template p-4"
              >
                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border ${visual.caixa}`}
                >
                  <TipoIcon size={16} aria-hidden="true" />
                </span>

                <div className="flex min-w-0 flex-1 flex-col gap-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-bold">{item.titulo}</span>
                    <span
                      className={`rounded-full border px-2 py-0.5 text-[11px] font-semibold ${visual.etiqueta}`}
                    >
                      {visual.rotulo}
                    </span>
                    <span className="ml-auto text-xs tabular-nums text-gray-400">
                      {item.data}
                    </span>
                  </div>

                  <p className="text-sm text-gray-300">{item.texto}</p>

                  {item.acao && (
                    <Link
                      href={item.acao.href}
                      className="mt-1 flex w-fit items-center gap-1 rounded text-xs font-semibold text-(--color-high) outline-none hover:underline focus-visible:ring-2 focus-visible:ring-(--color-high)"
                    >
                      {item.acao.rotulo}
                      <ArrowRight size={14} aria-hidden="true" />
                    </Link>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </Card>
  );
}

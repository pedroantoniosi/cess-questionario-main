import { Clock, Palette, SlidersHorizontal, UserRound } from "lucide-react";
import type { ReactNode } from "react";

import Card from "@/components/ui/Card";

import CardCabecalho from "../shared/CardCabecalho";
import { UsuarioRespondente } from "../shared/usuarioData";
import {
  GRUPO_BARRA_LATERAL,
  GRUPO_MODO_COMPACTO,
  GRUPO_TEMA,
} from "./configuracoesData";
import { Preferencias, SessaoAtual } from "./types";

interface ResumoConfiguracoesProps {
  usuario: UsuarioRespondente;
  sessao: SessaoAtual;
  /** Preferências em edição (o resumo acompanha o que está selecionado). */
  preferencias: Preferencias;
  /** Data e hora do último salvamento; null se ainda não salvou. */
  salvasEm: string | null;
}

interface GrupoResumoProps {
  titulo: string;
  icone: ReactNode;
  itens: { rotulo: string; valor: string }[];
}

/** Rótulo da opção selecionada, ex.: "escuro" → "Escuro". */
const rotuloDe = <Valor extends string>(
  opcoes: { valor: Valor; rotulo: string }[],
  valor: Valor,
) => opcoes.find((opcao) => opcao.valor === valor)?.rotulo ?? valor;

function GrupoResumo({ titulo, icone, itens }: GrupoResumoProps) {
  return (
    <section className="flex min-w-0 items-start gap-3 rounded-xl border border-white/10 bg-template p-4">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-(--color-high)/30 bg-(--color-high)/10 text-(--color-high)">
        {icone}
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
        <h3 className="text-sm font-bold">{titulo}</h3>

        <dl className="flex flex-col gap-1 text-sm">
          {itens.map((item) => (
            <div key={item.rotulo} className="flex flex-wrap gap-x-1.5">
              <dt className="text-gray-400">{item.rotulo}:</dt>
              <dd className="min-w-0 break-words text-gray-200">
                {item.valor}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

/** Card maior: como a conta e a interface estão definidas. */
export default function ResumoConfiguracoes({
  usuario,
  sessao,
  preferencias,
  salvasEm,
}: ResumoConfiguracoesProps) {
  return (
    <Card className="gap-5 border border-white/10 p-5 text-white">
      <CardCabecalho
        titulo="Resumo das configurações"
        descricao="Como sua conta e a interface estão definidas."
        icone={<SlidersHorizontal size={20} aria-hidden="true" />}
      />

      <div className="grid gap-4 lg:grid-cols-3">
        <GrupoResumo
          titulo="Aparência"
          icone={<Palette size={16} aria-hidden="true" />}
          itens={[
            {
              rotulo: GRUPO_TEMA.titulo,
              valor: rotuloDe(GRUPO_TEMA.opcoes, preferencias.tema),
            },
            {
              rotulo: GRUPO_BARRA_LATERAL.titulo,
              valor: rotuloDe(
                GRUPO_BARRA_LATERAL.opcoes,
                preferencias.barraLateral,
              ),
            },
            {
              rotulo: GRUPO_MODO_COMPACTO.titulo,
              valor: rotuloDe(
                GRUPO_MODO_COMPACTO.opcoes,
                preferencias.modoCompacto,
              ),
            },
          ]}
        />

        <GrupoResumo
          titulo="Conta"
          icone={<UserRound size={16} aria-hidden="true" />}
          itens={[
            { rotulo: "Perfil", valor: usuario.perfil },
            { rotulo: "Instalação", valor: usuario.instalacao },
            { rotulo: "E-mail", valor: usuario.email },
          ]}
        />

        <GrupoResumo
          titulo="Sessão"
          icone={<Clock size={16} aria-hidden="true" />}
          itens={[
            { rotulo: "Início", valor: sessao.desde },
            { rotulo: "Última atividade", valor: sessao.ultimaAtividade },
          ]}
        />
      </div>

      <p className="border-t border-white/10 pt-4 text-sm text-gray-400">
        Preferências salvas em: {salvasEm ?? "—"}
      </p>
    </Card>
  );
}

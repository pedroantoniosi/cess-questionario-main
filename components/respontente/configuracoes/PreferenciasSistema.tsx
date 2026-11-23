import { SlidersHorizontal } from "lucide-react";

import Card from "@/components/ui/Card";

import CardCabecalho from "../shared/CardCabecalho";
import {
  GRUPO_BARRA_LATERAL,
  GRUPO_MODO_COMPACTO,
  GRUPO_TEMA,
} from "./configuracoesData";
import { GrupoPreferencia, Preferencias } from "./types";

interface PreferenciasSistemaProps {
  preferencias: Preferencias;
  onAlterar: <Chave extends keyof Preferencias>(
    chave: Chave,
    valor: Preferencias[Chave],
  ) => void;
}

interface GrupoProps<Chave extends keyof Preferencias>
  extends PreferenciasSistemaProps {
  grupo: GrupoPreferencia<Chave>;
}

function Grupo<Chave extends keyof Preferencias>({
  grupo,
  preferencias,
  onAlterar,
}: GrupoProps<Chave>) {
  const tituloId = `preferencia-${grupo.chave}`;

  return (
    <div className="flex min-w-0 flex-col gap-2">
      <h3 id={tituloId} className="text-sm font-bold">
        {grupo.titulo}
      </h3>

      <div
        role="radiogroup"
        aria-labelledby={tituloId}
        className="flex flex-col gap-2"
      >
        {grupo.opcoes.map((opcao) => {
          const selecionada = preferencias[grupo.chave] === opcao.valor;
          const OpcaoIcon = opcao.icone;

          return (
            <button
              key={opcao.valor}
              type="button"
              role="radio"
              aria-checked={selecionada}
              onClick={() => onAlterar(grupo.chave, opcao.valor)}
              className={`flex min-h-10 items-center justify-center gap-2 rounded-lg border px-3 text-sm font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-high) ${
                selecionada
                  ? "border-(--color-high) bg-(--color-medium) text-white"
                  : "border-white/20 text-white hover:bg-white/10"
              }`}
            >
              <OpcaoIcon size={14} aria-hidden="true" />
              {opcao.rotulo}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function PreferenciasSistema({
  preferencias,
  onAlterar,
}: PreferenciasSistemaProps) {
  return (
    <Card className="gap-5 border border-white/10 p-5 text-white">
      <CardCabecalho
        titulo="Preferências do sistema"
        descricao="Defina tema, barra lateral e densidade da interface."
        icone={<SlidersHorizontal size={20} aria-hidden="true" />}
      />

      <div className="grid grid-cols-1 items-start gap-5 md:grid-cols-3">
        <Grupo
          grupo={GRUPO_TEMA}
          preferencias={preferencias}
          onAlterar={onAlterar}
        />
        <Grupo
          grupo={GRUPO_BARRA_LATERAL}
          preferencias={preferencias}
          onAlterar={onAlterar}
        />
        <Grupo
          grupo={GRUPO_MODO_COMPACTO}
          preferencias={preferencias}
          onAlterar={onAlterar}
        />
      </div>

      <p className="border-t border-white/10 pt-4 text-sm text-gray-400">
        As preferências ficam salvas neste navegador para o seu usuário.
      </p>
    </Card>
  );
}

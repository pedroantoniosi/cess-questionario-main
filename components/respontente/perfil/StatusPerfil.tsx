import { BadgeCheck } from "lucide-react";

import Card from "@/components/ui/Card";

import CardCabecalho from "../shared/CardCabecalho";
import { UsuarioRespondente } from "../shared/usuarioData";
import { IndicadorPerfil } from "./types";

interface StatusPerfilProps {
  usuario: UsuarioRespondente;
  cadastroPercentual: number;
  indicadores: IndicadorPerfil[];
}

const LINHA =
  "flex items-center justify-between gap-3 rounded-lg border border-white/15 px-3 py-2";
const TERMO = "text-xs font-bold uppercase tracking-wide text-gray-300";

export default function StatusPerfil({
  usuario,
  cadastroPercentual,
  indicadores,
}: StatusPerfilProps) {
  return (
    <Card className="gap-5 border border-white/10 p-5 text-white">
      <CardCabecalho
        titulo="Status do perfil"
        descricao="Visão geral do cadastro e dos acessos do perfil."
        icone={<BadgeCheck size={20} aria-hidden="true" />}
        acao={<span className="text-sm text-gray-300">{usuario.perfil}</span>}
      />

      <dl className="flex flex-col gap-3">
        <div className={LINHA}>
          <dt className={TERMO}>Status:</dt>
          <dd
            className={`flex items-center gap-2 text-sm font-bold ${
              usuario.ativo ? "text-(--color-high)" : "text-gray-400"
            }`}
          >
            <span
              className={`h-2 w-2 rounded-full ${
                usuario.ativo ? "bg-(--color-high)" : "bg-white/40"
              }`}
              aria-hidden="true"
            />
            {usuario.ativo ? "Ativo" : "Inativo"}
          </dd>
        </div>

        <div className={LINHA}>
          <dt className={TERMO}>Perfil:</dt>
          <dd className="text-sm font-bold">{usuario.perfil}</dd>
        </div>

        <div className={LINHA}>
          <dt className={TERMO}>Cadastro:</dt>
          <dd className="text-sm font-bold">{cadastroPercentual}%</dd>
        </div>
      </dl>

      <div
        className="h-2 w-full overflow-hidden rounded-full bg-template"
        role="progressbar"
        aria-label="Preenchimento do cadastro"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={cadastroPercentual}
      >
        <div
          className="h-full rounded-full bg-(--color-high) transition-all duration-300"
          style={{ width: `${cadastroPercentual}%` }}
        />
      </div>

      {indicadores.length > 0 && (
        <ul className="flex flex-wrap gap-3 border-t border-white/10 pt-4">
          {indicadores.map((indicador) => {
            const IndicadorIcon = indicador.icone;

            return (
              <li
                key={indicador.id}
                className="flex min-w-32 items-center gap-3 rounded-xl border border-white/15 px-3 py-2"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-(--color-high)/15 text-(--color-high)">
                  <IndicadorIcon size={16} aria-hidden="true" />
                </span>
                <span className="flex flex-col leading-tight">
                  <strong className="text-lg font-bold">{indicador.valor}</strong>
                  <span className="text-xs text-gray-300">
                    {indicador.rotulo}
                  </span>
                </span>
              </li>
            );
          })}
        </ul>
      )}
    </Card>
  );
}

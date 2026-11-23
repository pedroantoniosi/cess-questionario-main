import { ChevronRight, KeyRound, LogOut, Monitor, ShieldCheck } from "lucide-react";
import Link from "next/link";

import Card from "@/components/ui/Card";

import CardCabecalho from "../shared/CardCabecalho";
import { SessaoAtual } from "./types";

interface SegurancaContaProps {
  sessao: SessaoAtual;
  /** Para onde o usuário vai ao encerrar a sessão. */
  hrefSair?: string;
  onAlterarSenha?: () => void;
}

const ITEM =
  "flex min-h-16 items-center gap-3 rounded-xl border border-white/10 bg-template p-3 text-left";
const ITEM_ACAO = `${ITEM} transition-colors hover:border-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-high)`;
const ICONE =
  "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-card text-gray-200";

export default function SegurancaConta({
  sessao,
  hrefSair = "/",
  onAlterarSenha,
}: SegurancaContaProps) {
  return (
    <Card className="gap-5 border border-white/10 p-5 text-white">
      <CardCabecalho
        titulo="Segurança da conta"
        descricao="Altere sua senha e acompanhe a sessão em uso."
        icone={<ShieldCheck size={20} aria-hidden="true" />}
      />

      <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
        {/* Alterar senha */}
        <button type="button" onClick={onAlterarSenha} className={ITEM_ACAO}>
          <span className={ICONE}>
            <KeyRound size={18} aria-hidden="true" />
          </span>
          <span className="flex min-w-0 flex-1 flex-col">
            <span className="text-sm font-bold">Alterar senha</span>
            <span className="text-xs text-gray-400">Exige a senha atual</span>
          </span>
          <ChevronRight size={16} className="text-gray-400" aria-hidden="true" />
        </button>

        {/* Sessão atual */}
        <div className={ITEM}>
          <span className={ICONE}>
            <Monitor size={18} aria-hidden="true" />
          </span>
          <span className="flex min-w-0 flex-1 flex-col">
            <span className="text-sm font-bold">Sessão atual</span>
            <span className="text-xs text-gray-400">
              {sessao.dispositivo} · desde {sessao.desde}
            </span>
          </span>
          <span
            className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold ${
              sessao.ativa
                ? "border-(--color-high)/30 bg-(--color-high)/15 text-(--color-high)"
                : "border-white/15 bg-white/5 text-gray-300"
            }`}
          >
            {sessao.ativa ? "Ativa" : "Encerrada"}
          </span>
        </div>

        {/* Encerrar sessão */}
        <Link href={hrefSair} className={ITEM_ACAO}>
          <span className={ICONE}>
            <LogOut size={18} aria-hidden="true" />
          </span>
          <span className="flex min-w-0 flex-1 flex-col">
            <span className="text-sm font-bold">Encerrar sessão</span>
            <span className="text-xs text-gray-400">
              Sair desta conta neste dispositivo
            </span>
          </span>
          <ChevronRight size={16} className="text-gray-400" aria-hidden="true" />
        </Link>
      </div>

      <p className="border-t border-white/10 pt-4 text-sm text-gray-400">
        Por segurança, entrar em outro dispositivo encerra a sessão anterior
        automaticamente.
      </p>
    </Card>
  );
}

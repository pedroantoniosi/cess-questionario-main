import { IdCard, Lock, Save } from "lucide-react";
import Link from "next/link";

import Card from "@/components/ui/Card";

import CampoTexto from "../shared/CampoTexto";
import CardCabecalho from "../shared/CardCabecalho";
import { UsuarioRespondente } from "../shared/usuarioData";
import { ROTA_ALTERAR_SENHA } from "./perfilData";

interface DadosUsuarioProps {
  usuario: UsuarioRespondente;
  nome: string;
  telefone: string;
  alterado: boolean;
  mensagem: string | null;
  onNome: (valor: string) => void;
  onTelefone: (valor: string) => void;
  onSalvar: () => void;
}

export default function DadosUsuario({
  usuario,
  nome,
  telefone,
  alterado,
  mensagem,
  onNome,
  onTelefone,
  onSalvar,
}: DadosUsuarioProps) {
  return (
    <Card className="gap-5 border border-white/10 p-5 text-white">
      <CardCabecalho
        titulo="Dados do usuário"
        descricao="Atualize as informações de identificação e contato da conta."
        icone={<IdCard size={20} aria-hidden="true" />}
      />

      <form
        className="flex flex-col gap-5"
        onSubmit={(evento) => {
          evento.preventDefault();
          onSalvar();
        }}
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <CampoTexto
            id="perfil-nome"
            rotulo="Nome"
            valor={nome}
            obrigatorio
            onAlterar={onNome}
          />
          <CampoTexto
            id="perfil-email"
            rotulo="E-mail"
            tipo="email"
            valor={usuario.email}
            obrigatorio
            bloqueado
            ajuda="Para alterar o e-mail, fale com o administrador."
          />
          <CampoTexto
            id="perfil-telefone"
            rotulo="Telefone"
            tipo="tel"
            valor={telefone}
            onAlterar={onTelefone}
          />
          <CampoTexto
            id="perfil-ultimo-acesso"
            rotulo="Último acesso"
            valor={usuario.ultimoAcesso}
            bloqueado
          />
        </div>

        <div className="flex flex-wrap items-center justify-end gap-3 border-t border-white/10 pt-4">
          {mensagem && (
            <p role="status" className="mr-auto text-sm text-gray-300">
              {mensagem}
            </p>
          )}

          <Link
            href={ROTA_ALTERAR_SENHA}
            className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-white/20 px-4 text-sm font-bold text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-high)"
          >
            <Lock size={16} aria-hidden="true" />
            Alterar senha
          </Link>

          <button
            type="submit"
            disabled={!alterado}
            className="inline-flex min-h-10 items-center gap-2 rounded-lg bg-(--color-medium) px-4 text-sm font-bold text-white transition-colors hover:bg-(--color-low) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-high) disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Save size={16} aria-hidden="true" />
            Salvar alterações
          </button>
        </div>
      </form>

      <p className="border-t border-white/10 pt-4 text-sm text-gray-400">
        Nome e telefone ficam salvos neste navegador. O e-mail é alterado pelo
        administrador.
      </p>
    </Card>
  );
}

import { Check, Pencil, UserCog } from "lucide-react";

import Card from "@/components/ui/Card";

import CampoTexto from "../shared/CampoTexto";
import CardCabecalho from "../shared/CardCabecalho";
import { UsuarioRespondente } from "../shared/usuarioData";

interface DadosPerfilProps {
  usuario: UsuarioRespondente;
  nome: string;
  telefone: string;
  editando: boolean;
  onNome: (valor: string) => void;
  onTelefone: (valor: string) => void;
  onAlternarEdicao: () => void;
}

export default function DadosPerfil({
  usuario,
  nome,
  telefone,
  editando,
  onNome,
  onTelefone,
  onAlternarEdicao,
}: DadosPerfilProps) {
  const EdicaoIcon = editando ? Check : Pencil;

  return (
    <Card className="gap-5 border border-white/10 p-5 text-white">
      <CardCabecalho
        titulo="Dados do perfil"
        descricao="Atualize seu nome e telefone. E-mail e perfil de acesso são definidos pelo executor."
        icone={<UserCog size={20} aria-hidden="true" />}
        acao={
          <button
            type="button"
            onClick={onAlternarEdicao}
            aria-pressed={editando}
            className="inline-flex min-h-9 items-center gap-2 rounded-lg border border-white/20 px-3 text-sm font-bold text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-high)"
          >
            <EdicaoIcon size={14} aria-hidden="true" />
            {editando ? "Concluir" : "Editar"}
          </button>
        }
      />

      <div className="flex flex-col gap-5 md:flex-row md:items-start">
        {/* Avatar */}
        <div className="flex shrink-0 flex-col items-center gap-2 md:w-28">
          <span
            className="flex h-16 w-16 items-center justify-center rounded-full bg-template text-2xl font-bold text-(--color-high)"
            aria-hidden="true"
          >
            {nome.trim().charAt(0).toUpperCase() || "?"}
          </span>
          <span className="text-xs font-bold">{usuario.perfil}</span>
        </div>

        <div className="grid min-w-0 flex-1 grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <CampoTexto
            id="config-nome"
            rotulo="Nome completo"
            valor={nome}
            somenteLeitura={!editando}
            onAlterar={onNome}
          />
          <CampoTexto
            id="config-email"
            rotulo="E-mail"
            tipo="email"
            valor={usuario.email}
            bloqueado
          />
          <CampoTexto
            id="config-telefone"
            rotulo="Telefone"
            tipo="tel"
            valor={telefone}
            somenteLeitura={!editando}
            onAlterar={onTelefone}
          />
          <CampoTexto
            id="config-perfil"
            rotulo="Perfil de acesso"
            valor={usuario.perfil}
            bloqueado
          />
          <CampoTexto
            id="config-instalacao"
            rotulo="Instalação"
            valor={usuario.instalacao}
            bloqueado
          />
          <CampoTexto
            id="config-ultimo-acesso"
            rotulo="Último acesso"
            valor={usuario.ultimoAcesso}
            bloqueado
          />
        </div>
      </div>

      <p className="border-t border-white/10 pt-4 text-sm text-gray-400">
        Última atualização dos dados: {usuario.ultimaAtualizacao}.
      </p>
    </Card>
  );
}

"use client";

import DadosUsuario from "./DadosUsuario";
import { usePerfil } from "./hooks/usePerfil";
import StatusPerfil from "./StatusPerfil";
import { PerfilProps } from "./types";

/** Tela de Perfil do respondente. */
export default function Perfil({ dados, className = "" }: PerfilProps) {
  const {
    usuario,
    indicadores,
    cadastroPercentual,
    nome,
    telefone,
    setNome,
    setTelefone,
    alterado,
    mensagem,
    salvar,
  } = usePerfil(dados);

  return (
    <div className={`flex flex-col gap-6 ${className}`}>
      <DadosUsuario
        usuario={usuario}
        nome={nome}
        telefone={telefone}
        alterado={alterado}
        mensagem={mensagem}
        onNome={setNome}
        onTelefone={setTelefone}
        onSalvar={salvar}
      />

      <StatusPerfil
        usuario={usuario}
        cadastroPercentual={cadastroPercentual}
        indicadores={indicadores}
      />
    </div>
  );
}

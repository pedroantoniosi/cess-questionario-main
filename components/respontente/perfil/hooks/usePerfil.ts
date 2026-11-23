"use client";

import { useState } from "react";

import { useContatoUsuario } from "../../shared/useContatoUsuario";
import { mockPerfil } from "../perfilData";
import { PerfilDados } from "../types";

export function usePerfil(dados?: Partial<PerfilDados>) {
  // Merge dos dados recebidos via props com o mock padrão
  const usuario = dados?.usuario ?? mockPerfil.usuario;
  const indicadores = dados?.indicadores ?? mockPerfil.indicadores;
  const cadastroPercentual = Math.min(
    100,
    Math.max(0, dados?.cadastroPercentual ?? mockPerfil.cadastroPercentual),
  );

  // Nome e telefone: guardados no navegador até o backend ser ligado
  const contato = useContatoUsuario(usuario);
  const [mensagem, setMensagem] = useState<string | null>(null);

  const setNome = (valor: string) => {
    contato.setNome(valor);
    setMensagem(null);
  };

  const setTelefone = (valor: string) => {
    contato.setTelefone(valor);
    setMensagem(null);
  };

  const salvar = () => {
    if (!contato.valido) {
      setMensagem("Informe o nome para salvar.");
      return;
    }

    setMensagem(
      contato.salvar()
        ? "Alterações salvas neste navegador."
        : "Não foi possível salvar as alterações neste navegador.",
    );
  };

  return {
    usuario,
    indicadores,
    cadastroPercentual,
    nome: contato.nome,
    telefone: contato.telefone,
    setNome,
    setTelefone,
    alterado: contato.alterado,
    valido: contato.valido,
    mensagem,
    salvar,
  };
}

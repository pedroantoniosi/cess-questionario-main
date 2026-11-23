"use client";

import { useEffect, useState } from "react";

import {
  PREFIXO_ARMAZENAMENTO,
  useArmazenamentoLocal,
} from "./useArmazenamentoLocal";
import { UsuarioRespondente } from "./usuarioData";

interface ContatoUsuario {
  nome: string;
  telefone: string;
}

/** Chave única: Perfil e Configurações leem e gravam o mesmo valor. */
const CHAVE_CONTATO = `${PREFIXO_ARMAZENAMENTO}:usuario`;

/**
 * Nome e telefone editáveis do usuário, usados em Perfil e em
 * Configurações. Enquanto o backend não está ligado, o que for salvo
 * fica guardado neste navegador e aparece igual nas duas telas.
 */
export function useContatoUsuario(usuario: UsuarioRespondente) {
  const {
    valor: salvo,
    salvar: gravar,
    carregado,
  } = useArmazenamentoLocal<ContatoUsuario | null>(CHAVE_CONTATO, null);

  // O que vale hoje: o que foi salvo no navegador ou, sem isso, o do mock
  const nomeSalvo = salvo?.nome ?? usuario.nome;
  const telefoneSalvo = salvo?.telefone ?? usuario.telefone;

  // O que está sendo digitado
  const [nome, setNome] = useState(usuario.nome);
  const [telefone, setTelefone] = useState(usuario.telefone);

  // Quando a leitura do navegador termina, os campos passam ao valor salvo
  useEffect(() => {
    if (!carregado) return;
    setNome(nomeSalvo);
    setTelefone(telefoneSalvo);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [carregado]);

  const alterado = nome !== nomeSalvo || telefone !== telefoneSalvo;
  const valido = nome.trim().length > 0;

  /** Grava nome e telefone no navegador. Retorna false se não gravou. */
  const salvar = () => {
    if (!valido) return false;
    return gravar({ nome: nome.trim(), telefone: telefone.trim() });
  };

  /** Desfaz o que foi digitado e volta ao último valor salvo. */
  const descartar = () => {
    setNome(nomeSalvo);
    setTelefone(telefoneSalvo);
  };

  return {
    nome,
    telefone,
    setNome,
    setTelefone,
    alterado,
    valido,
    salvar,
    descartar,
  };
}

"use client";

import { useEffect, useState } from "react";

import {
  CHAVE_PREFERENCIAS,
  CHAVE_PREFERENCIAS_SALVAS_EM,
  mockConfiguracoes,
} from "../configuracoesData";
import { useContatoUsuario } from "../../shared/useContatoUsuario";
import { ConfiguracoesDados, Preferencias } from "../types";

function lerPreferenciasSalvas(padrao: Preferencias): Preferencias {
  try {
    const salvo = window.localStorage.getItem(CHAVE_PREFERENCIAS);
    return salvo ? { ...padrao, ...JSON.parse(salvo) } : padrao;
  } catch {
    return padrao;
  }
}

export function useConfiguracoes(dados?: Partial<ConfiguracoesDados>) {
  // Merge dos dados recebidos via props com o mock padrão
  const usuario = dados?.usuario ?? mockConfiguracoes.usuario;
  const sessao = dados?.sessao ?? mockConfiguracoes.sessao;
  const banner = dados?.banner ?? mockConfiguracoes.banner;
  const situacao = dados?.situacao ?? mockConfiguracoes.situacao;
  const avaliacao = dados?.avaliacao ?? mockConfiguracoes.avaliacao;
  const proximosNiveis =
    dados?.proximosNiveis ?? mockConfiguracoes.proximosNiveis;
  const padrao =
    dados?.preferenciasPadrao ?? mockConfiguracoes.preferenciasPadrao;

  // Dados do perfil (nome e telefone editáveis)
  // guardados no navegador ao concluir a edição
  const [editando, setEditando] = useState(false);
  const contato = useContatoUsuario(usuario);

  const alternarEdicao = () => {
    if (editando) {
      // Nome vazio não é salvo: volta ao último valor guardado
      if (contato.valido) contato.salvar();
      else contato.descartar();
    }
    setEditando((valor) => !valor);
  };

  // Preferências: o que está salvo no navegador e o que está em edição
  const [salvas, setSalvas] = useState<Preferencias>(padrao);
  const [preferencias, setPreferencias] = useState<Preferencias>(padrao);
  const [mensagem, setMensagem] = useState<string | null>(null);
  // Data e hora do último salvamento neste navegador
  const [salvasEm, setSalvasEm] = useState<string | null>(null);

  // O navegador só existe depois da montagem; antes disso vale o padrão.
  useEffect(() => {
    const lidas = lerPreferenciasSalvas(padrao);
    setSalvas(lidas);
    setPreferencias(lidas);
    try {
      setSalvasEm(window.localStorage.getItem(CHAVE_PREFERENCIAS_SALVAS_EM));
    } catch {
      // Sem acesso ao armazenamento: fica sem data de salvamento.
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const alterarPreferencia = <Chave extends keyof Preferencias>(
    chave: Chave,
    valor: Preferencias[Chave],
  ) => {
    setPreferencias((atual) => ({ ...atual, [chave]: valor }));
    setMensagem(null);
  };

  const alterado = (
    Object.keys(preferencias) as (keyof Preferencias)[]
  ).some((chave) => preferencias[chave] !== salvas[chave]);

  const cancelar = () => {
    setPreferencias(salvas);
    setMensagem(null);
  };

  const restaurarPadrao = () => {
    setPreferencias(padrao);
    setMensagem(null);
  };

  const salvar = () => {
    try {
      window.localStorage.setItem(
        CHAVE_PREFERENCIAS,
        JSON.stringify(preferencias),
      );
      const agora = new Date().toLocaleString("pt-BR", {
        dateStyle: "short",
        timeStyle: "short",
      });
      window.localStorage.setItem(CHAVE_PREFERENCIAS_SALVAS_EM, agora);
      setSalvasEm(agora);
      setSalvas(preferencias);
      setMensagem("Preferências salvas neste navegador.");
    } catch {
      setMensagem("Não foi possível salvar as preferências neste navegador.");
    }
  };

  return {
    usuario,
    sessao,
    banner,
    situacao,
    avaliacao,
    proximosNiveis,
    salvasEm,
    perfil: {
      editando,
      nome: contato.nome,
      telefone: contato.telefone,
      setNome: contato.setNome,
      setTelefone: contato.setTelefone,
      alternarEdicao,
    },
    preferencias,
    alterarPreferencia,
    alterado,
    mensagem,
    cancelar,
    restaurarPadrao,
    salvar,
  };
}

"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/** Prefixo das chaves do respondente no armazenamento do navegador. */
export const PREFIXO_ARMAZENAMENTO = "questionario:respondente";

/**
 * Guarda um valor no navegador (localStorage) enquanto o backend não
 * está ligado: o que a pessoa preenche continua lá ao trocar de página
 * ou recarregar.
 *
 * O navegador só existe depois da montagem, então o primeiro render usa
 * `padrao` (igual ao do servidor) e o valor salvo entra logo em seguida.
 * `carregado` indica que essa leitura já aconteceu.
 */
export function useArmazenamentoLocal<Valor>(chave: string, padrao: Valor) {
  const [valor, setValor] = useState<Valor>(padrao);
  const [carregado, setCarregado] = useState(false);
  // Último valor, para gravar fora do ciclo de render
  const atualRef = useRef<Valor>(padrao);

  useEffect(() => {
    try {
      const salvo = window.localStorage.getItem(chave);
      if (salvo !== null) {
        const lido = JSON.parse(salvo) as Valor;
        atualRef.current = lido;
        setValor(lido);
      }
    } catch {
      // Sem acesso ao armazenamento ou valor inválido: segue com o padrão.
    }
    setCarregado(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chave]);

  /** Atualiza o valor e grava no navegador. Retorna false se não gravou. */
  const salvar = useCallback(
    (novo: Valor | ((atual: Valor) => Valor)) => {
      const proximo =
        typeof novo === "function"
          ? (novo as (atual: Valor) => Valor)(atualRef.current)
          : novo;

      atualRef.current = proximo;
      setValor(proximo);

      try {
        window.localStorage.setItem(chave, JSON.stringify(proximo));
        return true;
      } catch {
        return false;
      }
    },
    [chave],
  );

  /** Apaga o valor salvo e volta ao padrão. */
  const limpar = useCallback(() => {
    try {
      window.localStorage.removeItem(chave);
    } catch {
      // Nada a apagar.
    }
    atualRef.current = padrao;
    setValor(padrao);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chave]);

  return { valor, salvar, limpar, carregado };
}

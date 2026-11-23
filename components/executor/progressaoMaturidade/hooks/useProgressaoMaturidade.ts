"use client";

import { useState } from "react";
import { mockProgressaoMaturidade } from "../ProgressaoMaturidadeData";
import type { ProgressaoMaturidadeProps } from "../types";

export function useProgressaoMaturidade({
  dados: dadosExternos,
}: ProgressaoMaturidadeProps = {}) {
  const [ano1, setAno1] = useState(2024);
  const [ano2, setAno2] = useState(2025);

  const dados = dadosExternos ?? mockProgressaoMaturidade;

  const anosDisponiveis = dados.map((item) => item.ano);

  const nivelAno1 = dados.find(
    (item) => item.ano === ano1
  )?.nivel;

  const nivelAno2 = dados.find(
    (item) => item.ano === ano2
  )?.nivel;

  function inverterAnos() {
    setAno1(ano2);
    setAno2(ano1);
  }

  return {
    ano1,
    setAno1,
    ano2,
    setAno2,
    anosDisponiveis,
    nivelAno1,
    nivelAno2,
    inverterAnos,
  };
}

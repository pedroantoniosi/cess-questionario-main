
"use client";

import type { StatusRodadaProps } from "../types";
import { useState } from "react";
import { mockStatusRodada } from "../StatusRodadaData";
import type { StatusRodadaDados } from "../types";

export function useStatusRodada({
    dados: dadosExternos,
}: StatusRodadaProps = {}) {
  const [anoSelecionado, setAnoSelecionado] = useState(2025);

  const dados: StatusRodadaDados = {
    ...mockStatusRodada[anoSelecionado],
    ...dadosExternos,
  };


  const anosDisponiveis = Object.keys(mockStatusRodada).map(Number);

  const corProgresso =
    dados.progresso <= 25
      ? "#0D9488"
      : dados.progresso <= 75
        ? "#65A30D"
        : "#84CC16";

  return {
    anoSelecionado,
    setAnoSelecionado,
    anosDisponiveis,
    dados,
    corProgresso,
  };
}

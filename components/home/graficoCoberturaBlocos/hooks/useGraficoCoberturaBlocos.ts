"use client";

import { useMemo, useState } from "react";
import {
  BlocoCobertura,
  CategoriaStatus,
  CoberturaGeral,
  StatusCobertura,
} from "../types";
import {
  CORES_COBERTURA,
  mockCoberturaGeral,
} from "../GraficoCoberturaBlocosData";

export function useGraficoCoberturaBlocos(dados?: Partial<CoberturaGeral>) {
  // Merge de dados recebidos via props com mock default
  const titulo = dados?.titulo ?? mockCoberturaGeral.titulo;
  const subtitulo = dados?.subtitulo ?? mockCoberturaGeral.subtitulo;
  const rodape = dados?.rodape ?? mockCoberturaGeral.rodape;
  const rotuloMetricaPrincipal =
    dados?.rotuloMetricaPrincipal ?? mockCoberturaGeral.rotuloMetricaPrincipal;
  const statusGeral = dados?.statusGeral ?? mockCoberturaGeral.statusGeral;
  const blocos = dados?.blocos ?? mockCoberturaGeral.blocos;

  // Estados interativos
  const [blocoSelecionado, setBlocoSelecionado] =
    useState<BlocoCobertura | null>(null);
  const [categoriaHover, setCategoriaHover] = useState<CategoriaStatus | null>(
    null
  );

  // Status ativo (bloco selecionado ou visão geral)
  const statusAtivo: StatusCobertura = useMemo(() => {
    return blocoSelecionado ? blocoSelecionado.status : statusGeral;
  }, [blocoSelecionado, statusGeral]);

  // Cálculo do estilo conic-gradient exatamente no padrão do GraficoMaturidade
  const conicGradient = useMemo(() => {
    const total =
      statusAtivo.completo + statusAtivo.emParte + statusAtivo.semResposta;

    if (total === 0) {
      return "conic-gradient(#374151 0deg 360deg)";
    }

    const fator = 100 / total;
    const pComp = Math.max(0, statusAtivo.completo * fator);
    const pPart = Math.max(0, statusAtivo.emParte * fator);

    const degCompleto = Number((pComp * 3.6).toFixed(2));
    const degEmParte = Number(((pComp + pPart) * 3.6).toFixed(2));

    const corComp = CORES_COBERTURA.completo.corHex;
    const corPart = CORES_COBERTURA.emParte.corHex;
    const corSem = CORES_COBERTURA.semResposta.corHex;

    return `conic-gradient(
      ${corComp} 0deg ${degCompleto}deg,
      ${corPart} ${degCompleto}deg ${degEmParte}deg,
      ${corSem} ${degEmParte}deg 360deg
    )`;
  }, [statusAtivo]);

  // Texto e valor exibidos no miolo da rosca
  const infoCentro = useMemo(() => {
    if (categoriaHover) {
      const config = CORES_COBERTURA[categoriaHover];
      return {
        valor: `${statusAtivo[categoriaHover]}%`,
        rotulo: config.rotuloCurto,
        cor: config.corHex,
      };
    }

    if (blocoSelecionado) {
      return {
        valor: `${statusAtivo.completo}%`,
        rotulo: `${blocoSelecionado.codigo}`,
        cor: CORES_COBERTURA.completo.corHex,
      };
    }

    return {
      valor: `${statusAtivo.completo}%`,
      rotulo: "Completo",
      cor: CORES_COBERTURA.completo.corHex,
    };
  }, [categoriaHover, statusAtivo, blocoSelecionado]);

  const toggleBloco = (bloco: BlocoCobertura) => {
    setBlocoSelecionado((atual) => (atual?.id === bloco.id ? null : bloco));
  };

  const limparSelecao = () => {
    setBlocoSelecionado(null);
  };

  return {
    titulo,
    subtitulo,
    rodape,
    rotuloMetricaPrincipal,
    statusGeral,
    blocos,
    statusAtivo,
    conicGradient,
    infoCentro,
    blocoSelecionado,
    toggleBloco,
    limparSelecao,
    categoriaHover,
    setCategoriaHover,
    cores: CORES_COBERTURA,
  };
}

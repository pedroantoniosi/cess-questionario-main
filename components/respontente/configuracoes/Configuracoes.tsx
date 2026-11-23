"use client";

import { Leaf, Recycle, RotateCcw, Save, Waves, X } from "lucide-react";

import Card from "@/components/ui/Card";

import ProximosNiveis from "../dashboard/resumoRodada/ProximosNiveis";
import SituacaoRodada from "../dashboard/resumoRodada/SituacaoRodada";
import AvaliacaoRodada from "../historico/AvaliacaoRodada";
import CardCabecalho from "../shared/CardCabecalho";
import DadosPerfil from "./DadosPerfil";
import { useConfiguracoes } from "./hooks/useConfiguracoes";
import PreferenciasSistema from "./PreferenciasSistema";
import ResumoConfiguracoes from "./ResumoConfiguracoes";
import SegurancaConta from "./SegurancaConta";
import { ConfiguracoesProps } from "./types";

const BOTAO_SECUNDARIO =
  "inline-flex min-h-10 items-center gap-2 rounded-lg border border-white/20 px-4 text-sm font-bold text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-high) disabled:cursor-not-allowed disabled:opacity-50";

/** Tela de Configurações do respondente. */
export default function Configuracoes({
  dados,
  className = "",
}: ConfiguracoesProps) {
  const {
    usuario,
    sessao,
    banner,
    situacao,
    avaliacao,
    proximosNiveis,
    salvasEm,
    perfil,
    preferencias,
    alterarPreferencia,
    alterado,
    mensagem,
    cancelar,
    restaurarPadrao,
    salvar,
  } = useConfiguracoes(dados);

  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      <DadosPerfil
        usuario={usuario}
        nome={perfil.nome}
        telefone={perfil.telefone}
        editando={perfil.editando}
        onNome={perfil.setNome}
        onTelefone={perfil.setTelefone}
        onAlternarEdicao={perfil.alternarEdicao}
      />

      {/* TRÊS MENORES: situação da rodada, como no dashboard */}
      <div className="grid gap-4 xl:grid-cols-3">
        <SituacaoRodada dados={situacao} />
        <AvaliacaoRodada dados={avaliacao} />
        <ProximosNiveis niveis={proximosNiveis} />
      </div>

      <SegurancaConta sessao={sessao} />

      <PreferenciasSistema
        preferencias={preferencias}
        onAlterar={alterarPreferencia}
      />

      <ResumoConfiguracoes
        usuario={usuario}
        sessao={sessao}
        preferencias={preferencias}
        salvasEm={salvasEm}
      />

      {/* MENSAGEM INSTITUCIONAL */}
      <Card className="items-center gap-4 border border-white/10 p-5 text-center text-white">
        <CardCabecalho
          titulo={banner.titulo}
          descricao={banner.descricao}
          icone={<Leaf size={20} aria-hidden="true" />}
        />

        <div className="flex items-center gap-3 text-(--color-high)" aria-hidden="true">
          <Waves size={20} />
          <Recycle size={20} />
        </div>

        <p className="w-full border-t border-white/10 pt-4 text-sm text-gray-400">
          {banner.rodape}
        </p>
      </Card>

      {/* AÇÕES DAS PREFERÊNCIAS */}
      <div className="flex flex-wrap items-center justify-end gap-3">
        {mensagem && (
          <p role="status" className="mr-auto text-sm text-gray-300">
            {mensagem}
          </p>
        )}

        <button
          type="button"
          onClick={cancelar}
          disabled={!alterado}
          className={BOTAO_SECUNDARIO}
        >
          <X size={16} aria-hidden="true" />
          Cancelar
        </button>

        <button type="button" onClick={restaurarPadrao} className={BOTAO_SECUNDARIO}>
          <RotateCcw size={16} aria-hidden="true" />
          Restaurar padrão
        </button>

        <button
          type="button"
          onClick={salvar}
          disabled={!alterado}
          className="inline-flex min-h-10 items-center gap-2 rounded-lg bg-(--color-medium) px-4 text-sm font-bold text-white transition-colors hover:bg-(--color-low) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-high) disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Save size={16} aria-hidden="true" />
          Salvar preferências
        </button>
      </div>
    </div>
  );
}

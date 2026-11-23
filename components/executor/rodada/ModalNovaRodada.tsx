"use client";

import { HelpCircle, X } from "lucide-react";
import { useEffect, useState } from "react";

import {
  SITUACAO_RODADA_LABELS,
  STATUS_INICIAL_LABELS,
} from "./rodadaPageData";
import type { NovaRodadaFormValues, QuestionarioDisponivel } from "./types";

interface ModalNovaRodadaProps {
  questionariosDisponiveis: QuestionarioDisponivel[];
  valoresIniciais: NovaRodadaFormValues;
  onFechar: () => void;
  onCriar: (valores: NovaRodadaFormValues) => void;
}

const CAMPO_LABEL = "text-sm font-medium text-gray-700";
const CAMPO_CONTROLE =
  "w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

function formatarDataBr(data: string): string {
  const [ano, mes, dia] = data.split("-");
  return `${dia}/${mes}/${ano}`;
}

function obterMensagemCronograma(valores: NovaRodadaFormValues): string {
  if (valores.statusInicial === "rascunho") {
    return "A rodada será salva como rascunho e não ficará visível aos participantes até que o status seja alterado para aberta ou agendada.";
  }
  if (valores.statusInicial === "aberta") {
    return "A rodada ficará aberta e visível aos participantes imediatamente após a criação.";
  }
  if (!valores.dataInicio || !valores.dataEncerramento) {
    return "Defina a data de início e de encerramento para que a rodada abra e encerre automaticamente nesse período.";
  }
  return `A rodada abrirá automaticamente em ${formatarDataBr(
    valores.dataInicio
  )} e será encerrada em ${formatarDataBr(valores.dataEncerramento)}.`;
}

export default function ModalNovaRodada({
  questionariosDisponiveis,
  valoresIniciais,
  onFechar,
  onCriar,
}: ModalNovaRodadaProps) {
  const [valores, setValores] = useState<NovaRodadaFormValues>(valoresIniciais);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onFechar();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onFechar]);

  function atualizar<K extends keyof NovaRodadaFormValues>(
    campo: K,
    valor: NovaRodadaFormValues[K]
  ) {
    setValores((atual) => ({ ...atual, [campo]: valor }));
  }

  const datasObrigatorias = valores.statusInicial === "agendada";
  const formValido =
    valores.questionarioId.trim().length > 0 &&
    valores.titulo.trim().length > 0 &&
    (!datasObrigatorias ||
      (valores.dataInicio.length > 0 && valores.dataEncerramento.length > 0));

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!formValido) return;
    onCriar(valores);
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={(event) => {
        if (event.target === event.currentTarget) onFechar();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="titulo-modal-nova-rodada"
    >
      <form
        onSubmit={handleSubmit}
        className="flex w-full max-w-lg max-h-[90vh] flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
      >
        {/* Cabeçalho */}
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-5">
          <h2
            id="titulo-modal-nova-rodada"
            className="text-lg font-bold text-gray-900"
          >
            Nova rodada
          </h2>

          <button
            type="button"
            onClick={onFechar}
            aria-label="Fechar"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Corpo */}
        <div className="flex flex-col gap-6 overflow-y-auto px-6 py-5">
          {/* Dados da rodada */}
          <section className="flex flex-col gap-4">
            <div>
              <h3 className="text-sm font-semibold text-gray-900">Dados da rodada</h3>
              <p className="text-xs text-gray-500">
                Informe os dados básicos que identificam e definem o período da rodada.
              </p>
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="questionario" className={CAMPO_LABEL}>
                Questionário <span className="text-red-500">*</span>
              </label>
              <select
                id="questionario"
                value={valores.questionarioId}
                onChange={(event) => atualizar("questionarioId", event.target.value)}
                disabled={questionariosDisponiveis.length === 0}
                className={`${CAMPO_CONTROLE} disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-400`}
              >
                <option value="">Selecione o questionário</option>
                {questionariosDisponiveis.map((questionario) => (
                  <option key={questionario.id} value={questionario.id}>
                    {questionario.nome}
                  </option>
                ))}
              </select>
              {questionariosDisponiveis.length === 0 && (
                <p className="text-xs text-gray-400">
                  Não existem questionários ativos e disponíveis para associação.
                </p>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="titulo-rodada" className={CAMPO_LABEL}>
                Título da rodada <span className="text-red-500">*</span>
              </label>
              <input
                id="titulo-rodada"
                type="text"
                value={valores.titulo}
                onChange={(event) => atualizar("titulo", event.target.value)}
                placeholder="Informe o título da rodada"
                className={CAMPO_CONTROLE}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="descricao-rodada" className={CAMPO_LABEL}>
                Descrição
              </label>
              <textarea
                id="descricao-rodada"
                rows={3}
                value={valores.descricao}
                onChange={(event) => atualizar("descricao", event.target.value)}
                placeholder="Descreva o objetivo ou contexto desta rodada"
                className={`${CAMPO_CONTROLE} resize-none`}
              />
            </div>
          </section>

          {/* Cronograma e status */}
          <section className="flex flex-col gap-4 border-t border-gray-100 pt-5">
            <div>
              <h3 className="text-sm font-semibold text-gray-900">Cronograma e status</h3>
              <p className="text-xs text-gray-500">
                Defina o status inicial e, se necessário, o período da rodada.
              </p>
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="status-inicial" className={CAMPO_LABEL}>
                Status inicial <span className="text-red-500">*</span>
              </label>
              <select
                id="status-inicial"
                value={valores.statusInicial}
                onChange={(event) => {
                  const statusInicial = event.target
                    .value as NovaRodadaFormValues["statusInicial"];
                  setValores((atual) => ({
                    ...atual,
                    statusInicial,
                    dataInicio: statusInicial === "agendada" ? atual.dataInicio : "",
                    dataEncerramento:
                      statusInicial === "agendada" ? atual.dataEncerramento : "",
                  }));
                }}
                className={CAMPO_CONTROLE}
              >
                {Object.entries(STATUS_INICIAL_LABELS).map(([valor, label]) => (
                  <option key={valor} value={valor}>
                    {label}
                  </option>
                ))}
              </select>
            </div>

            {valores.statusInicial === "agendada" && (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="data-inicio" className={CAMPO_LABEL}>
                    Data de início <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="data-inicio"
                    type="date"
                    value={valores.dataInicio}
                    onChange={(event) => atualizar("dataInicio", event.target.value)}
                    className={CAMPO_CONTROLE}
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="data-encerramento" className={CAMPO_LABEL}>
                    Data de encerramento <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="data-encerramento"
                    type="date"
                    value={valores.dataEncerramento}
                    onChange={(event) => atualizar("dataEncerramento", event.target.value)}
                    className={CAMPO_CONTROLE}
                  />
                </div>
              </div>
            )}

            <p className="rounded-lg bg-blue-50 px-3 py-2 text-xs text-blue-700">
              {obterMensagemCronograma(valores)}
            </p>
          </section>

          {/* Observações */}
          <section className="flex flex-col gap-4 border-t border-gray-100 pt-5">
            <div>
              <h3 className="text-sm font-semibold text-gray-900">Observações</h3>
              <p className="text-xs text-gray-500">
                Adicione informações internas relacionadas à rodada.
              </p>
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="observacoes-rodada" className={CAMPO_LABEL}>
                Observações
              </label>
              <textarea
                id="observacoes-rodada"
                rows={3}
                value={valores.observacoes}
                onChange={(event) => atualizar("observacoes", event.target.value)}
                placeholder="Adicione observações internas sobre a rodada"
                className={`${CAMPO_CONTROLE} resize-none`}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="situacao-rodada"
                className={`${CAMPO_LABEL} inline-flex items-center gap-1.5`}
              >
                Situação <span className="text-red-500">*</span>
                <span
                  title="Diferente do status inicial (fase do cronograma): aqui define se a rodada está ativa ou inativa no sistema."
                  className="inline-flex cursor-help"
                >
                  <HelpCircle size={14} className="text-gray-400" aria-hidden="true" />
                </span>
              </label>
              <select
                id="situacao-rodada"
                value={valores.situacao}
                onChange={(event) =>
                  atualizar(
                    "situacao",
                    event.target.value as NovaRodadaFormValues["situacao"]
                  )
                }
                className={CAMPO_CONTROLE}
              >
                {Object.entries(SITUACAO_RODADA_LABELS).map(([valor, label]) => (
                  <option key={valor} value={valor}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
          </section>
        </div>

        {/* Rodapé */}
        <div className="flex items-center justify-end gap-3 border-t border-gray-200 px-6 py-4">
          <button
            type="button"
            onClick={onFechar}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 cursor-pointer"
          >
            Cancelar
          </button>

          <button
            type="submit"
            disabled={!formValido}
            className="rounded-lg bg-blue-500 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
          >
            Criar rodada
          </button>
        </div>
      </form>
    </div>
  );
}

"use client";

import { X } from "lucide-react";
import { useEffect, useState } from "react";

import { installationTypeLabel } from "@/lib/api/installationType";

import type {
  InstalacaoParticipante,
  NovoParticipanteFormValues,
  UsuarioResponsavel,
} from "./types";

interface ModalAdicionarParticipanteProps {
  instalacoesDisponiveis: InstalacaoParticipante[];
  usuariosResponsaveis: UsuarioResponsavel[];
  onFechar: () => void;
  onAdicionar: (valores: NovoParticipanteFormValues) => void;
}

const CAMPO_LABEL = "text-sm font-medium text-gray-700";
const CAMPO_CONTROLE =
  "w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-400";

export default function ModalAdicionarParticipante({
  instalacoesDisponiveis,
  usuariosResponsaveis,
  onFechar,
  onAdicionar,
}: ModalAdicionarParticipanteProps) {
  const [instalacaoId, setInstalacaoId] = useState("");
  const [responsavelId, setResponsavelId] = useState("");

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onFechar();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onFechar]);

  const formValido = instalacaoId.trim().length > 0 && responsavelId.trim().length > 0;

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!formValido) return;
    onAdicionar({ instalacaoId, responsavelId });
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={(event) => {
        if (event.target === event.currentTarget) onFechar();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="titulo-modal-adicionar-participante"
    >
      <form
        onSubmit={handleSubmit}
        className="flex w-full max-w-md max-h-[90vh] flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
      >
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-5">
          <h2
            id="titulo-modal-adicionar-participante"
            className="text-lg font-bold text-gray-900"
          >
            Adicionar participante
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

        <div className="flex flex-col gap-4 overflow-y-auto px-6 py-5">
          <p className="text-xs text-gray-500">
            Selecione a instalação que participará desta rodada e o usuário
            responsável por responder o questionário em nome dela.
          </p>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="instalacao-participante" className={CAMPO_LABEL}>
              Instalação <span className="text-red-500">*</span>
            </label>
            <select
              id="instalacao-participante"
              value={instalacaoId}
              onChange={(event) => setInstalacaoId(event.target.value)}
              disabled={instalacoesDisponiveis.length === 0}
              className={CAMPO_CONTROLE}
            >
              <option value="">Selecione a instalação</option>
              {instalacoesDisponiveis.map((instalacao) => (
                <option key={instalacao.id} value={instalacao.id}>
                  {instalacao.nome} — {installationTypeLabel(instalacao.tipo)}
                </option>
              ))}
            </select>
            {instalacoesDisponiveis.length === 0 && (
              <p className="text-xs text-gray-400">
                Todas as instalações cadastradas já participam desta rodada.
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="responsavel-participante" className={CAMPO_LABEL}>
              Usuário responsável <span className="text-red-500">*</span>
            </label>
            <select
              id="responsavel-participante"
              value={responsavelId}
              onChange={(event) => setResponsavelId(event.target.value)}
              disabled={usuariosResponsaveis.length === 0}
              className={CAMPO_CONTROLE}
            >
              <option value="">Selecione o usuário responsável</option>
              {usuariosResponsaveis.map((usuario) => (
                <option key={usuario.id} value={usuario.id}>
                  {usuario.nome}
                </option>
              ))}
            </select>
          </div>
        </div>

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
            Adicionar
          </button>
        </div>
      </form>
    </div>
  );
}

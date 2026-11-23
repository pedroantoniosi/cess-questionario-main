"use client";

import {
  Archive,
  CheckCheck,
  Eye,
  GitBranch,
  Hash,
  History,
  Pencil,
  RefreshCw,
  Send,
  Settings2,
  Undo2,
} from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

import Accordion from "@/components/ui/Accordion";

import AccordionSummary from "./AccordionSummary";
import {
  PUBLICATION_STATUS_LABELS,
  PUBLICATION_STATUS_STYLES,
  STATUS_RODADA_VINCULADA_LABELS,
  STATUS_RODADA_VINCULADA_STYLES,
} from "./questionarioDetailData";
import type { QuestionarioDetalhe } from "./types";

interface QuestionarioDetailPageProps {
  questionario: QuestionarioDetalhe;
}

function Campo({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="flex flex-col gap-1">
      <p className="text-xs text-gray-400">{label}</p>
      <p className="text-sm font-medium text-gray-100">{value}</p>
    </div>
  );
}

function SectionHeader({
  icon,
  eyebrow,
  titulo,
  contagem,
}: {
  icon: ReactNode;
  eyebrow: string;
  titulo: string;
  contagem?: number;
}) {
  return (
    <div className="flex flex-col gap-1">
      <span className="flex items-center gap-2 text-xs font-semibold tracking-wide text-gray-500 uppercase">
        {icon}
        {eyebrow}
      </span>
      <span className="flex items-center gap-2 text-sm font-semibold text-gray-100">
        {titulo}
        {contagem !== undefined && (
          <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs font-medium text-gray-300">
            {contagem}
          </span>
        )}
      </span>
    </div>
  );
}

function EstadoVazio({
  titulo,
  descricao,
}: {
  titulo: string;
  descricao: string;
}) {
  return (
    <div className="flex flex-col items-center gap-1 rounded-xl border border-dashed border-white/10 px-4 py-8 text-center">
      <p className="text-sm font-medium text-gray-300">{titulo}</p>
      <p className="text-xs text-gray-500">{descricao}</p>
    </div>
  );
}

const BOTAO_BASE =
  "inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer";
const BOTAO_OUTLINE = `${BOTAO_BASE} border border-white/10 text-gray-200 hover:bg-white/10`;
const BOTAO_PRIMARIO = `${BOTAO_BASE} bg-sky-600 text-white hover:bg-sky-500`;
const BOTAO_PERIGO = `${BOTAO_BASE} bg-red-600 text-white hover:bg-red-500`;

export default function QuestionarioDetailPage({
  questionario,
}: QuestionarioDetailPageProps) {
  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold text-white">
            {questionario.titulo}
          </h1>
          <p className="text-sm text-gray-400">{questionario.descricao}</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button type="button" className={BOTAO_OUTLINE}>
            <Eye size={13} />
            Prévia
          </button>

          <button type="button" className={BOTAO_OUTLINE}>
            <Pencil size={13} />
            Editar
          </button>

          <button type="button" className={BOTAO_PRIMARIO}>
            <Undo2 size={13} />
            Voltar para rascunho
          </button>

          <button type="button" className={BOTAO_PERIGO}>
            <Archive size={13} />
            Arquivar
          </button>

          <button type="button" className={BOTAO_OUTLINE}>
            <GitBranch size={13} />
            Criar nova versão
          </button>

          <button type="button" className={BOTAO_PRIMARIO}>
            <Settings2 size={13} />
            Gerenciar versão e perguntas
          </button>
        </div>
      </header>

      <Accordion
        defaultOpen
        summary={
          <>
            <Campo
              label="Versão"
              value={`${questionario.versao}.${questionario.revisao}`}
            />
            <Campo label="Idioma" value={questionario.idioma} />
            <Campo
              label="Publicação"
              value={
                <span
                  className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${PUBLICATION_STATUS_STYLES[questionario.publicationStatus]}`}
                >
                  {PUBLICATION_STATUS_LABELS[questionario.publicationStatus]}
                </span>
              }
            />
            <Campo
              label="Status"
              value={
                <span
                  className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                    questionario.ativo
                      ? "bg-[#84CC16]/15 text-[#84CC16]"
                      : "bg-white/10 text-gray-400"
                  }`}
                >
                  {questionario.ativo ? "Ativo" : "Inativo"}
                </span>
              }
            />
          </>
        }
      >
        <section className="flex flex-col gap-4">
          <SectionHeader
            icon={<History size={14} />}
            eyebrow="Controle e rastreabilidade"
            titulo="Publicação e auditoria"
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Campo
              label="Publicado em"
              value={questionario.publicadoEm ?? "—"}
            />
            <Campo label="Criado em" value={questionario.criadoEm} />
            <Campo label="Atualizado em" value={questionario.atualizadoEm} />
            <Campo label="Criado por" value={questionario.criadoPor} />
            <Campo label="Atualizado por" value={questionario.atualizadoPor} />
          </div>
        </section>
      </Accordion>

      <Accordion
        background="bg-card"
        summary={
          <AccordionSummary
            icon={<Send size={16} className="text-gray-400" />}
            titulo="Submissões"
            meta={[`${questionario.submissoes.length} submissões`]}
          />
        }
      >
        {questionario.submissoes.length === 0 ? (
          <EstadoVazio
            titulo="Nenhuma submissão registrada"
            descricao="Ainda não existem respostas registradas para este questionário."
          />
        ) : (
          <div className="flex flex-col gap-2">
            {questionario.submissoes.map((submissao) => (
              <div
                key={submissao.id}
                className="flex items-center justify-between gap-3 rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3"
              >
                <p className="text-sm font-medium text-gray-200">
                  {submissao.id}
                </p>
                <div className="flex items-center gap-4 text-xs text-gray-400">
                  <span>{submissao.enviadaEm ?? "—"}</span>
                  <span className="rounded-full bg-[#0A4542]/60 px-3 py-1 font-medium text-[#55B9AA]">
                    {submissao.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </Accordion>

      <Accordion
        background="bg-card"
        summary={
          <AccordionSummary
            icon={<CheckCheck size={16} className="text-gray-400" />}
            titulo="Perguntas vinculadas"
            meta={[`${questionario.perguntas.length} perguntas`]}
          />
        }
      >
        {questionario.perguntas.length === 0 ? (
          <EstadoVazio
            titulo="Nenhuma pergunta vinculada"
            descricao="Este questionário ainda não possui perguntas na composição."
          />
        ) : (
          <div className="flex flex-col gap-2">
            {questionario.perguntas.map((pergunta) => (
              <div
                key={pergunta.id}
                className="flex items-start gap-3 rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3"
              >
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/10 text-xs font-semibold text-gray-300">
                  {pergunta.ordem}
                </span>
                <div className="flex flex-col gap-1">
                  <p className="text-sm text-gray-200">{pergunta.texto}</p>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-500">
                    {pergunta.obrigatoria && (
                      <span className="flex items-center gap-1 text-amber-300">
                        <Hash size={12} />
                        Obrigatória
                      </span>
                    )}
                    <span>ID da pergunta: {pergunta.id}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Accordion>

      <Accordion
        background="bg-card"
        summary={
          <AccordionSummary
            icon={<RefreshCw size={16} className="text-gray-400" />}
            titulo="Rodadas vinculadas"
            meta={[`${questionario.rodadas.length} rodadas`]}
          />
        }
      >
        {questionario.rodadas.length === 0 ? (
          <EstadoVazio
            titulo="Nenhuma rodada vinculada"
            descricao="Este questionário ainda não foi associado a nenhuma rodada."
          />
        ) : (
          <div className="flex flex-col gap-2">
            {questionario.rodadas.map((rodada) => (
              <Link
                key={rodada.id}
                href={`/rodadas/${rodada.id}`}
                className="flex items-center justify-between gap-3 rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3 transition-colors hover:bg-white/[0.05]"
              >
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-medium text-gray-200">
                    {rodada.titulo}
                  </p>
                  <p className="text-xs text-gray-500">{rodada.periodo}</p>
                </div>
                <span
                  className={`inline-flex shrink-0 rounded-full px-3 py-1 text-xs font-medium ${STATUS_RODADA_VINCULADA_STYLES[rodada.status]}`}
                >
                  {STATUS_RODADA_VINCULADA_LABELS[rodada.status]}
                </span>
              </Link>
            ))}
          </div>
        )}
      </Accordion>
    </div>
  );
}

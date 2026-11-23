import type { LucideIcon } from "lucide-react";

import {
  NivelProximo,
  SituacaoRodadaDados,
} from "../dashboard/resumoRodada/types";
import { AvaliacaoRodadaDados } from "../historico/types";
import { UsuarioRespondente } from "../shared/usuarioData";

export type Tema = "claro" | "escuro" | "automatico";
export type BarraLateral = "expandida" | "recolhida";
export type ModoCompacto = "ativado" | "inativo";

export interface Preferencias {
  tema: Tema;
  barraLateral: BarraLateral;
  modoCompacto: ModoCompacto;
}

export interface OpcaoPreferencia<Valor extends string> {
  valor: Valor;
  rotulo: string;
  icone: LucideIcon;
}

/** Um grupo de opções da seção "Preferências do sistema". */
export interface GrupoPreferencia<Chave extends keyof Preferencias> {
  chave: Chave;
  titulo: string;
  opcoes: OpcaoPreferencia<Preferencias[Chave]>[];
}

export interface SessaoAtual {
  dispositivo: string;
  desde: string;
  /** Data e hora da última atividade na sessão. */
  ultimaAtividade: string;
  ativa: boolean;
}

export interface BannerDados {
  titulo: string;
  descricao: string;
  rodape: string;
}

export interface ConfiguracoesDados {
  usuario: UsuarioRespondente;
  sessao: SessaoAtual;
  preferenciasPadrao: Preferencias;
  banner: BannerDados;
  /** Situação da rodada mais recente (mesmos dados do dashboard). */
  situacao: SituacaoRodadaDados;
  avaliacao: AvaliacaoRodadaDados;
  proximosNiveis: NivelProximo[];
}

export interface ConfiguracoesProps {
  /** Se não for fornecido, o componente usa os dados mockados padrão. */
  dados?: Partial<ConfiguracoesDados>;
  className?: string;
}

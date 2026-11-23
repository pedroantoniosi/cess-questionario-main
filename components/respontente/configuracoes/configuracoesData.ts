import {
  Check,
  Monitor,
  Moon,
  PanelLeft,
  PanelLeftClose,
  Square,
  Sun,
} from "lucide-react";

import { mockHistorico } from "../historico/historicoData";
import { mockUsuario } from "../shared/usuarioData";
import { ConfiguracoesDados, GrupoPreferencia } from "./types";

/** Chave usada para guardar as preferências neste navegador. */
export const CHAVE_PREFERENCIAS = "questionario:respondente:preferencias";

/** Chave da data e hora do último salvamento das preferências. */
export const CHAVE_PREFERENCIAS_SALVAS_EM = `${CHAVE_PREFERENCIAS}:salvasEm`;

/** Grupos e opções da seção "Preferências do sistema". */
export const GRUPO_TEMA: GrupoPreferencia<"tema"> = {
  chave: "tema",
  titulo: "Tema",
  opcoes: [
    { valor: "claro", rotulo: "Claro", icone: Sun },
    { valor: "escuro", rotulo: "Escuro", icone: Moon },
    { valor: "automatico", rotulo: "Automático", icone: Monitor },
  ],
};

export const GRUPO_BARRA_LATERAL: GrupoPreferencia<"barraLateral"> = {
  chave: "barraLateral",
  titulo: "Barra lateral",
  opcoes: [
    { valor: "expandida", rotulo: "Expandida", icone: PanelLeft },
    { valor: "recolhida", rotulo: "Recolhida", icone: PanelLeftClose },
  ],
};

export const GRUPO_MODO_COMPACTO: GrupoPreferencia<"modoCompacto"> = {
  chave: "modoCompacto",
  titulo: "Modo compacto",
  opcoes: [
    { valor: "ativado", rotulo: "Ativado", icone: Check },
    { valor: "inativo", rotulo: "Inativo", icone: Square },
  ],
};

/**
 * Dados de exemplo (mock). Serão substituídos pelos dados da API
 * quando o backend for ligado a esta tela.
 */
export const mockConfiguracoes: ConfiguracoesDados = {
  usuario: mockUsuario,

  sessao: {
    dispositivo: "Navegador · Windows",
    desde: "11/11/2026, 14:34",
    ultimaAtividade: "11/11/2026, 14:40",
    ativa: true,
  },

  // Mesmos dados da rodada exibidos no dashboard e no histórico
  situacao: mockHistorico.situacao,
  avaliacao: mockHistorico.avaliacao,
  proximosNiveis: mockHistorico.proximosNiveis,

  preferenciasPadrao: {
    tema: "escuro",
    barraLateral: "expandida",
    modoCompacto: "inativo",
  },

  banner: {
    titulo: "Portos Circulares: rumo à sustentabilidade",
    descricao:
      "Suas informações ajudam a fortalecer a gestão ambiental e a circularidade nos portos.",
    rodape:
      "Dados consistentes apoiam decisões mais eficientes e sustentáveis.",
  },
};

import { Monitor, UserCheck } from "lucide-react";

import { mockUsuario } from "../shared/usuarioData";
import { PerfilDados } from "./types";

/** Onde fica a troca de senha (seção de segurança das Configurações). */
export const ROTA_ALTERAR_SENHA = "/respondente/configuracoes";

/**
 * Dados de exemplo (mock). Serão substituídos pelos dados da API
 * quando o backend for ligado a esta tela.
 */
export const mockPerfil: PerfilDados = {
  usuario: { ...mockUsuario, ultimoAcesso: "12/11/2026, 09:35" },
  cadastroPercentual: 100,
  indicadores: [
    { id: "modulos", valor: 5, rotulo: "Módulos", icone: UserCheck },
    { id: "sessoes", valor: 1, rotulo: "Sessão ativa", icone: Monitor },
  ],
};

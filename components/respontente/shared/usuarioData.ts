export interface UsuarioRespondente {
  nome: string;
  email: string;
  telefone: string;
  perfil: string;
  instalacao: string;
  ultimoAcesso: string;
  ultimaAtualizacao: string;
  ativo: boolean;
}

/**
 * Usuário de exemplo (mock), usado em Configurações e em Perfil.
 * Será substituído pelo usuário autenticado quando o backend for ligado.
 */
export const mockUsuario: UsuarioRespondente = {
  nome: "Respondent",
  email: "respondent@questionnaire.com",
  telefone: "+55 21 90000-0004",
  perfil: "Respondente",
  instalacao: "Dock Brasil Engenharia e Serviços S.A.",
  ultimoAcesso: "11/11/2026, 14:34",
  ultimaAtualizacao: "11/11/2026, 14:34",
  ativo: true,
};

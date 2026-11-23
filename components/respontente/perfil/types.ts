import type { LucideIcon } from "lucide-react";

import { UsuarioRespondente } from "../shared/usuarioData";

/** Indicador exibido no rodapé do card "Status do perfil". */
export interface IndicadorPerfil {
  id: string;
  valor: number;
  rotulo: string;
  icone: LucideIcon;
}

export interface PerfilDados {
  usuario: UsuarioRespondente;
  /** Percentual de preenchimento do cadastro, de 0 a 100. */
  cadastroPercentual: number;
  indicadores: IndicadorPerfil[];
}

export interface PerfilProps {
  /** Se não for fornecido, o componente usa os dados mockados padrão. */
  dados?: Partial<PerfilDados>;
  className?: string;
}

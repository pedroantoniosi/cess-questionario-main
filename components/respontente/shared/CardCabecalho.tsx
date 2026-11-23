import type { ReactNode } from "react";

interface CardCabecalhoProps {
  titulo: string;
  descricao: string;
  icone: ReactNode;
  /** Conteúdo à direita do título (ex.: botão). */
  acao?: ReactNode;
}

/** Cabeçalho padrão dos cards do respondente: o nome fica dentro do card. */
export default function CardCabecalho({
  titulo,
  descricao,
  icone,
  acao,
}: CardCabecalhoProps) {
  return (
    <header className="flex items-start justify-between gap-3">
      <div className="flex min-w-0 items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-(--color-high)/30 bg-(--color-high)/10 text-(--color-high)">
          {icone}
        </div>

        <div className="flex min-w-0 flex-col">
          <h2 className="text-lg font-bold leading-tight">{titulo}</h2>
          <p className="text-sm text-gray-400">{descricao}</p>
        </div>
      </div>

      {acao && <div className="flex shrink-0 items-center gap-2">{acao}</div>}
    </header>
  );
}

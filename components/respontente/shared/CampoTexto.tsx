interface CampoTextoProps {
  id: string;
  rotulo: string;
  valor: string;
  tipo?: "text" | "email" | "tel";
  obrigatorio?: boolean;
  /** Campo que o respondente não pode alterar (aparece esmaecido). */
  bloqueado?: boolean;
  /** Campo editável, mas travado neste momento. */
  somenteLeitura?: boolean;
  ajuda?: string;
  onAlterar?: (valor: string) => void;
}

/** Campo de texto com rótulo, no padrão dos cards escuros. */
export default function CampoTexto({
  id,
  rotulo,
  valor,
  tipo = "text",
  obrigatorio = false,
  bloqueado = false,
  somenteLeitura = false,
  ajuda,
  onAlterar,
}: CampoTextoProps) {
  const ajudaId = ajuda ? `${id}-ajuda` : undefined;

  return (
    <div className="flex min-w-0 flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-bold text-white">
        {rotulo}
        {obrigatorio && (
          <span className="ml-1 text-(--color-high)" aria-hidden="true">
            *
          </span>
        )}
      </label>

      <input
        id={id}
        type={tipo}
        value={valor}
        required={obrigatorio}
        disabled={bloqueado}
        readOnly={somenteLeitura || !onAlterar}
        aria-describedby={ajudaId}
        onChange={(evento) => onAlterar?.(evento.target.value)}
        className="w-full rounded-lg border border-white/15 bg-template px-3 py-2.5 text-sm text-white outline-none transition-colors focus-visible:border-(--color-high) focus-visible:ring-2 focus-visible:ring-(--color-high)/40 read-only:cursor-default disabled:cursor-not-allowed disabled:text-gray-500"
      />

      {ajuda && (
        <p id={ajudaId} className="text-xs text-gray-400">
          {ajuda}
        </p>
      )}
    </div>
  );
}

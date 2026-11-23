import { Questao, RespostaQuestao } from "./types";

interface QuestaoCampoProps {
  questao: Questao;
  resposta: RespostaQuestao;
  somenteLeitura: boolean;
  onResponder: (resposta: RespostaQuestao) => void;
}

const CAMPO =
  "w-full rounded-lg border border-white/15 bg-card px-3 py-2.5 text-sm text-white placeholder:text-gray-500 outline-none transition-colors focus-visible:border-(--color-high) focus-visible:ring-2 focus-visible:ring-(--color-high)/40 read-only:cursor-default read-only:text-gray-200";

const OPCAO =
  "flex items-center gap-3 rounded-lg border border-white/15 bg-card px-3 py-2.5 text-sm text-white has-[:checked]:border-(--color-high)/60 has-[:checked]:bg-(--color-high)/10";

/** Uma questão: enunciado, código e o campo conforme o tipo. */
export default function QuestaoCampo({
  questao,
  resposta,
  somenteLeitura,
  onResponder,
}: QuestaoCampoProps) {
  const campoId = `questao-${questao.id}`;
  const texto = typeof resposta === "string" ? resposta : "";
  const lista = Array.isArray(resposta) ? resposta : [];
  const emGrupo =
    questao.tipo === "opcao_unica" || questao.tipo === "multipla_escolha";

  const enunciado = (
    <>
      <strong className="font-bold">{questao.numero})</strong> {questao.texto}
      {questao.obrigatoria && (
        <span className="ml-1 font-bold text-(--color-high)" aria-hidden="true">
          *
        </span>
      )}
      {questao.obrigatoria && <span className="sr-only"> (obrigatória)</span>}
    </>
  );

  const codigo = (
    <span className="shrink-0 rounded-md border border-white/15 px-2 py-0.5 text-xs font-semibold text-gray-300">
      {questao.codigo}
    </span>
  );

  if (emGrupo) {
    const multipla = questao.tipo === "multipla_escolha";

    return (
      <fieldset
        className="flex min-w-0 flex-col gap-3 rounded-xl border border-white/10 bg-template p-4"
        disabled={somenteLeitura}
      >
        <div className="flex flex-wrap items-start justify-between gap-2">
          <legend className="float-left text-base text-white">{enunciado}</legend>
          {codigo}
        </div>

        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {(questao.opcoes ?? []).map((opcao) => {
            const marcada = multipla ? lista.includes(opcao) : texto === opcao;

            return (
              <label key={opcao} className={OPCAO}>
                <input
                  type={multipla ? "checkbox" : "radio"}
                  name={campoId}
                  value={opcao}
                  checked={marcada}
                  required={questao.obrigatoria && !multipla}
                  onChange={() =>
                    onResponder(
                      multipla
                        ? marcada
                          ? lista.filter((item) => item !== opcao)
                          : [...lista, opcao]
                        : opcao,
                    )
                  }
                  className="h-4 w-4 accent-(--color-high)"
                />
                {opcao}
              </label>
            );
          })}
        </div>
      </fieldset>
    );
  }

  return (
    <div className="flex flex-col gap-3 rounded-xl border border-white/10 bg-template p-4">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <label htmlFor={campoId} className="text-base text-white">
          {enunciado}
        </label>
        {codigo}
      </div>

      {questao.tipo === "texto_longo" ? (
        <textarea
          id={campoId}
          rows={4}
          value={texto}
          readOnly={somenteLeitura}
          required={questao.obrigatoria}
          onChange={(evento) => onResponder(evento.target.value)}
          className={`${CAMPO} resize-y`}
        />
      ) : (
        <input
          id={campoId}
          type={questao.tipo === "numero" ? "number" : "text"}
          value={texto}
          readOnly={somenteLeitura}
          required={questao.obrigatoria}
          onChange={(evento) => onResponder(evento.target.value)}
          className={CAMPO}
        />
      )}
    </div>
  );
}

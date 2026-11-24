import { decisionFeatures } from "./data/content";

export function DecisionSection() {
  return (
    <section className="flex w-full flex-col gap-5 border-b-[7px] border-white bg-[--cess-green] px-5 py-6 text-white sm:px-8 md:px-[3.2%] md:py-5">
      <div className="flex flex-col gap-1">
        <h2 className="section-title dark-section-title">
          Inteligência para decisão
        </h2>
        <p className="pl-4 text-[0.98rem] leading-snug text-white/95">
          Gera informações confiáveis e padronizadas, apoiando a Petrobras e os
          fornecedores da cadeia de reciclagem.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {decisionFeatures.map(({ title, description, icon: Icon }) => (
          <article
            key={title}
            className="flex min-h-30 flex-col gap-2 rounded-[17px] border-2 border-[#d4e4d9] px-5 py-3"
          >
            <div className="flex items-center gap-3">
              <Icon
                className="shrink-0 text-[--cess-lime]"
                size={42}
                strokeWidth={2.5}
              />
              <h3 className="max-w-52 text-[1.12rem] font-extrabold leading-[1.05]">
                {title}
              </h3>
            </div>
            <p className="text-[0.93rem] leading-[1.2] text-white/95">
              {description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

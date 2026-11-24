import { respondentProfile } from "./data/content";

export function AboutPlatformSection() {
  const Icon = respondentProfile.icon;

  return (
    <section className="grid w-full grid-cols-1 gap-6 border-b-[7px] border-white bg-[--cess-green] px-5 py-6 text-white sm:px-8 md:grid-cols-2 md:gap-8 md:px-[5.2%] md:py-5">
      <div className="flex flex-col gap-5">
        <h2 className="section-title dark-section-title">Sobre a Plataforma</h2>
        <p className="pl-1 text-[0.98rem] leading-[1.28]">
          Ambiente colaborativo que organiza e consolida informações da cadeia
          de reciclagem de plataformas offshore no Brasil, conectando
          estaleiros, portos e recicladoras e estruturada para análises da
          Petrobras.
        </p>
        <div className="flex items-center gap-3 border-l-[6px] border-[--cess-lime] py-1 pl-3 text-[1rem] font-extrabold leading-[1.2] text-[--cess-lime]">
          Ao final da participação, cada instalação receberá, de forma
          confidencial, sua avaliação de maturidade, com indicações de
          melhorias.
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <div className="h-31.5 overflow-hidden rounded-[22px] border-2 border-[--cess-lime]">
          <img
            src="/images/recycling-shipyard.png"
            alt="Navio e estrutura portuária de reciclagem"
            className="h-full w-full object-cover object-center"
          />
        </div>

        <article className="flex min-h-30 items-start gap-4 rounded-[18px] bg-[#f7faf7] px-5 py-4 text-[#10251b]">
          <div className="flex w-20 shrink-0 items-center justify-center pt-1 text-[#efb900]">
            <Icon size={42} strokeWidth={2.3} />
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="text-[1.25rem] font-extrabold leading-[1.05] text-[--cess-green)]">
              {respondentProfile.title}
            </h3>
            <p className="text-[0.86rem] leading-tight">
              {respondentProfile.description}
            </p>
          </div>
        </article>
      </div>
    </section>
  );
}

import Title from "../home2/ui/Title";
import Container from "../ui/Container";
import { respondentProfile } from "./data/content";

export function AboutPlatformSection() {
  const Icon = respondentProfile.icon;

  return (
    <section
      className="relative border-y-2 border-transparent bg-linear-to-r from-[#014720] via-[#014720]
  to-[#014720] px-4 py-12 sm:py-16
  before:absolute before:inset-x-0 before:top-0 before:h-0.5
  before:bg-[linear-gradient(to_right,transparent_30%,#278C2C_50%,transparent_70%)]
  after:absolute after:inset-x-0 after:bottom-0 after:h-0.5
  after:bg-[linear-gradient(to_right,transparent_30%,#278C2C_50%,transparent_70%)]"
    >
      <Container className="grid md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-4 justify-center">
          <Title variant="light">Sobre a Plataforma</Title>
          <p className="text-md text-white max-w-120">
            Ambiente colaborativo que organiza e consolida informações da cadeia
            de reciclagem de plataformas offshore no Brasil, conectando
            estaleiros, portos e recicladoras e estruturada para análises da
            Petrobras.
          </p>
          <div className="mt-auto max-w-120   border-l-[6px] border-(--cess-yellow) py-1 pl-3 text-sm font-bold text-(--cess-yellow)">
            Ao final da participação, cada instalação receberá, de forma
            confidencial, sua avaliação de maturidade, com indicações de
            melhorias.
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <img
            src="/assets/v2/recycling-shipyard.webp"
            alt=""
            className="rounded-xl h-70 object-cover"
          />
        </div>
      </Container>
    </section>
  );
}

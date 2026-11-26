import Title from "../home2/ui/Title";
import Container from "../ui/Container";
import { respondentProfile } from "./data/content";

export function AboutPlatformSection() {
  const Icon = respondentProfile.icon;

  return (
    <section className="py-16 bg-(--cess-green-dark)">
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
            src="/images/vessel.jpg"
            alt=""
            className="rounded-xl h-70 object-cover"
          />
        </div>
      </Container>
    </section>
  );
}

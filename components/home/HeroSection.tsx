import Link from "next/link";
import Button from "../home/ui/Button";
import Title from "../home/ui/Title";
import Container from "../ui/Container";

export function HeroSection() {
  return (
    <section
      className={`flex items-center w-full bg-[url('/assets/hero-mobile.png')] md:bg-[url('/assets/hero.png')] bg-cover min-h-svh md:min-h-[80svh]`}
    >
      <Container className="grid md:grid-cols-2 items-center min-h-[80svh] ">
        <div className="flex flex-col items-start gap-4">
          <h1 className="max-w-135 text-white text-2xl md:text-3xl font-black">
            <Title variant="light">
              {" "}
              Conheça, avalie e fortaleça a capacidade da cadeia de
            </Title>{" "}
            <span className="text-(--v1-green) text-yellow">
              reciclagem de plataformas no Brasil.
            </span>
          </h1>
          <p className="max-w-110 text-sm text-white/80">
            Plataforma para cadastro e caracterização de estaleiros, portos e
            recicladoras que atuam ou desejam atuar no descomissionamento de
            plataformas offshore.
          </p>
          <div className="flex gap-2 mt-4">
            <Link href="/PageInProgress">
              <Button variant="green">Cadastre sua Instalação</Button>
            </Link>

            <Link href="/PageInProgress">
              <Button>Ver Indicadores</Button>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}

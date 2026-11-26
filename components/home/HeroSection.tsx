import Link from "next/link";
import Button from "../home/ui/Button";
import Title from "../home/ui/Title";
import Container from "../ui/Container";

export function HeroSection() {
  return (
    <section
      className={`flex items-center w-full bg-[url('/assets/v1/hero-mobile.webp')] 
        md:bg-[url('/assets/v1/hero.webp')] bg-cover md:min-h-[75svh] py-16`}
    >
      <Container className="grid md:grid-cols-2 items-center  ">
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
          <div className="flex flex-col md:flex-row gap-2 mt-4">
            <Link href="https://questionario-cess.vercel.app/login">
              <Button variant="green">Cadastre sua Instalação</Button>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}

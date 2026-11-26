import Link from "next/link";
import Button from "../home2/ui/Button";
import Container from "../ui/Container";

export function HeroSection() {
  return (
    <section
      className="bg-(--cess-green-dark) g-[url('/assets/v2/hero-mobile.webp')] 
        md:bg-[url('/assets/v2/hero.webp')] bg-cover min-h-[88svh] flex items-center"
    >
      <Container className="grid md:grid-cols-2 items-center ">
        <div className="flex flex-col items-start gap-4">
          <span className="mt-1 h-14 w-1.5 shrink-0 " />
          <h1 className="max-w-135 text-white text-2xl md:text-4xl font-black">
            Conheça, avalie e fortaleça a capacidade da cadeia de{" "}
            <span className="text-(--cess-yellow)">
              reciclagem de plataformas no Brasil.
            </span>
          </h1>
          <p className="max-w-110 text-sm text-white/80">
            Plataforma para cadastro e caracterização de estaleiros, portos e
            recicladoras que atuam ou desejam atuar no descomissionamento de
            plataformas offshore.
          </p>
          <div className="flex gap-2">
            <Link href="https://questionario-cess.vercel.app/login">
              <Button variant="yellow">Cadastre sua Instalação</Button>
            </Link>
          </div>
        </div>

        {/* <div className="flex items-center">
          <img
            src="/images/offshore-platform.png"
            alt="Plataforma offshore ao pôr do sol"
            className="w-200"
          />
        </div> */}
      </Container>
    </section>
  );
}

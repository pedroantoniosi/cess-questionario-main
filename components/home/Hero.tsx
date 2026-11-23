import Button from "@/components/home/ui/Button";
import Container from "@/components/ui/Container";
import Link from "next/link";

export default function Hero() {
  return (
    <>
      <section className="bg-cover z-1">
        <div className="absolute  w-full h-full bg-[url('/assets/Hero-Mobile.png')] md:bg-[url('/assets/Hero.png')] opacity-20 md:opacity-100 bg-cover  z-0" />
        <Container className="min-h-svh  flex items-center">
          <div className="flex flex-col gap-4 z-10">
            <h2 className="text-2xl md:text-4xl max-w-110 font-bold">
              Modelo de Maturidade{" "}
              <span className="text-amber-400">
                Descomissinamento Offshore{" "}
              </span>
            </h2>
            <p className="text-sm md:text-md max-w-130">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim
              laudantium iure optio error rem aliquam quae tempora recusandae
              sit veritatis!
            </p>
            <div className="flex gap-2 mt-4">
              <Link href={"/login"}>
                <Button variant={"roundedPrimary"}>Acessar Plataforma</Button>
              </Link>
              <Link href={"/indicadores"}>
                <Button variant={"roundedWhite"}>Ver Indicadores</Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

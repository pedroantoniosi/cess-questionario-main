import Container from "@/components/ui/Container";
import Title from "./ui/Title";

export default function Maturidade() {
  return (
    <section className="bg-rh-gradient ">
      <Container className="grid md:grid-cols-2 items-center">
        <div className="flex flex-col gap-2">
          <Title children="Modelo de Maturidade" />
          <p className="max-w-150 text-gray-300">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo quo
            suscipit blanditiis aspernatur qui quasi odio. Dignissimos animi aut
            libero?
          </p>
        </div>
        <div>
          <img src="/assets/modelo-maturidade.png" alt="" />
        </div>
      </Container>
    </section>
  );
}

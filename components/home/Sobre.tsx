import Container from "@/components/ui/Container";
import Title from "./ui/Title";

export default function Sobre() {
  return (
    <section>
      <Container className="grid md:grid-cols-2 items-center">
        <div>
          <Title children="Sobre o Modelo" />
          <p className="text-sm max-w-120">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi qui ab
            distinctio eius, quo similique repellendus officia incidunt
            reiciendis dolorem eum error laudantium deleniti quidem laborum
            culpa ipsam non architecto.
          </p>
        </div>
        <img
          src="/assets/Veleiro.png"
          className="w-400 rounded-4xl border-gray-700 border-2 md:border-4"
          alt=""
        />
      </Container>
    </section>
  );
}

import Container from "@/components/ui/Container";

const parceiros = [
  {
    name: "CESS",
    href: "https://cess.uff.br/",
    logo: "/logos/logo-cess.png",
  },
  {
    name: "Petrobras",
    href: "https://petrobras.com.br/",
    logo: "/logos/logo-petrobras.png",
  },
  {
    name: "UFF",
    href: "https://www.uff.br/",
    logo: "/logos/logo-uff.png",
  },
];

export default function Parceiros() {
  return (
    <section>
      <Container className="flex gap-8 justify-center items-center">
        {parceiros.map((parceiro) => (
          <a
            key={parceiro.name}
            href={parceiro.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Visitar site oficial da ${parceiro.name}`}
          >
            <img
              src={parceiro.logo}
              alt={`Logo ${parceiro.name}`}
              className="w-15 md:w-25 cursor-pointer transition-transform hover:scale-110"
            />
          </a>
        ))}
      </Container>
    </section>
  );
}

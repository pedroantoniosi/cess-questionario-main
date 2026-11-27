import Link from "next/link";
import Container from "../ui/Container";

export default function Partners() {
  return (
    <section className="py-4">
      <Container className="flex items-center justify-center gap-8">
        <Link
          href="https://www.uff.br/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="/images/logos/uff.png"
            className="w-12 md:w-25 transition-transform duration-200 hover:-translate-y-1"
            alt="Universidade Federal Fluminense"
          />
        </Link>

        <span className="h-15 w-1 bg-linear-to-b from-transparent via-(--cess-green) to-transparent md:h-20" />

        <Link
          href="https://cess.uff.br/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="/images/logos/cess.png"
            className="w-12 md:w-20 transition-transform duration-200 hover:-translate-y-1"
            alt="CESS"
          />
        </Link>

        <span className="h-15 w-1 bg-linear-to-b from-transparent via-(--cess-green) to-transparent md:h-20" />

        <Link
          href="https://petrobras.com.br/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="/images/logos/petrobras.png"
            className="h-auto w-20 md:w-50 transition-transform duration-200 hover:-translate-y-1"
            alt="Petrobras"
          />
        </Link>
      </Container>
    </section>
  );
}

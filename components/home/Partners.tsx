import Container from "../ui/Container";

const partners = [
  {
    name: "Universidade Federal Fluminense",
    src: "/images/logos/uff.png",
    href: "https://www.uff.br/",
    className: "w-16 sm:w-20 md:w-24",
  },
  {
    name: "CESS",
    src: "/images/logos/cess.png",
    href: "https://cess.uff.br/",
    className: "w-16 sm:w-20 md:w-24",
  },
  {
    name: "Petrobras",
    src: "/images/logos/petrobras.png",
    href: "https://petrobras.com.br/",
    className: "w-28 sm:w-36 md:w-44",
  },
];

export default function Partners() {
  return (
    <section className="relative overflow-hidden bg-gray-200/50 px-4 py-5 sm:py-10">
      <Container className="flex items-center justify-center rounded-2xl bg-white py-9 shadow-2">
        <div className="flex">
          {partners.map((partner, index) => (
            <div
              key={partner.name}
              className="flex items-center justify-center gap-x-6 sm:gap-x-10 md:gap-x-14"
            >
              <a
                href={partner.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visitar site da ${partner.name}`}
                className="flex items-center justify-center"
              >
                <img
                  src={partner.src}
                  alt={partner.name}
                  loading="lazy"
                  decoding="async"
                  className={`${partner.className} h-auto max-h-16 object-contain transition-transform duration-300 hover:scale-105 sm:max-h-20`}
                />
              </a>

              {index !== partners.length - 1 && (
                <span
                  aria-hidden="true"
                  className="h-10 w-px shrink-0 bg-gradient-to-b from-transparent via-(--cess-green)/30 to-transparent sm:h-14"
                />
              )}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

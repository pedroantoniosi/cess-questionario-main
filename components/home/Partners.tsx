import Container from "../ui/Container";

const partners = [
  {
    name: "Universidade Federal Fluminense",
    src: "/images/logos/uff.png",
    className: "w-16 sm:w-20 md:w-24",
  },
  {
    name: "CESS",
    src: "/images/logos/cess.png",
    className: "w-16 sm:w-20 md:w-24",
  },
  {
    name: "Petrobras",
    src: "/images/logos/petrobras.png",
    className: "w-28 sm:w-36 md:w-44",
  },
];

export default function Partners() {
  return (
    <section className="relative overflow-hidden bg-white px-4 py-5 sm:py-10">
      <Container className="flex items-center justify-center">
        <div className="flex w-full max-w-4xl flex-wrap items-center justify-center gap-x-6 gap-y-6 rounded-2xl border border-white/70 bg-white/60 px-5 py-7 shadow-[0_8px_30px_rgba(1,71,32,0.06)] backdrop-blur-xl sm:gap-x-10 sm:px-10 sm:py-9 md:gap-x-14">
          {partners.map((partner, index) => (
            <div
              key={partner.name}
              className="flex items-center justify-center gap-x-6 sm:gap-x-10 md:gap-x-14"
            >
              <img
                src={partner.src}
                alt={partner.name}
                loading="lazy"
                decoding="async"
                className={`${partner.className} h-auto max-h-16 object-contain transition-transform duration-300 hover:scale-105 sm:max-h-20`}
              />

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

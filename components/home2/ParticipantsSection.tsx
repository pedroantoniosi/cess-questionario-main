import Title from "../home2/ui/Title";
import Container from "../ui/Container";
import { participants } from "./data/content";

export function ParticipantsSection() {
  return (
    <section className=" bg-white py-8 md:py-16">
      <Container className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Title variant="green">Quem pode participar?</Title>
          <p className="max-w-120 text-[#151515]">
            O cadastro na plataforma é exclusivo para instalações da cadeia de
            reciclagem de plataformas:
          </p>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {participants.map(({ title, description, icon: Icon }) => (
            <article
              key={title}
              className="flex min-h-36 items-center gap-4 rounded-2xl bg-[#f0f5f1] px-5 py-5 sm:px-6"
            >
              <div className="flex w-22 shrink-0 items-center justify-center text-[#168b45]">
                <Icon size={68} strokeWidth={2.5} />
              </div>
              <div className="flex min-w-0 flex-col gap-2">
                <h3 className="text-[1.35rem] font-extrabold leading-none text-[--cess-green]">
                  {title}
                </h3>
                <p className="text-[0.79rem] leading-[1.28] text-[#151515]">
                  {description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

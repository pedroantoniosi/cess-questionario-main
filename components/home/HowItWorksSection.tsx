import { ChevronRight } from "lucide-react";
import Title from "../home2/ui/Title";
import Container from "../ui/Container";
import { processSteps } from "./data/content";

export function HowItWorksSection() {
  return (
    <section className="py-4 md:py-16">
      <Container className="flex flex-col gap-6">
        <Title variant="light">Como funciona?</Title>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {processSteps.map(({ title, description, icon: Icon }, index) => (
            <article
              key={title}
              className="relative flex flex-col items-center gap-2 text-center"
            >
              <div className="flex h-17.5 w-17.5 items-center justify-center rounded-[17px] bg-[#138c43] text-(--cess-yellow)">
                <Icon size={42} strokeWidth={2.4} />
              </div>
              <h3 className="max-w-48 text-white font-bold text-xl">{title}</h3>
              <p className="max-w-57 text-sm leading-[1.2] text-white/95">
                {description}
              </p>
              {index < processSteps.length - 1 && (
                <ChevronRight
                  aria-hidden="true"
                  className="absolute right-4.25 top-14.5 hidden text-(--cess-yellow) lg:block"
                  size={27}
                  strokeWidth={3}
                />
              )}
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

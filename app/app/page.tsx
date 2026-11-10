import GraficoMaturidade from "@/components/home/graficoMaturidade/GraficoMaturidade";
import Container from "@/components/ui/Container";
import MainTemplate from "@/components/ui/MainTemplate";

export default function Home() {
  return (
    <div>
      <MainTemplate>
        <section className="bg-template py-8">
          <Container className="flex flex-col gap-16">
            <div className="flex gap-4 p-0">
              <div className="flex items-center justify-center w-full h-150 bg-card rounded-xl">
                <GraficoMaturidade />
              </div>
              <div className="w-full h-150 bg-card rounded-xl"></div>
              <div className="w-full h-150 bg-card rounded-xl"></div>
            </div>
            <div className="w-full h-150 bg-card rounded-xl"></div>
            <div className="w-full h-150 bg-card rounded-xl"></div>
          </Container>
        </section>
      </MainTemplate>
    </div>
  );
}

import DistribuicaoPorEstado from "@/components/home/distribuicaoPorEstado/DistribuicaoPorEstado";
import GraficoCoberturaBlocos from "@/components/home/graficoCoberturaBlocos/GraficoCoberturaBlocos";
import GraficoMaturidade from "@/components/home/graficoMaturidade/GraficoMaturidade";
import Card from "@/components/ui/Card";
import Container from "@/components/ui/Container";
import MainTemplate from "@/components/ui/MainTemplate";

export default function Home() {
  return (
    <div>
      <MainTemplate>
        <section className="bg-template py-8">
          <Container className="flex flex-col gap-16">
            <div className="grid grid-cols-1 lg:grid-cols-3 justify-between gap-4">
              <Card>
                <div className="flex flex-col gap-4">
                  <GraficoMaturidade />
                  <GraficoMaturidade />
                </div>
              </Card>
              <div className="w-full h-150 bg-card rounded-xl"></div>
              <div className="w-full h-150 bg-card rounded-xl overflow-auto">
                <Card>
                  <GraficoCoberturaBlocos />
                </Card>
              </div>
            </div>
            <div>
              <DistribuicaoPorEstado />
            </div>
            <div className="w-full h-150 bg-card rounded-xl"></div>
          </Container>
        </section>
      </MainTemplate>
    </div>
  );
}

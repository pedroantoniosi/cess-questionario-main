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
            <div className="grid xl:grid-cols-3 justify-center  gap-4">
              <Card>
                <div className="my-auto">
                  <GraficoMaturidade />
                </div>
              </Card>
              <div className="w-full  bg-card rounded-xl"></div>
              <div className="w-full bg-card rounded-xl ">
                <Card>
                  <GraficoCoberturaBlocos />
                </Card>
              </div>
            </div>
            <div className="w-full  bg-card rounded-xl">
              <DistribuicaoPorEstado />
            </div>
            <div className="w-full h-150 bg-card rounded-xl"></div>
          </Container>
        </section>
      </MainTemplate>
    </div>
  );
}

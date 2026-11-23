import DistribuicaoIDPT from "@/components/analista/home/distribuicaoIDPT/DistribuicaoIDPT";
import DistribuicaoPorEstado from "@/components/analista/home/distribuicaoPorEstado/DistribuicaoPorEstado";
import GraficoMaturidade from "@/components/analista/home/graficoMaturidade/GraficoMaturidade";
import Card from "@/components/ui/Card";
import Container from "@/components/ui/Container";

export default function Home() {
  return (
    <section className="p-0 w-full max-unset ">
      <Container className="flex flex-col gap-4 p-0">
        {/* Mapa de Distribuição Por Estados */}
        <div>
          <DistribuicaoPorEstado />
        </div>
        <div className="grid xl:grid-cols-3 justify-center gap-4">
          <Card className="flex justify-center items-center">
            <GraficoMaturidade />
          </Card>
          <Card className="flex justify-center items-center">
            <DistribuicaoIDPT />
          </Card>
        </div>
      </Container>
    </section>
  );
}

import Container from "../ui/Container";

export default function Partners() {
  return (
    <>
      <section className="bg-white px-2 py-12">
        <Container className="flex items-center justify-center  gap-8">
          <img src="/images/logos/uff.png" className="w-18 md:w-25" alt="" />
          <span className="w-1 h-15 md:h-18 bg-(--cess-green)"></span>
          <img src="/images/logos/cess.png" className="w-18 md:w-20" alt="" />
          <span className="w-1 h-15 md:h-18 bg-(--cess-green)"></span>
          <img
            src="/images/logos/petrobras.png"
            className="w-30  md:w-50 h-auto"
            alt=""
          />
        </Container>
      </section>
    </>
  );
}

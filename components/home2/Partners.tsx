import Container from "../ui/Container";

export default function Partners() {
  return (
    <>
      <section className=" py-4">
        <Container className="flex items-center justify-center  gap-8">
          <img src="/images/logos/uff.png" className="w-12 md:w-25" alt="" />
          <span className="w-1 h-15 md:h-20 bg-linear-to-b from-transparent via-(--cess-green) to-transparent"></span>
          <img src="/images/logos/cess.png" className="w-12 md:w-20" alt="" />
          <span className="w-1 h-15 md:h-20 bg-linear-to-b from-transparent via-(--cess-green) to-transparent"></span>
          <img
            src="/images/logos/petrobras.png"
            className="w-20 md:w-50 h-auto"
            alt=""
          />
        </Container>
      </section>
    </>
  );
}

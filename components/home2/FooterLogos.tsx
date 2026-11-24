export function FooterLogos() {
  return (
    <footer className="relative flex min-h-32 w-full items-center justify-center overflow-hidden bg-white px-4 py-5">
      <img
        src="/images/brand-logos.png"
        alt="Universidade Federal Fluminense, CESS e Petrobras"
        className="h-auto w-full max-w-162 object-contain"
      />
      <div className="absolute inset-x-0 bottom-0 h-2 skew-y-[1.5deg] bg-[--cess-lime]" />
      <div className="absolute inset-x-0 bottom-0 h-1 bg-[--cess-green]" />
    </footer>
  );
}

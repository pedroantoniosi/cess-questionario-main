interface TitleProps {
  children: string;
}

export default function Title({ children }: TitleProps) {
  return (
    <h2 className="text-center md:text-start max-w-100 text-3xl lg:text-4xl mb-2 text-[#2FBA61] font-bold">
      {children}
    </h2>
  );
}

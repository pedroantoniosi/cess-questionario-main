interface TitleProps {
  children: React.ReactNode;
  variant?: "dark" | "light" | "green";
}

export default function Title({ children, variant = "dark" }: TitleProps) {
  const variants = {
    dark: "text-black",
    light: "text-white",
    green: "text-[var(--cess-green-dark)]",
  };

  return (
    <h2
      className={`flex items-center gap-4 text-3xl font-extrabold leading-tight ${variants[variant]}`}
    >
      <span className="h-[1.8rem] w-1.5 shrink-0 bg-yellow-300" />
      {children}
    </h2>
  );
}

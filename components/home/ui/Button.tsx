interface ButtonProps {
  children: React.ReactNode;
  variant?: "white" | "green";
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

export default function Button({
  children,
  variant = "white",
  onClick,
  type = "button",
}: ButtonProps) {
  const variants = {
    white: "bg-white text-black hover:bg-gray-200",
    green: "bg-[var(--v1-green)] text-black hover:brightness-90",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`rounded-md px-4 py-4 font-semibold cursor-pointer transition-colors outline-none ${variants[variant]}`}
    >
      {children}
    </button>
  );
}

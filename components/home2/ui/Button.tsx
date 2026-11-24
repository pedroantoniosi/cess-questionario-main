interface ButtonProps {
  children: React.ReactNode;
  variant?: "white" | "yellow";
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
    yellow: "bg-[var(--cess-yellow)] text-black hover:brightness-90",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`rounded-md px-4 py-2 font-semibold cursor-pointer transition-colors ${variants[variant]}`}
    >
      {children}
    </button>
  );
}

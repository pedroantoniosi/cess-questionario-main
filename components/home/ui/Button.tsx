import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  variant: "roundedPrimary" | "roundedWhite" | "primary" | "white" | "disabled";
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export default function Button({
  children,
  variant,
  onClick,
  type = "button",
  disabled = false,
}: ButtonProps) {
  const variants = {
    roundedPrimary:
      "min-0 bg-green-700 text-white hover:bg-green-800 rounded-4xl",
    roundedWhite: "bg-white text-black hover:bg-gray-200 rounded-4xl",
    primary: "bg-green-700 text-sm  text-white hover:bg-green-800 rounded-lg",
    white: "bg-white text-black hover:bg-gray-200 rounded-lg",
    disabled: "bg-gray-300 text-gray-500 rounded-lg cursor-not-allowed",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || variant === "disabled"}
      className={`px-6 py-4 cursor-pointer w-full max-w-50 font-semibold transition-colors 
        active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50 outline-none ${variants[variant]}`}
    >
      {children}
    </button>
  );
}

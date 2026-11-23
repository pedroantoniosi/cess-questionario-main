import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  variant: "roundedPrimary" | "roundedWhite" | "disabled";
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  fullWidth?: boolean;
  className?: string;
}

export default function Button({
  children,
  variant,
  onClick,
  type = "button",
  disabled = false,
  fullWidth = false,
  className = "",
}: ButtonProps) {
  const variants = {
    roundedPrimary:
      "bg-amber-400 text-slate-900 rounded-xl hover:bg-amber-400/80",

    roundedWhite:
      "border-2 text-white rounded-xl hover:bg-white hover:text-slate-900",

    disabled: "bg-gray-300 text-gray-500 rounded-lg cursor-not-allowed",
  };

  const isDisabled = disabled || variant === "disabled";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      className={`
        inline-flex items-center justify-center
        gap-2
        min-h-11
        px-4 py-2.5
        sm:px-5 sm:py-3
        lg:px-6 lg:py-3.5

        text-sm sm:text-base
        font-semibold
        text-center
        leading-tight

        transition-all duration-200
        ease-in-out

        active:scale-[0.98]
        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-green-500
        focus-visible:ring-offset-2

        ${fullWidth ? "w-full" : "w-fit max-w-full"}

        ${variants[variant]}

        ${isDisabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"}

        ${className}
      `}
    >
      {children}
    </button>
  );
}

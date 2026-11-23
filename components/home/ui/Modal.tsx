"use client";

import { X } from "lucide-react";
import { ReactNode, useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
}: ModalProps) {
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center 
      bg-black/60 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className="relative w-full max-w-lg rounded-2xl bg-white 
        p-6 shadow-2xl sm:p-8"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-6 flex items-center justify-between gap-4">
          <h2
            id="modal-title"
            className="text-xl font-bold text-gray-800 sm:text-2xl"
          >
            {title}
          </h2>

          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar modal"
            className="flex h-9 w-9 shrink-0 items-center justify-center 
            rounded-full text-gray-500 transition-colors 
            hover:bg-gray-100 hover:text-gray-900"
          >
            <X size={22} />
          </button>
        </div>

        <div>{children}</div>

        <div className="mt-8 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg cursor-pointer bg-green-800 px-6 py-2.5 
            font-semibold text-white transition-colors 
            hover:bg-green-900"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}

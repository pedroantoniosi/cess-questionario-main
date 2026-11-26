"use client";

import { Children, ReactElement, ReactNode, useState } from "react";

import Button from "@/components/ui/Button";

interface PaginationProps {
  children: ReactNode;
  onFinish?: () => void;
  nextLabel?: string;
  finishLabel?: string;
}

interface PageItemProps {
  title: string;
  description?: string;
  children: ReactNode;
}

export function PageItem({ children }: PageItemProps) {
  return <>{children}</>;
}

export function Pagination({
  children,
  onFinish,
  nextLabel = "Próximo",
  finishLabel = "Finalizar",
}: PaginationProps) {
  const [currentStep, setCurrentStep] = useState(0);

  // Obtém todas as etapas recebidas
  const pages = Children.toArray(children) as ReactElement<PageItemProps>[];

  const totalSteps = pages.length;

  if (totalSteps === 0) return null;

  const currentPage = pages[currentStep];

  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === totalSteps - 1;

  function handleNext() {
    if (isLastStep) {
      onFinish?.();
      return;
    }

    setCurrentStep((prev) => prev + 1);
  }

  function handleBack() {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  }

  return (
    <section className="flex w-full flex-col gap-6">
      {/* Cabeçalho da etapa */}
      <header className="flex flex-col items-start gap-2">
        <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
          ETAPA {currentStep + 1}
        </span>

        <h2 className="text-2xl font-semibold text-gray-950">
          {currentPage.props.title}
        </h2>

        {currentPage.props.description && (
          <p className="text-base text-gray-700">
            {currentPage.props.description}
          </p>
        )}

        <div className="h-1 w-20 rounded-full bg-green-700" />
      </header>

      {/* Conteúdo da etapa atual */}
      <div className="w-full">{currentPage.props.children}</div>

      {/* Navegação */}
      <div className="flex w-full items-center justify-between gap-4 border-t border-gray-200 pt-4">
        {!isFirstStep && (
          <Button variant="white" type="button" onClick={handleBack}>
            Voltar
          </Button>
        )}

        <div className="flex flex-1 justify-end">
          <Button variant="primary" type="button" onClick={handleNext}>
            {isLastStep ? finishLabel : nextLabel}
          </Button>
        </div>
      </div>
    </section>
  );
}

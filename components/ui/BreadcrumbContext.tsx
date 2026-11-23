"use client";

import { usePathname } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

interface BreadcrumbContextValue {
  labels: Record<string, string>;
  setLabel: (href: string, label: string) => void;
  clearLabel: (href: string) => void;
}

const BreadcrumbContext = createContext<BreadcrumbContextValue | null>(null);

export function BreadcrumbProvider({ children }: { children: ReactNode }) {
  const [labels, setLabels] = useState<Record<string, string>>({});

  // Identidades estáveis: não dependem de `labels`, então registrar/limpar um
  // label não recria estas funções e não dispara o efeito consumidor de novo.
  const setLabel = useCallback(
    (href: string, label: string) =>
      setLabels((prev) => (prev[href] === label ? prev : { ...prev, [href]: label })),
    [],
  );

  const clearLabel = useCallback(
    (href: string) =>
      setLabels((prev) => {
        if (!(href in prev)) return prev;
        const next = { ...prev };
        delete next[href];
        return next;
      }),
    [],
  );

  const value = useMemo<BreadcrumbContextValue>(
    () => ({ labels, setLabel, clearLabel }),
    [labels, setLabel, clearLabel],
  );

  return <BreadcrumbContext.Provider value={value}>{children}</BreadcrumbContext.Provider>;
}

export function useBreadcrumbLabels() {
  const context = useContext(BreadcrumbContext);
  return context?.labels ?? {};
}

/** Registra o nome real da entidade (ex: título do questionário) para a rota atual. */
export function useBreadcrumbLabel(label: string | undefined | null) {
  const context = useContext(BreadcrumbContext);
  const pathname = usePathname();
  const setLabel = context?.setLabel;
  const clearLabel = context?.clearLabel;

  useEffect(() => {
    if (!setLabel || !clearLabel || !label) return;

    setLabel(pathname, label);
    return () => clearLabel(pathname);
  }, [setLabel, clearLabel, pathname, label]);
}

export function BreadcrumbLabel({ label }: { label: string }) {
  useBreadcrumbLabel(label);
  return null;
}

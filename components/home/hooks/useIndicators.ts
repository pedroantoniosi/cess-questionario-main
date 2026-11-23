import { useContext } from "react";

import { IndicatorsContext } from "@/components/indicadores/context/indicadoresContext";

export function useIndicators() {
  return useContext(IndicatorsContext);
}

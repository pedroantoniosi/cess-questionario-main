"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import type {
  IndicatorGroup,
  InstallationRound,
  InstallationRoundResponse,
  InstallationType,
} from "../types/Types";

import { ROUND_YEAR_BY_ID } from "../types/Types";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ??
  "http://localhost:3001/api/installation-round-consolidations/List";

const INITIAL_GROUPS: IndicatorGroup[] = ["summary", "infrastructure"];

export function useIndicadores() {
  const [data, setData] = useState<InstallationRound[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [year, setYear] = useState("2025");
  const [type, setType] = useState<InstallationType | "ALL">("ALL");

  const [visibleGroups, setVisibleGroups] =
    useState<IndicatorGroup[]>(INITIAL_GROUPS);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      let currentPage = 1;
      let hasNextPage = true;

      const allData: InstallationRound[] = [];

      while (hasNextPage) {
        const response = await fetch(
          `${API_URL}/installation-round-consolidations/List?page=${currentPage}&limit=20`,
          { cache: "no-store" },
        );

        if (!response.ok) {
          throw new Error("Não foi possível carregar os indicadores técnicos.");
        }

        const result: InstallationRoundResponse = await response.json();

        if (!result.success) {
          throw new Error(result.message || "Erro ao consultar indicadores.");
        }

        allData.push(...result.data);

        hasNextPage = result.pagination.hasNextPage;
        currentPage++;
      }

      setData(allData);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Ocorreu um erro inesperado.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let active = true;
    const controller = new AbortController();

    async function loadData() {
      try {
        let currentPage = 1;
        let hasNextPage = true;

        const allData: InstallationRound[] = [];

        while (hasNextPage) {
          const response = await fetch(
            `${API_URL}/installation-round-consolidations/List?page=${currentPage}&limit=20`,
            {
              cache: "no-store",
              signal: controller.signal,
            },
          );

          if (!response.ok) {
            throw new Error(
              "Não foi possível carregar os indicadores técnicos.",
            );
          }

          const result: InstallationRoundResponse = await response.json();

          if (!result.success) {
            throw new Error(result.message || "Erro ao consultar indicadores.");
          }

          allData.push(...result.data);

          hasNextPage = result.pagination.hasNextPage;
          currentPage++;
        }

        if (active) {
          setData(allData);
        }
      } catch (err) {
        if (active && !controller.signal.aborted) {
          setError(
            err instanceof Error ? err.message : "Ocorreu um erro inesperado.",
          );
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadData();

    return () => {
      active = false;
      controller.abort();
    };
  }, []);

  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const itemYear = ROUND_YEAR_BY_ID[item.roundId];

      const matchesYear = itemYear === year;
      const matchesType = type === "ALL" || item.type === type;

      return matchesYear && matchesType;
    });
  }, [data, year, type]);

  const toggleGroup = (group: IndicatorGroup) => {
    if (group === "summary") return;

    setVisibleGroups((current) =>
      current.includes(group)
        ? current.filter((item) => item !== group)
        : [...current, group],
    );
  };

  const refresh = () => {
    fetchData();
  };

  return {
    data: filteredData,
    totalInstallations: filteredData.length,
    loading,
    error,

    year,
    setYear,

    type,
    setType,

    visibleGroups,
    toggleGroup,

    refresh,
  };
}

"use client";

import { ArrowLeft, ChartNoAxesCombined } from "lucide-react";
import { useRouter } from "next/navigation";

import Filters from "@/components/indicadores/Filters";
import Table from "@/components/indicadores/Table";
import { useIndicadores } from "@/components/indicadores/hooks/useHook";
import Container from "@/components/ui/Container";
import Header from "@/components/ui/Header";

export default function IndicadoresPage() {
  const router = useRouter();

  const {
    data,
    loading,
    error,
    year,
    setYear,
    type,
    setType,
    visibleGroups,
    toggleGroup,
    totalInstallations,
    refresh,
  } = useIndicadores();

  return (
    <main className="min-h-screen bg-[#0B1120] text-white">
      <Container>
        <div className="flex items-center gap-4 pt-4">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-white text-sm cursor-pointer border p-1 px-2 rounded-md"
          >
            <ArrowLeft size={18} />
            Voltar
          </button>
          <span>|</span>
          <Header
            icon={<ChartNoAxesCombined size={20} />}
            title="Indicadores Técnicos"
          />
        </div>

        <div className="p-4 md:p-6">
          <section className="rounded-2xl border border-slate-700 bg-[#111827] p-4 md:p-5">
            <Filters
              year={year}
              onYearChange={setYear}
              type={type}
              onTypeChange={setType}
              visibleGroups={visibleGroups}
              onToggleGroup={toggleGroup}
              totalInstallations={totalInstallations}
            />

            <div className="mt-4">
              <Table
                data={data}
                loading={loading}
                error={error}
                visibleGroups={visibleGroups}
                onRefresh={refresh}
              />
            </div>
          </section>
        </div>
      </Container>
    </main>
  );
}

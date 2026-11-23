"use client";

import {
  ClipboardList,
  Home,
  Users,
  LucideClipboardCheck,
  type LucideIcon,
  Grid2X2,
} from "lucide-react";

import Link from "next/link";

import DisplayRestriction from "@/components/auth/DisplayRestriction";
import NavItem from "@/components/ui/NavItem";
import type { UserProfile } from "@/shared/contexts/AuthContext";

interface NavigationItem {
  label: string;
  href: string;
  icon: LucideIcon;
  /** Sem essa prop, o item aparece para qualquer perfil. */
  allowedProfiles?: UserProfile[];
}

const navigation: { title: string; items: NavigationItem[] }[] = [
  {
    title: "Principal",
    items: [
      {
        label: "Visão Geral",
        href: "/dashboard",
        allowedProfiles: ['Executor','Analyst'],
        icon: Grid2X2,
      },
      {
        label: "Gerenciar Questionários",
        href: "/questionarios",
        allowedProfiles: ["Executor", "Administrador do Sistema"],
        icon: ClipboardList,
      },
      {
        label: "Gerenciar Rodadas",
        href: "/rodadas",
        allowedProfiles: ["Executor", "Administrador do Sistema"],
        icon: LucideClipboardCheck,
      },
    ],
  },
  {
    title: "Plataforma", items: [
      {
        label: "Gerenciar Usuários",
        href: "/usuarios",
        allowedProfiles: ["Executor", "Administrador do Sistema"],
        icon: Users,
      },
      {
        label: "Auditoria",
        href: "/auditoria",
        allowedProfiles: ["Executor", "Administrador do Sistema"],
        icon: Users,
      }
  ]}
];

export default function Sidebar() {
  return (
    <aside className="fixed bottom-0 bg-navbar w-full md:w-64 md:min-h-svh z-40">
      {/* Logo - Desktop */}
      <Link
        href="/dashboard"
        aria-label="CESS Connections — página inicial"
        className="
          hidden h-16 items-center gap-3
          border-b border-slate-200/50 px-5
          md:flex z-40 bottom-0
        "
      >
        <div className="bg-card h-12 w-12 shrink-0 rounded-full" />

        <span className="min-w-0">
          <span className="block font-bold text-white">CESS</span>
          <span className="block text-xs text-gray-200">Questionário</span>
        </span>
      </Link>

      {/* Navegação */}
      <nav
        aria-label="Navegação principal"
        className="
          flex w-full items-center justify-around
          gap-1 px-1 py-2
          md:flex-col md:items-stretch
          md:gap-6 md:px-3 md:py-5
        "
      >
        {navigation.map((group) => (
          <section key={group.title} className="w-full">
            <h2
              className="
                hidden px-3 pb-2
                text-xs font-semibold uppercase
                tracking-wider text-slate-400
                md:block
              "
            >
              {group.title}
            </h2>

            <div
              className="
                flex w-full items-center justify-around gap-1
                md:flex-col md:items-stretch
              "
            >
              {group.items.map((item) => (
                <DisplayRestriction
                  key={item.href}
                  allowedProfiles={item.allowedProfiles}
                >
                  <NavItem
                    href={item.href}
                    label={item.label}
                    icon={item.icon}
                  />
                </DisplayRestriction>
              ))}
            </div>
          </section>
        ))}
      </nav>
    </aside>
  );
}

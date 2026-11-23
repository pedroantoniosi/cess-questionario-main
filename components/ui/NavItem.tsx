"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { LucideIcon } from "lucide-react";

export interface NavItemProps {
  href: string;
  label: string;
  icon: LucideIcon;
}

export default function NavItem({ href, label, icon: Icon }: NavItemProps) {
  const pathname = usePathname();
  const isActive = pathname === href || pathname?.startsWith(`${href}/`);

  return (
    <Link
      href={href}
      title={label}
      aria-label={label}
      aria-current={isActive ? "page" : undefined}
      className={`
        flex min-w-0 flex-1 flex-col
        items-center justify-center gap-1
        rounded-lg px-1 py-2
        text-center text-[10px] font-medium
        text-white transition-colors
        hover:bg-slate-800/20

        md:min-h-11 md:flex-row
        md:justify-start md:gap-3
        md:px-3 md:text-left md:text-sm

        ${isActive ? "bg-slate-800/40 font-semibold" : ""}
      `}
    >
      <Icon size={20} strokeWidth={2.3} className="shrink-0" />

      <span className="w-full truncate">{label}</span>
    </Link>
  );
}

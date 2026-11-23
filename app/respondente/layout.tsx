import type { ReactNode } from "react";

import RespondenteTemplate from "@/components/respontente/RespondenteTemplate";

export default function RespondenteLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <RespondenteTemplate>{children}</RespondenteTemplate>;
}

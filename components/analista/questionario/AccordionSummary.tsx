import { Fragment, type ReactNode } from "react";

interface AccordionSummaryProps {
  icon: ReactNode;
  titulo: string;
  meta?: ReactNode[];
}

export default function AccordionSummary({
  icon,
  titulo,
  meta,
}: AccordionSummaryProps) {
  return (
    <div className="flex flex-1 flex-wrap items-center gap-4">
      <span className="flex items-center gap-2 text-sm font-semibold text-gray-100">
        {icon}
        {titulo}
      </span>

      {meta && meta.length > 0 && (
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-400">
          {meta.map((item, index) => (
            <Fragment key={index}>
              {index > 0 && <span className="text-gray-600">•</span>}
              <span>{item}</span>
            </Fragment>
          ))}
        </div>
      )}
    </div>
  );
}

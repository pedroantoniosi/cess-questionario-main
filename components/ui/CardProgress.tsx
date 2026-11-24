interface CardProps {
  title: string;
  description: string;
  authors: string[];
  date: string;
  progress: number;
  href: string;
}

export default function Card({
  title,
  description,
  authors,
  date,
  progress,
  href,
}: CardProps) {
  return (
    <a
      href={href}
      className="group flex h-full flex-col rounded-2xl border border-white/10 bg-white p-6 transition-all duration-300 hover:-translate-y-2 hover:border-[#5FDB8B] hover:shadow-xl hover:shadow-black/20"
    >
      <div className="flex items-center justify-between gap-4">
        <span className="rounded-full bg-[#E5F8EC] px-3 py-1 text-xs font-bold text-[#014720]">
          {title}
        </span>

        <span className="text-sm font-semibold text-[#014720]">
          {progress}%
        </span>
      </div>

      <div className="mt-6 flex flex-1 flex-col gap-3">
        <h2 className="text-2xl font-bold text-[#014720]">{title}</h2>

        <p className="text-sm leading-relaxed text-gray-600">{description}</p>
      </div>

      <div className="mt-8 flex flex-col gap-2">
        <div className="flex justify-between text-xs font-medium text-gray-500">
          <span>Progresso do projeto</span>
          <span>{progress}%</span>
        </div>

        <div className="h-2 overflow-hidden rounded-full bg-gray-200">
          <div
            className="h-full rounded-full bg-[#16A34A] transition-all duration-500"
            style={{
              width: `${Math.min(100, Math.max(0, progress))}%`,
            }}
          />
        </div>
      </div>

      <div className="mt-6 border-t border-gray-200 pt-5">
        <div className="flex flex-col gap-3 text-sm">
          <div>
            <span className="block text-xs font-semibold uppercase tracking-wider text-gray-400">
              Autores
            </span>
            <span className="mt-1 block font-medium text-gray-700">
              {authors.join(", ")}
            </span>
          </div>

          <div>
            <span className="block text-xs font-semibold uppercase tracking-wider text-gray-400">
              Data
            </span>
            <span className="mt-1 block font-medium text-gray-700">{date}</span>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between text-sm font-bold text-[#014720]">
        <span>Acessar versão</span>
        <span className="transition-transform group-hover:translate-x-1">
          →
        </span>
      </div>
    </a>
  );
}

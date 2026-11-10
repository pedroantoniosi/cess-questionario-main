interface CardsProps {
  image: string;
  title: string;
  description: string;
  href?: string;
}

export default function Cards({ title, description }: CardsProps) {
  const content = (
    <article
      className="group grid h-full cursor-pointer overflow-hidden rounded-xl
     bg-red transition-all duration-200  hover:shadow-lg"
    >
      <div className="flex flex-col gap-2">
        <h2 className="font-semibold text-black">{title}</h2>
        <p className="line-clamp-3 text-sm text-zinc-600">{description}</p>
      </div>
    </article>
  );

  return content;
}

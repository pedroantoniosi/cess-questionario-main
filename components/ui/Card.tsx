interface CardsProps {
  children?: React.ReactNode;
  className?: string;
}

export default function Cards({ children, className = "" }: CardsProps) {
  const content = (
    <article
      className={`flex flex-col gap-4 p-4 bg-card rounded-xl overflow-auto ${className}`}
    >
      {children}
    </article>
  );

  return content;
}

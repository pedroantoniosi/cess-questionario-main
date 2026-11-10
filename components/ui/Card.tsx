interface CardsProps {
  children?: React.ReactNode;
}

export default function Cards({ children }: CardsProps) {
  const content = (
    <article className="flex flex-col gap-4 p-4 bg-card rounded-xl">
      {children}
    </article>
  );

  return content;
}

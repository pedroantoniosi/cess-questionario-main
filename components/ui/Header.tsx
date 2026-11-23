interface HeaderProps {
  title: string;
  text?: string;
  icon: React.ReactNode;
}

export default function Header({ title, text, icon }: HeaderProps) {
  return (
    <header className="flex flex-col sm:flex-row gap-2 p-2 md:items-center ">
      <span className="border w-fit h-fit border-high text-high p-2 rounded-md">
        {icon}
      </span>
      <div className="flex flex-col">
        <h2 className="font-bold text-white tracking-tight text-lg md:text-2xl">
          {title}
        </h2>
        <p className="text-gray-400 text-xs">{text}</p>
      </div>
    </header>
  );
}

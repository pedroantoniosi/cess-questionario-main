interface HeaderProps {
  title: string;
  text?: string;
  icon: React.ReactNode;
}

export default function Header({ title, text, icon }: HeaderProps) {
  return (
    <header className="flex gap-2 p-2 ">
      <span className=" p-2 aspect-square flex justify-center items-center rounded-lg text-rh border border-color-high">
        {icon}
      </span>
      <div className="flex flex-col justify-center">
        <h2 className="font-bold text-white tracking-tight">{title}</h2>
        <p className="text-gray-400 text-xs">{text}</p>
      </div>
    </header>
  );
}

interface Props {
  onClick: () => void;
  children: React.ReactNode;
}

export default function IconButton({ onClick, children }: Props) {
  return (
    <button
      className="h-15 w-15 rounded-3xl cursor-pointer peer border p-3 group hover:text-[oklch(62.3%_0.214_259.815)] dark:hover:text-[oklch(83.7%_0.128_66.29)] duration-500 transition-colors"
      onClick={onClick}
    >
      {children}
    </button>
  );
}

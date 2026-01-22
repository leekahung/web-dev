interface Props {
  onClick: () => void;
  children: React.ReactNode;
}

export default function IconButton({ onClick, children }: Props) {
  return (
    <button
      className="h-16 w-16 rounded-3xl cursor-pointer peer border p-3 group hover:text-blue-500 dark:hover:text-orange-300 duration-500 transition-colors"
      onClick={onClick}
    >
      {children}
    </button>
  );
}

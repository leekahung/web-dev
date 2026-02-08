interface Props {
  to: string;
  children: React.ReactNode;
}

export default function ExternalLink({ to, children }: Props) {
  return (
    <div className="flex items-center justify-center group md:hover:text-orange-700/80 md:dark:hover:text-blue-200 transition-all duration-150 underline">
      <a href={to} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    </div>
  );
}

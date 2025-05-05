interface Props {
  to: string;
  children: React.ReactNode;
}

export default function ExternalLink({ to, children }: Props) {
  return (
    <div className="h-10 w-10 flex items-center justify-center group md:hover:scale-110 transition-transform duration-500">
      <a href={to} target="_blank">
        {children}
      </a>
    </div>
  );
}

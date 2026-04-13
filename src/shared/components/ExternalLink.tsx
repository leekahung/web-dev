interface Props extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  to: string;
  children: React.ReactNode;
}

export default function ExternalLink({ to, children, ...rest }: Props) {
  return (
    <div className="flex items-center justify-center group hover:text-blue-500 dark:hover:text-orange-300 hover:transition-colors hover:duration-150 underline">
      <a href={to} target="_blank" rel="noopener noreferrer" {...rest}>
        {children}
      </a>
    </div>
  );
}

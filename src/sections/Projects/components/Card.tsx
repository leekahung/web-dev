import ExternalLink from "@/shared/components/ExternalLink";

interface Props {
  title: string;
  subheader: string;
  description: React.ReactNode;
  siteLink: string;
  repoLink: string;
  sitePreview: string;
}

export default function Card({
  title,
  subheader,
  description,
  siteLink,
  repoLink,
  sitePreview,
}: Props) {
  return (
    <div className="w-135 lg:min-h-90 relative flex flex-col p-4 border rounded-lg bg-slate-200/80 dark:bg-slate-800/80 z-20 hover:bg-slate-300/80 hover:dark:bg-slate-700/80 duration-700">
      <h3 className="text-lg lg:text-2xl font-semibold items-center flex justify-center h-10">
        {title}
      </h3>
      <em>{subheader}</em>
      <div className="flex [@media(max-width:600px)]:flex-col items-center py-2 flex-1">
        <div className="p-3 pt-0">{description}</div>
        <img
          src={sitePreview}
          alt={`site preview for ${title}`}
          height={250}
          width={250}
        />
      </div>
      <div className="flex gap-4 items-center justify-center">
        <ExternalLink to={repoLink}>Repository</ExternalLink>
        <ExternalLink to={siteLink}>Live Site</ExternalLink>
      </div>
    </div>
  );
}

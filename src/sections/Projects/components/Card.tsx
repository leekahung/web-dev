import ExternalLink from "@/shared/components/ExternalLink";

interface Props {
  title: string;
  subheader: string;
  description: string[];
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
    <div className="min-h-96 flex-1 relative flex flex-col border rounded-lg bg-neutral-400/20 dark:bg-neutral-200/20 z-20 lg:hover:scale-[1.02] hover:shadow-lg transition-transform duration-300 overflow-hidden">
      <img
        src={sitePreview}
        alt={`site preview for ${title}`}
        className="w-full h-40 object-cover object-top"
      />
      <div className="flex flex-col flex-1 p-4 gap-2">
        <h3 className="text-lg lg:text-2xl font-semibold text-center">
          {title}
        </h3>
        <em className="text-center">{subheader}</em>
        <ul className="list-disc pl-4 text-left flex-1 mt-2">
          {description.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <div className="flex gap-4 items-center justify-center pt-2">
          <ExternalLink to={repoLink}>Repository</ExternalLink>
          <ExternalLink to={siteLink}>Live Site</ExternalLink>
        </div>
      </div>
    </div>
  );
}

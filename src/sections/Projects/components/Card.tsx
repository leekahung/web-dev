import ExternalLink from "@/shared/components/ExternalLink";
import LinkIcon from "@/shared/components/icons/LinkIcon";
import StackIcon from "@/shared/components/icons/StackIcon";

interface Props {
  title: string;
  description: string;
  siteLink: string;
  repoLink: string;
}

export default function Card({
  title,
  description,
  siteLink,
  repoLink,
}: Props) {
  return (
    <div className="flex flex-none p-4 border rounded-lg items-center flex-col gap-2 w-[calc(100%-40px)] mx-[20px] md:mx-0 md:w-[234px]">
      <h3 className="text-2xl flex-1 items-center flex justify-center h-10">
        {title}
      </h3>
      <p className="flex items-center min-h-[72px]">{description}</p>
      <div className="flex gap-2 justify-center">
        <ExternalLink to={siteLink}>
          <div className="h-8 w-8 border rounded-xl p-1 md:hover:text-blue-500 md:dark:hover:text-orange-300">
            <LinkIcon />
          </div>
        </ExternalLink>
        <ExternalLink to={repoLink}>
          <div className="h-8 w-8 border rounded-xl p-1 md:hover:text-blue-500 md:dark:hover:text-orange-300">
            <StackIcon />
          </div>
        </ExternalLink>
      </div>
    </div>
  );
}

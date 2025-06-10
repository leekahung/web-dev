import ExternalLink from "@/shared/components/ExternalLink";
import StackIcon from "@/shared/components/icons/StackIcon";

interface Props {
  title: string;
  description: string;
  siteLink?: string;
  repoLink: string;
}

export default function Card({
  title,
  description,
  siteLink,
  repoLink,
}: Props) {
  return (
    <div className="relative flex flex-col border rounded-lg bg-slate-200/80 dark:bg-slate-800/80 z-20 hover:bg-slate-300/80 hover:dark:bg-slate-700/80 duration-700">
      <a
        href={siteLink}
        target="_blank"
        className="flex flex-none p-4 pb-12 items-center flex-col gap-2 w-[250px]"
      >
        <h3 className="text-2xl flex-1 items-center flex justify-center h-10">
          {title}
        </h3>
        <p className="flex items-center h-[72px]">{description}</p>
      </a>
      <div className="absolute top-5/6 left-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-2 justify-center">
        <ExternalLink to={repoLink}>
          <div className="h-8 w-8 border rounded-xl p-1 md:hover:text-blue-500 md:dark:hover:text-orange-300">
            <StackIcon />
          </div>
        </ExternalLink>
      </div>
    </div>
  );
}

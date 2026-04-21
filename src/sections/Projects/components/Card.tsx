import ExternalLink from "@/shared/components/ExternalLink";
import useTheme from "@/hooks/useTheme";

/** Colors that need a lighter variant in dark mode or darker variant in light mode. */
const tagColors: Record<string, { light: string; dark: string }> = {
  React: { light: "#0891B2", dark: "#61DAFB" },
  TypeScript: { light: "#1D4ED8", dark: "#60A5FA" },
  "TanStack Query": { light: "#E11D48", dark: "#FF4154" },
  "Tailwind CSS": { light: "#0369A1", dark: "#38BDF8" },
  LangChain: { light: "#3F6212", dark: "#A3E635" },
  Redux: { light: "#5B21B6", dark: "#A78BFA" },
  Python: { light: "#B45309", dark: "#FCD34D" },
  SASS: { light: "#9D174D", dark: "#F9A8D4" },
  "Next.js": { light: "#334155", dark: "#CBD5E1" },
  Netlify: { light: "#0E7490", dark: "#22D3EE" },
  "Decap CMS": { light: "#C2410C", dark: "#FB923C" },
  MUI: { light: "#1D4ED8", dark: "#60A5FA" },
  "Solid Protocol": { light: "#6D28D9", dark: "#C4B5FD" },
  Supabase: { light: "#047857", dark: "#34D399" },
  D3: { light: "#B45309", dark: "#FCD34D" },
};

interface Props {
  title: string;
  subheader: string;
  description: string[];
  tags: string[];
  siteLink: string;
  repoLink: string;
  sitePreview: string;
}

function TagPills({ tags }: { tags: string[] }) {
  const { darkMode } = useTheme();
  return (
    <div className="flex flex-wrap gap-1.5 justify-center pt-2">
      {tags.map((tag) => {
        const palette = tagColors[tag] ?? { light: "#475569", dark: "#94A3B8" };
        const color = darkMode ? palette.dark : palette.light;
        return (
          <span
            key={tag}
            className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs border"
            style={{
              color,
              backgroundColor: `${color}1A`,
              borderColor: `${color}40`,
            }}
          >
            {tag}
          </span>
        );
      })}
    </div>
  );
}

export default function Card({
  title,
  subheader,
  description,
  tags,
  siteLink,
  repoLink,
  sitePreview,
}: Props) {
  return (
    <div className="min-h-96 flex-1 relative flex flex-col border border-black/15 dark:border-white/15 rounded-2xl bg-neutral-400/30 dark:bg-neutral-200/30 z-20 lg:hover:scale-[1.02] hover:shadow-lg transition-transform duration-300 overflow-hidden">
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
        <TagPills tags={tags} />
        <div className="flex gap-4 items-center justify-center pt-2">
          <ExternalLink to={repoLink}>Repository</ExternalLink>
          <ExternalLink to={siteLink}>Live Site</ExternalLink>
        </div>
      </div>
    </div>
  );
}

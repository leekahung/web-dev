import useTheme from "@/hooks/useTheme";

interface Props {
  svgStroke?: string;
  svgPathD: string;
}

export default function SVGIcon({ svgStroke, svgPathD }: Props) {
  const { darkMode } = useTheme();
  let stroke = darkMode ? "#f8fafc" : "black";
  if (svgStroke) stroke = svgStroke;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={stroke}
      className="md:group-hover:stroke-[oklch(62.3%_0.214_259.815)] md:dark:group-hover:stroke-[oklch(83.7%_0.128_66.29)] transition-colors duration-500"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d={svgPathD} />
    </svg>
  );
}

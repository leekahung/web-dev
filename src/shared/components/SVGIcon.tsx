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
      className="md:group-hover:stroke-blue-500 md:dark:group-hover:stroke-orange-300 transition-colors duration-500"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d={svgPathD} />
    </svg>
  );
}

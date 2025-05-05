import { useRef } from "react";
import Card from "./components/Card";
import LeftIcon from "@/shared/components/icons/LeftIcon";
import RightIcon from "@/shared/components/icons/RightIcon";

const projectList = [
  {
    title: "Phase Tracker",
    description: "A subscription tracker to the VTuber group, Phase Connect",
    siteLink: "https://phase-connect-tracker.netlify.app/",
    repoLink: "https://github.com/leekahung/phase-tracker",
  },
  {
    title: "PASS",
    description: "A digital storage solution for documents",
    siteLink: "https://passsmartwallet-967e217a2652.herokuapp.com/",
    repoLink: "https://github.com/codeforpdx/PASS",
  },
];

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    const container = containerRef.current;
    if (container === null) return;
    const { scrollLeft, clientWidth } = container;
    const scrollAmount = clientWidth + 20;
    container.scrollTo({
      left:
        direction === "left"
          ? scrollLeft - scrollAmount
          : scrollLeft + scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative flex flex-col gap-4 md:gap-8">
      <h2 className="text-2xl md:text-3xl">Projects</h2>
      <button
        className="md:hidden cursor-pointer absolute z-50 h-10 w-10 -left-5 top-[58%] -translate-y-1/2"
        onClick={() => scroll("left")}
      >
        <LeftIcon />
      </button>
      <div
        className="flex gap-4 md:gap-8 overflow-x-scroll md:overflow-x-visible scrollbar-hide"
        ref={containerRef}
      >
        {projectList.map((project) => (
          <Card
            title={project.title}
            description={project.description}
            siteLink={project.siteLink}
            repoLink={project.repoLink}
            key={project.title}
          />
        ))}
      </div>
      <button
        className="md:hidden cursor-pointer absolute z-50 h-10 w-10 -right-5 top-[58%] -translate-y-1/2"
        onClick={() => scroll("right")}
      >
        <RightIcon />
      </button>
    </div>
  );
}

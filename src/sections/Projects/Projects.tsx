import ScrollToButton from "@/shared/components/ScrollToButton";
import Card from "./components/Card";
import { useEffect, useRef, useState } from "react";
import Shape from "@/animations/Shape";

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
  {
    title: "Tenant First Aid",
    description: "An AI agent for housing assistance in Oregon",
    siteLink: "https://tenantfirstaid.com/",
    repoLink: "https://github.com/codeforpdx/tenantfirstaid",
  },
  {
    title: "Web Portfolio",
    description: "Current portfolio page",
    siteLink: "https://leekahung.github.io/web-dev",
    repoLink: "https://github.com/leekahung/web-dev",
  },
];

export default function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ x: 0, y: 0 });
  const numShapes = Math.max(Math.floor(dimensions.x / 100), 8);

  useEffect(() => {
    if (sectionRef.current) {
      const { offsetHeight, offsetWidth } = sectionRef.current;
      setDimensions({ x: offsetWidth, y: offsetHeight });
    }
  }, []);

  return (
    <section
      className={`relative min-h-[650px] sm:min-h-screen flex flex-col items-center justify-center gap-4 overflow-hidden ${
        projectList.length > 3
          ? "pt-0"
          : "pt-20 [@media(max-height:600px)]:pt-0"
      }`}
      ref={sectionRef}
    >
      <div id="projects" className="absolute -top-35 sm:top-0" />
      <h2 className="text-2xl md:text-3xl">Projects</h2>
      <div className="flex flex-wrap items-center justify-center gap-8 p-4 max-w-4xl">
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
      <div className="invisible sm:visible [@media(max-height:800px)]:invisible sm:absolute sm:block sm:bottom-20 z-30">
        <ScrollToButton elementId="skills" />
      </div>
      {Array.from({ length: numShapes }).map((_, i) => (
        <Shape key={i} containerDimensions={dimensions} />
      ))}
    </section>
  );
}

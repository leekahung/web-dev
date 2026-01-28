import ScrollToButton from "@/shared/components/ScrollToButton";
import Card from "./components/Card";
import { useEffect, useRef, useState } from "react";
import Shape from "@/animations/Shape";
import TFAPreview from "../../shared/components/images/TenantFirstAid.png";
import FSSPreview from "../../shared/components/images/FSS.png";
import PASSPreview from "../../shared/components/images/PASS.png";
import PhaseTrackerPreview from "../../shared/components/images/Phase-Tracker.png";

const projectList = [
  {
    title: "Tenant First Aid",
    subheader: "AI-powered housing assistance tool for tenants in Oregon",
    description: (
      <ul className="list-disc pl-4 text-left pt-4">
        <li>
          Led the development of frontend features for a production civic-tech
          app, ensuring accessibility and responsiveness for real tenants
        </li>
        <li>
          Built reusable React + Tailwind components and optimized state
          management for consistency and efficiency
        </li>
      </ul>
    ),
    siteLink: "https://tenantfirstaid.com/",
    repoLink: "https://github.com/codeforpdx/tenantfirstaid",
    sitePreview: TFAPreview,
  },
  {
    title: "Families for Safe Streets",
    subheader: "Official website for Portland Families for Safe Streets",
    description: (
      <ul className="list-disc pl-4 text-left pt-4">
        <li>
          Delivered a public-facing website for a nonprofit, implementing
          accessible, mobile-first UI components
        </li>
        <li>
          Applied design-to-implementation decisions with focus on usability,
          responsiveness, and code reuse
        </li>
      </ul>
    ),
    siteLink: "https://pdxfamiliesforsafestreets.org/",
    repoLink: "https://github.com/BurlapRobot/pdx-fss",
    sitePreview: FSSPreview,
  },
  {
    title: "PASS",
    subheader: "Digital document storage and management tool",
    description: (
      <ul className="list-disc pl-4 text-left pt-4">
        <li>
          Built a data-driven frontend app for managing personal documents,
          leveraging Solid Protocol for secure access
        </li>
        <li>
          Implemented experimental authentication workflows using Inrupt Solid
          Client Libraries, ensuring compliance with emerging web standards
        </li>
      </ul>
    ),
    siteLink: "https://pass-wine.vercel.app/",
    repoLink: "https://github.com/codeforpdx/PASS",
    sitePreview: PASSPreview,
  },
  {
    title: "Phase Tracker",
    subheader: "Subscription Tracking Tool for Phase Connect Members",
    description: (
      <ul className="list-disc pl-4 text-left pt-4">
        <li>
          Developed a frontend to track subscription and member data with
          dynamic, data-driven UI
        </li>
        <li>
          Created reusable components, applied conditional rendering, and
          designed responsive layouts with Motion for improved maintainability
        </li>
      </ul>
    ),
    siteLink: "https://phase-connect-tracker.netlify.app/",
    repoLink: "https://github.com/leekahung/phase-tracker",
    sitePreview: PhaseTrackerPreview,
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
      className={`relative min-h-162.5 sm:min-h-screen flex flex-col items-center justify-center gap-4 overflow-hidden pt-0`}
      ref={sectionRef}
    >
      <div
        id="projects"
        className="absolute -top-35 sm:top-0 -scroll-mt-10 sm:scroll-mt-0 md:scroll-mt-20 [@media(min-height:1024px)]:scroll-mt-0"
      />
      <h2 className="text-2xl md:text-3xl">Websites</h2>
      <div className="flex flex-wrap items-center justify-center text-sm lg:text-base gap-4 max-w-6xl">
        {projectList.map((project) => (
          <Card
            title={project.title}
            subheader={project.subheader}
            description={project.description}
            siteLink={project.siteLink}
            repoLink={project.repoLink}
            sitePreview={project.sitePreview}
            key={project.title}
          />
        ))}
      </div>
      <div className="invisible xl:visible [@media(max-height:1250px)]:invisible sm:absolute sm:block sm:bottom-20 z-30 animate-[bounce_2s_infinite]">
        <ScrollToButton elementId="skills" />
      </div>
      {Array.from({ length: numShapes }).map((_, i) => (
        <Shape key={i} containerDimensions={dimensions} />
      ))}
    </section>
  );
}

import Card from "./components/Card";
import { useRef } from "react";
import { motion } from "motion/react";
import FallingShapes from "@/animations/FallingShapes";
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
          Led development of accessible, responsive frontend features for a
          production civic-tech app serving Oregon tenants
        </li>
        <li>
          Refactored shared state using TanStack Query + context abstraction,
          reducing redundant fetches and improving perceived load time
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
          Built an accessible, mobile-first website for a nonprofit advocacy
          organization, prioritizing semantic structure and accessibility best
          practices
        </li>
        <li>
          Translated Figma designs into reusable React components, focusing on
          accessibility, responsiveness, and maintainable structure
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
          Developed a document management interface using Solid Protocol,
          handling secure data retrieval and state synchronization
        </li>
        <li>
          Implemented authentication workflows with Inrupt Solid Client
          Libraries, navigating emerging web standards and decentralized access
          patterns
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
          Built a dynamic subscription tracking interface with conditional
          rendering and data-driven UI updates
        </li>
        <li>
          Designed reusable component patterns and motion-enhanced transitions
          to improve scalability and maintainability
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

  return (
    <section
      className="relative sm:h-full flex flex-col items-center justify-center gap-4 pb-8 overflow-hidden"
      ref={sectionRef}
      aria-label="Projects"
    >
      <div
        id="projects"
        className="scroll-mt-20 [@media(min-height:900px)]:scroll-mt-40"
      />
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5 }}
        className="text-2xl sm:text-3xl font-bold"
      >
        Websites
      </motion.h2>
      <div className="flex flex-wrap items-center justify-center text-sm lg:text-base gap-4 max-w-6xl mx-4 sm:mx-0">
        {projectList.map((project, index) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <Card
              title={project.title}
              subheader={project.subheader}
              description={project.description}
              siteLink={project.siteLink}
              repoLink={project.repoLink}
              sitePreview={project.sitePreview}
            />
          </motion.div>
        ))}
      </div>
      <FallingShapes containerRef={sectionRef} />
    </section>
  );
}

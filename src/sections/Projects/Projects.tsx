import Card from "./components/Card";
import { useRef } from "react";
import { motion } from "motion/react";
import FallingShapes from "@/animations/FallingShapes";
import TFAPreview from "../../shared/components/images/TenantFirstAid.webp";
import FSSPreview from "../../shared/components/images/FSS.webp";
import PASSPreview from "../../shared/components/images/PASS.png";
import PhaseTrackerPreview from "../../shared/components/images/Phase-Tracker.webp";
import RecordSpongePreview from "../../shared/components/images/RecordSponge.webp";

const projectList = [
  {
    title: "Tenant First Aid",
    subheader: "AI-powered housing assistance tool for tenants in Oregon",
    description: [
      "Led development of accessible, responsive frontend features for a production civic-tech app serving Oregon tenants",
      "Refactored shared state using TanStack Query + context abstraction, reducing redundant fetches and improving perceived load time",
    ],
    siteLink: "https://tenantfirstaid.com/",
    repoLink: "https://github.com/codeforpdx/tenantfirstaid",
    sitePreview: TFAPreview,
  },
  {
    title: "RecordSponge",
    subheader: "Website assisting record expungement in Oregon",
    description: [
      "Revised and improved the user manual to better guide users through the expungement process",
      "Contributed to ongoing maintenance and bug fixes for the live site",
    ],
    siteLink: "https://recordsponge.com/",
    repoLink: "https://github.com/codeforpdx/recordexpungPDX",
    sitePreview: RecordSpongePreview,
  },
  {
    title: "Families for Safe Streets",
    subheader: "Official website for Portland Families for Safe Streets",
    description: [
      "Built an accessible, mobile-first website for a nonprofit advocacy organization, prioritizing semantic structure and accessibility best practices",
      "Translated Figma designs into reusable React components, focusing on accessibility, responsiveness, and maintainable structure",
    ],
    siteLink: "https://pdxfamiliesforsafestreets.org/",
    repoLink: "https://github.com/BurlapRobot/pdx-fss",
    sitePreview: FSSPreview,
  },
  {
    title: "PASS",
    subheader: "Digital document storage and management tool",
    description: [
      "Developed a document management interface using Solid Protocol, handling secure data retrieval and state synchronization",
      "Implemented authentication workflows with Inrupt Solid Client Libraries, navigating emerging web standards and decentralized access patterns",
    ],
    siteLink: "https://pass-wine.vercel.app/",
    repoLink: "https://github.com/codeforpdx/PASS",
    sitePreview: PASSPreview,
  },
  {
    title: "Phase Tracker",
    subheader: "Subscription Tracking Tool for Phase Connect Members",
    description: [
      "Built a dynamic subscription tracking interface with conditional rendering and data-driven UI updates",
      "Designed reusable component patterns and motion-enhanced transitions to improve scalability and maintainability",
    ],
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
      <div className="grid grid-cols-1 sm:grid-cols-2 text-sm lg:text-base gap-4 max-w-3xl sm:max-w-6xl mx-4 sm:mx-0">
        {projectList.map((project, index) => (
          <motion.div
            key={project.title}
            className={`flex flex-col${index === projectList.length - 1 && projectList.length % 2 !== 0 ? " sm:col-span-2 sm:max-w-135 sm:mx-auto sm:w-full" : ""}`}
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

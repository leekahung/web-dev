import ScrollToButton from "@/shared/components/ScrollToButton";
import Card from "./components/Card";

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
  return (
    <section
      id="projects"
      className="relative pb-20 sm:h-screen flex flex-col items-center justify-center gap-4"
    >
      <h2 className="text-2xl md:text-3xl">Projects</h2>
      <div className="flex flex-wrap items-center justify-center gap-8 p-4">
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
      <div className="invisible sm:visible sm:absolute sm:block sm:bottom-20">
        <ScrollToButton elementId="skills" />
      </div>
    </section>
  );
}

import Skills from "./Skills/Skills";
import Experience from "./Experience/Experience";

export default function SkillsExperience() {
  return (
    <div
      id="skills"
      className="flex flex-col lg:flex-row gap-4 items-center justify-center pt-20 pb-40 lg:pb-20"
    >
      <Skills />
      <Experience />
    </div>
  );
}

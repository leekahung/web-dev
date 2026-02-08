import BashIcon from "../../shared/components/icons/BashIcon";
import CSSIcon from "../../shared/components/icons/CSSIcon";
import HTMLIcon from "../../shared/components/icons/HTMLIcon";
import JavaScriptIcon from "../../shared/components/icons/JavaScriptIcon";
import PythonIcon from "../../shared/components/icons/PythonIcon";
import ReactIcon from "../../shared/components/icons/ReactIcon";
import ReactRouterIcon from "../../shared/components/icons/ReactRouterIcon";
import TailwindIcon from "../../shared/components/icons/TailwindIcon";
import TypeScriptIcon from "../../shared/components/icons/TypeScriptIcon";
import GitHubIcon from "@/shared/components/icons/GitHubIcon";
import VSCodeIcon from "../../shared/components/icons/VSCodeIcon";
import NetlifyIcon from "../../shared/components/icons/NetlifyIcon";
import SupabaseIcon from "../../shared/components/icons/SupabaseIcon";
import SkillRow from "./components/SkillRow";
import tanstackLogo from "../../shared/components/icons/tanstack-logo-100.png";
import { motion } from "motion/react";

const frontendList = [
  { name: "React.js", element: <ReactIcon /> },
  { name: "TypeScript", element: <TypeScriptIcon /> },
  {
    name: "Tanstack Query",
    element: <img src={tanstackLogo} alt="" height={24} width={24} />,
  },
  { name: "Tailwind CSS", element: <TailwindIcon /> },
  { name: "JavaScript", element: <JavaScriptIcon /> },
  { name: "HTML", element: <HTMLIcon /> },
  { name: "CSS", element: <CSSIcon /> },
  { name: "React Router", element: <ReactRouterIcon /> },
];

const backendList = [
  { name: "Supabase", element: <SupabaseIcon /> },
  { name: "Python", element: <PythonIcon /> },
];

const toolsList = [
  { name: "Bash", element: <BashIcon /> },
  { name: "GitHub", element: <GitHubIcon /> },
  { name: "VS Code", element: <VSCodeIcon /> },
  { name: "Netlify", element: <NetlifyIcon /> },
];

export default function Skills() {
  return (
    <section aria-label="Skills" className="flex flex-col items-center justify-center max-w-[320px] sm:max-w-125 lg:flex-1 gap-4">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5 }}
        className="text-2xl sm:text-3xl font-bold"
      >
        Skills
      </motion.h2>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, delay: 0.1 }}
        role="list"
        className="flex flex-col gap-4 p-6 bg-neutral-400/20 dark:bg-neutral-200/20 rounded-2xl"
      >
        <SkillRow itemName="Frontend" itemList={frontendList} />
        <SkillRow itemName="Backend/Data" itemList={backendList} />
        <SkillRow itemName="Tools" itemList={toolsList} />
      </motion.div>
    </section>
  );
}

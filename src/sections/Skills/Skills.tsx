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

const developmentList = [
  { name: "TypeScript", element: <TypeScriptIcon /> },
  { name: "JavaScript", element: <JavaScriptIcon /> },
  { name: "Python", element: <PythonIcon /> },
  { name: "Bash", element: <BashIcon /> },
  { name: "HTML", element: <HTMLIcon /> },
  { name: "CSS", element: <CSSIcon /> },
  { name: "Tailwind CSS", element: <TailwindIcon /> },
  { name: "React.js", element: <ReactIcon /> },
  { name: "React Router", element: <ReactRouterIcon /> },
];

const toolsList = [
  { name: "GitHub", element: <GitHubIcon /> },
  { name: "VS Code", element: <VSCodeIcon /> },
  { name: "Netlify", element: <NetlifyIcon /> },
  { name: "Supabase", element: <SupabaseIcon /> },
];

export default function Skills() {
  return (
    <section className="flex flex-col items-center justify-center max-w-[500px] gap-4">
      <h2 className="text-2xl md:text-3xl">Skills</h2>
      <table>
        <tbody className="flex flex-col gap-4 p-4">
          <SkillRow itemName="Development" itemList={developmentList} />
          <SkillRow itemName="Tools" itemList={toolsList} />
        </tbody>
      </table>
    </section>
  );
}

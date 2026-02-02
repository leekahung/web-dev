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
    <section className="flex flex-col items-center justify-center max-w-[320px] sm:max-w-125 gap-4">
      <h2 className="text-2xl md:text-3xl">Skills</h2>
      <table>
        <tbody className="flex flex-col gap-4 p-4">
          <SkillRow itemName="Frontend" itemList={frontendList} />
          <SkillRow itemName="Backend/Data" itemList={backendList} />
          <SkillRow itemName="Tools" itemList={toolsList} />
        </tbody>
      </table>
    </section>
  );
}

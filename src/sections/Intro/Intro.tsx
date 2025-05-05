import ChatIcon from "@/shared/components/icons/ChatIcon";
import ProfileIcon from "@/shared/components/icons/ProfileIcon";
import ToolsIcon from "@/shared/components/icons/ToolsIcon";
import Section from "./components/Section";

export default function Intro() {
  return (
    <div className="p-0 md:p-8 flex flex-col items-center gap-6 md:border md:rounded-4xl">
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl">
          Hello! I'm{" "}
          <span className="text-blue-500 dark:text-orange-300">Ka Hung</span>
        </h1>
        <h2 className="text-xl font-light">Frontend Engineer, UI Developer</h2>
      </div>
      <div className="grid grid-cols-3 w-[300px]">
        <Section title="About">
          <ProfileIcon />
        </Section>
        <Section title="Skills">
          <ToolsIcon />
        </Section>
        <Section title="Contact">
          <ChatIcon />
        </Section>
      </div>
    </div>
  );
}

import ChatIcon from "@/shared/components/icons/ChatIcon";
import ProfileIcon from "@/shared/components/icons/ProfileIcon";
import Section from "./components/Section";
import ScrollToButton from "@/shared/components/ScrollToButton";

export default function Intro() {
  return (
    <section className="relative h-screen flex flex-col items-center justify-center gap-6">
      <div className="flex flex-col gap-4">
        <strong>
          <h1 className="text-3xl">
            Hello! I'm{" "}
            <span className="text-blue-500 dark:text-orange-300">Ka Hung</span>
          </h1>
        </strong>
        <h2 className="text-xl font-light">Frontend Engineer, UI Developer</h2>
      </div>
      <div className="grid grid-cols-2 w-52">
        <Section title="About">
          <ProfileIcon />
        </Section>
        <Section title="Contact">
          <ChatIcon />
        </Section>
      </div>
      <div className="absolute bottom-35 sm:bottom-20">
        <ScrollToButton elementId="skills" />
      </div>
    </section>
  );
}

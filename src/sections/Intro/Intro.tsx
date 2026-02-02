import ChatIcon from "@/shared/components/icons/ChatIcon";
import ProfileIcon from "@/shared/components/icons/ProfileIcon";
import Section from "./components/Section";
import ScrollToButton from "@/shared/components/ScrollToButton";

export default function Intro() {
  return (
    <section className="relative h-screen flex flex-col items-center justify-center gap-6">
      <div className="flex flex-col items-center justify-center gap-6 bg-neutral-200/40 dark:bg-neutral-200/20 rounded-2xl p-8">
        <div className="flex flex-col gap-4">
          <strong>
            <h1 className="text-3xl">
              Hello! I'm{" "}
              <span className="text-blue-500 dark:text-orange-300">
                Ka Hung
              </span>
            </h1>
          </strong>
          <h2 className="text-xl font-light max-w-75 sm:max-w-100">
            <strong className="font-semibold">Frontend Engineer</strong> turning
            complex systems into intuitive <em>user experiences</em>
          </h2>
        </div>
        <div className="grid grid-cols-2 w-52">
          <Section title="About">
            <span className="sr-only">About</span>
            <ProfileIcon />
          </Section>
          <Section title="Contact">
            <span className="sr-only">Contact</span>
            <ChatIcon />
          </Section>
        </div>
      </div>
      <div className="absolute bottom-35 sm:bottom-20 animate-[bounce_2s_infinite]">
        <ScrollToButton elementId="projects" />
      </div>
    </section>
  );
}

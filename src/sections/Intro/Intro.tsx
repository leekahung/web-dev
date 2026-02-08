import ChatIcon from "@/shared/components/icons/ChatIcon";
import ProfileIcon from "@/shared/components/icons/ProfileIcon";
import Section from "./components/Section";
export default function Intro() {
  return (
    <section aria-label="Introduction" className="relative h-screen flex flex-col items-center justify-center gap-6 cursor-default">
      <div className="flex flex-col items-center justify-center gap-6 bg-neutral-400/20 dark:bg-neutral-200/20 rounded-2xl py-8 px-4 sm:p-8">
        <div className="flex flex-col items-center gap-4">
          <strong>
            <h1 className="text-2xl sm:text-3xl">
              Hey there! I'm{" "}
              <span className="text-blue-500 dark:text-orange-300">
                Ka Hung
              </span>
            </h1>
          </strong>
          <h2 className="text-base sm:text-xl max-w-75 sm:max-w-100">
            I build production-ready React applications for data-heavy and
            civic-tech projects
          </h2>
          <div>
            <strong className="gap-x-2">
              <span className="group">
                2+ years in production{" "}
                <span className="text-[#007ACC] dark:text-[#61DAFB] relative transition-colors duration-300">
                  React
                  <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-[#007ACC] dark:bg-[#61DAFB] group-hover:w-full transition-all duration-300" />
                </span>
              </span>
              {" \u00B7 "}
              <span className="group">
                Civic-tech{" "}
                <span className="text-[#2F855A] dark:text-[#5FD18D] relative transition-colors duration-300">
                  Contributor
                  <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-[#2F855A] dark:bg-[#5FD18D] group-hover:w-full transition-all duration-300" />
                </span>
              </span>
              {" \u00B7 "}
              <span className="group">
                Former{" "}
                <span className="group text-[#D97706] dark:text-orange-300 relative transition-colors duration-300">
                  Researcher
                  <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-[#D97706] dark:bg-orange-300 group-hover:w-full transition-all duration-300" />
                </span>
              </span>
            </strong>
          </div>
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
    </section>
  );
}

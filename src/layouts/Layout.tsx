import useTheme from "@/hooks/useTheme";
import { motion } from "motion/react";
import SVGIcon from "@/shared/components/SVGIcon";
import ExternalLink from "@/shared/components/ExternalLink";
import BackgroundBlob from "@/animations/BackgroundBlob";
import ScrollToTopButton from "@/layouts/ScrollToTopButton";
import NavButton from "./NavButton";

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  const { darkMode, toggleDarkMode } = useTheme();

  const imageMaskStyling = `
    [mask-image:linear-gradient(to_right,transparent,black_20%,black_80%,transparent),linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)]
    [mask-composite:source-in]
    [mask-size:100%_80%]
    [mask-position:center_center]
    [mask-repeat:no-repeat]
    [-webkit-mask-image:linear-gradient(to_right,transparent,black_20%,black_80%,transparent),linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)]
    [-webkit-mask-composite:source-in]
    [-webkit-mask-size:100%_80%]
    [-webkit-mask-position:center_center]
    [-webkit-mask-repeat:no-repeat]
  `;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 1.5,
        ease: "easeIn",
      }}
      className="relative w-full dark:text-slate-200 bg-slate-200 dark:bg-slate-800 transition-all duration-1000"
    >
      <div className={`fixed h-screen w-screen ${imageMaskStyling}`}>
        <img
          src={`${import.meta.env.BASE_URL}/${
            darkMode ? "clear_night.jpg" : "overcast.webp"
          }`}
          alt="background image"
          className="w-full h-full object-cover object-center opacity-20"
        />
      </div>
      <header className="fixed w-full h-20 top-0 z-50 bg-slate-200 dark:bg-slate-800 transition-all duration-1000">
        <div className="relative w-full h-full">
          <div className="fixed top-5 left-10 md:left-[10%] flex gap-5">
            <ExternalLink to="https://github.com/leekahung">
              <img
                className="dark:invert h-10 w-10"
                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"
                alt="github icon"
              />
            </ExternalLink>
            <ExternalLink to="https://www.linkedin.com/in/ka-hung-lee/">
              <img
                className="h-10 w-10"
                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg"
                alt="linkedin icon"
              />
            </ExternalLink>
          </div>
          <div className="fixed top-5 right-10 md:right-[10%] z-10">
            <button
              className="h-10 w-10 p-2 cursor-pointer bg-blue-500 dark:bg-orange-300 rounded-full hover:scale-110 transition-transform duration-500"
              onClick={toggleDarkMode}
            >
              <SVGIcon
                svgStroke={darkMode ? "black" : "#f8fafc"}
                svgPathD={
                  darkMode
                    ? "M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                    : "M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
                }
              />
            </button>
          </div>
        </div>
      </header>
      <main>{children}</main>
      <footer className="fixed w-full h-20 bottom-0 z-50 bg-slate-200 dark:bg-slate-800 transition-all duration-1000">
        <div className="flex items-center justify-center w-full h-full">
          <em className="font-light">&#169; 2025 Ka Hung Lee</em>
        </div>
      </footer>
      <NavButton />
      <ScrollToTopButton />
      <BackgroundBlob />
    </motion.div>
  );
}

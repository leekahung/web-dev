import { useEffect, useRef, useState } from "react";
import useTheme from "@/hooks/useTheme";
import SVGIcon from "@/shared/components/SVGIcon";
import ExternalLink from "@/shared/components/ExternalLink";
import UpChevron from "@/shared/components/icons/UpChevron";

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  const { darkMode, toggleDarkMode } = useTheme();
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const pageRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({
    x: window.innerWidth * 0.9,
    y: window.innerHeight * 0.1,
  });
  const blobRef = useRef<HTMLDivElement>(null);
  const positionRef = useRef({
    x: window.innerWidth * 0.9,
    y: window.innerHeight * 0.1,
  });

  useEffect(() => {
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (isFinePointer === false) return;

    const handleMouseMove = (event: MouseEvent) => {
      setPosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    const animate = () => {
      positionRef.current.x += (position.x - positionRef.current.x) * 0.1;
      positionRef.current.y += (position.y - positionRef.current.y) * 0.1;

      if (blobRef.current !== null) {
        blobRef.current.style.left = `${positionRef.current.x}px`;
        blobRef.current.style.top = `${positionRef.current.y}px`;
      }
    };

    animate();

    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [position]);

  useEffect(() => {
    setTimeout(() => {
      pageRef.current?.classList.remove("opacity-50");
    }, 300);
    setTimeout(() => {
      pageRef.current?.classList.remove("blur-3xl");
    }, 500);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollToTop(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      className="dark:text-slate-200 relative w-screen bg-slate-200 dark:bg-slate-800 transition-all duration-1000 opacity-50 blur-3xl"
      ref={pageRef}
    >
      <header className="fixed w-full h-20 top-0 z-50 bg-slate-200 dark:bg-slate-800 transition-all duration-1000">
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
      </header>
      <main>{children}</main>
      <footer className="fixed w-full h-20 bottom-0 z-50 bg-slate-200 dark:bg-slate-800 transition-all duration-1000">
        <div className="flex items-center justify-center w-full h-full">
          <em className="font-light">&#169; 2025 Ka Hung Lee</em>
        </div>
      </footer>
      {showScrollToTop && (
        <button
          className="fixed bottom-5 right-10 md:right-[10%] border-1 rounded-full p-2 z-50 cursor-pointer"
          onClick={scrollToTop}
          ref={buttonRef}
        >
          <UpChevron />
        </button>
      )}
      <div
        ref={blobRef}
        className={`fixed h-40 w-40 rounded-full pointer-events-none blur-3xl opacity-20 z-50
          ${darkMode ? "bg-blue-500" : "bg-orange-300"}`}
        style={{
          left: position.x,
          top: position.y,
          transform: "translate(-50%, -50%)",
        }}
      />
    </div>
  );
}

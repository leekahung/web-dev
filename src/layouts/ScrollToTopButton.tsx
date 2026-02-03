import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import UpChevron from "../shared/components/icons/UpChevron";

export default function ScrollToTopButton() {
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollToTop(window.scrollY > 100);
      const scrollPositionTop = document.documentElement.scrollTop;
      const pageHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const sectionPadding = 80;
      const scrollProgress =
        (scrollPositionTop / (pageHeight - sectionPadding)) * 100;
      if (progressBarRef.current === null) return;
      progressBarRef.current.style.height = `${scrollProgress}%`;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <AnimatePresence>
        {showScrollToTop && (
          <motion.button
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{
              duration: 0.5,
              ease: "easeInOut",
            }}
            className="fixed bottom-5 right-10 lg:right-[10%] xl:right-[20%] outline-1 rounded-full p-1 z-50 cursor-pointer hover:scale-105 hover:bg-slate-500 hover:text-slate-200 dark:hover:bg-slate-200 dark:hover:text-black duration-300"
            onClick={scrollToTop}
            ref={buttonRef}
          >
            <UpChevron />
          </motion.button>
        )}
      </AnimatePresence>
      <div className="fixed overflow-hidden top-1/2 -translate-y-1/2 left-0 sm:left-5 w-1 h-20 bg-slate-400 rounded-full z-50">
        <div
          className="w-full dark:bg-orange-300 bg-blue-500 rounded-full"
          ref={progressBarRef}
        />
      </div>
    </>
  );
}

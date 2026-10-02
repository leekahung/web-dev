import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import UpChevron from "../shared/components/icons/UpChevron";

export default function ScrollToTopButton() {
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollToTop(window.scrollY > 100);
      const scrollPositionTop = document.documentElement.scrollTop;
      const pageHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const sectionPadding = 80;
      const scrollableHeight = pageHeight - sectionPadding;
      // A page too short to scroll counts as fully read
      const scrollProgress =
        scrollableHeight > 0
          ? Math.min(
              Math.max((scrollPositionTop / scrollableHeight) * 100, 0),
              100,
            )
          : 100;
      if (progressBarRef.current === null || progressRef.current === null)
        return;
      progressBarRef.current.style.height = `${scrollProgress}%`;
      progressRef.current.setAttribute(
        "aria-valuenow",
        String(Math.round(scrollProgress)),
      );
    };

    handleScroll();
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
            className="fixed bottom-5 right-10 lg:right-[10%] xl:right-[20%] outline-1 rounded-full p-1 z-50 cursor-pointer hover:scale-105 hover:bg-slate-500 hover:text-slate-200 dark:hover:bg-slate-200 dark:hover:text-black transition duration-300"
            onClick={scrollToTop}
            ref={buttonRef}
            aria-label="Scroll to top"
          >
            <UpChevron />
          </motion.button>
        )}
      </AnimatePresence>
      <div
        className="fixed overflow-hidden top-1/2 -translate-y-1/2 left-0 mid:left-5 w-1 h-20 bg-slate-400 rounded-full z-50"
        ref={progressRef}
        role="progressbar"
        aria-label="Page scroll progress"
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className="w-full dark:bg-orange-300 bg-blue-500 rounded-full"
          ref={progressBarRef}
        />
      </div>
    </>
  );
}
